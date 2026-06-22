import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { getAllLeads, insertLead, markLeadSynced, getPendingLeads } from "../db";
import { notifyOwner } from "../_core/notification";
import axios from "axios";

const GOOGLE_SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "";

async function syncLeadToGoogleSheets(lead: {
  id: number;
  produto: string;
  nome: string;
  whatsapp: string;
  cultura: string | null;
  hectares: string | null;
  problema: string | null;
  createdAt: Date;
}) {
  // Sincronização desativada a pedido do cliente
  return true;
}

export const leadsRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        produto: z.enum(["sc5", "zmgrow"]),
        nome: z.string().min(2),
        whatsapp: z.string().min(8),
        cultura: z.string().optional(),
        hectares: z.string().optional(),
        problema: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Salvar no banco
      await insertLead({
        produto: input.produto,
        nome: input.nome,
        whatsapp: input.whatsapp,
        cultura: input.cultura ?? null,
        hectares: input.hectares ?? null,
        problema: input.problema ?? null,
        googleSheetsSync: "pending",
      });

      // 2. Buscar o lead recém-inserido para sincronizar
      const allLeads = await getAllLeads();
      const newLead = allLeads[allLeads.length - 1];

      // 3. Tentar sincronizar com Google Sheets
      if (newLead) {
        const synced = await syncLeadToGoogleSheets(newLead);
        await markLeadSynced(newLead.id, synced ? "synced" : "error");
      }

      // 4. Notificar o dono do projeto
      const produtoLabel = input.produto === "sc5" ? "SC5 Condicionador de Solo" : "ZM-GROW Biofertilizante";
      await notifyOwner({
        title: `Novo lead — ${produtoLabel}`,
        content: `Nome: ${input.nome}\nWhatsApp: ${input.whatsapp}\nCultura: ${input.cultura ?? "—"}\nHectares: ${input.hectares ?? "—"}\nProblema: ${input.problema ?? "—"}`,
      });

      return { success: true };
    }),

  // Endpoint protegido para visualizar leads (somente admin)
  list: adminProcedure
    .input(
      z.object({
        produto: z.enum(["sc5", "zmgrow", "all"]).optional().default("all"),
      })
    )
    .query(async ({ input }) => {
      const all = await getAllLeads();
      if (input.produto === "all") return all;
      return all.filter((l) => l.produto === input.produto);
    }),

  // Reprocessar leads com erro de sincronização
  retrySync: publicProcedure.mutation(async () => {
    const pending = await getPendingLeads();
    let synced = 0;
    for (const lead of pending) {
      const ok = await syncLeadToGoogleSheets(lead);
      await markLeadSynced(lead.id, ok ? "synced" : "error");
      if (ok) synced++;
    }
    return { synced, total: pending.length };
  }),
});

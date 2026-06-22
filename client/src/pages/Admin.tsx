/**
 * Painel Administrativo — AMD Agro
 * Visualização e exportação de leads por produto (SC5 / ZM-GROW)
 * Acesso restrito a usuários com role "admin"
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Produto = "all" | "sc5" | "zmgrow";

function exportToCSV(
  leads: {
    id: number;
    produto: string;
    nome: string;
    whatsapp: string;
    cultura: string | null;
    hectares: string | null;
    problema: string | null;
    googleSheetsSync: string;
    createdAt: Date;
  }[],
  filename: string
) {
  const header = ["ID", "Produto", "Nome", "WhatsApp", "Cultura", "Hectares", "Interesse/Problema", "Data"];
  const rows = leads.map((l) => [
    l.id,
    l.produto.toUpperCase(),
    l.nome,
    l.whatsapp,
    l.cultura ?? "",
    l.hectares ?? "",
    l.problema ?? "",
    new Date(l.createdAt).toLocaleString("pt-BR"),
  ]);

  const csvContent = [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const { user, loading } = useAuth();
  const [produto, setProduto] = useState<Produto>("all");

  const { data: leads, isLoading, isError, refetch } = trpc.leads.list.useQuery(
    { produto },
    { enabled: !!user && user.role === "admin" }
  );

  // Loading de autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  // Não autenticado
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold">Acesso restrito</h1>
        <p className="text-muted-foreground">Faça login para acessar o painel.</p>
        <Button asChild>
          <a href={getLoginUrl()}>Entrar</a>
        </Button>
      </div>
    );
  }

  // Não é admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold">Sem permissão</h1>
        <p className="text-muted-foreground">
          Sua conta não tem acesso ao painel administrativo.
        </p>
      </div>
    );
  }

  const sc5Count = leads?.filter((l) => l.produto === "sc5").length ?? 0;
  const zmgrowCount = leads?.filter((l) => l.produto === "zmgrow").length ?? 0;
  const totalCount = leads?.length ?? 0;

  const filenameMap: Record<Produto, string> = {
    all: "leads-amd-agro-todos.csv",
    sc5: "leads-sc5-condicionador.csv",
    zmgrow: "leads-zmgrow-biofertilizante.csv",
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">AMD Agro — Painel de Leads</h1>
          <p className="text-xs text-white/50 mt-0.5">Olá, {user.name ?? user.email}</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/"
            className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2"
          >
            ← SC5
          </a>
          <span className="text-white/30">|</span>
          <a
            href="/zmgrow"
            className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2"
          >
            ZM-GROW
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">SC5 Condicionador</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-700">{sc5Count}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">ZM-GROW Biofertilizante</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-700">{zmgrowCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e exportação */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Filtrar por produto:</span>
            <Select value={produto} onValueChange={(v) => setProduto(v as Produto)}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os produtos</SelectItem>
                <SelectItem value="sc5">SC5 Condicionador de Solo</SelectItem>
                <SelectItem value="zmgrow">ZM-GROW Biofertilizante</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="bg-white"
            >
              Atualizar
            </Button>
            <Button
              size="sm"
              className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white"
              disabled={!leads || leads.length === 0}
              onClick={() =>
                leads && exportToCSV(leads, filenameMap[produto])
              }
            >
              ↓ Exportar CSV
              {leads && leads.length > 0 && (
                <span className="ml-1.5 bg-white/20 rounded px-1.5 py-0.5 text-xs">
                  {leads.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Tabela */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                Carregando leads...
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-base font-medium text-destructive">Erro ao carregar leads</p>
                <Button variant="outline" size="sm" onClick={() => refetch()}>Tentar novamente</Button>
              </div>
            ) : !leads || leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
                <p className="text-lg font-medium">Nenhum lead encontrado</p>
                <p className="text-sm">Os leads preenchidos nos formulários aparecerão aqui.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Cultura</TableHead>
                      <TableHead>Hectares</TableHead>
                      <TableHead>Interesse</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-muted/20">
                        <TableCell className="text-muted-foreground text-xs">{lead.id}</TableCell>
                        <TableCell>
                          {lead.produto === "sc5" ? (
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 text-xs font-semibold">
                              SC5
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 text-xs font-semibold">
                              ZM-GROW
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{lead.nome}</TableCell>
                        <TableCell>
                          <a
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-700 hover:underline font-mono text-sm"
                          >
                            {lead.whatsapp}
                          </a>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {lead.cultura ?? "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {lead.hectares ? `${lead.hectares} ha` : "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-[160px] truncate">
                          {lead.problema ?? "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

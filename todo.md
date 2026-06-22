# AMD Agro — SC5 & ZM-GROW Landing Pages TODO

## Landing Pages
- [x] Landing page SC5 Condicionador de Solo (rota /)
- [x] Landing page ZM-GROW Biofertilizante (rota /zmgrow)
- [x] Botão flutuante WhatsApp (+4368110797136) em ambas as páginas
- [x] Design earthy/orgânico SC5 (tons terrosos + verde escuro)
- [x] Design verde profundo + âmbar ZM-GROW

## Backend & Banco de Dados
- [x] Upgrade para template tRPC + Manus Auth + Database
- [x] Tabela `leads` criada no schema Drizzle (drizzle/schema.ts)
- [x] Migração executada com sucesso (pnpm db:push)
- [x] Helpers de banco em server/db.ts (insertLead, getAllLeads, getPendingLeads, markLeadSynced)
- [x] Router de leads em server/routers/leads.ts (submit, list, retrySync)
- [x] leadsRouter registrado no server/routers.ts

## Formulários com tRPC
- [x] Formulário SC5 (Home.tsx) adaptado para tRPC com estado controlado
- [x] Formulário ZM-GROW (ZmGrow.tsx) adaptado para tRPC com estado controlado

## Integrações
- [x] Notificação ao dono via notifyOwner() implementada
- [ ] Integração Google Sheets (adiada para depois)
- [x] Google Apps Script webhook preparado em references/google-apps-script-webhook.js (para uso futuro)

## Publicação
- [x] Checkpoint salvo (versão 4efba1b8)
- [x] Rota /zmgrow reintegrada no projeto SC5 (Opção A)
- [ ] Publicar o projeto SC5+ZM-GROW (botão Publish no painel) — ação manual

## Painel Admin — Exportação de Leads
- [x] Rota tRPC leads.list com filtro por produto (adminProcedure)
- [x] Página /admin com tabela de leads (SC5 e ZM-GROW)
- [x] Botão exportar CSV por produto
- [x] Proteção da rota /admin por role admin (adminProcedure no backend + verificação no frontend)
- [x] Checkpoint final salvo

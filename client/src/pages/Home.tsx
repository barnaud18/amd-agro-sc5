/**
 * SC5 Condicionador de Solo — AMD Agro
 * Design: Earthy organic — tons terrosos + verde escuro + branco
 * Fontes: DM Sans (corpo) + Playfair Display (títulos)
 * Layout: Hero full-height → Ciência → Comparativo → Culturas → Oferta → Formulário → Trust → Footer
 */
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";

const WA_NUMBER = "4368110797136";

function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function Home() {
  const submitLead = trpc.leads.submit.useMutation();
  const [formData, setFormData] = useState({ nome: "", whatsapp: "", cultura: "", hectares: "", problema: "" });

  async function enviarForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.nome || !formData.whatsapp) {
      toast.error("Preencha pelo menos seu nome e WhatsApp!");
      return;
    }
    try {
      await submitLead.mutateAsync({
        produto: "sc5",
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        cultura: formData.cultura || undefined,
        hectares: formData.hectares || undefined,
        problema: formData.problema || undefined,
      });
      toast.success("Dados enviados! Abrindo WhatsApp...");
    } catch {
      toast.error("Erro ao salvar dados, mas abrindo WhatsApp mesmo assim.");
    }
    const msg = `Olá! Vim pelo site — SC5 Condicionador de Solo.\n\nNome: ${formData.nome}\nWhatsApp: ${formData.whatsapp}\nCultura: ${formData.cultura || "Não informada"}\nHectares: ${formData.hectares || "Não informado"}\nProblema: ${formData.problema || "Não informado"}\n\nQuero receber recomendação!`;
    window.open(waLink(msg), "_blank");
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#FAF8F5", overflowX: "hidden" }}>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        background: "linear-gradient(170deg,#3E2723 0%,#5D4037 35%,#795548 100%)",
        position: "relative", padding: "2rem 1.5rem"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 20% 80%,rgba(46,125,50,.15) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 20%,rgba(121,85,72,.2) 0%,transparent 60%)" }} />
        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem",
            background: "rgba(255,255,255,.08)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.12)", borderRadius: 100,
            padding: ".45rem 1.2rem", fontSize: ".8rem", color: "rgba(255,255,255,.8)",
            letterSpacing: ".06em", marginBottom: "1.8rem", textTransform: "uppercase" as const
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2E7D32", display: "inline-block", animation: "blink 2s infinite" }} />
            Condicionador biológico de solo
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3.6rem)",
            color: "#fff", lineHeight: 1.12, marginBottom: "1.2rem", fontWeight: 500
          }}>
            O fósforo que você pagou está{" "}
            <em style={{ fontStyle: "italic", color: "#A5D6A7" }}>preso no solo</em>. O SC5 libera.
          </h1>

          <p style={{ fontSize: "clamp(.95rem,2.2vw,1.2rem)", color: "rgba(255,255,255,.75)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 660, marginLeft: "auto", marginRight: "auto" }}>
            Condicionador biológico com <em>Pseudomonas thivervalensis</em> que solubiliza fósforo fixado, controla patógenos de solo e regenera a microbiota.
          </p>

          <div style={{ display: "flex", gap: ".8rem", justifyContent: "center", flexWrap: "wrap" as const, marginBottom: "2.5rem" }}>
            {[
              { val: "+80%", lab: "Absorção de P", color: "#A5D6A7" },
              { val: "R$ 87", lab: "Economia por ha", color: "#FFCC80" },
              { val: "3 em 1", lab: "Solubiliza + Biocontrole + Estrutura", color: "#81D4FA" },
            ].map((m) => (
              <div key={m.lab} style={{
                background: "rgba(255,255,255,.07)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,.1)", borderRadius: 14,
                padding: "1rem 1.4rem", minWidth: 130, textAlign: "center" as const
              }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, lineHeight: 1, color: m.color }}>{m.val}</div>
                <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.55)", marginTop: ".3rem", textTransform: "uppercase" as const, letterSpacing: ".06em" }}>{m.lab}</div>
              </div>
            ))}
          </div>

          <a href="#formulario" style={{
            display: "inline-flex", alignItems: "center", gap: ".6rem",
            background: "#25D366", color: "#fff", fontSize: "1.1rem", fontWeight: 700,
            padding: "1rem 2rem", borderRadius: 60, textDecoration: "none",
            boxShadow: "0 4px 24px rgba(37,211,102,.35)", transition: "all .25s"
          }}>
            <WhatsAppIcon size={22} />
            FALAR COM CONSULTOR TÉCNICO
          </a>
        </div>
      </section>

      {/* CIÊNCIA */}
      <section style={{ background: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#5D4037", marginBottom: ".5rem" }}>Ciência aplicada ao solo</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3.2vw,2.2rem)", marginBottom: ".6rem", lineHeight: 1.2 }}>3 mecanismos de ação em um único produto</h2>
          <p style={{ color: "#666", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 680 }}>
            O SC5 contém uma cepa selecionada de <em>Pseudomonas thivervalensis</em> que atua em três frentes simultâneas no sistema solo-planta.
          </p>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#5D4037", background: "#EFEBE9", display: "inline-block", padding: ".4rem 1rem", borderRadius: 8, marginBottom: "2rem" }}>
            Pseudomonas thivervalensis — cepa SC5
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.2rem" }}>
            {[
              { icon: "P", title: "Solubilização de Fósforo", text: "Produz ácidos orgânicos que liberam o fósforo fixado em óxidos de ferro e alumínio. Aquele P que você aplicou e a planta não acessava volta a ficar disponível.", badge: "+80% absorção de P", bg: "linear-gradient(180deg,#E8F5E9,#fff)", bar: "#2E7D32", iconBg: "#2E7D32", badgeBg: "#E8F5E9", badgeColor: "#1B5E20" },
              { icon: "⚔", title: "Biocontrole de Patógenos", text: "Compete com fungos patogênicos como Fusarium, Rhizoctonia e Sclerotinia. Produz sideróforos e compostos antimicrobianos que protegem as raízes.", badge: "-60% podridão radicular", bg: "linear-gradient(180deg,#EFEBE9,#fff)", bar: "#5D4037", iconBg: "#5D4037", badgeBg: "#EFEBE9", badgeColor: "#3E2723" },
              { icon: "◉", title: "Estruturação do Solo", text: "Produz exopolissacarídeos que melhoram a agregação, aumentam retenção de água e criam condições ideais para o desenvolvimento radicular profundo.", badge: "+45% exploração radicular", bg: "linear-gradient(180deg,#E3F2FD,#fff)", bar: "#1565C0", iconBg: "#1565C0", badgeBg: "#E3F2FD", badgeColor: "#0D47A1" },
            ].map((m) => (
              <div key={m.title} style={{ borderRadius: 18, padding: "2rem 1.5rem", background: m.bg, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: m.bar }} />
                <div style={{ width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "1rem", background: m.iconBg, color: "#fff", fontWeight: 800 }}>{m.icon}</div>
                <h3 style={{ fontSize: ".95rem", fontWeight: 700, marginBottom: ".4rem" }}>{m.title}</h3>
                <p style={{ fontSize: ".85rem", color: "#666", lineHeight: 1.6 }}>{m.text}</p>
                <div style={{ display: "inline-block", marginTop: ".8rem", fontSize: ".78rem", fontWeight: 700, padding: ".3rem .7rem", borderRadius: 8, background: m.badgeBg, color: m.badgeColor }}>{m.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section style={{ background: "#EFEBE9", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" as const }}>
          <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#2E7D32", marginBottom: ".5rem" }}>Comparativo real</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", marginBottom: ".5rem", color: "#3E2723" }}>O que muda no solo com SC5</h2>
          <p style={{ color: "#666", marginBottom: "3rem" }}>Ensaio de campo — Soja, Sorriso/MT, Safra 2024/25</p>

          <div data-compare-grid="" style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: "1rem", alignItems: "stretch", maxWidth: 700, margin: "0 auto" }}>
            <div style={{ borderRadius: 18, padding: "2rem 1.5rem", background: "#fff", border: "2px dashed #BDBDBD", textAlign: "center" as const }}>
              <h3 style={{ fontSize: ".8rem", textTransform: "uppercase" as const, letterSpacing: ".08em", marginBottom: "1.2rem", color: "#999" }}>Sem SC5</h3>
              {[["P disponível", "12 mg/dm³"], ["Absorção de P", "35%"], ["Podridão radicular", "18%"], ["Prof. raiz", "22 cm"], ["Produtividade", "58 sc/ha"], ["Custo/ha", "R$ 2.850"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: ".4rem 0", fontSize: ".88rem", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
                  <span>{l}</span><span style={{ fontWeight: 700, color: "#C62828" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#E65100" }}>VS</div>
            <div style={{ borderRadius: 18, padding: "2rem 1.5rem", background: "#1B5E20", border: "2px solid #2E7D32", textAlign: "center" as const, color: "#fff" }}>
              <h3 style={{ fontSize: ".8rem", textTransform: "uppercase" as const, letterSpacing: ".08em", marginBottom: "1.2rem", color: "#A5D6A7" }}>Com SC5</h3>
              {[["P disponível", "21 mg/dm³"], ["Absorção de P", "63%"], ["Podridão radicular", "7%"], ["Prof. raiz", "34 cm"], ["Produtividade", "72 sc/ha"], ["Custo/ha", "R$ 2.530"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: ".4rem 0", fontSize: ".88rem", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                  <span>{l}</span><span style={{ fontWeight: 700, color: "#A5D6A7" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CULTURAS */}
      <section style={{ background: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#5D4037", marginBottom: ".5rem" }}>Compatibilidade</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", marginBottom: "2rem" }}>Funciona em todas as principais culturas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: ".8rem" }}>
            {[
              { emoji: "🌱", name: "Soja", dose: "Sulco ou área total" },
              { emoji: "🌽", name: "Milho", dose: "Sulco de plantio" },
              { emoji: "🌾", name: "Trigo", dose: "Área total" },
              { emoji: "☕", name: "Café", dose: "Cova ou drench" },
              { emoji: "🍚", name: "Arroz", dose: "Área total" },
              { emoji: "🫘", name: "Feijão", dose: "Sulco de plantio" },
              { emoji: "🌿", name: "Pastagem", dose: "Área total" },
              { emoji: "🍊", name: "Citros", dose: "Drench ou fertirrigação" },
            ].map((c) => (
              <div key={c.name} style={{ background: "#FAF8F5", borderRadius: 14, padding: "1.2rem", textAlign: "center" as const, border: "2px solid transparent", transition: "all .2s" }}>
                <div style={{ fontSize: "2rem", marginBottom: ".4rem" }}>{c.emoji}</div>
                <div style={{ fontSize: ".85rem", fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: ".72rem", color: "#666", marginTop: ".2rem" }}>{c.dose}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section style={{ background: "linear-gradient(165deg,#3E2723 0%,#5D4037 100%)", padding: "5rem 1.5rem", color: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" as const }}>
          <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#A5D6A7", marginBottom: ".5rem" }}>Condição especial</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3.5vw,2.3rem)", marginBottom: ".5rem" }}>SC5: regenere seu solo esta safra</h2>
          <p style={{ color: "rgba(255,255,255,.6)", marginBottom: "2.5rem" }}>Oferta válida enquanto durar o estoque</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.2rem", marginBottom: "2rem" }}>
            <div style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 18, padding: "2rem 1.5rem", textAlign: "center" as const }}>
              <h3 style={{ fontSize: ".78rem", textTransform: "uppercase" as const, letterSpacing: ".08em", color: "rgba(255,255,255,.5)", marginBottom: ".8rem" }}>SC5 Solo</h3>
              <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: ".3rem" }}>SC5 Condicionador</div>
              <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", lineHeight: 1.5 }}>Pseudomonas thivervalensis<br />Bag 1L ou Bag 5L</div>
              <div style={{ fontSize: ".82rem", color: "#A5D6A7", fontWeight: 600, marginTop: ".8rem" }}>Acima de 10 bags: frete grátis</div>
            </div>
            <div style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(6px)", border: "2px solid #2E7D32", borderRadius: 18, padding: "2rem 1.5rem", textAlign: "center" as const, position: "relative" }}>
              <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "#2E7D32", color: "#fff", fontSize: ".6rem", fontWeight: 700, padding: ".25rem .7rem", borderRadius: 6, letterSpacing: ".08em" }}>MELHOR VALOR</div>
              <h3 style={{ fontSize: ".78rem", textTransform: "uppercase" as const, letterSpacing: ".08em", color: "rgba(255,255,255,.5)", marginBottom: ".8rem" }}>Combo Completo</h3>
              <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: ".3rem" }}>SC5 + ZM-GROW</div>
              <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", lineHeight: 1.5 }}>Condicionador + Biofertilizante Zn+Mn+S<br />Nutrição aérea + radicular</div>
              <div style={{ fontSize: ".82rem", color: "#A5D6A7", fontWeight: 600, marginTop: ".8rem" }}>15% desconto + consultoria agronômica grátis</div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="formulario" style={{ background: "#1B5E20", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" as const }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: ".4rem" }}>Fale com nosso Especialista</h2>
          <p style={{ color: "rgba(255,255,255,.6)", marginBottom: "2rem", fontSize: ".95rem" }}>Preencha seus dados e receba recomendação personalizada</p>

          <form onSubmit={enviarForm} style={{ background: "#fff", borderRadius: 20, padding: "2.2rem", textAlign: "left" as const, boxShadow: "0 8px 40px rgba(0,0,0,.3)" }}>
            <div>
              <label htmlFor="nome" style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#666", marginBottom: ".25rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Seu nome</label>
              <input id="nome" type="text" placeholder="Ex: José da Silva" required value={formData.nome} onChange={e => setFormData(p => ({ ...p, nome: e.target.value }))} style={{ width: "100%", padding: ".75rem 1rem", border: "2px solid #e8e4e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: ".95rem", marginBottom: ".9rem", background: "#FAF6F3", outline: "none" }} />
            </div>
            <div>
              <label htmlFor="whatsapp" style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#666", marginBottom: ".25rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>WhatsApp</label>
              <input id="whatsapp" type="tel" placeholder="(XX) XXXXX-XXXX" required value={formData.whatsapp} onChange={e => setFormData(p => ({ ...p, whatsapp: e.target.value }))} style={{ width: "100%", padding: ".75rem 1rem", border: "2px solid #e8e4e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: ".95rem", marginBottom: ".9rem", background: "#FAF6F3", outline: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".8rem" }}>
              <div>
                <label htmlFor="cultura" style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#666", marginBottom: ".25rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Cultura principal</label>
                <select id="cultura" value={formData.cultura} onChange={e => setFormData(p => ({ ...p, cultura: e.target.value }))} style={{ width: "100%", padding: ".75rem 1rem", border: "2px solid #e8e4e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: ".95rem", marginBottom: ".9rem", background: "#FAF6F3" }}>
                  <option value="">Selecione...</option>
                  {["Soja", "Milho", "Trigo", "Café", "Feijão", "Arroz", "Pastagem", "Algodão", "Cana", "Fruticultura", "Outra"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="hectares" style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#666", marginBottom: ".25rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Hectares</label>
                <input id="hectares" type="text" placeholder="Ex: 500" value={formData.hectares} onChange={e => setFormData(p => ({ ...p, hectares: e.target.value }))} style={{ width: "100%", padding: ".75rem 1rem", border: "2px solid #e8e4e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: ".95rem", marginBottom: ".9rem", background: "#FAF6F3" }} />
              </div>
            </div>

            <label htmlFor="problema" style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#666", marginBottom: ".25rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Problema principal do solo</label>
            <select id="problema" value={formData.problema} onChange={e => setFormData(p => ({ ...p, problema: e.target.value }))} style={{ width: "100%", padding: ".75rem 1rem", border: "2px solid #e8e4e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: ".95rem", marginBottom: ".9rem", background: "#FAF6F3" }}>
              <option value="">Selecione...</option>
              {["Solo compactado / pouca estrutura", "Fósforo alto na análise mas planta deficiente", "Doenças de solo (fusarium, rhizoctonia)", "Produtividade estagnada", "Quero prevenir / melhorar o solo", "Outro"].map((o) => <option key={o}>{o}</option>)}
            </select>

            <button type="submit" style={{ width: "100%", padding: ".9rem", border: "none", borderRadius: 60, background: "#25D366", color: "#fff", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", marginTop: ".3rem" }}>
              <WhatsAppIcon size={20} />
              ENVIAR E FALAR NO WHATSAPP
            </button>

            <div style={{ textAlign: "center" as const, color: "#666", fontSize: ".82rem", margin: ".8rem 0" }}>ou vá direto:</div>

            <a href={waLink("Olá! Vim pelo site — SC5 Condicionador de Solo. Quero saber mais!")} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", width: "100%", padding: ".7rem", border: "2px solid #25D366", borderRadius: 60, color: "#25D366", fontWeight: 700, textDecoration: "none", fontSize: ".95rem" }}>
              <WhatsAppIcon size={18} />
              Chamar direto no WhatsApp
            </a>
          </form>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ background: "#fff", padding: "2.5rem 1.5rem", textAlign: "center" as const }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" as const }}>
          {["Registro MAPA", "Pseudomonas thivervalensis", "Validado em campo", "Compatível com bioinsumos e TSI"].map((t) => (
            <div key={t} style={{ fontSize: ".82rem", color: "#666", display: "flex", alignItems: "center", gap: ".3rem" }}>
              <span style={{ color: "#2E7D32" }}><CheckIcon /></span>{t}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a1a", color: "rgba(255,255,255,.4)", padding: "2rem 1.5rem", textAlign: "center" as const, fontSize: ".78rem" }}>
        <p>AMD Agro — amdagro.com.br</p>
        <p style={{ marginTop: ".4rem" }}>Agricultura Sustentável ao Alcance de Todos</p>
      </footer>

      {/* FLOAT WHATSAPP */}
      <a href={waLink("Olá! Quero saber sobre o SC5")} target="_blank" rel="noreferrer" title="WhatsApp" style={{
        position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100,
        background: "#25D366", color: "#fff", width: 58, height: 58, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,.4)", textDecoration: "none",
        animation: "pulse 2s infinite"
      }}>
        <WhatsAppIcon size={28} />
      </a>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes pulse { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)} 50%{box-shadow:0 4px 30px rgba(37,211,102,.7)} }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        @media(max-width:768px){
          [data-compare-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

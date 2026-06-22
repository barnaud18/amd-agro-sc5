/**
 * ZM-GROW Biofertilizante — AMD Agro
 * Design: Verde profundo + âmbar vibrante — tom agro moderno
 * Fontes: DM Sans (corpo) + DM Serif Display (títulos)
 * Layout: Hero → Problema → Produto → Resultados → Oferta → Formulário → Trust → Footer
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function ZmGrow() {
  const submitLead = trpc.leads.submit.useMutation();
  const [formData, setFormData] = useState({ nome: "", whatsapp: "", cultura: "", hectares: "", interesse: "zmgrow" });

  async function enviarForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.nome || !formData.whatsapp) {
      toast.error("Preencha pelo menos seu nome e WhatsApp!");
      return;
    }
    try {
      await submitLead.mutateAsync({
        produto: "zmgrow",
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        cultura: formData.cultura || undefined,
        hectares: formData.hectares || undefined,
        problema: formData.interesse || undefined,
      });
      toast.success("Dados enviados! Abrindo WhatsApp...");
    } catch {
      toast.error("Erro ao salvar dados, mas abrindo WhatsApp mesmo assim.");
    }
    const interesses: Record<string, string> = { zmgrow: "ZM-GROW", sc5: "SC5", combo: "COMBO ZM+SC5", consultoria: "Consultoria agronômica" };
    const msg = `Olá! Vim pelo site da AMD Agro.\n\nNome: ${formData.nome}\nWhatsApp: ${formData.whatsapp}\nCultura: ${formData.cultura || "Não informada"}\nHectares: ${formData.hectares || "Não informado"}\nInteresse: ${interesses[formData.interesse] || formData.interesse}\n\nQuero receber uma proposta!`;
    window.open(waLink(msg), "_blank");
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#f8f7f4", overflowX: "hidden" }}>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        background: "linear-gradient(165deg,#0A3A12 0%,#1B5E20 40%,#2E7D32 100%)",
        position: "relative", padding: "2rem 1.5rem"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{
            display: "inline-block", background: "rgba(255,255,255,.12)", backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,.2)", borderRadius: 100,
            padding: ".5rem 1.2rem", fontSize: ".85rem", color: "rgba(255,255,255,.9)",
            letterSpacing: ".04em", marginBottom: "1.5rem"
          }}>
            BIOFERTILIZANTE LÍQUIDO — REGISTRO MAPA
          </div>

          <h1 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.2rem,5vw,3.8rem)",
            color: "#fff", lineHeight: 1.15, marginBottom: "1rem", fontWeight: 800
          }}>
            Seu solo tem fome de{" "}
            <span style={{ color: "#FF6F00" }}>Zinco, Manganês e Enxofre</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "rgba(255,255,255,.85)", lineHeight: 1.6, marginBottom: "2rem", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            ZM-GROW é o biofertilizante que entrega os 3 micronutrientes mais deficientes no solo brasileiro — e aumenta produtividade comprovada em campo.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" as const, marginBottom: "2.5rem" }}>
            {[
              { num: "+32%", lab: "Produtividade" },
              { num: "-15%", lab: "Custo/ha" },
              { num: "4,2x", lab: "ROI por safra" },
            ].map((s) => (
              <div key={s.lab} style={{
                background: "rgba(255,255,255,.1)", backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,.15)", borderRadius: 16,
                padding: "1rem 1.5rem", minWidth: 140, textAlign: "center" as const
              }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#FF6F00", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.7)", marginTop: ".3rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>{s.lab}</div>
              </div>
            ))}
          </div>

          <a href="#zg-formulario" style={{
            display: "inline-flex", alignItems: "center", gap: ".7rem",
            background: "#25D366", color: "#fff", fontSize: "1.15rem", fontWeight: 700,
            padding: "1rem 2.2rem", borderRadius: 60, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,.4)", transition: "all .25s"
          }}>
            <WhatsAppIcon size={24} />
            FALAR COM CONSULTOR TÉCNICO
          </a>
        </div>
      </section>

      {/* PROBLEMA */}
      <section style={{ background: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#FF6F00", marginBottom: ".5rem" }}>O problema que ninguém fala</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            71% dos solos agrícolas brasileiros já perderam matéria orgânica. O seu pode ser um deles.
          </h2>
          <p style={{ color: "#555", lineHeight: 1.7 }}>A cada safra, o solo perde capacidade de nutrir sua lavoura. O resultado? Mais adubo, mais custo, menos margem. E o ciclo se repete.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1.5rem", marginTop: "2rem" }}>
            {[
              { num: "60%", title: "Fósforo desperdiçado", text: "Até 60% do fósforo aplicado fica fixado no solo e a planta não consegue absorver. Você paga, mas não usa." },
              { num: "R$ 340", title: "Perda por hectare/safra", text: "O produtor médio perde R$ 180 a R$ 340/ha por safra em nutrientes desperdiçados e decisões tardias." },
              { num: "3x", title: "Mais adubo, mesma produção", text: "Em 15 anos, o volume de adubo químico triplicou no Brasil — mas a produtividade média cresceu apenas 22%." },
            ].map((c) => (
              <div key={c.title} style={{ background: "#f8f7f4", borderRadius: 16, padding: "1.8rem", borderLeft: "4px solid #C62828" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#C62828", marginBottom: ".3rem" }}>{c.num}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#C62828", marginBottom: ".5rem" }}>{c.title}</h3>
                <p style={{ fontSize: ".92rem", color: "#555", lineHeight: 1.6 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTO */}
      <section style={{ background: "#E8F5E9", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#FF6F00", marginBottom: ".5rem" }}>A solução</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", marginBottom: ".5rem", color: "#1B5E20" }}>ZM-GROW: os 3 nutrientes que seu solo mais precisa</h2>
          <p style={{ fontSize: "1.05rem", color: "#555", marginBottom: "2.5rem", lineHeight: 1.6 }}>
            Biofertilizante líquido formulado com Zinco, Manganês e Enxofre em proporção otimizada para máxima absorção vegetal. Compatível com todas as culturas de grãos, café, frutíferas e pastagem.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.2rem" }}>
            {[
              { symbol: "Zn", title: "Zinco", text: "Essencial para a formação de grãos e hormônios de crescimento vegetal. Deficiente em 80% dos solos do Cerrado.", benefit: "+28% formação de grãos", grad: "linear-gradient(135deg,#1565C0,#42A5F5)" },
              { symbol: "Mn", title: "Manganês", text: "Ativa mais de 35 enzimas da fotossíntese. Mais energia solar convertida = mais biomassa e produção.", benefit: "+22% eficiência fotossintética", grad: "linear-gradient(135deg,#6A1B9A,#AB47BC)" },
              { symbol: "S", title: "Enxofre", text: "Componente dos aminoácidos metionina e cisteína. Melhora a qualidade proteica do grão e o valor comercial.", benefit: "+18% teor proteico", grad: "linear-gradient(135deg,#E65100,#FF9800)" },
            ].map((n) => (
              <div key={n.title} style={{ background: "#fff", borderRadius: 16, padding: "1.8rem", textAlign: "center" as const, boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: 800, color: "#fff", margin: "0 auto .8rem", background: n.grad }}>{n.symbol}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: ".4rem" }}>{n.title}</h3>
                <p style={{ fontSize: ".85rem", color: "#555", lineHeight: 1.5 }}>{n.text}</p>
                <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#1B5E20", marginTop: ".6rem", background: "#E8F5E9", padding: ".3rem .8rem", borderRadius: 8, display: "inline-block" }}>{n.benefit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section style={{ background: "#1a1a1a", color: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" as const }}>
          <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#FF6F00", marginBottom: ".5rem" }}>Resultados reais de campo</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", marginBottom: ".5rem" }}>Ensaio comparativo — Soja, Sorriso/MT</h2>
          <p style={{ color: "rgba(255,255,255,.6)", marginBottom: "3rem" }}>Safra 2024/25 — Protocolo AMD Agro vs manejo convencional</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "stretch", maxWidth: 700, margin: "0 auto" }}>
            <div style={{ borderRadius: 16, padding: "2rem 1.5rem", textAlign: "center" as const, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
              <h3 style={{ fontSize: ".85rem", textTransform: "uppercase" as const, letterSpacing: ".08em", opacity: .7, marginBottom: "1rem" }}>Convencional</h3>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>58 <small style={{ fontSize: ".9rem", fontWeight: 400, opacity: .7 }}>sc/ha</small></div>
              <div style={{ fontSize: ".85rem", opacity: .7, marginTop: ".5rem" }}>Custo: R$ 2.850/ha</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 800, color: "#FF6F00" }}>VS</div>
            <div style={{ borderRadius: 16, padding: "2rem 1.5rem", textAlign: "center" as const, background: "linear-gradient(135deg,#1B5E20,#2E7D32)", border: "2px solid #4CAF50" }}>
              <h3 style={{ fontSize: ".85rem", textTransform: "uppercase" as const, letterSpacing: ".08em", opacity: .7, marginBottom: "1rem" }}>Com AMD Agro</h3>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>76,6 <small style={{ fontSize: ".9rem", fontWeight: 400, opacity: .7 }}>sc/ha</small></div>
              <div style={{ fontSize: ".85rem", opacity: .7, marginTop: ".5rem" }}>Custo: R$ 2.420/ha</div>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem", background: "rgba(255,255,255,.06)", borderRadius: 16, padding: "2rem", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ fontSize: "3rem", fontWeight: 800, color: "#FF6F00" }}>R$ 4,20</div>
            <div style={{ fontSize: ".9rem", opacity: .7 }}>de retorno para cada R$ 1,00 investido em bioinsumo</div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section style={{ background: "#FFF8E1", padding: "5rem 1.5rem", borderTop: "4px solid #FF6F00" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" as const }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", marginBottom: "1rem", color: "#FF6F00" }}>Condição especial para produtores do Paraná</h2>
          <p style={{ color: "#555" }}>Oferta válida enquanto durar o estoque do lote atual</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.2rem", margin: "2rem 0" }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "1.8rem", boxShadow: "0 2px 12px rgba(0,0,0,.06)", textAlign: "center" as const }}>
              <h3 style={{ fontSize: ".85rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: ".05em", color: "#555", marginBottom: ".5rem" }}>ZM-GROW</h3>
              <p style={{ fontSize: "1rem", color: "#555" }}>Galão 10L</p>
              <p style={{ fontSize: ".8rem", color: "#555", marginTop: ".5rem" }}>Biofertilizante líquido Zn+Mn+S</p>
              <p style={{ fontSize: ".82rem", color: "#1B5E20", fontWeight: 600, marginTop: ".5rem" }}>Acima de 5 galões: frete grátis + 10% desconto</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: "1.8rem", boxShadow: "0 2px 12px rgba(0,0,0,.06)", border: "3px solid #1B5E20", position: "relative", textAlign: "center" as const }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#1B5E20", color: "#fff", fontSize: ".65rem", fontWeight: 700, padding: ".3rem .8rem", borderRadius: 8, letterSpacing: ".08em" }}>MAIS VENDIDO</div>
              <h3 style={{ fontSize: ".85rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: ".05em", color: "#555", marginBottom: ".5rem" }}>Combo ZM + SC5</h3>
              <p style={{ fontSize: "1rem", color: "#555" }}>ZM-GROW 10L + SC5 bags 1L ou 5L</p>
              <p style={{ fontSize: ".8rem", color: "#555", marginTop: ".5rem" }}>Nutrição completa: aérea + radicular + biocontrole</p>
              <p style={{ fontSize: ".82rem", color: "#1B5E20", fontWeight: 600, marginTop: ".5rem" }}>15% de desconto no pacote + consultoria agronômica grátis</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="zg-formulario" style={{ background: "#0A3A12", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" as const }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#fff", marginBottom: ".5rem" }}>Receba sua proposta personalizada</h2>
          <p style={{ color: "rgba(255,255,255,.7)", marginBottom: "2rem" }}>Preencha seus dados que nosso consultor te retorna em até 30 minutos</p>

          <form onSubmit={enviarForm} style={{ background: "#fff", borderRadius: 20, padding: "2.5rem", textAlign: "left" as const, boxShadow: "0 8px 40px rgba(0,0,0,.3)" }}>
            <div>
              <label htmlFor="zg-nome" style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#555", marginBottom: ".3rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Seu nome</label>
              <input id="zg-nome" type="text" placeholder="Ex: José da Silva" required value={formData.nome} onChange={e => setFormData(p => ({ ...p, nome: e.target.value }))} style={{ width: "100%", padding: ".8rem 1rem", border: "2px solid #e0e0e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", marginBottom: "1rem" }} />
            </div>
            <div>
              <label htmlFor="zg-whatsapp" style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#555", marginBottom: ".3rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>WhatsApp</label>
              <input id="zg-whatsapp" type="tel" placeholder="(XX) XXXXX-XXXX" required value={formData.whatsapp} onChange={e => setFormData(p => ({ ...p, whatsapp: e.target.value }))} style={{ width: "100%", padding: ".8rem 1rem", border: "2px solid #e0e0e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", marginBottom: "1rem" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label htmlFor="zg-cultura" style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#555", marginBottom: ".3rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Cultura principal</label>
                <select id="zg-cultura" value={formData.cultura} onChange={e => setFormData(p => ({ ...p, cultura: e.target.value }))} style={{ width: "100%", padding: ".8rem 1rem", border: "2px solid #e0e0e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", marginBottom: "1rem" }}>
                  <option value="">Selecione...</option>
                  {["Soja", "Milho", "Trigo", "Café", "Feijão", "Arroz", "Pastagem", "Algodão", "Cana", "Fruticultura", "Outra"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="zg-hectares" style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#555", marginBottom: ".3rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Hectares</label>
                <input id="zg-hectares" type="text" placeholder="Ex: 500" value={formData.hectares} onChange={e => setFormData(p => ({ ...p, hectares: e.target.value }))} style={{ width: "100%", padding: ".8rem 1rem", border: "2px solid #e0e0e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", marginBottom: "1rem" }} />
              </div>
            </div>

            <label htmlFor="zg-interesse" style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#555", marginBottom: ".3rem", textTransform: "uppercase" as const, letterSpacing: ".05em" }}>Interesse</label>
            <select id="zg-interesse" value={formData.interesse} onChange={e => setFormData(p => ({ ...p, interesse: e.target.value }))} style={{ width: "100%", padding: ".8rem 1rem", border: "2px solid #e0e0e0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", marginBottom: "1rem" }}>
              <option value="zmgrow">ZM-GROW (biofertilizante)</option>
              <option value="sc5">SC5 (condicionador de solo)</option>
              <option value="combo">COMBO ZM + SC5 (mais vendido)</option>
              <option value="consultoria">Só quero falar com agrônomo</option>
            </select>

            <button type="submit" style={{ width: "100%", padding: "1rem", border: "none", borderRadius: 60, background: "#25D366", color: "#fff", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", marginTop: ".5rem" }}>
              <WhatsAppIcon size={20} />
              ENVIAR E FALAR NO WHATSAPP
            </button>

            <div style={{ textAlign: "center" as const, color: "#555", fontSize: ".85rem", margin: "1rem 0" }}>ou se preferir, vá direto:</div>

            <a href={waLink("Olá! Vim pelo site e quero saber mais sobre o ZM-GROW")} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", width: "100%", padding: ".8rem", border: "2px solid #25D366", borderRadius: 60, color: "#25D366", fontWeight: 700, textDecoration: "none" }}>
              <WhatsAppIcon size={18} />
              Chamar direto no WhatsApp
            </a>
          </form>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ background: "#fff", padding: "3rem 1.5rem", textAlign: "center" as const }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" as const }}>
          {["Registro MAPA", "Validado em campo", "Compatível com todas as culturas", "Frete grátis acima de 5 galões"].map((t) => (
            <div key={t} style={{ fontSize: ".85rem", color: "#555", display: "flex", alignItems: "center", gap: ".4rem" }}>
              <span style={{ color: "#1B5E20" }}><CheckIcon /></span>{t}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a1a", color: "rgba(255,255,255,.5)", padding: "2rem 1.5rem", textAlign: "center" as const, fontSize: ".8rem" }}>
        <p>AMD Agro — amdagro.com.br</p>
        <p style={{ marginTop: ".5rem" }}>Agricultura Sustentável ao Alcance de Todos</p>
      </footer>

      {/* FLOAT WHATSAPP */}
      <a href={waLink("Olá! Quero saber mais sobre o ZM-GROW")} target="_blank" rel="noreferrer" title="Falar no WhatsApp" style={{
        position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100,
        background: "#25D366", color: "#fff", width: 60, height: 60, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,.4)", textDecoration: "none",
        animation: "pulse 2s infinite"
      }}>
        <WhatsAppIcon size={30} />
      </a>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)} 50%{box-shadow:0 4px 30px rgba(37,211,102,.7)} }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

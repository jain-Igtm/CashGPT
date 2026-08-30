const categories = [
  {
    name: "Rebalancing",
    description: "Agents that monitor and reset liquidity positions as market conditions move.",
  },
  {
    name: "Grid Trading",
    description: "Agents that place and manage rule-bound grid orders on BSC markets.",
  },
  {
    name: "Yield Optimisation",
    description: "Agents that compare opportunities and route liquidity toward available yield.",
  },
  {
    name: "Health Factor Monitoring",
    description: "Agents that watch lending positions and act within defined limits to reduce liquidation risk.",
  },
];

export default function ExchangePage() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px 24px", maxWidth: 1180, margin: "0 auto" }}>
      <p className="section-kicker">CashGPT Agent Exchange · BNB Smart Chain</p>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 400, margin: "14px 0 12px" }}>
        Find the right agent for the money move.
      </h1>
      <p style={{ color: "#aeb5c0", maxWidth: 760, lineHeight: 1.7, fontSize: 16 }}>
        A transparent discovery layer for live BSC agents. Compare capabilities and evidence before activation. Performance claims are never invented; unavailable data stays unavailable.
      </p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14, marginTop: 42 }}>
        {categories.map((category) => (
          <article key={category.name} style={{ border: "1px solid rgba(219,204,175,.18)", background: "rgba(13,18,27,.84)", padding: 22, minHeight: 190 }}>
            <p className="section-kicker">Agent category</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 25, margin: "10px 0" }}>{category.name}</h2>
            <p style={{ color: "#8993a3", lineHeight: 1.65, fontSize: 13 }}>{category.description}</p>
            <p style={{ marginTop: 22, color: "#d4ae6d", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
              Live agent feed wiring next
            </p>
          </article>
        ))}
      </section>

      <section style={{ marginTop: 34, borderTop: "1px solid rgba(219,204,175,.13)", paddingTop: 22, color: "#8993a3", fontSize: 12, lineHeight: 1.7 }}>
        <strong style={{ color: "#f0ede6" }}>Evidence-first marketplace.</strong> Agent identity, activity, reputation, pricing and activation data will be sourced from verifiable BSC infrastructure. This page is under active build for the 2026 Build the Era hackathon.
      </section>
    </main>
  );
}

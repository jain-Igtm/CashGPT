const categories = [
  ["Rebalancing", "Monitor and reset liquidity positions as market conditions move."],
  ["Grid Trading", "Place and manage rule-bound grid orders on BSC markets."],
  ["Yield Optimisation", "Compare opportunities and route liquidity toward available yield."],
  ["Health Factor Monitoring", "Watch lending positions and reduce liquidation risk within defined limits."],
] as const;

const evidence = [
  { name: "BNB Agent SDK", role: "Agent runtime / BSC integration", href: "https://github.com/bnb-chain/bnbagent-sdk" },
  { name: "ERC-8004", role: "Portable on-chain agent identity and reputation", href: "https://eips.ethereum.org/EIPS/eip-8004" },
  { name: "CashGPT execution trail", role: "Public build, tests and agent coordination", href: "https://github.com/jain-Igtm/CashGPT" },
];

export default function ExchangePage() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px 24px", maxWidth: 1180, margin: "0 auto" }}>
      <p className="section-kicker">CashGPT Agent Exchange · BNB Smart Chain</p>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 400, margin: "14px 0 12px" }}>
        Find the right agent for the money move.
      </h1>
      <p style={{ color: "#aeb5c0", maxWidth: 760, lineHeight: 1.7, fontSize: 16 }}>
        An evidence-first discovery layer for BSC agents. Compare identity, capability and verifiable activity before activation. CashGPT never invents performance numbers.
      </p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14, marginTop: 42 }}>
        {categories.map(([name, description]) => (
          <article key={name} style={{ border: "1px solid rgba(219,204,175,.18)", background: "rgba(13,18,27,.84)", padding: 22, minHeight: 190 }}>
            <p className="section-kicker">Agent category</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 25, margin: "10px 0" }}>{name}</h2>
            <p style={{ color: "#8993a3", lineHeight: 1.65, fontSize: 13 }}>{description}</p>
            <div style={{ marginTop: 22, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ border: "1px solid rgba(219,204,175,.18)", padding: "5px 8px", fontSize: 10 }}>BSC</span>
              <span style={{ border: "1px solid rgba(219,204,175,.18)", padding: "5px 8px", fontSize: 10 }}>Evidence required</span>
              <span style={{ border: "1px solid rgba(219,204,175,.18)", padding: "5px 8px", fontSize: 10 }}>Activation pending</span>
            </div>
          </article>
        ))}
      </section>

      <section style={{ marginTop: 46 }}>
        <p className="section-kicker">Verification stack</p>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 400 }}>Trust the evidence, not the pitch.</h2>
        <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
          {evidence.map((item) => (
            <a key={item.name} href={item.href} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", border: "1px solid rgba(219,204,175,.13)", padding: 16, display: "flex", justifyContent: "space-between", gap: 20 }}>
              <strong style={{ color: "#f0ede6" }}>{item.name}</strong>
              <span style={{ color: "#8993a3", textAlign: "right" }}>{item.role}</span>
            </a>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 34, borderTop: "1px solid rgba(219,204,175,.13)", paddingTop: 22, color: "#8993a3", fontSize: 12, lineHeight: 1.7 }}>
        <strong style={{ color: "#f0ede6" }}>Build status:</strong> marketplace shell live; outbound GitHub Actions execution verified; live BSC agent ingestion and activation are the next engineering gates. This is a build-in-progress for the 2026 Build the Era hackathon, not a claim of prize eligibility or financial performance.
      </section>
    </main>
  );
}

export const metadata = {
  title: "Missed Revenue Recovery Audit | CashGPT",
  description: "A conservative scenario calculator for missed plumbing and HVAC leads.",
};

export default function AuditPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ letterSpacing: ".16em", textTransform: "uppercase", fontSize: 11, opacity: .65 }}>CashGPT · Plumbing/HVAC</p>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px,6vw,64px)", fontWeight: 400, marginBottom: 12 }}>Missed Revenue Recovery Audit</h1>
      <p style={{ maxWidth: 700, lineHeight: 1.7, opacity: .8 }}>You may not need more leads. You may need to stop losing the ones you already paid for. This calculator estimates the economics of unanswered or slow-response inquiries using your own assumptions. It does not promise recovered revenue.</p>
      <AuditCalculator />
      <section style={{ marginTop: 42, borderTop: "1px solid rgba(255,255,255,.14)", paddingTop: 26, maxWidth: 700 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>The $149 audit</h2>
        <p style={{ lineHeight: 1.7, opacity: .8 }}>We map your current call and web-lead follow-up, quantify a conservative recovery scenario, and give you the exact workflow we would change. If the numbers do not justify changing anything, we say so. If implementation is justified and purchased, the $149 audit fee is credited toward it.</p>
        <p style={{ lineHeight: 1.7, opacity: .8 }}>Implementation is only recommended when the conservative 90-day recovered gross-profit scenario supports at least a 5× gross-profit-to-fee ratio.</p>
      </section>
    </main>
  );
}

function AuditCalculator() {
  return (
    <form action="" style={{ marginTop: 34, maxWidth: 700, padding: 24, border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.025)" }}>
      <p style={{ marginTop: 0, opacity: .7 }}>Interactive calculator is available in the repository asset <code>offers/audit-calculator.html</code>. The client-facing audit uses these six inputs:</p>
      <ol style={{ lineHeight: 2, opacity: .85 }}>
        <li>Monthly inbound calls/leads</li><li>Unanswered or slow-response rate</li><li>Average booked-job revenue</li><li>Gross margin</li><li>Booking rate for handled qualified leads</li><li>Conservative recoverable fraction</li>
      </ol>
      <p style={{ marginBottom: 0, fontSize: 13, opacity: .6 }}>Outputs: missed opportunities, estimated recovered bookings, recovered revenue, recovered gross profit, 90-day gross profit, and the maximum implementation fee consistent with the 5× decision rule.</p>
    </form>
  );
}

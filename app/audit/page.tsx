"use client";

import { useMemo, useState } from "react";

const money = (value: number) => value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function AuditPage() {
  const [inbound, setInbound] = useState(200);
  const [missed, setMissed] = useState(20);
  const [job, setJob] = useState(500);
  const [margin, setMargin] = useState(40);
  const [booking, setBooking] = useState(50);
  const [recover, setRecover] = useState(25);
  const result = useMemo(() => {
    const unanswered = inbound * missed / 100;
    const recoveredBookings = unanswered * recover / 100 * booking / 100;
    const revenue = recoveredBookings * job;
    const grossProfit = revenue * margin / 100;
    const gp90 = grossProfit * 3;
    return { unanswered, recoveredBookings, revenue, grossProfit, gp90, ceiling: gp90 / 5 };
  }, [inbound, missed, job, margin, booking, recover]);
  const field = (label: string, value: number, set: (n: number) => void) => <label style={{ display: "grid", gap: 7, fontSize: 13, opacity: .9 }}>{label}<input type="number" value={value} onChange={e => set(Number(e.target.value) || 0)} style={{ padding: 11, background: "#090d14", color: "#f0ede6", border: "1px solid rgba(219,204,175,.2)", font: "inherit" }} /></label>;
  return <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
    <p style={{ letterSpacing: ".16em", textTransform: "uppercase", fontSize: 11, opacity: .65 }}>CashGPT · Plumbing/HVAC</p>
    <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px,6vw,64px)", fontWeight: 400, marginBottom: 12 }}>Missed Revenue Recovery Audit</h1>
    <p style={{ maxWidth: 700, lineHeight: 1.7, opacity: .8 }}>You may not need more leads. You may need to stop losing the ones you already paid for. Enter your own assumptions below. This is a scenario estimate, not a promise of recovered revenue.</p>
    <section style={{ marginTop: 30, maxWidth: 700, padding: 24, border: "1px solid rgba(219,204,175,.16)", background: "rgba(255,255,255,.025)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
        {field("Monthly inbound calls/leads", inbound, setInbound)}{field("Unanswered / slow-response rate (%)", missed, setMissed)}{field("Average booked-job revenue ($)", job, setJob)}{field("Gross margin (%)", margin, setMargin)}{field("Booking rate for handled leads (%)", booking, setBooking)}{field("Conservative recoverable fraction (%)", recover, setRecover)}
      </div>
      <div style={{ marginTop: 24, padding: 20, border: "1px solid rgba(219,204,175,.14)", lineHeight: 1.9 }}>
        <strong>Conservative scenario</strong><br />
        Unanswered/slow leads per month: {result.unanswered.toFixed(1)}<br />
        Estimated recovered bookings/month: {result.recoveredBookings.toFixed(1)}<br />
        Estimated recovered revenue/month: {money(result.revenue)}<br />
        Estimated recovered gross profit/month: {money(result.grossProfit)}<br />
        90-day recovered gross profit: {money(result.gp90)}<br />
        <strong>5×-ROI implementation fee ceiling: {money(result.ceiling)}</strong>
      </div>
    </section>
    <section style={{ marginTop: 42, borderTop: "1px solid rgba(219,204,175,.14)", paddingTop: 26, maxWidth: 700 }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>The $149 audit</h2>
      <p style={{ lineHeight: 1.7, opacity: .8 }}>We map your current call and web-lead follow-up, quantify a conservative recovery scenario, and give you the exact workflow we would change. If the numbers do not justify changing anything, we say so. If implementation is justified and purchased, the $149 audit fee is credited toward it.</p>
      <p style={{ lineHeight: 1.7, opacity: .8 }}>Implementation is recommended only when the conservative 90-day recovered gross-profit scenario supports at least a 5× gross-profit-to-fee ratio.</p>
    </section>
  </main>;
}

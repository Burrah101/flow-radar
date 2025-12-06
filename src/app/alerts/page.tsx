import React from "react";

export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Flow Radar Alerts (Preview)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Concept preview for live flow-based alerts Boost &amp; Ice can roll out as
            Pro features.
          </p>
        </header>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            Planned alert types
          </h2>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>
              <span className="font-semibold">Flow Spike Alerts:</span> sudden
              increase in volume or dominance on Solana or Base.
            </li>
            <li>
              <span className="font-semibold">Dominance Reversal:</span> when one
              chain flips the other within a short window.
            </li>
            <li>
              <span className="font-semibold">New Meme Flow:</span> fresh pairs
              attracting unusual volume relative to age.
            </li>
            <li>
              <span className="font-semibold">Calm / Risk-Off Alerts:</span> when flow
              dries up and it&apos;s better not to overtrade.
            </li>
          </ul>
        </section>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            Delivery channels
          </h2>
          <p className="text-slate-300">
            The idea is to deliver these alerts via a Telegram channel or bot, with
            optional gated access for Flow Radar Pro users. Think short, clear,
            timestamped updates tied directly to what you see on the main dashboard.
          </p>
        </section>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            Early supporter signal
          </h2>
          <p className="text-slate-300">
            If you like this direction, the strongest signal you can send is simple:
            use the dashboard, share it, and if you&apos;re able, send a small SOL tip
            from the main page. That keeps this an independent, trader-first tool.
          </p>
        </section>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            You are early
          </h2>
          <p className="text-slate-300">
            Flow Radar is still v1. Being here now means you&apos;re early to a new
            way of looking at the market: flow before FOMO. More chains, more signals
            and Pro features can all stack on top of this base.
          </p>
        </section>

        <footer className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
          Concept only. Live alerts will come later as the project grows.
        </footer>
      </div>
    </main>
  );
}

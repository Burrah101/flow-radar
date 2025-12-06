import React from "react";

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Flow Literacy 101
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            A simple guide to understanding liquidity flow, chain rotation, and how to
            use Flow Radar without getting wrecked.
          </p>
        </header>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            1. What is liquidity flow?
          </h2>
          <p className="text-slate-300">
            Liquidity flow is where fresh money is entering and leaving the market.
            On-chain, this shows up as volume and active pairs. When a chain has more
            flow, it usually has more opportunities — but also more risk.
          </p>
        </section>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            2. Why chain dominance matters
          </h2>
          <p className="text-slate-300">
            When Solana or Base is clearly dominant, most of the attention, memes and
            rotations will happen there. Flow Radar shows you that dominance so you
            don&apos;t waste time staring at the quiet side of the market.
          </p>
        </section>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            3. How to use Flow Radar in practice
          </h2>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Start every session by checking Today&apos;s Flow Summary.</li>
            <li>Focus your attention on the dominant chain.</li>
            <li>
              Scan the top pairs, then dig deeper on DexScreener or your favorite tools.
            </li>
            <li>Use Flow Radar for context, not blind entries.</li>
            <li>Always size your risk based on volatility and your own rules.</li>
          </ul>
        </section>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            4. What Flow Radar is NOT
          </h2>
          <p className="text-slate-300">
            Flow Radar doesn&apos;t tell you what to buy or sell. It shows you where the
            market&apos;s energy is. You still need discipline, risk management and
            your own strategy. Think of this as your map, not your autopilot.
          </p>
        </section>

        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            5. Next: live alerts &amp; deeper tools
          </h2>
          <p className="text-slate-300">
            The next step for Flow Radar is live alerts and more chains. If you find
            this useful, consider sending a small SOL tip from the main page. That
            keeps the lights on and tells us this kind of tool matters.
          </p>
        </section>

        <footer className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
          Built for education and context. Nothing here is financial advice.
        </footer>
      </div>
    </main>
  );
}

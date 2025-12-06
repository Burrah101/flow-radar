import Link from "next/link";

export default function LandingPage() {
  const siteUrl = "https://flow-radar-omega.vercel.app/";

  return (
    <main className="min-h-[calc(100vh-56px)]">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-[1.4fr,1.1fr] gap-8 items-center">
        {/* Hero text */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/5 px-3 py-1 text-[11px] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live multi-chain liquidity view · Solana · Base · Ethereum · BNB
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-50">
              Flow Before FOMO.
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-xl">
              Flow Radar is your cross-chain liquidity compass to see the
              market&apos;s next move — across Solana, Base, Ethereum and BNB,
              with Monad support coming as the ecosystem comes online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/radar"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-50 text-slate-900 text-sm font-semibold hover:bg-slate-200"
            >
              Launch Flow Radar
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-slate-600 bg-slate-900/60 text-xs text-slate-200 hover:bg-slate-800"
            >
              Learn Flow Literacy
            </Link>
            <Link
              href="/alerts"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-950/60 text-[11px] text-slate-300 hover:bg-slate-900/80"
            >
              Alerts (preview)
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 max-w-md pt-2">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Chain Coverage
              </div>
              <div>Solana · Base · Ethereum · BNB</div>
              <div className="text-[11px] text-slate-500">
                Monad added once reliable on-chain data is live.
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Built For
              </div>
              <div>Flow traders, memecoin hunters, rotation watchers.</div>
              <div className="text-[11px] text-slate-500">
                Experimental, educational. No financial advice.
              </div>
            </div>
          </div>
        </section>

        {/* Right side: radar preview card */}
        <section className="hidden md:block">
          <div className="card glow-blue">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Flow Radar · Preview
                </div>
                <div className="text-[11px] text-slate-500">
                  Snapshot-style view of your live dashboard.
                </div>
              </div>
              <div className="flex gap-1 text-[10px]">
                <span className="chain-tag sol-tag">SOL</span>
                <span className="chain-tag base-tag">BASE</span>
                <span className="chain-tag eth-tag">ETH</span>
                <span className="chain-tag bnb-tag">BNB</span>
              </div>
            </div>

            <div className="space-y-3 text-[11px]">
              <div className="flex justify-between">
                <div className="text-slate-400">Today&apos;s Flow</div>
                <div className="text-slate-300">Balanced to Slight Tilt</div>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full w-[56%] bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400" />
              </div>
              <div className="flex justify-between text-slate-400">
                <span>
                  Solana <span className="text-cyan-300 font-semibold">56%</span>
                </span>
                <span>
                  Base{" "}
                  <span className="text-emerald-300 font-semibold">44%</span>
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="text-slate-400">Rotation Path</div>
                <div className="text-slate-200 font-semibold">
                  Solana → Base → Ethereum → BNB
                </div>
                <div className="text-slate-500">
                  High attention on SOL, with secondary rotations emerging on
                  Base and ETH.
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="text-slate-400">Top Movers Across Chains</div>
                <ul className="space-y-1 text-slate-300">
                  <li>• $XYZ (Solana) · +184% · strong volume</li>
                  <li>• $ABC (Base) · +92% · rotation narrative</li>
                  <li>• $DEF (ETH) · +61% · late but active</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-900">
              <span>Preview only · Live data on the Radar page.</span>
              <Link
                href="/radar"
                className="text-cyan-300 hover:text-cyan-200 underline"
              >
                Open full Radar →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8 text-[11px] text-slate-500 border-t border-slate-900 pt-3">
        Flow Radar is an experimental, educational dashboard. Nothing here is
        financial advice. Always manage your own risk. · Made with ⚡ in Pattaya
        by Boost × Ice. · {siteUrl}
      </div>
    </main>
  );
}

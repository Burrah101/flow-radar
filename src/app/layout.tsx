import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flow Radar",
  description:
    "Flow Before FOMO. Your cross-chain liquidity compass to see the market's next move.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)] text-slate-50">
        {/* Top nav */}
        <div className="border-b border-slate-900/60 bg-slate-950/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--solana-cyan)] to-[var(--base-emerald)] flex items-center justify-center text-slate-950 font-black text-base glow-cyan">
                F
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-50">
                  Flow Radar
                </div>
                <div className="text-[11px] text-slate-400">
                  Flow Before FOMO.
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-3 text-xs">
              <Link
                href="/radar"
                className="px-2 py-1 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800"
              >
                Radar
              </Link>
              <Link
                href="/learn"
                className="px-2 py-1 rounded-full border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60"
              >
                Learn
              </Link>
              <Link
                href="/alerts"
                className="px-2 py-1 rounded-full border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60"
              >
                Alerts
              </Link>
              <button
                className="hidden md:inline-flex items-center px-3 py-1 rounded-full border border-slate-700 bg-slate-900/80 text-[11px] text-slate-300 cursor-not-allowed"
                title="Wallet connect coming soon"
              >
                Connect Wallet
              </button>
            </nav>
          </div>
        </div>

        <main>{children}</main>
      </body>
    </html>
  );
}

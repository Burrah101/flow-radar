import React from "react";

type PairRow = {
  pairAddress: string;
  baseSymbol: string;
  baseName: string;
  priceUsd: number;
  volume24h: number;
  change24h: number;
  chainId: "solana" | "base";
  url: string;
};

async function fetchPairs(chain: "solana" | "base"): Promise<PairRow[]> {
  const query = chain === "solana" ? "solana" : "base";

  const res = await fetch(
    `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(
      query
    )}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error("DexScreener fetch failed for", chain, await res.text());
    return [];
  }

  const json = await res.json();
  const pairs: any[] = json.pairs ?? [];

  const filtered = pairs.filter((p) => p.chainId === chain).slice(0, 20);

  return filtered.map((p) => ({
    pairAddress: p.pairAddress ?? "",
    baseSymbol: p.baseToken?.symbol ?? "",
    baseName: p.baseToken?.name ?? "",
    priceUsd: Number(p.priceUsd ?? 0),
    volume24h: Number(p.volume?.h24 ?? 0),
    change24h: Number(p.priceChange?.h24 ?? 0),
    chainId: chain,
    url: p.url ?? "",
  }));
}

function formatNumber(n: number) {
  if (!isFinite(n)) return "-";
  if (Math.abs(n) >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toFixed(2);
}

function calcDominance(solVolume: number, baseVolume: number) {
  const total = solVolume + baseVolume || 1;
  const solPct = (solVolume / total) * 100;
  const basePct = 100 - solPct;

  let headline = "";
  let detail = "";

  if (solPct > 60) {
    headline = "Solana Dominant";
    detail =
      "Liquidity is leaning hard into Solana. Expect faster meme rotations and sharper tops.";
  } else if (basePct > 60) {
    headline = "Base Dominant";
    detail =
      "Liquidity is crowding into Base. Watch early movers and chain-native memes.";
  } else if (solPct > 52) {
    headline = "Solana Tilting Up";
    detail =
      "Flow is slightly favoring Solana. Good time to scout fresh listings and midcaps.";
  } else if (basePct > 52) {
    headline = "Base Tilting Up";
    detail =
      "Flow is slightly favoring Base. Look for rotation plays and early narratives.";
  } else {
    headline = "Balanced Flow";
    detail =
      "No clear chain winner right now. Play carefully, don’t force entries.";
  }

  return {
    solPct,
    basePct,
    headline,
    detail,
  };
}

function FlowGauge({ solVolume, baseVolume }: { solVolume: number; baseVolume: number }) {
  const total = solVolume + baseVolume || 1;
  const solPct = (solVolume / total) * 100;
  const basePct = 100 - solPct;

  return (
    <div className="w-full bg-slate-800/60 rounded-2xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm uppercase tracking-wide text-slate-400">
          Liquidity Flow Meter
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Solana ${formatNumber(solVolume)}
          </span>
          <span className="flex items-center gap-1 text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Base ${formatNumber(baseVolume)}
          </span>
        </div>
      </div>
      <div className="h-4 w-full rounded-full bg-slate-900 overflow-hidden flex">
        <div
          className="h-full bg-cyan-400 transition-all"
          style={{ width: `${solPct}%` }}
        />
        <div
          className="h-full bg-emerald-400 transition-all"
          style={{ width: `${basePct}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-slate-400">
        {solPct > 55
          ? "Flow leaning into Solana."
          : basePct > 55
          ? "Flow leaning into Base."
          : "Flow is balanced between Solana and Base."}
      </div>
    </div>
  );
}

function PairTable({ title, pairs }: { title: string; pairs: PairRow[] }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex-1">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        <span className="text-xs text-slate-500">
          Top {pairs.length} · live from DexScreener
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-1 pr-2">#</th>
              <th className="text-left py-1 pr-2">Token</th>
              <th className="text-right py-1 pr-2">Price</th>
              <th className="text-right py-1 pr-2">24h Vol</th>
              <th className="text-right py-1 pl-2">24h %</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((p, i) => (
              <tr key={p.pairAddress || i} className="border-t border-slate-800">
                <td className="py-1 pr-2 text-slate-500">{i + 1}</td>
                <td className="py-1 pr-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col hover:underline"
                  >
                    <span className="text-slate-100 font-medium">
                      {p.baseSymbol || "—"}
                    </span>
                    <span className="text-slate-500 truncate max-w-[130px]">
                      {p.baseName ||
                        p.pairAddress.slice(0, 6) +
                          "..." +
                          p.pairAddress.slice(-4)}
                    </span>
                  </a>
                </td>
                <td className="py-1 pr-2 text-right text-slate-100">
                  ${formatNumber(p.priceUsd)}
                </td>
                <td className="py-1 pr-2 text-right text-slate-100">
                  ${formatNumber(p.volume24h)}
                </td>
                <td
                  className={
                    "py-1 pl-2 text-right font-semibold " +
                    (p.change24h > 0
                      ? "text-emerald-400"
                      : p.change24h < 0
                      ? "text-rose-400"
                      : "text-slate-300")
                  }
                >
                  {p.change24h > 0 ? "+" : ""}
                  {p.change24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function Page() {
  const [solPairs, basePairs] = await Promise.all([
    fetchPairs("solana"),
    fetchPairs("base"),
  ]);

  const solVolume = solPairs.reduce((sum, p) => sum + (p.volume24h || 0), 0);
  const baseVolume = basePairs.reduce((sum, p) => sum + (p.volume24h || 0), 0);

  const { solPct, basePct, headline, detail } = calcDominance(
    solVolume,
    baseVolume
  );

  const siteUrl = "https://flow-radar-omega.vercel.app/";
  const tweetText = encodeURIComponent(
    `Checking cross-chain liquidity with Flow Radar by Boost & Ice.\nSolana: ${solPct.toFixed(
      1
    )}% · Base: ${basePct.toFixed(1)}%.`
  );
  const telegramText = encodeURIComponent(
    `Flow Radar snapshot\nSolana: ${solPct.toFixed(
      1
    )}% · Base: ${basePct.toFixed(1)}%.\n`
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-lg">
              F
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Flow Radar
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                The market compass for the chain-rotation era. Follow the flow,
                not the FOMO.
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            Built by <span className="font-semibold text-slate-200">Boost</span>{" "}
            × <span className="font-semibold text-slate-200">Ice</span>
            <br />
            {new Date().toLocaleDateString()}
          </div>
        </header>

        {/* Flow summary */}
        <section className="grid md:grid-cols-[2fr,1.4fr] gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Today&apos;s Flow Summary
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-slate-50">
                  {headline}
                </div>
                <p className="text-xs text-slate-400 mt-1">{detail}</p>
              </div>
              <div className="flex gap-4 text-xs">
                <div>
                  <div className="text-slate-400">Solana</div>
                  <div className="text-cyan-300 font-semibold">
                    {solPct.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Base</div>
                  <div className="text-emerald-300 font-semibold">
                    {basePct.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share + support */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Share this snapshot
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(
                    siteUrl
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600"
                >
                  Post to X
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    siteUrl
                  )}&text=${telegramText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600"
                >
                  Share on Telegram
                </a>
                <a
                  href={siteUrl}
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600"
                >
                  Copy link (Ctrl + L, Ctrl + C)
                </a>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-2 text-xs">
              <div className="text-slate-400 mb-1">
                Support Flow Radar (SOL tips):
              </div>
              <div className="font-mono text-[11px] text-slate-300 break-all">
                AE9FjC3eQFMJG4DYd59xbA9kqaMd5mRA35aCn1h4FLrD
              </div>
              <div className="mt-1 flex flex-wrap gap-2">
                <a
                  href={`solana:AE9FjC3eQFMJG4DYd59xbA9kqaMd5mRA35aCn1h4FLrD?amount=0.1`}
                  className="px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs"
                >
                  Send 0.1 SOL tip
                </a>
              </div>
            </div>
          </div>
        </section>

        <FlowGauge solVolume={solVolume} baseVolume={baseVolume} />

        <section className="flex flex-col md:flex-row gap-4">
          <PairTable title="Solana · Active Pairs" pairs={solPairs} />
          <PairTable title="Base · Active Pairs" pairs={basePairs} />
        </section>

        {/* Boost's Flow Notes */}
        <section className="grid md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Boost&apos;s Flow Playbook
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-300">
              <li>Check chain dominance: who has the flow today — Solana or Base?</li>
              <li>
                If one chain is clearly winning (&gt;60%), focus attention there. Don&apos;t
                force trades on the weak side.
              </li>
              <li>
                Scan top pairs for volume + % moves. Early movers &gt; late chasers.
              </li>
              <li>
                Avoid entering when dominance is already extreme and volume is fading.
              </li>
              <li>
                Remember: this dashboard is for map + context, not blind entries. Flow
                first, execution second.
              </li>
            </ol>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Learn &amp; Alerts
            </div>
            <p className="text-slate-300">
              New to flow-based trading? Start with{" "}
              <a
                href="/learn"
                className="text-cyan-300 hover:text-cyan-200 underline"
              >
                Flow Literacy 101
              </a>{" "}
              to understand how liquidity rotation affects your entries.
            </p>
            <p className="text-slate-300">
              Want real-time signal? Check{" "}
              <a
                href="/alerts"
                className="text-emerald-300 hover:text-emerald-200 underline"
              >
                Flow Radar Alerts (preview)
              </a>{" "}
              for how Pro mode will work.
            </p>
          </div>
        </section>

        <footer className="pt-4 border-t border-slate-900 text-[11px] text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            Flow Radar is an experimental, educational dashboard. Nothing here is
            financial advice. Always manage your own risk.
          </div>
          <div>
            Made with ⚡ in Pattaya by Boost × Ice.
          </div>
        </footer>
      </div>
    </main>
  );
}

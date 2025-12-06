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
        <div className="flex gap-3 text-xs">
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Flow Radar
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Live cross-chain heatmap for{" "}
              <span className="text-cyan-300 font-semibold">Solana</span> and{" "}
              <span className="text-emerald-300 font-semibold">Base</span>{" "}
              using DexScreener&apos;s public API.
            </p>
          </div>
          <span className="text-xs text-slate-500">
            Built by Boost & Ice · {new Date().toLocaleDateString()}
          </span>
        </header>

        <FlowGauge solVolume={solVolume} baseVolume={baseVolume} />

        <section className="flex flex-col md:flex-row gap-4">
          <PairTable title="Solana · Active Pairs" pairs={solPairs} />
          <PairTable title="Base · Active Pairs" pairs={basePairs} />
        </section>

        <footer className="pt-4 border-t border-slate-900 text-xs text-slate-500">
          Data from DexScreener public API. This is not trading advice.
        </footer>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useAssets } from "../hooks/useAssets";
import { useAssetStore } from "../store/useAssetStore";
import { SkeletonTable } from "@/components/ui/Skeleton";
import type { Asset } from "../types";

function formatPrice(value: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(parseFloat(value));
}

function formatMarketCap(value: string): string {
  const num = parseFloat(value);
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
}

function ChangePercent({ value }: { value: string }) {
  const num = parseFloat(value);
  const isPositive = num >= 0;
  return (
    <span
      className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}
    >
      {isPositive ? "+" : ""}
      {num.toFixed(2)}%
    </span>
  );
}

export function AssetsTable() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useAssets();
  const {
    search,
    setSearch,
    selectedAssetId,
    setSelectedAssetId,
    changeFilter,
    marketCapFilter
  } = useAssetStore();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !search &&
          changeFilter === "all" &&
          marketCapFilter === "all"
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    search,
    changeFilter,
    marketCapFilter
  ]);

  if (isError) throw error;

  const filtered = data?.assets.filter((asset) => {
    // Search filter
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(search.toLowerCase());

    // Change 24h filter
    const change = parseFloat(asset.changePercent24Hr);
    const matchesChange =
      changeFilter === "all" ||
      (changeFilter === "positive" && change >= 0) ||
      (changeFilter === "negative" && change < 0);

    // Market cap filter
    const marketCap = parseFloat(asset.marketCapUsd);
    const matchesMarketCap =
      marketCapFilter === "all" ||
      (marketCapFilter === "large" && marketCap >= 10_000_000_000) ||
      (marketCapFilter === "mid" &&
        marketCap >= 1_000_000_000 &&
        marketCap < 10_000_000_000) ||
      (marketCapFilter === "small" && marketCap < 1_000_000_000);

    return matchesSearch && matchesChange && matchesMarketCap;
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {isLoading ? (
          <div className="p-6">
            <SkeletonTable rows={20} />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  #
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-right font-medium text-gray-500">
                  Price
                </th>
                <th className="px-6 py-3 text-right font-medium text-gray-500">
                  24h %
                </th>
                <th className="px-6 py-3 text-right font-medium text-gray-500">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered?.map((asset: Asset) => (
                <tr
                  key={asset.id}
                  onClick={() =>
                    setSelectedAssetId(
                      selectedAssetId === asset.id ? null : asset.id
                    )
                  }
                  className={`transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    selectedAssetId === asset.id
                      ? "bg-blue-50 dark:bg-blue-950"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4 text-gray-400">{asset.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {asset.name}
                      </span>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {asset.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
                    {formatPrice(asset.priceUsd)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChangePercent value={asset.changePercent24Hr} />
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500">
                    {formatMarketCap(asset.marketCapUsd)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div ref={loaderRef} className="p-4">
          {isFetchingNextPage && <SkeletonTable rows={5} />}
        </div>
      </div>
    </div>
  );
}

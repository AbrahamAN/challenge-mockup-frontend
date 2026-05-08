"use client";

import { memo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAsset } from "@/features/assets/hooks/useAsset";
import { useAssetHistory } from "@/features/assets/hooks/useAssetsHistory";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  formatPriceFromString,
  formatPriceFromNumber,
  formatMarketCap,
  formatDate
} from "@/features/assets/utils/formatters";

const StatCard = memo(function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
});

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: assetData, isLoading: assetLoading } = useAsset(id);
  const { data: historyData, isLoading: historyLoading } = useAssetHistory(id);

  const asset = assetData?.data;

  const chartData = historyData?.data.map((point) => ({
    date: formatDate(point.date),
    price: parseFloat(point.priceUsd)
  }));

  const change = asset ? parseFloat(asset.changePercent24Hr) : 0;
  const isPositive = change >= 0;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            ← Back
          </button>
          {assetLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {asset?.name}
              </h1>
              <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                {asset?.symbol}
              </span>
              <span
                className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}
              >
                {isPositive ? "+" : ""}
                {change.toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        {/* Stat cards */}
        {assetLoading ? (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              label="Price"
              value={formatPriceFromString(asset?.priceUsd ?? "0")}
            />
            <StatCard
              label="Market Cap"
              value={formatMarketCap(asset?.marketCapUsd ?? "0")}
            />
            <StatCard
              label="Volume 24h"
              value={formatMarketCap(asset?.volumeUsd24Hr ?? "0")}
            />
            <StatCard label="Rank" value={`#${asset?.rank}`} />
          </div>
        )}

        {/* Chart */}
        <ErrorBoundary>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
              Price History (30d)
            </h2>
            {historyLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="priceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v.toLocaleString()}`}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value) => [
                      formatPriceFromNumber(value as number),
                      "Price"
                    ]}
                    contentStyle={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </main>
  );
}

"use client";

import { useAssetHistory } from "../hooks/useAssetsHistory";
import { useAssetStore } from "../store/useAssetStore";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { formatDate, formatPriceFromNumber } from "../utils/formatters";

export function AssetChart() {
  const { selectedAssetId } = useAssetStore();
  const { data, isLoading, isError } = useAssetHistory(selectedAssetId);

  if (!selectedAssetId) return null;

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-500 dark:border-red-900 dark:bg-red-950">
        Failed to load chart data
      </div>
    );
  }

  const chartData = data?.data.map((point) => ({
    date: formatDate(point.date),
    price: parseFloat(point.priceUsd)
  }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-4 md:mb-6 text-base md:text-lg font-semibold text-gray-900 dark:text-white">
        {selectedAssetId.charAt(0).toUpperCase() + selectedAssetId.slice(1)} —
        Price History (30d)
      </h2>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={256}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
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
              labelStyle={{ color: "#111827" }}
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
  );
}

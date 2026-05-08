"use client";

import { useAssetStore } from "../store/useAssetStore";

export function AssetFilters() {
  const { changeFilter, setChangeFilter, marketCapFilter, setMarketCapFilter } =
    useAssetStore();

  return (
    <div className="flex flex-wrap gap-4">
      {/* Change 24h filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          24h Change:
        </span>
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {(["all", "positive", "negative"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setChangeFilter(option)}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm transition-colors ${
                changeFilter === option
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {option === "all"
                ? "All"
                : option === "positive"
                  ? "↑ Positive"
                  : "↓ Negative"}
            </button>
          ))}
        </div>
      </div>

      {/* Market Cap filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Market Cap:
        </span>
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {(["all", "large", "mid", "small"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setMarketCapFilter(option)}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm transition-colors ${
                marketCapFilter === option
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {option === "all"
                ? "All"
                : option === "large"
                  ? "Large +$10B"
                  : option === "mid"
                    ? "Mid $1B-$10B"
                    : "Small -$1B"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

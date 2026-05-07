import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { AssetsTable } from "@/features/assets/components/AssetsTable";
import { AssetChart } from "@/features/assets/components/AssetChart";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Crypto Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Real-time cryptocurrency market data
          </p>
        </div>
        <ErrorBoundary>
          <div className="space-y-6">
            <AssetChart />
            <AssetsTable />
          </div>
        </ErrorBoundary>
      </div>
    </main>
  );
}

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AssetsTable } from "@/features/assets/components/AssetsTable";
import { useAssetStore } from "@/features/assets/store/useAssetStore";
import type { Asset } from "@/features/assets/types";

const mockAssets: Asset[] = [
  {
    id: "bitcoin",
    rank: "1",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "19000000",
    maxSupply: "21000000",
    marketCapUsd: "500000000000",
    volumeUsd24Hr: "20000000000",
    priceUsd: "26315.789",
    changePercent24Hr: "2.50",
    vwap24Hr: "26000",
    explorer: null,
    tokens: {}
  },
  {
    id: "ethereum",
    rank: "2",
    symbol: "ETH",
    name: "Ethereum",
    supply: "120000000",
    maxSupply: null,
    marketCapUsd: "200000000000",
    volumeUsd24Hr: "8000000000",
    priceUsd: "1666.666",
    changePercent24Hr: "-1.20",
    vwap24Hr: "1650",
    explorer: null,
    tokens: {}
  }
];

vi.mock("@/features/assets/hooks/useAssets", () => ({
  useAssets: () => ({
    data: { assets: mockAssets },
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    isFetchingNextPage: false
  })
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() })
}));

describe("AssetsTable", () => {
  beforeEach(() => {
    useAssetStore.setState({
      search: "",
      selectedAssetId: null,
      changeFilter: "all",
      marketCapFilter: "all"
    });
  });

  it("renders asset rows with name, symbol and 24h change", () => {
    render(<AssetsTable />);

    expect(screen.getByText("Bitcoin")).toBeDefined();
    expect(screen.getByText("BTC")).toBeDefined();
    expect(screen.getByText("+2.50%")).toBeDefined();

    expect(screen.getByText("Ethereum")).toBeDefined();
    expect(screen.getByText("ETH")).toBeDefined();
    expect(screen.getByText("-1.20%")).toBeDefined();
  });

  it("shows empty state when search matches no assets", async () => {
    useAssetStore.setState({ search: "zzznomatch" });
    render(<AssetsTable />);

    expect(screen.getByText("No assets found")).toBeDefined();
  });
});

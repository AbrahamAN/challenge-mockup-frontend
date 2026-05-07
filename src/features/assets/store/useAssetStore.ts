import { create } from "zustand";

type ChangeFilter = "all" | "positive" | "negative";
type MarketCapFilter = "all" | "large" | "mid" | "small";

interface AssetStore {
  search: string;
  selectedAssetId: string | null;
  changeFilter: ChangeFilter;
  marketCapFilter: MarketCapFilter;
  setSearch: (search: string) => void;
  setSelectedAssetId: (id: string | null) => void;
  setChangeFilter: (filter: ChangeFilter) => void;
  setMarketCapFilter: (filter: MarketCapFilter) => void;
}

export const useAssetStore = create<AssetStore>((set) => ({
  search: "",
  selectedAssetId: null,
  changeFilter: "all",
  marketCapFilter: "all",
  setSearch: (search) => set({ search }),
  setSelectedAssetId: (id) => set({ selectedAssetId: id }),
  setChangeFilter: (filter) => set({ changeFilter: filter }),
  setMarketCapFilter: (filter) => set({ marketCapFilter: filter })
}));

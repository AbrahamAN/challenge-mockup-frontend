import { create } from "zustand";

interface AssetStore {
  search: string;
  selectedAssetId: string | null;
  setSearch: (search: string) => void;
  setSelectedAssetId: (id: string | null) => void;
}

export const useAssetStore = create<AssetStore>((set) => ({
  search: "",
  selectedAssetId: null,
  setSearch: (search) => set({ search }),
  setSelectedAssetId: (id) => set({ selectedAssetId: id })
}));

import { describe, it, expect, beforeEach } from "vitest";
import { useAssetStore } from "@/features/assets/store/useAssetStore";

describe("useAssetStore", () => {
  beforeEach(() => {
    useAssetStore.setState({
      search: "",
      selectedAssetId: null,
      changeFilter: "all",
      marketCapFilter: "all"
    });
  });

  it("updates search correctly", () => {
    useAssetStore.getState().setSearch("bitcoin");
    expect(useAssetStore.getState().search).toBe("bitcoin");
  });

  it("updates selectedAssetId correctly", () => {
    useAssetStore.getState().setSelectedAssetId("bitcoin");
    expect(useAssetStore.getState().selectedAssetId).toBe("bitcoin");
  });

  it("deselects asset when same id is set to null", () => {
    useAssetStore.getState().setSelectedAssetId("bitcoin");
    useAssetStore.getState().setSelectedAssetId(null);
    expect(useAssetStore.getState().selectedAssetId).toBeNull();
  });

  it("updates changeFilter correctly", () => {
    useAssetStore.getState().setChangeFilter("positive");
    expect(useAssetStore.getState().changeFilter).toBe("positive");
  });

  it("updates marketCapFilter correctly", () => {
    useAssetStore.getState().setMarketCapFilter("large");
    expect(useAssetStore.getState().marketCapFilter).toBe("large");
  });
});

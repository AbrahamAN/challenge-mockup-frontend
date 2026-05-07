import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AssetFilters } from "@/features/assets/components/AssetFilters";
import { useAssetStore } from "@/features/assets/store/useAssetStore";

describe("AssetFilters", () => {
  beforeEach(() => {
    useAssetStore.setState({
      search: "",
      selectedAssetId: null,
      changeFilter: "all",
      marketCapFilter: "all"
    });
  });

  it("renders all filter buttons", () => {
    render(<AssetFilters />);

    expect(screen.getAllByText("All")).toHaveLength(2);
    expect(screen.getByText("↑ Positive")).toBeDefined();
    expect(screen.getByText("↓ Negative")).toBeDefined();
    expect(screen.getByText("Large +$10B")).toBeDefined();
    expect(screen.getByText("Mid $1B-$10B")).toBeDefined();
    expect(screen.getByText("Small -$1B")).toBeDefined();
  });

  it("updates changeFilter when clicking Positive", () => {
    render(<AssetFilters />);
    fireEvent.click(screen.getByText("↑ Positive"));
    expect(useAssetStore.getState().changeFilter).toBe("positive");
  });

  it("updates marketCapFilter when clicking Large", () => {
    render(<AssetFilters />);
    fireEvent.click(screen.getByText("Large +$10B"));
    expect(useAssetStore.getState().marketCapFilter).toBe("large");
  });
});

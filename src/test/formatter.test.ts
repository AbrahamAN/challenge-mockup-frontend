import { describe, it, expect } from "vitest";
import {
  formatPriceFromString,
  formatPriceFromNumber,
  formatMarketCap,
  formatDate
} from "@/features/assets/utils/formatters";

describe("formatPriceFromString", () => {
  it("formats a price string correctly", () => {
    expect(formatPriceFromString("81744.48")).toBe("$81,744.48");
  });

  it("formats a small price with more decimals", () => {
    expect(formatPriceFromString("0.000006380")).toBe("$0.000006");
  });
});

describe("formatPriceFromNumber", () => {
  it("formats a number price correctly", () => {
    expect(formatPriceFromNumber(2350.5)).toBe("$2,350.50");
  });
});

describe("formatMarketCap", () => {
  it("formats billions correctly", () => {
    expect(formatMarketCap("1636974740718")).toBe("$1636.97B");
  });

  it("formats millions correctly", () => {
    expect(formatMarketCap("500000000")).toBe("$500.00M");
  });

  it("formats small values correctly", () => {
    expect(formatMarketCap("50000")).toBe("$50000.00");
  });
});

describe("formatDate", () => {
  it("formats a date string correctly", () => {
    const date = new Date(2024, 0, 15); // Jan 15 2024 en hora local
    expect(formatDate(date.toISOString())).toBe("Jan 15");
  });
});

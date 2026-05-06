export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string | null;
  tokens: Record<string, string[]>;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
  date: string;
}

export interface AssetsResponse {
  data: Asset[];
  timestamp: number;
}

export interface AssetHistoryResponse {
  data: AssetHistory[];
  timestamp: number;
}

export interface AssetResponse {
  data: Asset;
  timestamp: number;
}

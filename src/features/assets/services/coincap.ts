import type {
  AssetsResponse,
  AssetResponse,
  AssetHistoryResponse
} from "../types";

const BASE_URL = "https://rest.coincap.io/v3";

export async function getAssets(
  limit = 20,
  offset = 0
): Promise<AssetsResponse> {
  const response = await fetch(
    `${BASE_URL}/assets?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch assets: ${response.status}`);
  }

  return response.json();
}

export async function getAsset(id: string): Promise<AssetResponse> {
  const response = await fetch(`${BASE_URL}/assets/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch asset ${id}: ${response.status}`);
  }

  return response.json();
}

export async function getAssetHistory(
  id: string
): Promise<AssetHistoryResponse> {
  const response = await fetch(`${BASE_URL}/assets/${id}/history?interval=d1`);

  if (!response.ok) {
    throw new Error(`Failed to fetch history for ${id}: ${response.status}`);
  }

  return response.json();
}

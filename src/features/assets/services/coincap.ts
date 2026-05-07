import { AssetHistoryResponse, AssetResponse, AssetsResponse } from "../types";

const BASE_URL = "https://rest.coincap.io/v3";
const API_KEY = process.env.NEXT_PUBLIC_COINCAP_API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`
};

export async function getAssets(
  limit = 20,
  offset = 0
): Promise<AssetsResponse> {
  const response = await fetch(
    `${BASE_URL}/assets?limit=${limit}&offset=${offset}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch assets: ${response.status}`);
  }

  return response.json();
}

export async function getAsset(id: string): Promise<AssetResponse> {
  const response = await fetch(`${BASE_URL}/assets/${id}`, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch asset ${id}: ${response.status}`);
  }

  return response.json();
}

export async function getAssetHistory(
  id: string
): Promise<AssetHistoryResponse> {
  const response = await fetch(`${BASE_URL}/assets/${id}/history?interval=d1`, {
    headers
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch history for ${id}: ${response.status}`);
  }

  return response.json();
}

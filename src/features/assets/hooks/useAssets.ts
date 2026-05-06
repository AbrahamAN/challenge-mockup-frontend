import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../services/coincap";

interface UseAssetsParams {
  page: number;
  limit?: number;
}

export function useAssets({ page, limit = 20 }: UseAssetsParams) {
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ["assets", page, limit],
    queryFn: () => getAssets(limit, offset),
    select: (data) => ({
      assets: data.data,
      timestamp: data.timestamp
    })
  });
}

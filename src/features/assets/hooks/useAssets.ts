import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { getAssets } from "../services/coincap";
import type { Asset, AssetsResponse } from "../types";

const LIMIT = 20;

interface AssetsQueryResult {
  assets: Asset[];
  timestamp: number;
}

export function useAssets() {
  return useInfiniteQuery<
    AssetsResponse,
    Error,
    AssetsQueryResult,
    ["assets"],
    number
  >({
    queryKey: ["assets"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getAssets(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: AssetsResponse,
      allPages: AssetsResponse[]
    ): number | undefined => {
      const nextOffset = allPages.length * LIMIT;
      return lastPage.data.length < LIMIT ? undefined : nextOffset;
    },
    refetchInterval: false,
    select: (data: InfiniteData<AssetsResponse>): AssetsQueryResult => ({
      assets: Array.from(
        new Map(
          data.pages
            .flatMap((page) => page.data)
            .map((asset) => [asset.id, asset])
        ).values()
      ),
      timestamp: data.pages[data.pages.length - 1].timestamp
    })
  });
}

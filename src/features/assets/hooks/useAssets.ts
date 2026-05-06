import { useInfiniteQuery } from "@tanstack/react-query";
import { getAssets } from "../services/coincap";

const LIMIT = 20;

export function useAssets() {
  return useInfiniteQuery({
    queryKey: ["assets"],
    queryFn: ({ pageParam = 0 }) => getAssets(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * LIMIT;
      return lastPage.data.length < LIMIT ? undefined : nextOffset;
    },
    select: (data) => ({
      assets: data.pages.flatMap((page) => page.data),
      timestamp: data.pages[data.pages.length - 1].timestamp
    })
  });
}

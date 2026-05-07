import { useQuery } from "@tanstack/react-query";
import { getAsset } from "../services/coincap";

export function useAsset(id: string) {
  return useQuery({
    queryKey: ["asset", id],
    queryFn: () => getAsset(id),
    staleTime: 1000 * 30
  });
}

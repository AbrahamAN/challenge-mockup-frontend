import { useQuery } from "@tanstack/react-query";
import { getAssetHistory } from "../services/coincap";

export function useAssetHistory(id: string | null) {
  return useQuery({
    queryKey: ["assetHistory", id],
    queryFn: () => getAssetHistory(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5 // 5 minutos — el histórico no cambia tan seguido
  });
}

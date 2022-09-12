import type { Treatment } from "../../../../../shared/types";
import { axiosInstance } from "../../../axiosInstance";
import { queryKeys } from "../../../react-query/constants";
import { useCustomToast } from "../../app/hooks/useCustomToast";
import { useQuery } from "react-query";

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  console.log(data);
  return data;
}

export function useTreatments(): Treatment[] {
  const toast = useCustomToast();

  const fallback = [];
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {
    refetchOnWindowFocus: false,
  });

  return data;
}

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Borrow } from "pikkukirjasto-types/types/borrow";
import useDeviceId from "@app/hooks/useDeviceId";

import fetchUserBorrows from "./cloudFunctions/fetchUserBorrows";
import borrowsQueryKeyFactory from "./queryKeyFactory";

/**
 * @description React hook for fetching all borrows
 * @returns {UseQueryResult<Borrow[]>} React Query result object
 * @example const { data: borrows } = useBorrows();
 */
function useBorrows(): UseQueryResult<Borrow[]> {
  const { data: deviceId = "" } = useDeviceId();
  const books = useQuery({
    queryKey: [borrowsQueryKeyFactory.getBorrosByUser(deviceId)],
    queryFn: async () => fetchUserBorrows(deviceId),
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
    keepPreviousData: true,
  });

  return books;
}

export default useBorrows;

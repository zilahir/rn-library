import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Book } from "pikkukirjasto-types/types/book";

import bookQueryKeyFactory from "./queryKeyFactory"; // TODO: change this import
import { fetchAllBooks } from "./cloudFunctions"; // TODO: change this import

/**
 * @description React hook for fetching all books
 * @returns {UseQueryResult<Book[]>} React Query result object
 */
function useBooks(): UseQueryResult<Book[]> {
  const books = useQuery({
    queryKey: bookQueryKeyFactory.all,
    queryFn: fetchAllBooks,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
    keepPreviousData: true,
  });

  return books;
}

export default useBooks;

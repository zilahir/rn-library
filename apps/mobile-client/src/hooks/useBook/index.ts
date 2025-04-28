import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Book } from "pikkukirjasto-types/types/book";
import bookQueryKeyFactory from "@app/queries/book/queryKeyFactory";
import { Api } from "@app/api";
import { apiEndpoints } from "@app/api/apiEndpoints";

export const CATEGORIES: string[] = [
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Historical Fiction",
  "Biography",
  "Self-Help",
  "Cooking",
  "Travel",
];

interface IUseBook {
  isbn: string;
}

/**
 *
 * @param {string} isbn The ISBN of the book to be fetched
 * @returns {Promise} A Promise of type Book
 * @description Fetches a book by its ISBN
 */
async function fetchBookByIsbn(isbn: string): Promise<Book> {
  return Api<Book>({
    path: apiEndpoints.gegBookByIsb({ isbn }),
    method: "GET",
  });
}

/**
 *
 * @param {object} root0 An object containing the ISBN of the book to be fetched
 * @param {string} root0.isbn The ISBN of the book to be fetched
 * @returns {UseQueryResult} A React Query hook
 * @description A React Query hook to fetch a book by its ISBN
 */
function useBook({ isbn }: IUseBook): UseQueryResult<Book> {
  const query = useQuery({
    queryKey: bookQueryKeyFactory.getBookByIsbn(isbn),
    queryFn: async () => fetchBookByIsbn(isbn),
  });

  return query;
}

export default useBook;

import { Book } from "pikkukirjasto-types/types/book";
import { Api } from "@app/api";
import { apiEndpoints } from "@app/api/apiEndpoints";

/**
 * @description Fetches all books from the database
 * @returns {Promise<Book[]>} Promise containing all books
 * @throws {Error} Error object containing error message
 */
async function fetchAllBooks(): Promise<Book[]> {
  const response = await Api<Book[]>({
    method: "GET",
    path: apiEndpoints.getAllBooks,
  });

  return response;
}

export default fetchAllBooks;

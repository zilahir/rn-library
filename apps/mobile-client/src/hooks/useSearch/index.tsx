import { Book } from "pikkukirjasto-types/types/book";
import { uniqBy } from "lodash";
import useBooks from "@app/queries/book";

interface IUseSearch {
  handleSorting: (searchTerm: string) => Promise<Book[]>;
}

/**
 * @returns {IUseSearch} IUseSearch object containing the handleSorting function
 * @description Custom hook for handling search
 */
function useSearch(): IUseSearch {
  const { data: books = [] } = useBooks();

  /**
   *
   * @param {string} searchTerm - the search term
   * @returns {Promise<Book[]>} Promise containing the sorted books
   * @description Sorts the books by title and author
   */
  async function handleSorting(searchTerm: string): Promise<Book[]> {
    return Array.isArray(books) && books.length > 0 && searchTerm.length > 1
      ? new Promise((resolve) => {
          const filteredBooksByTitle = books.filter((book) =>
            book.title
              .replace(" ", "")
              .toLowerCase()
              .includes(searchTerm.replace(" ", "").toLowerCase())
          );

          const filteredBooksByAuthor = books.filter((book) =>
            book.author
              .replace(" ", "")
              .toLowerCase()
              .includes(searchTerm.replace(" ", "").toLowerCase())
          );
          resolve(
            uniqBy([...filteredBooksByAuthor, ...filteredBooksByTitle], "_id")
          );
        })
      : new Promise((resolve) => {
          resolve([]);
        });
  }

  return {
    handleSorting,
  };
}

export default useSearch;

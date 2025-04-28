import bookQueryKeyFactory from "@app/queries/book/queryKeyFactory";

describe("bookQueryKeyFactory", () => {
  it('returns the correct query key for "all"', () => {
    const result = bookQueryKeyFactory.all;
    expect(result).toEqual(["book"]);
  });

  it('returns the correct query key for "getBookById"', () => {
    const id = "123";
    const result = bookQueryKeyFactory.getBookById(id);
    expect(result).toEqual(["book", id]);
  });

  it('returns the correct query key for "getBookByIsbn"', () => {
    const isbn = "456";
    const result = bookQueryKeyFactory.getBookByIsbn(isbn);
    expect(result).toEqual(["book", isbn]);
  });
});

import { ReactTestRendererJSON } from "react-test-renderer";
import BookList from "@app/screens/HomeScreen/components/BookList";

import { render } from "./utils/wrapper";

const booksEmpty = [] as any[];

const books = [
  {
    title: "Hello World",
    _id: "5f5f5f5f5f5f5f5f5f5f5f5f",
    isbn: "978-1-56619-909-4",
    author: "John Doe",
    description: "This is a book",
    borrows: [],
    cover: "cover",
  },
];

describe("BookList", () => {
  it("renders correctly", () => {
    const bookList = render(
      <BookList books={booksEmpty} variant="horizontal" />
    ).toJSON() as ReactTestRendererJSON;

    expect(bookList).toBeDefined();
  });

  it("renders horizontal correctly", () => {
    const bookList = render(
      <BookList books={books} variant="horizontal" />
    ).toJSON() as ReactTestRendererJSON;

    expect(bookList).toBeDefined();
  });

  it("renders vertical correctly", () => {
    const bookList = render(
      <BookList books={books} variant="vertical" />
    ).toJSON() as ReactTestRendererJSON;

    expect(bookList).toBeDefined();
  });

  it("renders pagination correctly", () => {
    const { findByTestId } = render(
      <BookList hasPagination books={books} variant="vertical" />
    );

    const pagination = findByTestId("pagination");
    expect(pagination).toBeDefined();
  });
});

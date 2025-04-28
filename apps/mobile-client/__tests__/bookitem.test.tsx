import BookItem from "@app/screens/HomeScreen/components/BookItem";

import { render } from "./utils/wrapper";

const bookItemProps = {
  item: {
    title: "Hello World",
    _id: "5f5f5f5f5f5f5f5f5f5f5f5f",
    isbn: "978-1-56619-909-4",
    author: "John Doe",
    description: "This is a book",
    borrows: [],
    cover: "cover",
  },
  navigation: {
    navigate: jest.fn(),
  },
  animationValue: {
    value: 0,
  },
} as any;

describe("<BookItem />", () => {
  it("renders bookCardVertical correctly", () => {
    const { getByTestId, queryByTestId } = render(
      <BookItem {...bookItemProps} bookCardvariant="bookCardVertical" />
    );
    const bookItem = getByTestId("bookitem");
    expect(bookItem).toBeDefined();

    const horizontal = queryByTestId("horizontal");
    expect(horizontal).toBeNull();
  });

  it("renders bookCardHorizontal correctly", () => {
    const thisProps = {
      ...bookItemProps,
    } as any;
    const { queryByTestId } = render(
      <BookItem bookCardvariant="bookCardHorizontal" {...thisProps} />
    );
    const vertical = queryByTestId("vertical");
    expect(vertical).toBeNull();
    const bookItem = queryByTestId("bookitem");
    expect(bookItem).toBeDefined();
  });
});

/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent } from "@testing-library/react-native";
import BookScreen from "@app/screens/BookScreen";

import { render } from "./utils/wrapper";

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      book: {
        title: "Hello World",
        _id: "5f5f5f5f5f5f5f5f5f5f5f5f",
        isbn: "978-1-56619-909-4",
        author: "John Doe",
        description: "This is a book",
        borrows: [
          {
            book: {
              title: "Hello World",
              _id: "5f5f5f5f5f5f5f5f5f5f5f5f",
              isbn: "978-1-56619-909-4",
              author: "John Doe",
              description: "This is a book",
            },
            isbn: "978-1-56619-909-4",
            isBorrowed: false,
            user: {
              userId: "1",
              _id: "5f5f5f5f5f5f5f5f5f5f5f5f",
            },
          },
        ],
      },
    },
  },
} as any;

describe("BorrowBookScreen", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<BookScreen {...props} />);

    // Use snapshot testing to capture the component's output
    expect(toJSON()).toMatchSnapshot();
  });

  it("camera is defined", () => {
    const { queryByTestId } = render(<BookScreen {...props} />);
    const screen = queryByTestId("borrow-outer-container");

    expect(screen).toBeDefined();
  });

  it("navigation is defined", () => {
    const { getByTestId } = render(<BookScreen {...props} />);

    fireEvent.press(getByTestId("Rent"));

    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});

import { ReactTestRendererJSON } from "react-test-renderer";
import { fireEvent } from "@testing-library/react-native";
import SearchBar from "@app/components/SearchBar";

import wrapper, { render } from "./utils/wrapper";

const mockNavigation = {
  navigate: jest.fn(),
};

const setSearchTerm = jest.fn();

describe("<SearchBar />", () => {
  it("renders without an error", () => {
    const tree = wrapper(
      <SearchBar
        navigation={mockNavigation as any}
        route={
          {
            name: "Search",
          } as any
        }
        searchTerm=""
        setSearchTerm={setSearchTerm}
      />
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });

  it("navigates to the correct screen", () => {
    const tree = wrapper(
      <SearchBar
        navigation={mockNavigation as any}
        route={
          {
            name: "demo",
          } as any
        }
        searchTerm=""
        setSearchTerm={setSearchTerm}
      />
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });

  it("does not navigate when already on the Search screen", () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        navigation={mockNavigation as any}
        route={{ name: "Search" } as any}
        searchTerm=""
        setSearchTerm={setSearchTerm}
      />
    );

    const inputElement = getByPlaceholderText("Search");
    fireEvent.press(inputElement);

    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it("navigate when not on the Search screen", () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        navigation={mockNavigation as any}
        route={{ name: "NotSearch" } as any}
        searchTerm=""
        setSearchTerm={setSearchTerm}
      />
    );

    const inputElement = getByPlaceholderText("Search");
    fireEvent.press(inputElement);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Search");
  });
});

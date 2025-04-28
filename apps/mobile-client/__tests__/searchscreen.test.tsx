/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import SearchScreen from "@app/screens/SearchScreen";

import { render } from "./utils/wrapper";

const demoBooks = [
  {
    isbn: "demo isbn",
    author: "Terrell Stroman",
    title: "dedico adhuc tripudio",
    cover: "https://picsum.photos/seed/9YjBfGro/640/480",
  },
  {
    isbn: "demo isbn",
    author: "Eleanor Walter DDS",
    title: "statim aiunt defaeco",
    cover: "https://loremflickr.com/640/480?lock=1138305395589120",
  },
  {
    isbn: "demo isbn",
    author: "Thelma Mills",
    title: "terga vitae",
    cover: "https://loremflickr.com/640/480?lock=2883154006245376",
  },
  {
    isbn: "demo isbn",
    author: "Alberta Klein",
    title: "vulnus ratione",
    cover: "https://picsum.photos/seed/D5B0dZ5/640/480",
  },
  {
    isbn: "demo isbn",
    author: "Milton Ledner",
    title: "carus explicabo ustilo",
    cover: "https://picsum.photos/seed/22MXxVPpUr/640/480",
  },
  {
    isbn: "demo isbn",
    author: "Jon Marks",
    title: "accedo corporis",
    cover: "https://loremflickr.com/640/480?lock=4790681306398720",
  },
  {
    isbn: "demo isbn",
    author: "Saul Cruickshank-Ziemann",
    title: "accusator debilito",
    cover: "https://loremflickr.com/640/480?lock=4005968851501056",
  },
  {
    isbn: "demo isbn",
    author: "Abraham Hermann",
    title: "voluptatum vergo est",
    cover: "https://picsum.photos/seed/ZOBIznvngn/640/480",
  },
  {
    isbn: "demo isbn",
    author: "Drew Larson",
    title: "vilitas",
    cover: "https://picsum.photos/seed/cRcFs59PH/640/480",
  },
  {
    isbn: "demo isbn",
    author: "Mr. Harvey VonRueden",
    title: "stips amitto thalassinus",
    cover: "https://loremflickr.com/640/480?lock=2325913328943104",
  },
];

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  route: "",
  searchTerm: "",
  setSearchTerm: jest.fn(),
  book: {
    ...demoBooks[0],
  },
} as any;

describe("SearhScreen", () => {
  beforeAll(() => {
    jest.mock("@app/queries/book", () => ({
      useBooks: jest.fn(() => {
        return {
          data: [...demoBooks],
          isLoading: false,
        };
      }),
    }));
  });
  it("renders correctly", () => {
    const { toJSON } = render(
      <QueryClientProvider client={new QueryClient()}>
        <SearchScreen {...props} />
      </QueryClientProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("navigation is called", () => {
    jest.spyOn(React, "useState").mockReturnValueOnce([demoBooks, jest.fn()]);

    const { queryAllByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <SearchScreen {...props} />
      </QueryClientProvider>
    );
    fireEvent.press(queryAllByTestId("suggestion-item")[0]);
    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});

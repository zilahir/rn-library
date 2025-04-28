/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import BookMeta from "@app/screens/BookScreen/components/BookMeta";

import { render } from "./utils/wrapper";

describe("BookMeta", () => {
  it("renders with the provided props", () => {
    const props = {
      rate: "4.5",
      numOfPages: 300,
      language: "English",
      isAvaliable: true,
      overview: "This is a book about a book.",
    };

    const book = props;

    const { getByText } = render(<BookMeta {...book} />);

    expect(getByText("bookMeta.rate")).toBeDefined();
    expect(getByText("bookMeta.numOfPages")).toBeDefined();
    expect(getByText("bookMeta.language")).toBeDefined();
    expect(getByText("bookMeta.isAvaliable")).toBeDefined();
  });
});

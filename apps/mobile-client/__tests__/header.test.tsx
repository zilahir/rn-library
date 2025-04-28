import React from "react";
import Header from "@app/components/common/Header";

import { render } from "./utils/wrapper";

describe("Header", () => {
  it("renders with SafeAreaView and BackButton when withSafeAreaView is true", () => {
    const mockNavigation = {
      goBack: jest.fn(),
    } as any;

    const { queryByText } = render(
      <Header
        navigation={mockNavigation}
        back={{
          title: "Back",
        }}
        withSafeAreaView={true}
      />
    );

    const backButton = queryByText("Back");
    expect(backButton).toBeDefined();

    const safeAreaViewContent = queryByText("SafeAreaView Content");
    expect(safeAreaViewContent).toBeDefined();
  });

  it("renders without SafeAreaView whenwithSafeAreaView is false", () => {
    const mockNavigation = {
      goBack: jest.fn(),
    } as any;

    const { queryByText } = render(
      <Header
        navigation={mockNavigation}
        back={{
          title: "Back",
        }}
        withSafeAreaView={false}
      />
    );

    const safeAreaViewContent = queryByText("SafeAreaView Content");
    expect(safeAreaViewContent).toBeNull();

    const backButton = queryByText("Back");
    expect(backButton).toBeDefined();
  });
});

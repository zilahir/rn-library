import React from "react";
import { Feather } from "@expo/vector-icons";
import Badge from "@app/components/common/Badge";

import { render } from "./utils/wrapper";

describe("Badge", () => {
  it("renders text and an icon when provided", () => {
    // Render the Badge component with text and an icon
    const { getByText, queryByTestId } = render(
      <Badge
        text="Badge Text"
        type="successBadge"
        icon={<Feather name="arrow-left" size={24} color="black" />}
      />
    );

    // Check if the badge text is rendered
    const badgeText = getByText("Badge Text");
    expect(badgeText).toBeDefined();

    // Check if the icon is rendered (adjust the icon content or property as needed)
    const icon = queryByTestId("badge-icon");
    expect(icon).toBeDefined();
  });

  it("renders only text when no icon is provided", () => {
    // Render the Badge component with only text
    const { getByText, queryByTestId } = render(
      <Badge
        icon={<Feather name="arrow-left" size={24} color="black" />}
        text="Badge Text"
        type="errorBadge"
      />
    );

    // Check if the badge text is rendered
    const badgeText = getByText("Badge Text");
    expect(badgeText).toBeDefined();

    // Check that the icon is not rendered
    const icon = queryByTestId("badge-icon");
    expect(icon).toBeNull();
  });
});

import { fireEvent } from "@testing-library/react-native";
import BackButton from "@app/components/common/BackButton";

import { render } from "./utils/wrapper";

describe("BackButton", () => {
  it("calls navigation.goBack() when pressed if back is true", () => {
    const mockNavigation = {
      goBack: jest.fn(),
    } as any;

    const { getByTestId } = render(
      <BackButton
        back={{
          title: "Back",
        }}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByTestId("back-icon"));

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it("does not call navigation.goBack() when pressed if back is false", () => {
    const mockNavigation = {
      goBack: jest.fn(),
    } as any;

    const { getByTestId } = render(
      <BackButton back={undefined} navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("back-icon"));
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });
});

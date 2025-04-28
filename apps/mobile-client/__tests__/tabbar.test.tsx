import { ReactTestRendererJSON } from "react-test-renderer";
import { fireEvent } from "@testing-library/react-native";
import TabBar from "@app/components/TabBar";

import wrapper, { render } from "./utils/wrapper";

const mockedTabbarProps = {
  state: {
    index: 0,
    routeNames: ["Route 1", "Route 2", "Route 3", "Route 4"],
    routes: [
      { key: "route1", name: "Route 1" },
      { key: "route2", name: "Route 2" },
      { key: "route3", name: "Route 3" },
      { key: "route4", name: "Route 4" },
    ],
  } as any,
  navigation: jest.fn() as any,
  descriptors: {
    route1: { options: {} },
    route2: { options: {} },
    route3: { options: {} },
    route4: { options: {} },
  } as any,
  insets: {} as any,
};

describe("TabBar", () => {
  it("should expose a function", () => {
    expect(TabBar).toBeDefined();
  });
  it("should render without an error", () => {
    const tree = wrapper(
      <TabBar {...mockedTabbarProps} />
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });

  it("navigates to the selected route when a tab is pressed", () => {
    const mockNavigation = {
      navigate: jest.fn() as any,
      emit: jest.fn().mockReturnValue({
        defaultPrevented: false,
      }) as any,
    } as any;
    const props = {
      ...mockedTabbarProps,
      navigation: mockNavigation,
    };
    const { getByText } = render(<TabBar {...props} />);

    const event = { defaultPrevented: false }; // Mock the event object
    fireEvent.press(getByText("Route 2"), { event });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Route 2");
  });

  it("navigates to the selected route when a tab is pressed after split", () => {
    const mockNavigation = {
      navigate: jest.fn() as any,
      emit: jest.fn().mockReturnValue({
        defaultPrevented: false,
      }) as any,
    } as any;
    const props = {
      ...mockedTabbarProps,
      navigation: mockNavigation,
    };
    const { getByText } = render(<TabBar {...props} />);

    const event = { defaultPrevented: false }; // Mock the event object
    fireEvent.press(getByText("Route 4"), { event });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Route 4");
  });

  it("navigates to the borrowscreen when floating button pressed", () => {
    const mockNavigation = {
      navigate: jest.fn() as any,
      emit: jest.fn().mockReturnValue({
        defaultPrevented: false,
      }) as any,
    } as any;
    const props = {
      ...mockedTabbarProps,
      navigation: mockNavigation,
    };
    const { getByText } = render(<TabBar {...props} />);

    const event = { defaultPrevented: false }; // Mock the event object
    fireEvent.press(getByText("󰐳"), { event });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("BorrowBook");
  });
});

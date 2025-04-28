/* eslint-disable react/jsx-props-no-spreading */
// @ts-expect-error this is a mock
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent } from "@testing-library/react-native";
import HomeScreen from "@app/screens/HomeScreen";
import * as hooks from "@app/queries/book";

import { render } from "./utils/wrapper";

const demoBooks = [
  {
    isbn: "demo isbn",
    author: "Terrell Stroman",
    title: "dedico adhuc tripudio",
    cover: "https://picsum.photos/seed/9YjBfGro/640/480",
  },
];

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {},
  },
} as any;

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("react-native-device-info", () => mockRNDeviceInfo);

describe("HomeScreen", () => {
  it("renders correctly", () => {
    jest.spyOn(hooks, "default").mockImplementation((): any => ({
      data: [...demoBooks],
      isLoading: false,
      initialData: [...demoBooks],
    }));
    const { toJSON, getByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <HomeScreen {...props} />
      </QueryClientProvider>
    );
    expect(toJSON()).toMatchSnapshot();

    const toLibraryButton = getByTestId("library");

    expect(toLibraryButton).toBeDefined();

    fireEvent.press(toLibraryButton);
    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});

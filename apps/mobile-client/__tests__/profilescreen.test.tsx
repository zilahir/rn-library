// @ts-expect-error this is a mock
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileScreen from "@app/screens/ProfileScreen";
import * as hooks from "@app/queries/borrows";

import { render } from "./utils/wrapper";

const demoBooks = [
  {
    isbn: "demo isbn",
    author: "Terrell Stroman",
    title: "dedico adhuc tripudio",
    cover: "https://picsum.photos/seed/9YjBfGro/640/480",
  },
];

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("react-native-device-info", () => mockRNDeviceInfo);

describe("ProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("reenders correctly", () => {
    const { toJSON } = render(
      <QueryClientProvider client={new QueryClient()}>
        <ProfileScreen />
      </QueryClientProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should not present a loader", () => {
    const { queryByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <ProfileScreen />
      </QueryClientProvider>
    );

    const loader = queryByTestId("loader");
    expect(loader).toBeNull();
  });

  it("should present a loader", () => {
    jest.spyOn(hooks, "default").mockImplementation((): any => ({
      data: [...demoBooks],
      isLoading: true,
    }));

    const { getByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <ProfileScreen />
      </QueryClientProvider>
    );

    const loader = getByTestId("loader");
    expect(loader).toBeDefined();
  });

  it("booklist should be present", () => {
    jest.spyOn(hooks, "default").mockImplementation((): any => ({
      data: [...demoBooks],
      isLoading: false,
    }));

    const { getByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <ProfileScreen />
      </QueryClientProvider>
    );

    const booklist = getByTestId("borrowed-books-list");
    expect(booklist).toBeDefined();
  });
});

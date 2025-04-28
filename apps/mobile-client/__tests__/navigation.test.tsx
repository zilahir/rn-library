/*
 * @jest-environment node
 */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement } from "react";
import * as ReactQuery from "@tanstack/react-query";
// @ts-expect-error this is a mock
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import { fireEvent, waitFor, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ReactTestRendererJSON } from "react-test-renderer";
import Navigation, { RootNavigator } from "@app/navigation";
import Header from "@app/components/common/Header";
import BookScreen from "@app/screens/BookScreen";
import { RootStackParamList } from "@app/navigation/types";

import { render, renderNavigator } from "./utils/wrapper";

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

const Stack = createStackNavigator<RootStackParamList>();

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("react-native-device-info", () => mockRNDeviceInfo);

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );

  return {
    ...original,
    useQuery: (): any => ({
      isLoading: false,
      error: {},
      data: [...demoBooks],
    }),
  };
});

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: (): any => {
    return {
      t: (str: string): string => str,
      i18n: {
        changeLanguage: (): Promise<any> => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: (): void => {},
  },
}));

describe("AppStack", () => {
  it("renders the correct screen", async () => {
    const { getByText } = render(<Navigation />);
    await waitFor(() => getByText("Home"));
  });

  it("Borrow Screen has header", async () => {
    const { getByText } = render(<Navigation />);
    await waitFor(() => getByText("Home"));
  });

  it("renders a custom header", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Book"
            initialParams={{
              book: {
                borrows: [],
                title: "Test",
                _id: "123",
                isbn: "123",
                author: "Test",
                cover: "Test",
              },
            }}
            component={BookScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              presentation: "card",
              header: ({ back, navigation }: any): ReactElement => (
                <Header back={back} navigation={navigation} />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const backButton = getByTestId("header-w");
    expect(backButton).toBeDefined();
  });

  it("renders RootNavigator", () => {
    const tree = render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });

  it("renders Header component within a screen", () => {
    const mockNavigation = {
      goBack: jest.fn(),
    } as any;

    const { getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Book"
            initialParams={{
              book: {
                borrows: [],
                title: "Test",
                _id: "123",
                isbn: "123",
                author: "Test",
                cover: "Test",
              },
            }}
            component={BookScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              presentation: "card",
              header: (): ReactElement => (
                <Header
                  back={{
                    title: "Test",
                  }}
                  navigation={mockNavigation}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByTestId("back-icon"));
    expect(mockNavigation.goBack).toHaveBeenCalled();

    const customHeaderElement = getByTestId("header-w");
    expect(customHeaderElement).toBeDefined();
  });

  test("Book screen contains the header and list of items", () => {
    renderNavigator(<RootNavigator />);

    const featuredBook = screen.getAllByTestId("bookitem");
    fireEvent.press(featuredBook[0]);
    expect(screen.getByTestId("header-w")).toBeDefined();
  });

  test("Borrow screen contains the header and list of items", () => {
    renderNavigator(<RootNavigator />);

    const borromBookTab = screen.getByTestId("borrow-book");
    fireEvent.press(borromBookTab);
    expect(screen.getByTestId("header-n")).toBeDefined();
  });

  test("Search screen contains the header and list of items", () => {
    renderNavigator(<RootNavigator />);

    const searchInput = screen.getByTestId("search-bar");
    fireEvent.press(searchInput);
    expect(screen.getByTestId("header-w")).toBeDefined();
  });
});

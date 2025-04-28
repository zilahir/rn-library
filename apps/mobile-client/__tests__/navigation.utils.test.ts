// @ts-expect-error this is a mock
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";

import { bottomTabScreens } from "@app/navigation/utils";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("react-native-device-info", () => mockRNDeviceInfo);

describe("Bottom Tab Screens Configuration", () => {
  it("defines screens with correct properties", () => {
    const screens = bottomTabScreens.screens;

    screens.forEach((screen) => {
      expect(screen.name).toBeDefined();
      expect(screen.tabComponent).toBeDefined();
      expect([undefined, true, false].includes(screen.hideLabel)).toBeTruthy();
      expect([undefined, true, false].includes(screen.isFloating)).toBeTruthy();
    });
  });

  it("provides the correct number of tab bar tabs", () => {
    const numberOfTabs = bottomTabScreens.getNumberOfTabBarTabs();
    expect(numberOfTabs).toBe(bottomTabScreens.screens.length);
  });

  it("returns the bottom tab bar tabs with correct properties", () => {
    const tabBarTabs = bottomTabScreens.getBottomTabBarTabs();

    tabBarTabs.forEach((tab) => {
      // Assert that each tab has a name
      expect(tab.name).toBeDefined();

      // Assert that each tab has a tabComponent
      expect(tab.tabComponent).toBeDefined();

      // Assert that hideLabel and isFloating properties are either undefined or have boolean values
      expect([undefined, true, false].includes(tab.hideLabel)).toBeTruthy();
      expect([undefined, true, false].includes(tab.isFloating)).toBeTruthy();
    });
  });
});

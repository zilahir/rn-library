import { ComponentProps } from "react";
import { BottomTabParamList } from "@app/navigation/types";
import HomeScreen from "@app/screens/HomeScreen";
import ProfileScreen from "@app/screens/ProfileScreen";
import TrendingScreen from "@app/screens/TrendingScreen";
import LibraryScreen from "@app/screens/LibraryScreen";

type ScreenName = keyof BottomTabParamList;

interface BottomTabScreen {
  label?: ScreenName;
  name: ScreenName;
  tabComponent: ComponentProps<any>;
  hideLabel?: boolean;
  isFloating?: boolean;
}

interface IBottomTabScreens {
  screens: BottomTabScreen[];
  getBottomTabBarTabs: () => BottomTabScreen[];
  getNumberOfTabBarTabs: () => number;
}

export const bottomTabScreens: IBottomTabScreens = {
  screens: [
    {
      label: "Home",
      name: "Home",
      tabComponent: HomeScreen,
    },

    {
      label: "Profile",
      name: "Profile",
      tabComponent: ProfileScreen,
    },
    {
      label: "Trending",
      name: "Trending",
      tabComponent: TrendingScreen,
    },
    {
      label: "Library",
      name: "Library",
      tabComponent: LibraryScreen,
    },
  ],
  getBottomTabBarTabs: (): BottomTabScreen[] =>
    bottomTabScreens.screens.map((screen) => ({
      ...screen,
      hideLabel: !!screen.hideLabel,
      isFloating: !!screen.isFloating,
    })),

  getNumberOfTabBarTabs: (): number => bottomTabScreens.screens.length,
};

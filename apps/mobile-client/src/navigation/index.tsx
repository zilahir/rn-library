import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ReactElement } from "react";
import {
  StackHeaderProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList, BottomTabParamList } from "@app/navigation/types";
import TabBar from "@app/components/TabBar";
import BookScreen from "@app/screens/BookScreen";
import Header from "@app/components/common/Header";
import BorrowBookScreen from "@app/screens/BorrowBookScreen";
import SearchScreen from "@app/screens/SearchScreen";

import { bottomTabScreens } from "./utils";

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

/**
 * @returns {ReactElement} - react component
 * @description - renders the bottom tab navigator
 */
function BottomTabNavigator(): ReactElement {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={(props): ReactElement => <TabBar {...props} />}
    >
      {bottomTabScreens.getBottomTabBarTabs().map((tabScreen) => (
        <BottomTab.Screen
          key={tabScreen.name}
          name={tabScreen.name}
          component={tabScreen.tabComponent}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}

/**
 * @returns {ReactElement} - react component
 * @description - renders the root navigator
 */
export function RootNavigator(): ReactElement {
  return (
    <Stack.Navigator initialRouteName="Root" detachInactiveScreens={false}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Book"
        initialParams={{
          book: undefined,
        }}
        options={{
          headerShown: true,
          headerTransparent: true,
          presentation: "card",
          header: ({
            back,
            navigation,
          }: Pick<StackHeaderProps, "back" | "navigation">) => (
            <Header back={back} navigation={navigation} />
          ),
        }}
        component={BookScreen}
      />
      <Stack.Screen
        name="BorrowBook"
        initialParams={{
          book: undefined,
        }}
        component={BorrowBookScreen}
        options={{
          headerShown: true,
          presentation: "modal",
          header: ({
            back,
            navigation,
          }: Pick<StackHeaderProps, "back" | "navigation">) => (
            <Header
              withSafeAreaView={false}
              back={back}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          presentation: "card",
          headerTransparent: true,

          header: ({
            back,
            navigation,
          }: Pick<StackHeaderProps, "back" | "navigation">) => (
            <Header back={back} navigation={navigation} />
          ),
        }}
        name="Search"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * @returns {ReactElement} - react component
 * @description - renders the navigation container
 */
function Navigation(): ReactElement {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
        },
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export default Navigation;

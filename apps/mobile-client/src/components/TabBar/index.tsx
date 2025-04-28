/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs";
import { ReactElement } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabDescriptor } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import Tab from "@app/components/TabBar/components/Tab";
import { BottomTabParamList } from "@app/navigation/types";
import { Theme } from "@app/theme";
import { bottomTabScreens } from "@app/navigation/utils";

import { onPress } from "./utils";
import TabBarContainer from "./styles/tabBar";

export const TABBAR_HEIGHT = 60;

const styles = ({
  colors,
}: {
  colors: Theme["colors"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      zIndex: 1,
      paddingHorizontal: 20,
      backgroundColor: colors.white,
      height: TABBAR_HEIGHT,
      width: "100%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    innerContainer: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      position: "relative",
    },
    floatingButtonContainer: {
      width: 60,
      height: 60,
      borderRadius: 100,
      backgroundColor: colors.orange,
      justifyContent: "center",
      alignItems: "center",
      bottom: -TABBAR_HEIGHT * 0.5 + 60 * 0.5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.35,
      shadowRadius: 3.84,
      elevation: 5,
      top: -30,
    },
  });

interface ITabBarProps extends BottomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

/**
 *
 * @param {object} root0 props
 * @param {TabNavigationState<ParamListBase>} root0.state state object handed down from react-navigation
 * @param {BottomTabDescriptor} root0.descriptors descriptors object handed down from react-navigation
 * @param {NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>} root0.navigation navigation object handed down from react-navigation
 * @returns {ReactElement} ReactElement to be rendered
 */
function TabBar({
  state,
  descriptors,
  navigation,
}: ITabBarProps): ReactElement {
  const { colors } = useTheme<Theme>();
  const style = styles({
    colors,
  });

  return (
    <TabBarContainer style={[style.container]}>
      <View style={[style.innerContainer]}>
        {state.routes.slice(0, 2).map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.routeNames[state.index] === route.name;

          return (
            <Tab
              label={route.name}
              icon={route.name as keyof BottomTabParamList}
              tabKey={route.key}
              key={route.key}
              isFocused={isFocused}
              onPress={(): void =>
                onPress({
                  navigation,
                  targetKey: route.key,
                  isFocused,
                  targetName: route.name,
                })
              }
            />
          );
        })}
        <TouchableOpacity
          onPress={(): void => navigation.navigate("BorrowBook")}
          style={[style.floatingButtonContainer]}
          testID="borrow-book"
        >
          <View style={[]} key="floating">
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
        {state.routes.slice(2).map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.routeNames[state.index] === route.name;

          return (
            <Tab
              label={route.name}
              icon={route.name as keyof BottomTabParamList}
              tabKey={route.key}
              key={route.key}
              isFocused={isFocused}
              onPress={(): void =>
                onPress({
                  navigation,
                  targetKey: route.key,
                  isFocused,
                  targetName: route.name,
                })
              }
            />
          );
        })}
      </View>
    </TabBarContainer>
  );
}

export default TabBar;

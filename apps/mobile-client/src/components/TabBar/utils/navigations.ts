import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

interface INavigationProps {
  navigation: BottomTabBarProps["navigation"];
  targetKey: string;
}

/**
 *
 * @param root0
 * @param root0.navigation
 * @param root0.target
 * @param root0.isFocused
 * @param root0.targetKey
 * @param root0.targetName
 */
export function onPress({
  navigation,
  targetKey,
  isFocused,
  targetName,
}: INavigationProps & { isFocused: boolean; targetName: string }): void {
  const event = navigation.emit({
    type: "tabPress",
    target: targetKey,
    canPreventDefault: true,
  });

  if (!isFocused && !event.defaultPrevented) {
    navigation.navigate(targetName);
  }
}

/*
export function onLongPress({ navigation, targetKey }: INavigationProps): void {
  navigation.emit({
    type: "tabLongPress",
    target: targetKey,
  });
}
*/

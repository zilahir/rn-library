import { StackHeaderProps } from "@react-navigation/stack";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@app/theme";

import BackButton from "../BackButton";

const styles = ({
  spacing,
}: {
  spacing: Theme["spacing"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    customHeaderContainer: {
      marginHorizontal: spacing.m,
      marginVertical: spacing.s,
    },
  });

interface IHeader extends Pick<StackHeaderProps, "back" | "navigation"> {
  withSafeAreaView?: boolean;
}

/**
 *
 * @param {object} root0 - props
 * @param {Pick<IHeader, "navigation">} root0.navigation - navigation object passed from react-navigation
 * @param {Function} root0.back - function to go back passed from react-navigation
 * @param {boolean} root0.withSafeAreaView - whether to render with SafeAreaView
 * @returns {ReactElement} - react component
 * @description - renders a header
 */
function Header({
  navigation,
  back,
  withSafeAreaView = true,
}: IHeader): ReactElement {
  const { spacing } = useTheme<Theme>();

  const style = styles({ spacing });

  return (
    <>
      {withSafeAreaView && (
        <SafeAreaView testID="header-w" style={[style.customHeaderContainer]}>
          <BackButton navigation={navigation} back={back} />
        </SafeAreaView>
      )}
      {!withSafeAreaView && (
        <View testID="header-n" style={[style.customHeaderContainer]}>
          <BackButton navigation={navigation} back={back} />
        </View>
      )}
    </>
  );
}

export default Header;

import { ReactElement, ComponentType, ComponentProps } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@app/theme";

/**
 *
 * @param Component
 */

const styles = ({
  borderRadius,
  backgroundColor,
}: {
  borderRadius: number;
  backgroundColor: string;
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    safeAreaView: {
      flex: 1,
      backgroundColor,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },
  });

const withSafeAreaView =
  <P extends object>(ScreenComponent: ComponentType<P>) =>
  (props: ComponentProps<ComponentType<P>>): ReactElement => {
    const { colors, borderRadii } = useTheme<Theme>();
    const style = styles({
      borderRadius: borderRadii.l,
      backgroundColor: colors.mainBackground,
    });

    return (
      <SafeAreaView style={[style.safeAreaView]}>
        <ScreenComponent {...props} />
      </SafeAreaView>
    );
  };

export default withSafeAreaView;

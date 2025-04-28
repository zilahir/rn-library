import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import { Theme } from "@app/theme";

const styles = ({
  colors,
  borderRadii,
}: {
  colors: Theme["colors"];
  borderRadii: Theme["borderRadii"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    backButtonContainer: {
      width: 30,
      height: 30,
      backgroundColor: colors.white,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.gray,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderRadius: borderRadii.m,
      elevation: 5,
    },
  });

type IBackButton = Pick<StackHeaderProps, "back" | "navigation">;

/**
 *
 * @param {object} root0 - props
 * @param {Function} root0.back - function to go back passed from react-navigation
 * @param {Function} root0.navigation - navigation object passed from react-navigation
 * @returns {ReactElement} - react component
 */
function BackButton({ back, navigation }: IBackButton): ReactElement {
  const { colors, borderRadii } = useTheme<Theme>();
  const style = styles({ colors, borderRadii });

  /**
   *
   */
  function handleNavigation(): void {
    if (back) {
      navigation.goBack();
    }
  }
  return (
    <View style={[style.backButtonContainer]}>
      <TouchableOpacity
        testID="back-icon"
        onPress={(): void => handleNavigation()}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default BackButton;

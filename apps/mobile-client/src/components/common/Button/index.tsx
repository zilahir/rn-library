import { ReactElement } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { VariantProps, useTheme } from "@shopify/restyle";
import { Theme } from "@app/theme";
import Text from "@app/components/common/Text";

type ButtonType = "primary" | "secondary" | "outlined";

interface IButton {
  onPress: () => void;
  label: string;
  buttonType: ButtonType;
}

/**
 *
 * @param {object} root0 - props
 * @param {Function} root0.onPress - function to call on press
 * @param {string} root0.label - label to display
 * @param {ButtonType} root0.buttonType - type of button
 * @returns {ReactElement} - react component
 * @description - renders a button
 */
function Button({ onPress, label, buttonType }: IButton): ReactElement {
  const { borderRadii, colors } = useTheme<Theme>();
  const buttonTypeColorMap: Record<ButtonType, string> = {
    primary: colors.orange,
    secondary: colors.orange100,
    outlined: colors.yellow100,
  };
  const style = styles({
    borderRadii,
    backgroundColor: buttonTypeColorMap[buttonType],
    colors,
  });

  const buttonLabelVariant: Record<
    ButtonType,
    VariantProps<Theme, "textVariants">["variant"]
  > = {
    primary: "buttonLabelPriamary",
    secondary: "buttonLabelSecondary",
    outlined: "bookMetaTitle",
  };
  return (
    <TouchableOpacity
      testID={label}
      style={[style.button, style[buttonType]]}
      onPress={onPress}
    >
      <Text variant={buttonLabelVariant[buttonType]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = ({
  borderRadii,
  backgroundColor,
  colors,
}: {
  borderRadii: Theme["borderRadii"];
  backgroundColor: string;
  colors: Theme["colors"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    primary: {},
    secondary: {
      height: 34,
      borderWidth: 2,
      borderColor: colors.orange,
    },
    button: {
      backgroundColor,
      height: 50,
      borderRadius: borderRadii.l,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Button;

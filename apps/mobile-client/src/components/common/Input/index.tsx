import { ReactElement } from "react";
import { TextInput as RNTextInput, View, StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@app/theme";

interface IInputProps {
  placeholder: string;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  disabled?: boolean;
}

const styles = ({
  spacing,
  borderRadii,
  colors,
}: {
  spacing: Theme["spacing"];
  borderRadii: Theme["borderRadii"];
  colors: Theme["colors"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    searchInputContainer: {
      height: 40,
      borderRadius: borderRadii.m,
      paddingHorizontal: spacing.s,
      backgroundColor: colors.gray100,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    textInput: {
      fontSize: 14,
      color: colors.gray,
      flex: 1,
      paddingLeft: 10,
    },
  });

/**
 *
 * @param {object} root0 - props
 * @param {string} root0.placeholder - placeholder text
 * @param {string} root0.value - value of the input
 * @param {Function} root0.onChangeText - function to call on text change
 * @param {ReactElement} root0.iconLeft - icon to display on the left
 * @param {ReactElement} root0.iconRight - icon to display on the right
 * @param {boolean} root0.disabled - whether the input is disabled
 * @returns {ReactElement} - react component
 * @description - renders a text input
 */
function TextInput({
  placeholder,
  value,
  onChangeText,
  iconLeft,
  iconRight,
  disabled,
}: IInputProps): ReactElement {
  const { spacing, borderRadii, colors } = useTheme<Theme>();
  const style = styles({ spacing, borderRadii, colors });
  return (
    <View style={[style.searchInputContainer]}>
      {iconLeft && iconLeft}
      <RNTextInput
        style={[style.textInput]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.gray100}
        editable={!disabled}
        testID="text-input"
      />
      {iconRight && iconRight}
    </View>
  );
}

export default TextInput;

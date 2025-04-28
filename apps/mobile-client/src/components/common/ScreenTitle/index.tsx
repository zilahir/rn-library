import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@shopify/restyle";
import Text from "@app/components/common/Text";
import { Theme } from "@app/theme";

interface ISectionTitle {
  title: string;
}

const styles = ({
  spaces,
}: {
  spaces: Theme["spacing"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    container: {
      marginBottom: spaces.m * 2,
      alignItems: "center",
    },
  });

/**
 *
 * @param  {object} root0 - props
 * @param {string} root0.title - title of the section
 * @returns {ReactElement} - react component
 * @description - renders a section title
 */
function ScreenTitle({ title }: ISectionTitle): ReactElement {
  const { spacing } = useTheme<Theme>();

  const style = styles({ spaces: spacing });
  return (
    <View style={[style.container]}>
      <Text variant="screenTitle">{title}</Text>
    </View>
  );
}

export default ScreenTitle;

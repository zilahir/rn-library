import { ReactElement } from "react";
import { useTheme } from "@shopify/restyle";
import { StyleSheet, View } from "react-native";
import Text from "@app/components/common/Text";
import { Theme } from "@app/theme";

interface ISectionTitle {
  title: string;
  action?: ReactElement;
}

const styles = ({
  spacing,
}: {
  spacing: Theme["spacing"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    rootContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginBottom: spacing.m,
    },
    actionContainer: {
      alignItems: "flex-end",
      justifyContent: "center",
      flex: 1,
    },
  });

/**
 *
 * @param {object} root0 - props
 * @param {string} root0.title - title of the section
 * @param {ReactElement} root0.action - action to render on the right
 * @returns {ReactElement} - react component
 * @description - renders a section title
 */
function SectionTitle({ title, action }: ISectionTitle): ReactElement {
  const { spacing } = useTheme<Theme>();

  const style = styles({ spacing });
  return (
    <View style={action && [style.rootContainer]}>
      <Text style={[style.sectionTitle]} variant="sectionTitle">
        {title}
      </Text>
      {action && <View>{action}</View>}
    </View>
  );
}

export default SectionTitle;

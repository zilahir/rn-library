import { ReactElement } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import styled from "styled-components/native";
import { BottomTabParamList } from "@app/navigation/types";
import { Theme } from "@app/theme";

import { icons } from "../../utils";

interface ITab {
  tabKey: string;
  onPress: () => void;
  icon: keyof BottomTabParamList;
  isFocused: boolean;
  label: string | boolean;
}

const Container = styled.TouchableOpacity``;

const styles = ({
  colors,
}: {
  colors: Theme["colors"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    tabContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    tab: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    labelText: {
      fontSize: 13,
      fontFamily: "Poppins_400Regular",
    },

    labelTextFocused: {
      color: colors.orange,
    },

    labelTextUnfocused: {
      color: colors.gray,
    },
  });

/**
 *
 * @param {object} root0 props
 * @param {string} root0.label - the label to be displayed
 * @param {string} root0.tabKey - the key of the tab
 * @param {Function} root0.onPress - function to be called when the tab is pressed
 * @param {BottomTabParamList} root0.icon - the icon to be displayed
 * @param {boolean} root0.isFocused - whether the tab is focused or not
 * @returns {ReactElement} ReactElement to be rendered
 */
function Tab({ tabKey, onPress, icon, isFocused, label }: ITab): ReactElement {
  const { colors } = useTheme<Theme>();
  const style = styles({
    colors,
  });

  /**
   * @description handles the onPress event
   */
  function handlePress(): void {
    onPress();
  }
  return (
    <Container style={[style.tabContainer]}>
      <TouchableOpacity
        accessibilityRole="button"
        testID={icons[icon]}
        key={tabKey}
        onPress={handlePress}
      >
        <View key={tabKey} style={[style.tab]}>
          <Feather
            size={20}
            color={isFocused ? colors.orange : colors.gray}
            name={icons[icon]}
          />

          {label && (
            <Text
              style={[
                style.labelText,
                isFocused ? style.labelTextFocused : style.labelTextUnfocused,
              ]}
            >
              {label}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Container>
  );
}

export default Tab;

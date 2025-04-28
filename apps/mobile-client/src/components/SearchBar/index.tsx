import { ReactElement } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "@app/theme";
import { RootTabScreenProps } from "@app/navigation/types";
import TextInput from "@app/components/common/Input";

type Navigation =
  | RootTabScreenProps<"Library">["navigation"]
  | RootTabScreenProps<"Search">["navigation"];

interface ISearchBar {
  searchTerm?: string;
  setSearchTerm?: ((text: string) => Promise<void>) | undefined;
  navigation: Navigation;
  route:
    | RootTabScreenProps<"Search">["route"]
    | RootTabScreenProps<"Library">["route"];
}

const styles = ({
  spacing,
}: {
  spacing: Theme["spacing"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    searchBarContainer: {
      marginBottom: spacing.m,
    },
  });

/**
 *
 * @param {object} root0 props
 * @param {Navigation} root0.navigation navigation object handed down from react-navigation
 * @param {string} root0.route the current route name
 * @param {string} root0.searchTerm the current search term
 * @param {Function} root0.setSearchTerm function to set the search term
 * @returns {ReactElement} ReactElement to be rendered
 */
function SearchBar({
  navigation,
  route,
  searchTerm,
  setSearchTerm,
}: ISearchBar): ReactElement {
  const { colors, spacing } = useTheme<Theme>();

  const style = styles({ spacing });

  /**
   *
   */
  function handleNavigateToSearchScreen(): void {
    if (route.name !== "Search") {
      navigation.navigate("Search");
    }
  }

  return (
    <TouchableOpacity
      style={[style.searchBarContainer]}
      onPress={(): void => handleNavigateToSearchScreen()}
      disabled={route.name === "Search"}
      testID="search-bar"
    >
      <TextInput
        value={searchTerm ?? ""}
        disabled={route.name !== "Search"}
        onChangeText={setSearchTerm}
        placeholder="Search"
        iconLeft={<Feather name="search" color={colors.gray} />}
      />
    </TouchableOpacity>
  );
}

export default SearchBar;

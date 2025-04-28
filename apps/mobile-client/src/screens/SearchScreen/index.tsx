import { ReactElement, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ImageStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Book } from "pikkukirjasto-types/types/book";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import withSafeAreaView from "@app/components/WithSafeAreaView";
import MainLayout from "@app/layouts/MainLayout";
import SectionTitle from "@app/components/common/SectionTitle";
import { Theme } from "@app/theme";
import { RootTabScreenProps } from "@app/navigation/types";
import Text from "@app/components/common/Text";
import SearchBar from "@app/components/SearchBar";
import useSearch from "@app/hooks/useSearch";

const styles = ({
  spacing,
  colors,
}: {
  spacing: Theme["spacing"];
  colors: Theme["colors"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    searchResultsLoadingContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    searchResultRootContainer: {
      flex: 1,
    },
    placeHolder: {
      padding: spacing.s,
    },
    scrollViewContainer: {
      marginTop: spacing.l,
      flex: 1,
    },

    suggestionItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.s,
    },

    headerHelper: {
      marginTop: spacing.l * 2,
    },

    titleContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    bookCoverImage: {
      width: 30,
      aspectRatio: 1 / 1.5,
    },
    searchResultItemSeparator: {
      height: 20,
    },
    searchIcon: {
      marginRight: spacing.m,
    },
    searchResultListContainer: {
      marginTop: spacing.m,
    },
    searchResultItemSeparatorBorder: {
      height: 3,
      backgroundColor: colors.orange100,
    },
  });

/**
 *
 * @param {object} root0 - props
 * @param {Book} root0.book - a single book object
 * @param {object} root0.navigation - navigation object passed from react-navigation
 * @returns {ReactElement} - react component
 * @description - renders a single suggestion item
 */
function SuggestionItem({
  book,
  navigation,
}: {
  book: Book;
  navigation: RootTabScreenProps<"Search">["navigation"];
}): ReactElement {
  const { spacing, colors } = useTheme<Theme>();

  const style = styles({ spacing, colors });

  return (
    <TouchableOpacity
      testID="suggestion-item"
      onPress={(): void =>
        navigation.navigate("Book", {
          book,
        })
      }
    >
      <Animated.View style={[style.suggestionItem]}>
        <Animated.Image
          source={{ uri: book.cover }}
          style={[style.bookCoverImage as ImageStyle]}
        />

        <View>
          <Text marginLeft="s" fontSize={14}>
            {book.title}
          </Text>
          <Text marginLeft="s" fontSize={12}>
            {book.author}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

/**
 *
 * @param {object} root0 - props
 * @param {object} root0.navigation - navigation object passed from react-navigation
 * @param {object} root0.route - route object passed from react-navigation
 * @returns {ReactElement} - react component
 * @description - renders a search screen
 */
function SearchScreen({
  navigation,
  route,
}: RootTabScreenProps<"Search">): ReactElement {
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { handleSorting } = useSearch();

  const { t } = useTranslation();

  /**
   *
   * @param {string} queryString - query string
   * @returns {Promise<Book[]>} - array of books
   * @description - handles search
   */
  // istanbul ignore next
  async function handleSearch(queryString: string): Promise<void> {
    setSearchTerm(queryString);
    const result = await handleSorting(queryString);
    setSearchResult(result);
  }

  const { spacing, colors } = useTheme<Theme>();
  const style = styles({ spacing, colors });

  return (
    <MainLayout>
      <View style={[style.headerHelper]}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(text): Promise<void> => handleSearch(text)}
          route={route}
          navigation={navigation}
        />
      </View>
      <View>
        <View style={[style.titleContainer]}>
          <Feather
            style={style.searchIcon}
            size={20}
            name="search"
            color={colors.gray}
          />
          <SectionTitle title={t("searchScreen.suggestions")} />
        </View>
        <FlatList
          data={searchResult}
          keyExtractor={(item): string => item._id}
          ItemSeparatorComponent={(): ReactElement => (
            <View style={[style.searchResultItemSeparator]}>
              <View style={[style.searchResultItemSeparatorBorder]} />
            </View>
          )}
          contentContainerStyle={[style.searchResultListContainer]}
          renderItem={({ item }): ReactElement => (
            <SuggestionItem
              navigation={navigation}
              book={item}
              key={item._id}
            />
          )}
        />
      </View>
    </MainLayout>
  );
}

export default withSafeAreaView(SearchScreen);

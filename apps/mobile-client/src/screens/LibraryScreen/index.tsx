import { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import withSafeAreaView from "@app/components/WithSafeAreaView";
import MainLayout from "@app/layouts/MainLayout";
import ScreenTitle from "@app/components/common/ScreenTitle";
import useBooks from "@app/queries/book";
import { RootTabScreenProps } from "@app/navigation/types";
import SearchBar from "@app/components/SearchBar";

import BookList from "../HomeScreen/components/BookList";

const styles = StyleSheet.create({
  viewController: {
    flex: 1,
  },
});

/**
 *
 * @param {object} root0 - props
 * @param {object} root0.navigation - navigation object from react-nativation
 * @param {object} root0.route - route object from react-navigation
 * @returns {ReactElement} - react component
 * @description - renders the library screen
 */
function LibraryScreen({
  navigation,
  route,
}: RootTabScreenProps<"Library">): ReactElement {
  const { t } = useTranslation();
  const { data: books = [] } = useBooks();
  return (
    <MainLayout>
      <ScreenTitle title={t("libraryScreen.title")} />
      <SearchBar navigation={navigation} route={route} />
      <View testID="book-list" style={[styles.viewController]}>
        <BookList variant="vertical" navigation={navigation} books={books} />
      </View>
    </MainLayout>
  );
}

export default withSafeAreaView(LibraryScreen);

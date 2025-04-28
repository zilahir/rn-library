/* eslint-disable @typescript-eslint/no-unused-vars */
import { Book } from "pikkukirjasto-types/types/book";
import { StyleSheet } from "react-native";
import { ReactElement } from "react";
import { useTheme } from "@shopify/restyle";
import Card from "@app/components/common/Card";
import { Theme } from "@app/theme";
import BookList from "@app/screens/HomeScreen/components/BookList";
import { RootTabScreenProps } from "@app/navigation/types";

type Navigation = RootTabScreenProps<"Library">["navigation"];
interface IFeatured {
  books: Book[];
  navigation: Navigation;
}

/**
 *
 * @param {object} root0 props
 * @param {Book[]} root0.books arrray of books to be displayed
 * @param {Navigation} root0.navigation navigation object handed down from react-navigation
 * @returns {ReactElement} ReactElement to be rendered
 */
function Featured({ books, navigation }: IFeatured): ReactElement {
  const { borderRadii, spacing } = useTheme<Theme>();

  return (
    <Card variant="featured">
      <BookList
        isSnapped
        books={books}
        variant="horizontal"
        navigation={navigation}
        hasPagination={false}
      />
    </Card>
  );
}

export default Featured;

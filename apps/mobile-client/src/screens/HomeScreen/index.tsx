import { ReactElement, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { random, sampleSize } from "lodash";
import { useTheme } from "@shopify/restyle";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import useBooks from "@app/queries/book";
import withSafeAreaView from "@app/components/WithSafeAreaView";
import MainLayout from "@app/layouts/MainLayout";
import Featured from "@app/components/Featured";
import { Theme } from "@app/theme";
import { RootTabScreenProps } from "@app/navigation/types";
import SectionTitle from "@app/components/common/SectionTitle";
import Badge from "@app/components/common/Badge";
import Card from "@app/components/common/Card";
import SearchBar from "@app/components/SearchBar";
import ScreenTitle from "@app/components/common/ScreenTitle";

import BookList from "./components/BookList";

const styles = ({
  marginVertical,
}: {
  marginVertical: number;
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    bookListContainer: {
      marginVertical: marginVertical,
      flex: 1,
      justifyContent: "center",
    },

    allBookContainer: {
      justifyContent: "center",
      flex: 1,
      flexDirection: "column",
    },
  });

/**
 *
 * @param {object} root0 - props
 * @param {object} root0.navigation - navigation object
 * @param {object} root0.route - route object
 * @returns {ReactElement} - react component
 * @description - renders the home screen
 */
function HomeScreen({
  navigation,
  route,
}: RootTabScreenProps<"Library">): ReactElement {
  const { data: books = [] } = useBooks();
  const { spacing } = useTheme<Theme>();

  const style = styles({ marginVertical: spacing.s });

  const featuredBooks = useMemo(
    () => sampleSize(books, random(5, 11)),
    [books]
  );

  const { t } = useTranslation();

  return (
    <MainLayout>
      <ScreenTitle title={t("homeScreen.title")} />
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <View testID={books?.length.toString()}>
          <SearchBar route={route} navigation={navigation} />
          {books && books.length > 0 && (
            <>
              <View style={[style.bookListContainer]}>
                <SectionTitle title={t("libraryScreen.featured")} />
                <Featured navigation={navigation} books={featuredBooks} />
              </View>
              <View style={[style.bookListContainer]}>
                <SectionTitle title={t("libraryScreen.popular")} />
                <Card variant="featured">
                  <BookList
                    books={books.slice(0, 5)}
                    variant="horizontal"
                    navigation={navigation}
                    hasPagination={false}
                  />
                </Card>
              </View>
              <View style={[style.allBookContainer]}>
                <SectionTitle
                  action={
                    <TouchableOpacity
                      testID="library"
                      onPress={(): void => navigation.navigate("Library")}
                    >
                      <Badge
                        type="outlinedBadge"
                        text={t("libraryScreen.all")}
                      />
                    </TouchableOpacity>
                  }
                  title={t("libraryScreen.all")}
                />

                <BookList
                  books={books.slice(5, 10)}
                  variant="vertical"
                  navigation={navigation}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
}

export default withSafeAreaView(HomeScreen);

import { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native-gesture-handler";
import withSafeAreaView from "@app/components/WithSafeAreaView";
import MainLayout from "@app/layouts/MainLayout";
import { Theme } from "@app/theme";
import useBorrows from "@app/queries/borrows";
import Loader from "@app/components/common/Loader";

import BookItem from "../HomeScreen/components/BookItem";

const styles = ({
  spacing,
  colors,
  borderRadii,
}: {
  spacing: Theme["spacing"];
  colors: Theme["colors"];
  borderRadii: Theme["borderRadii"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    profileContainer: {
      paddingVertical: spacing.s,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.m,
    },
    profileIcon: {
      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.orange,
      marginRight: spacing.m,
      padding: spacing.s,
    },
    welcomeText: {
      fontSize: 22,
      fontWeight: "500",
    },
    borrowContainer: {
      flexDirection: "row",
    },
    borrowedBooksText: {
      fontSize: 20,
      fontWeight: "600",
    },
    borrowedBooksDetailsText: {
      fontSize: 13,
      color: colors.gray,
    },
    textContainer: {
      flex: 1,
    },
    seeAllBorrowedBooksButtonContainer: {
      width: 100,
    },
    borrowedBooksContainer: {
      justifyContent: "center",
      marginVertical: spacing.l,
    },
    userSettingsContainer: {},
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3.84,
      elevation: 5,
    },
    settingsSection: {
      backgroundColor: colors.white,
      borderRadius: borderRadii.l,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      marginVertical: spacing.m,
    },
    settingsItem: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      gap: spacing.s,
    },
    settingsText: {
      fontWeight: "500",
      fontSize: 18,
    },
    loaderContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

/**
 *
 * @returns {ReactElement} - react component
 * @description - renders the profile screen
 */
function ProfileScreen(): ReactElement {
  const { spacing, colors, borderRadii } = useTheme<Theme>();
  const { t } = useTranslation();

  const animationValue = useSharedValue(0);

  const style = styles({ spacing, colors, borderRadii });

  const { data: books = [], isLoading } = useBorrows();

  return (
    <MainLayout>
      <View style={[style.profileContainer]}>
        <View style={[style.profileIcon]}>
          <Feather name="user" size={24} color={colors.orange} />
        </View>
        <Text style={[style.welcomeText]}>{t("profileScreen.welcome")}</Text>
      </View>
      <View style={[style.borrowContainer]}>
        <View style={[style.textContainer]}>
          <Text style={[style.borrowedBooksText]}>
            {t("profileScreen.borrowedBooks")}
          </Text>
          <Text style={[style.borrowedBooksDetailsText]}>
            {t("profileScreen.borrowedBooksDetails", { count: books.length })}
          </Text>
        </View>
      </View>
      <View style={[style.borrowedBooksContainer]}>
        {isLoading && (
          <View style={[style.loaderContainer]}>
            <Loader />
          </View>
        )}
        {!isLoading && books.length > 0 && (
          <FlatList
            testID="borrowed-books-list"
            data={books}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item: borrow }): ReactElement => (
              <BookItem
                animationValue={animationValue}
                noShadow
                bookCardvariant="bookCardHorizontal"
                item={{
                  ...borrow.book,
                }}
              />
            )}
          />
        )}
      </View>
      <View style={[style.userSettingsContainer]}>
        <Text style={[style.borrowedBooksText]}>
          {t("profileScreen.settings")}
        </Text>
        <View style={[style.settingsSection, style.shadow]}>
          <TouchableOpacity style={[style.settingsItem]}>
            <Feather name="user" size={24} color={colors.orange} />
            <Text style={[style.settingsText]}>
              {t("profileScreen.account")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[style.settingsItem]}>
            <Feather name="shield" size={24} color={colors.orange} />
            <Text style={[style.settingsText]}>
              {t("profileScreen.account")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[style.settingsSection, style.shadow]}>
          <TouchableOpacity style={[style.settingsItem]}>
            <Feather name="log-out" size={24} color={colors.orange} />
            <Text style={[style.settingsText]}>
              {t("profileScreen.logout")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
}

export default withSafeAreaView(ProfileScreen);

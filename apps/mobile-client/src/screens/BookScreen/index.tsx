import { ReactElement } from "react";
import { View, StyleSheet, Image, ImageStyle, Text } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useTranslation } from "react-i18next";
import { FontAwesome, Feather } from "@expo/vector-icons";
import withSafeAreaView from "@app/components/WithSafeAreaView";
import { RootTabScreenProps } from "@app/navigation/types";
import { Theme } from "@app/theme";
import useBookData from "@app/hooks/useBookData";
import ThemeText from "@app/components/common/Text";
import Button from "@app/components/common/Button";
import Badge from "@app/components/common/Badge";

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
    bookOuterContainer: {
      flex: 1,
    },
    topContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.gray100,
      padding: spacing.m,
    },
    bottomContainer: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    imageStyle: {
      width: 160,
      aspectRatio: 1 / 1.5,
      borderRadius: borderRadii.m,
    },
    imageContainer: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
    },
    detailsContainer: {},
    font: {
      textAlign: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    overViewText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: spacing.s,
    },
    author: {
      fontSize: 15,
    },
    metaContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: spacing.m,
      marginVertical: spacing.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      justifyContent: "center",
      backgroundColor: colors.gray100,
      borderRadius: borderRadii.m,
      borderWidth: 2,
      borderColor: colors.orange100,
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.s,
    },
    meta: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "stretch",
      alignSelf: "stretch",
      flex: 1,
      gap: spacing.s,
    },
    rentButtonContainer: {
      alignSelf: "stretch",
      paddingHorizontal: spacing.m,
    },
    overViewContainer: {
      paddingHorizontal: spacing.m,
    },
    avaliableIcon: {
      marginRight: spacing.s,
    },
  });

/**
 *
 * @param {object} root0 - props
 * @param {object} root0.navigation - navigation object passed from react-navigation
 * @param {object} root0.route - route object passed from react-navigation
 * @returns {ReactElement} - react component
 * @description - renders a book screen
 */
function Book({ route, navigation }: RootTabScreenProps<"Book">): ReactElement {
  const { numOfPages, rate, language, overview } = useBookData();
  const { t } = useTranslation();
  const { spacing, colors, borderRadii } = useTheme<Theme>();
  const style = styles({
    spacing,
    colors,
    borderRadii,
  });

  const borrows = route.params.book.borrows ?? [];

  const isAvaliable = borrows.some(({ isBorrowed }) => !isBorrowed);

  return (
    <View style={[style.bookOuterContainer]}>
      <View style={[style.topContainer]}>
        <View style={[style.imageContainer]}>
          <Image
            style={[style.imageStyle as ImageStyle]}
            source={{ uri: route.params.book.cover }}
          />
        </View>
      </View>
      <View style={[style.bottomContainer]}>
        <View style={[style.detailsContainer]}>
          <Text style={[style.font, style.title]}>
            {route.params.book.title}
          </Text>
          <Text style={[style.font, style.author]}>
            {route.params.book.author}
          </Text>
        </View>
        <View style={style.metaContainer}>
          <View style={style.meta}>
            <Text style={[style.metaFont]}>{t("bookMeta.rate")}</Text>
            <View style={[style.row]}>
              <FontAwesome name="star" size={24} color={colors.orange} />
              <Text style={[style.metaFont]}>{rate}</Text>
            </View>
          </View>
          <View style={style.meta}>
            <Text style={[style.metaFont]}>{t("bookMeta.numOfPages")}</Text>
            <Text>{numOfPages}</Text>
          </View>
          <View style={style.meta}>
            <Text style={[style.metaFont]}>{t("bookMeta.language")}</Text>
            <Text>{language}</Text>
          </View>
        </View>
        <View>
          <Badge
            icon={
              <Feather
                style={[style.avaliableIcon]}
                name={isAvaliable ? "x" : "check"}
                color={isAvaliable ? colors.red200 : colors.green100}
              />
            }
            type={isAvaliable ? "errorBadge" : "successBadge"}
            text={t(`bookMeta.isAvaliable.${!isAvaliable}`)}
          />
        </View>
        <View>
          <View style={[style.overViewContainer]}>
            <Text style={[style.overViewText]}>{t("bookMeta.overview")}</Text>
            <ThemeText variant="bookOverview">{overview}</ThemeText>
          </View>
        </View>
        {isAvaliable && (
          <View style={style.rentButtonContainer}>
            <Button
              buttonType="primary"
              label="Rent"
              onPress={(): void =>
                navigation.navigate("BorrowBook", {
                  book: route.params.book,
                })
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default withSafeAreaView(Book);

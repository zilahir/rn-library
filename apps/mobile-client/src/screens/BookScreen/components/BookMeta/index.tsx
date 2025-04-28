import { View, StyleSheet } from "react-native";
import { BookData } from "pikkukirjasto-types/types/book";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Text from "@app/components/common/Text";

const styles = (): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    bookMeta: {
      flexDirection: "column",
      gap: 3,
    },
  });

/**
 *
 * @param {object} root0 -props
 * @param {number} root0.rate - rate of the book
 * @param {number} root0.numOfPages - number of pages
 * @param {string} root0.language - language of the book
 * @param {boolean} root0.isAvaliable - is the book avaliable
 * @returns {ReactElement} - react component
 * @description - renders book meta
 */
function BookMeta({
  rate,
  numOfPages,
  language,
  isAvaliable,
}: BookData): ReactElement {
  const style = styles();
  const { t } = useTranslation();
  return (
    <>
      <View style={[style.bookMeta]}>
        <Text variant="bookMetaTitle">{t("bookMeta.rate")}</Text>
        <Text variant="bookMeta">{rate}</Text>
      </View>
      <View style={[style.bookMeta]}>
        <Text variant="bookMetaTitle">{t("bookMeta.numOfPages")}</Text>
        <Text variant="bookMeta">{numOfPages}</Text>
      </View>
      <View style={[style.bookMeta]}>
        <Text variant="bookMetaTitle">{t("bookMeta.language")}</Text>
        <Text variant="bookMeta">{language}</Text>
      </View>
      <View style={[style.bookMeta]}>
        <Text variant="bookMetaTitle">{t("bookMeta.isAvaliable")}</Text>
        <Text variant="bookMeta">{isAvaliable.toString()}</Text>
      </View>
    </>
  );
}

export default BookMeta;

import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Book } from "pikkukirjasto-types/types/book";
import { ReactElement, useCallback, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import Animated, { interpolate, useSharedValue } from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { RootTabScreenProps } from "@app/navigation/types";
import { Theme } from "@app/theme";

import BookItem from "../BookItem";

type Variant = "horizontal" | "vertical";
type Navigation = RootTabScreenProps<"Library">["navigation"];

interface IBookList {
  books: Book[];
  variant: Variant;
  navigation?: Navigation | null;
  isSnapped?: boolean;
  hasPagination?: boolean;
}

const styles = ({
  colors,
  spacing,
}: {
  colors: Theme["colors"];
  spacing: Theme["spacing"];
}): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    carouselContainer: {
      width: "100%",
      height: 220,
      justifyContent: "center",
    },
    carouselOuterContainer: {
      flex: 1,
    },
    dotsContainer: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 50,
      marginHorizontal: 4,
      backgroundColor: colors.gray200,
    },
    dotActive: {
      backgroundColor: colors.orange,
    },
    flatListContainerStyle: {
      marginTop: spacing.m,
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
    },
    itemSeparartor: {
      height: spacing.m,
    },
  });

const BOOK_WIDTH = 140;

/**
 *
 * @param {object} root0 - props
 * @param {Variant} root0.variant - variant of the book list
 * @param {Book[]} root0.books - books to render
 * @param {Navigation} root0.navigation - navigation object passed from react-navigation
 * @param {boolean} root0.hasPagination - whether to render pagination
 * @param {boolean} root0.isSnapped - whether to snap to item
 * @returns {ReactElement} - react component
 * @description - renders a list of books
 */
function BookList({
  variant,
  books,
  navigation,
  isSnapped = false,
  hasPagination = false,
}: IBookList): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);

  const width = Dimensions.get("window").width;

  const animationStyle = useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [1, 20, 1]);
    const scale = interpolate(value, [-1, 0, 1], [0.95, 1, 0.9]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0.65, 1, 0.65]);
    const direction = interpolate(
      value,
      [-1, 0, 1],
      [0 - BOOK_WIDTH, 0, 0 + BOOK_WIDTH]
    );

    return {
      opacity,
      transform: [{ scale }, { translateX: direction }],
      zIndex,
    };
  }, []);

  const { spacing, colors } = useTheme<Theme>();

  const style = styles({ colors, spacing });

  const animatedDotSharedValue = useSharedValue(activeIndex);

  return (
    <View style={[style.carouselOuterContainer]}>
      {variant === "horizontal" && (
        <Carousel
          onSnapToItem={(index): void => {
            /* istanbul ignore next */
            setActiveIndex(index);
          }}
          data={books}
          width={width - 2 * spacing.m}
          style={[style.carouselContainer]}
          height={width}
          customAnimation={animationStyle}
          defaultIndex={0}
          mode="parallax"
          pagingEnabled={isSnapped}
          snapEnabled
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          overscrollEnabled
          renderItem={({ item: book, animationValue }): ReactElement => {
            return (
              <BookItem
                animationValue={animationValue}
                navigation={navigation}
                bookCardvariant="bookCardHorizontal"
                item={{
                  ...book,
                }}
              />
            );
          }}
        />
      )}
      {variant === "vertical" && (
        <FlatList
          nestedScrollEnabled={false}
          data={books}
          numColumns={2}
          contentContainerStyle={style.flatListContainerStyle}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={(): ReactElement => (
            <View style={[style.itemSeparartor]} />
          )}
          renderItem={({ item: book }: { item: Book }): ReactElement => (
            <BookItem
              animationValue={animatedDotSharedValue}
              navigation={navigation}
              bookCardvariant="bookCardVertical"
              item={{
                ...book,
              }}
            />
          )}
        />
      )}
      {hasPagination && (
        <View testID="pagination" style={[style.dotsContainer]}>
          {books.map(({ _id }, index) => (
            <Animated.View
              style={[
                style.dot,
                index === activeIndex ? style.dotActive : style.dotInactive,
              ]}
              key={_id}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default BookList;

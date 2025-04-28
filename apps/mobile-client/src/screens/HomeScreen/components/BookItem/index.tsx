import { PropsWithChildren, ReactElement } from "react";
import { Book } from "pikkukirjasto-types/types/book";
import { Image, Pressable, StyleSheet, View } from "react-native";
import {
  AllProps,
  VariantProps,
  createRestyleComponent,
  useTheme,
} from "@shopify/restyle";
import Animated, {
  FadeIn,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Text from "@app/components/common/Text";
import { Theme, bookCardVariant } from "@app/theme";
import { RootTabScreenProps } from "@app/navigation/types";

type BookCardVariant = VariantProps<Theme, "bookCardVariants">["variant"];
type Navigation = RootTabScreenProps<"Library">["navigation"] | null;

interface IBook {
  item: Book;
  bookCardvariant: BookCardVariant;
  navigation?: Navigation;
  animationValue: Animated.SharedValue<number>;
  noShadow?: boolean;
}

type BookCardProps = PropsWithChildren<
  AllProps<Theme> & VariantProps<Theme, "bookCardVariants">
>;

const BookCard = createRestyleComponent<BookCardProps, Theme>([
  bookCardVariant,
]);

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
    bookCardHorizontal: {
      aspectRatio: 1 / 1.5,
      height: 160,
      borderColor: colors.transparent,
      borderRadius: borderRadii.m,
      borderWidth: 3,
    },
    bookCardVertical: {
      flex: 1,
    },
    bottomContainer: {
      paddingVertical: spacing.m,
      justifyContent: "center",
    },
    imageContainer: {
      position: "relative",
    },
    cardOuterContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.m,
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    horizontalImage: {
      borderRadius: borderRadii.m,
      aspectRatio: 1 / 1.5,
    },
    horizontalOutContainer: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  });

const AnimatedImage = Animated.createAnimatedComponent(Image);

/**
 *
 * @param {object} root0 - props
 * @param {Book} root0.item - a single book object
 * @param {BookCardVariant} root0.bookCardvariant - variant of the book card
 * @param {Navigation} root0.navigation - navigation object passed from react-navigation
 * @param {Animated.SharedValue<number>} root0.animationValue - animation value
 * @param {boolean} root0.noShadow - whether to show shadow or not
 * @returns {ReactElement} - react component
 * @description - renders a book item
 */
function BookItem({
  item,
  bookCardvariant,
  navigation,
  animationValue,
  noShadow,
}: IBook): ReactElement {
  const { spacing, colors, borderRadii } = useTheme<Theme>();
  const style = styles({ spacing, colors, borderRadii });

  const animationStyle = useAnimatedStyle(() => {
    const bookDetailsOpacity = interpolate(
      animationValue?.value,
      [-1, 0, 1],
      [0, 1, 0]
    );

    const yPosition = interpolate(
      animationValue?.value,
      [-1, 0, 1],
      [-10, 0, 10]
    );

    return {
      opacity: bookDetailsOpacity,
      transform: [{ translateY: yPosition }],
    };
  }, [animationValue]);

  const bookCardStyle = useAnimatedStyle(() => {
    const border = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["transparent", colors.orange, "transparent"]
    );

    return {
      borderColor: border,
    };
  }, [animationValue]);

  /**
   *
   */
  function handleNavigation(): void {
    if (navigation) {
      navigation.navigate("Book", {
        book: item,
      });
    }
  }

  return (
    <Pressable testID="bookitem" onPress={(): void => handleNavigation()}>
      {animationValue && bookCardvariant === "bookCardHorizontal" && (
        <View testID="horizontal" style={[style.cardOuterContainer]}>
          <BookCard variant={bookCardvariant}>
            <Animated.View style={[style.shadow]}>
              <AnimatedImage
                testID="image"
                entering={FadeIn}
                source={{ uri: item.cover }}
                // @ts-expect-error TODO: fix this
                style={[style[bookCardvariant], !noShadow && bookCardStyle]}
                resizeMode="stretch"
              />
            </Animated.View>
          </BookCard>
          <Animated.View style={[style.bottomContainer, animationStyle]}>
            <Text numberOfLines={1} variant="bookCardTitle">
              {item.title}
            </Text>
            <Text numberOfLines={1} variant="bookCardAuthor">
              {item.author}
            </Text>
          </Animated.View>
        </View>
      )}

      {animationValue && bookCardvariant === "bookCardVertical" && (
        <View
          testID="vertical"
          style={[style.cardOuterContainer, style.horizontalOutContainer]}
        >
          <BookCard variant={bookCardvariant}>
            <Animated.View style={[style.shadow]}>
              <Animated.Image
                source={{ uri: item.cover }}
                // @ts-expect-error TODO: fix this
                style={[style.horizontalImage]}
                resizeMode="stretch"
              />
            </Animated.View>
            <View style={[style.bottomContainer]}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                variant="bookCardTitle"
              >
                {item.title}
              </Text>
              <Text numberOfLines={1} variant="bookCardAuthor">
                {item.author}
              </Text>
            </View>
          </BookCard>
        </View>
      )}
    </Pressable>
  );
}

export default BookItem;

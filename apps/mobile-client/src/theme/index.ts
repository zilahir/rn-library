import { createTheme, createVariant } from "@shopify/restyle";
import { Dimensions } from "react-native";

type ThemeColor =
  | "cyan"
  | "brown"
  | "ocher"
  | "yellow"
  | "white100"
  | "yellow100"
  | "transparent"
  | "brown100"
  | "brown200";

const colorPalette: Record<ThemeColor, string> = {
  cyan: "#078888",
  brown: "#533D30",
  brown100: "#fef3f0",
  brown200: "#E1B87D",
  ocher: "#B98D35",
  yellow: "#F4A228",
  white100: "#fcfcfc",
  yellow100: "#fce1ba",
  transparent: "transparent",
};

const themeColors = {
  orange: "#FF9900",
  orange100: "rgba(255, 153, 0, 0.05)",
  yellow: "#FDCE33",
  trueWhite: "#fff",
  dark: "#333333",
  gray: "#828282",
  gray100: "rgba(247, 247, 247, 1)",
  gray200: "rgba(226, 228, 233, 1)",
  dark2: "rgba(51, 51, 51, 1)",
  green100: "rgba(6, 190, 24, 1)",
  green200: "rgba(120, 255, 117, 0.13)",
  red100: "#ffcac7",
  red200: "#ff372e",
};

const theme = createTheme({
  colors: {
    black: "#000",
    white: "#fff",
    mainBackground: themeColors.trueWhite,
    cardPrimaryBackground: colorPalette.yellow,
    ...colorPalette,
    ...themeColors,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  badgeVariants: {
    successBadge: {
      backgroundColor: "green200",
      flexDirection: "row",
      alignItems: "center",
    },
    errorBadge: {
      backgroundColor: "red100",
      flexDirection: "row",
      alignItems: "center",
    },
    outlinedBadge: {
      borderWidth: 2,
      borderColor: "orange",
      backgroundColor: "orange100",
    },
  },
  bookCardVariants: {
    bookCardHorizontal: {
      borderRadius: "m",
    },
    bookCardVertical: {
      borderRadius: "m",
      overflow: "hidden",
      width: Dimensions.get("window").width * 0.4,
    },
  },
  cardVariants: {
    defaults: {},
    inlineNotificationSuccess: {
      backgroundColor: "green100",
      alignItems: "center",
      px: "m",
      py: "s",
      mx: "m",
      my: "m",
      borderRadius: "m",
      borderWidth: 1,
      borderColor: "green200",
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowOffset: { width: 1, height: 0 },
      shadowRadius: 1,
      elevation: 1,
    },
    inlineNotificationInfo: {
      backgroundColor: "cyan",
      alignItems: "center",
      px: "m",
      py: "s",
      mx: "m",
      my: "m",
      borderRadius: "m",
      borderWidth: 1,
      borderColor: "green200",
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowOffset: { width: 1, height: 0 },
      shadowRadius: 1,
      elevation: 1,
    },

    mainLayout: {
      mx: "l",
      my: "m",
      backgroundColor: "transparent",
      flex: 1,
    },
    featured: {
      backgroundColor: "white",
      mb: "m",
      flexDirection: "row",
      gap: "m",
      borderRadius: "m",
      alignItems: "flex-start",
      overflow: "hidden",
    },
  },
  badgeTextVariants: {
    defaults: {
      // fontFamily: "Roboto_400Regular",
    },
    successBadge: {
      fontSize: 14,
      color: "green100",
    },
    errorBadge: {
      color: "red200",
    },
    outlinedBadge: {
      fontSize: 13,
      color: "orange",
      fontWeight: "bold",
    },
  },
  textVariants: {
    defaults: {
      // fontFamily: "Roboto_400Regular",
    },
    bookOverview: {
      lineHeight: 20,
    },
    screenTitle: {
      fontSize: 26,
      color: "dark2",
      fontWeight: "bold",
    },
    sectionTitle: {
      fontWeight: 500,
      fontSize: 22,
      color: "dark",
    },
    featuredBookTitle: {
      fontSize: 26,
      color: "white",
    },
    featuredBookAuthor: {
      fontSize: 22,
      color: "white",
      textTransform: "uppercase",
    },
    bookCardTitle: {
      fontSize: 14,
      color: "dark",
      fontWeight: 500,
    },
    bookCardAuthor: {
      fontSize: 12,
      color: "dark",
    },
    bookMetaTitle: {
      fontSize: 16,
      fontWeight: 500,
      color: "brown",
    },
    bookMeta: {
      fontSize: 14,
    },
    successNotification: {
      fontSize: 16,
      color: "white",
      fontWeight: 500,
    },
    errorNotification: {},
    infoNotication: {
      color: "white",
    },
    buttonLabelPriamary: {
      fontSize: 16,
      color: "white",
      fontWeight: 500,
    },
    buttonLabelSecondary: {
      fontSize: 16,
      color: "orange",
      fontWeight: 500,
    },
  },
});

export type Theme = typeof theme;

export const badgeVariant = createVariant<Theme, "badgeVariants">({
  themeKey: "badgeVariants",
  defaults: {
    borderRadius: "l",
    px: "m",
    py: "s",
  },
});

export const bookCardVariant = createVariant<Theme, "bookCardVariants">({
  themeKey: "bookCardVariants",
  defaults: {},
});

export const badgeTextVariant = createVariant<Theme, "badgeTextVariants">({
  themeKey: "badgeTextVariants",
  defaults: {
    fontSize: 14,
  },
});

export default theme;

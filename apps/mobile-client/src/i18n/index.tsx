import { use } from "i18next";
import { initReactI18next } from "react-i18next";

export type Language = "en" | "fi";

const resources = {
  en: {
    translation: {
      homeScreen: {
        title: "Home",
      },
      profileScreen: {
        welcome: "Hi, User",
        borrowedBooksDetails: "You have {{count}} borrowed books currently",
        borrowedBooks: "Borrowed books",
        seeAllBorrowedBooks: "See all",
        settings: "Settings",
        account: "Account",
        securityAndPrivacy: "Security and privacy",
        logout: "Logout",
      },
      searchScreen: {
        searchInputPlaceHolder: "Search",
        searchTitle: "Search",
        suggestions: "Suggestions",
      },
      libraryScreen: {
        popular: "Popular",
        featured: "Featured",
        all: "All books",
        showMore: "Show more",
        title: "Library",
      },
      bottomTabBar: {
        home: "Home",
        library: "Library",
        profile: "Profile",
        trending: "Trending",
      },
      bookMeta: {
        rate: "Rate",
        numOfPages: "Pages",
        language: "Lng",
        isAvaliable: {
          true: "Avaliable",
          false: "Not avaliable",
        },
        overview: "Overview",
      },
      rent: {
        rent: "Rent",
      },
    },
  },
  fi: {},
};

use(initReactI18next).init({
  resources,
  lng: "en",
  compatibilityJSON: "v3",
  debug: true,
});

export { default } from "i18next";

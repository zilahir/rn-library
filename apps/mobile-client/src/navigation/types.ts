import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Book } from "pikkukirjasto-types/types/book";

export type RootStackParamList = {
  Root: undefined;
  Book: { book: Book };
  BorrowBook: { book: Book };
  Search: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Trending: undefined;
  Library: undefined;
  Borrow: undefined;
};

type CombinedStackParamList = RootStackParamList & BottomTabParamList;

export type RootTabScreenProps<Screen extends keyof CombinedStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<CombinedStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { BottomTabParamList } from "@app/navigation/types";

const icons: Record<
  keyof BottomTabParamList,
  ComponentProps<typeof Feather>["name"]
> = {
  Home: "home",
  Profile: "user",
  Trending: "trending-up",
  Library: "book-open",
  Borrow: "book",
};

export default icons;

import { ReactElement } from "react";
import { ActivityIndicator } from "react-native";

/**
 * @returns {ReactElement} - react component
 * @description - renders a loader
 */
function Loader(): ReactElement {
  return <ActivityIndicator testID="loader" />;
}

export default Loader;

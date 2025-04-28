import { ThemeProvider } from "@shopify/restyle";
import { ReactElement } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import ApiClientProvider from "@app/components/ApiClientProvider";
import Navigation from "@app/navigation";
import theme from "@app/theme";
import LocalizationProvider from "@app/LocalizationProvider";
import AssetProvider from "@app/components/AssetsProvider";

const styles = StyleSheet.create({
  getStureHandlerRootContainer: {
    flex: 1,
  },
});

/**
 * @returns {ReactElement} ReactElement to be rendered
 * @description The root component of the application
 */
function App(): ReactElement {
  return (
    <GestureHandlerRootView style={[styles.getStureHandlerRootContainer]}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider>
          <ApiClientProvider>
            <AssetProvider>
              <Navigation />
            </AssetProvider>
          </ApiClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;

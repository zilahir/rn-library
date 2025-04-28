import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { ReactElement, useCallback } from "react";
import { View, StyleSheet } from "react-native";

interface IAssetProvider {
  children: ReactElement;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SplashScreen.preventAutoHideAsync();

/**
 *
 * @param {object} root0 - props
 * @param {ReactElement} root0.children ReactElement to be wrapped by the provider
 * @returns {ReactElement} ReactElement wrapped by the provider
 */
function AssetProvider({ children }: IAssetProvider): ReactElement | null {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    SplashScreen.preventAutoHideAsync();
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={[styles.container]} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
}

export default AssetProvider;

import { useState } from "react";
import { StatusBar } from "react-native";
import { Baloo2_700Bold, useFonts } from "@expo-google-fonts/baloo-2";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { THEME } from "@themes/index";

import { SplashAnimated } from "@screens/SplashAnimated";
import { Loading } from "@components/Loading";
import { Home } from "@screens/Home";

export default function App() {
  const [closeSplash, setCloseSplash] = useState(false);

  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Roboto_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <Loading spinnerColor="#D7D5D5" size={30} />;
  }

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        {closeSplash ? (
          <Home />
        ) : (
          <SplashAnimated unMountSplashScreen={setCloseSplash} />
        )}
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

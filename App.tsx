import { useState  } from "react";
import { StatusBar , StatusBarProps} from "react-native";
import { Baloo2_700Bold, useFonts } from "@expo-google-fonts/baloo-2";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { THEME } from "@themes/index";
import { NavigationContainer } from "@react-navigation/native";

import { SplashAnimated } from "@screens/SplashAnimated";
import { Loading } from "@components/Loading";
import { Home } from "@screens/Home";
import { MapViewScreen } from "@screens/MapViewScreen";
import { ProductScreen } from "@screens/ProductScreen";
import { OrderConfirm } from "@screens/OrderConfirm";
import { CartScreen } from "@screens/CartScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Routes } from "@routes/index";

export default function App() {
  const [closeSplash, setCloseSplash] = useState(false);
  const [isBackgroundDark, setIsBackgroundDark] = useState(false);
 



  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <Loading spinnerColor="#D7D5D5" size={30} />;
  }

  return (
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NativeBaseProvider theme={THEME}>
              <SafeAreaProvider>
                <StatusBar
                  barStyle='default'
                  backgroundColor="transparent"
                  translucent
                />

                {closeSplash ? (
                  <Routes />
                ) : (
                  <SplashAnimated
                    darkTopBackgroundColor={setIsBackgroundDark}
                    unMountSplashScreen={setCloseSplash}
                  />
                )}
              </SafeAreaProvider>
            </NativeBaseProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
  );
}

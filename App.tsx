import {  StatusBar } from 'react-native';
import { Baloo2_700Bold, useFonts } from '@expo-google-fonts/baloo-2';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { THEME } from '@themes/index';


import { SplashAnimated } from '@screens/SplashAnimated';
import { Loading } from '@components/Loading';


export default function App() {
  
  const [ fontsLoaded ] = useFonts({
    Baloo2_700Bold,
    Roboto_700Bold,
    Roboto_400Regular
  });

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar 
          barStyle='dark-content'
          backgroundColor='transparent'
          translucent/>

          { !fontsLoaded ?
            <Loading 
              spinnerColor='base.gray400'
              size='md'
              /> :
              <SplashAnimated/> 
          }
     
      </NativeBaseProvider>
  </SafeAreaProvider>
  );
}


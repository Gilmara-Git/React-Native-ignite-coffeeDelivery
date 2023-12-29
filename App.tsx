import { StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { SplashAnimated } from '@screens/SplashAnimated';
import { NativeBaseProvider , Box, Text, View } from 'native-base';
import { Baloo2_700Bold, useFonts } from '@expo-google-fonts/baloo-2';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { THEME } from './src/themes';


export default function App() {
  
  const [ fontsLoaded ] = useFonts({
    Baloo2_700Bold,
    Roboto_700Bold,
    Roboto_400Regular
  });

  if(!fontsLoaded){
    return <ActivityIndicator />
  };


  return (
  <NativeBaseProvider theme={THEME}>
    <StatusBar 
      barStyle={'dark-content'} 
      backgroundColor='transparent'
      translucent/>
      
    <View style={styles.container}>
      <View style={{alignItems: 'center',
    justifyContent: 'center',}}>

      <Text style={{
        fontFamily: THEME.fonts.baloo2_bold, 
        fontSize: THEME.fontSizes.title_Sm,
        backgroundColor: THEME.colors.white,
        paddingTop: 6
        
      }}>
        Hello Coffee Delivery people
      </Text>
          </View>
    </View>
  </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.product['purple-dark'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

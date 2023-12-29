import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SplashAnimated } from './src/screens/SplashAnimated';
import { NativeBaseProvider , Box } from 'native-base';
import { THEME } from './src/themes';

export default function App() {
  return (
  <NativeBaseProvider theme={THEME}>
    <Box>Hello Coffee Delivery people</Box>
  </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

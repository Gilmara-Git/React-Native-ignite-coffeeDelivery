import { useEffect , useState } from 'react';
import { SafeAreaView , Alert} from 'react-native';
import { Header } from '@components/Header';

import Animated , { useSharedValue, StretchInY, Easing, ZoomInEasyUp , ZoomInEasyDown} from 'react-native-reanimated';
const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);
import MapView , { Marker }from 'react-native-maps';
import * as Location from 'expo-location';


type RegionProps = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export const MapViewScreen =()=>{
    const [ region, setRegion ] = useState<RegionProps>({
        latitude: 40.752655,
        longitude: -73.977925,
        latitudeDelta: 0.08,
        longitudeDelta: 0.04});


const [ userLocation, setUserLocation ] = useState({})


    const scrollY = useSharedValue(0);

    // useEffect(() => {
    //     darkTopBackgroundColor(true);
    //   }, []);

     // the function on this useEffect is just to get the accurate user's device location
     // but I am not using it here, just wanted to test it
      useEffect(()=>{
        (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync();
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.04
             })
            //  console.log(location.coords.latitude,
            //     location.coords.longitude, 'linha66')

             Location.enableNetworkProviderAsync();

          })();
      },[])

    
    return (
        <AnimatedSafeArea style={{ backgroundColor:'#272221', flex:1}}>
            <Animated.View style={{ paddingTop: 12}}>

            </Animated.View>
            <Animated.View 
                entering={StretchInY.duration(400).easing(Easing.ease)}
                style={{ backgroundColor: '#403937', flex:1}}>
                <MapView 
                    region={region}
                    style={{width: '100%', height: '100%'}}
                    >



                    <Marker 
                        coordinate={region}
                        title='Marker'
                        pinColor='#a91d65'
                        // image={{uri: AmericanEspresso}}
                        />
                        </MapView>
            </Animated.View>


        </AnimatedSafeArea>
    )
};
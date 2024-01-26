import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { ProductScreen } from '@screens/ProductScreen';
import { CartScreen } from '@screens/CartScreen';
import { MapViewScreen } from '@screens/MapViewScreen';
import { OrderConfirm } from '@screens/OrderConfirm';


type IRoutesType = {
    splashAnimated: undefined,
    home:undefined,
    productScreen:{
        id: number,
    },
    cartScreen: undefined,
    orderConfirm: undefined,
    mapViewScreen: undefined,
}

export type IRoutesNavigationParams = NativeStackNavigationProp<IRoutesType>

export const AppRoutes =()=>{
    const { Navigator, Screen } =  createNativeStackNavigator<IRoutesType>();


    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
          
            <Screen name='home' component={Home} options={{ 
                    // statusBarStyle: 'light'  ,
                    statusBarTranslucent: true ,
                    
                }}/>
            <Screen name='productScreen' component={ProductScreen}
                options={{
                    title: '',
                    statusBarTranslucent: true,
                    headerTitleAlign: 'center',
                    headerStyle:{
                        backgroundColor: '#272221'
                    },
               
                  
                }}

            />
            <Screen name='cartScreen' component={CartScreen} 
                options={{
                    headerShown: true,
                    title: 'Cart Screen',
                    headerTintColor: '#574F4D',
                    headerTitleStyle:{
                        fontFamily: 'Baloo2_700Bold',
                        fontSize: 16,  
                    },
                    headerTitleAlign: 'center',        
                    headerBackTitleStyle:{
                        fontFamily: 'Baloo2_700Bold'
                    },
                    headerStyle:{
                        backgroundColor: '#F3F2F2',
                        
                    }, 
                    // statusBarStyle: 'dark' ,
                    statusBarTranslucent: true ,
                }}/>
            <Screen name='orderConfirm' component={OrderConfirm}/>
            <Screen name='mapViewScreen' component={MapViewScreen} 
                options={{
                    headerShown: true,
                    title: 'Coffee Delivery, NY',
                    headerTintColor: '#FAFAFA',
                    headerTitleStyle:{
                        fontFamily: 'Baloo2_700Bold',
                        fontSize: 16,    
                    }, 
                    headerTitleAlign: 'center',
                    headerBackTitleStyle:{
                        fontFamily: 'Baloo2_700Bold'
                    },
                    headerStyle:{
                        backgroundColor: '#272221',
                        
                    },
                    statusBarTranslucent: true,
                }}
            />
        </Navigator>
    )

};
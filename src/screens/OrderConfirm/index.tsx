import { useEffect } from 'react';
import { VStack, Heading, Text , View, useToast  } from 'native-base';
import { SafeAreaView, StatusBar } from 'react-native';
import Illustration from '@assets/illustration.png';
import Animated, { LightSpeedInLeft , Easing} from 'react-native-reanimated';
import { SizeButton } from '@components/SizeButton';


import { useNavigation, useRoute } from '@react-navigation/native';
import {IRoutesNavigationParams } from '@routes/app.routes';
import { useCart } from "@contexts/useCart";


const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);

type OrderParams = {
    orderNumber: string;
    orderTotal: number;
}

export const OrderConfirm = ()=>{
    const { clearCart }  =  useCart();
    const toast = useToast();

    const { navigate } = useNavigation<IRoutesNavigationParams>();
    const route = useRoute();
    const { orderNumber, orderTotal } = route.params as OrderParams;

    const returnHome =()=>{
        navigate('home');
    };
    
    useEffect(()=>{
        toast.show({
            title:`Order Number: ${orderNumber}` ,
            description: `Total: $ ${orderTotal.toFixed(2)}`,
            duration: 3500,
            placement: 'top',
            backgroundColor: '#008000'
        })
        clearCart();

    },[])

    return (
        <AnimatedSafeArea style={{ backgroundColor: 'base.gray900', flex:1,  alignItems: 'center', justifyContent: 'center' }}>
             <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

            <VStack px={4} alignItems='center' justifyContent='center'>
                <Animated.Image 
                    entering={LightSpeedInLeft.duration(1000).easing(Easing.ease)}
                    source={Illustration} 
                    alt='Delivery Motorcycle'
                    />


                <Heading
                    fontFamily='baloo2_bold'
                    fontSize='title_Lg'
                    color='product.yellow_dark'
                    mt={9}
                    mb={2}
                >Yup! Order is confirmed</Heading>
                <View width={60}>
                <Text
                    fontFamily='roboto_regular'
                    fontSize='text_Sm'
                    color='base.gray200'
                    numberOfLines={2}
                    mb={12}
                   textAlign='center'
                    
                >Hang in there, your coffee will get to you soon!
                </Text>

                </View>

                <SizeButton  
                    onPress={returnHome}
                    title='Back home' 
                    color='base.white'   
                    height={11} 
                    width={60}
                    bg='product.dark_purple'
                    pressedColor='product.brand_purple'
                    
                    />

            </VStack>

        </AnimatedSafeArea>
    )
};
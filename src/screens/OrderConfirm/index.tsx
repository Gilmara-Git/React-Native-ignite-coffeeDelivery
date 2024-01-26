import { useEffect } from 'react';
import { VStack, Heading, Text, Image, View  } from 'native-base';
import { SafeAreaView } from 'react-native';
import Illustration from '@assets/illustration.png';
import Animated, { LightSpeedInLeft , Easing} from 'react-native-reanimated';
import { SizeButton } from '@components/SizeButton';


import { useNavigation } from '@react-navigation/native';
import {IRoutesNavigationParams } from '@routes/app.routes';

const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);


export const OrderConfirm = ()=>{

    const { navigate } = useNavigation<IRoutesNavigationParams>();

    const returnHome =()=>{
        navigate('home');
    };
    
    return (
        <AnimatedSafeArea style={{ backgroundColor: 'base.gray900', flex:1,  alignItems: 'center', justifyContent: 'center' }}>
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
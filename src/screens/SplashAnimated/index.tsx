import { View , Image, Center, HStack} from 'native-base';
import coffeeCup from '@src/assets/vector.png';
import coffeeDelivery from '@src/assets/coffeeDelivery.png';

export const SplashAnimated =()=>{
    return(
    <View 
        flex={1} 
        backgroundColor='product.brand_purple'
        >
            <Center flex={1}>
                <HStack >
                    <Image source={coffeeCup} alt='Coffee Cup' width='44' height='68' mr='5'/>
                    <Image source={coffeeDelivery} alt='Coffee Cup' width='95' height='71'/>
                </HStack>

            </Center>

    </View>
    )
};
import { useEffect, useState } from "react";
import {
  VStack,
  HStack,
  IconButton,
  Icon,
  Heading,
  View,
  Text,
} from "native-base";

import Animated, { useSharedValue } from "react-native-reanimated";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { CartItem } from "@components/CartItem";
import { SizeButton } from "@src/components/SizeButton";
import { EmptyCart } from '@components/EmptyCart';

import Swipeable from 'react-native-gesture-handler/Swipeable';

interface CartScreenProps {
  darkTopBackgroundColor: (nuance: boolean) => void;
}

export const CartScreen = ({ darkTopBackgroundColor }: CartScreenProps) => {
  const scrollY = useSharedValue(0);
  const [ cart, setCart]  = useState([])
  console.log(cart.length, 'linha25')

  const handleRemove = ()=>{
    console.log('I was swiped')
  }

  useEffect(() => {
    darkTopBackgroundColor(false);
  }, []);

  return (
    <VStack bg="base.gray900" flex={1}>
      <HStack
        px={4}
        pt={10}
        pb={8}
        alignItems="center"
        justifyContent="space-around"
      >
        <IconButton
          icon={
            <Icon
              as={Fontisto}
              name="arrow-left"
              size={3}
              color="base.gray100"
            />
          }
          _pressed={{
            bg: "base.gray800",
          }}
        />
        <View flex={1} alignItems="center">
          <Heading fontFamily="baloo2_bold" fontSize="title_Sm">
            Cart Items
          </Heading>
        </View>
      </HStack>

      { !cart.length ? 
      
      <EmptyCart />
      
      
      :
    

      <Swipeable
      // ref={} 
        containerStyle={{ borderTopLeftRadius:8, borderBottomLeftRadius:8, }}
        onSwipeableOpen={handleRemove}
        overshootLeft={false}
        renderLeftActions={()=>(
          <HStack bg='feedback.red_light' width='35%' alignItems='center' justifyContent='flex-start' px={6}>
             <IconButton 
              onPress={handleRemove}
              _pressed={
                {
                    backgroundColor: 'product.light_purple',
                }
              } 
              
              icon={ 
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='trash-can-outline'
                        color='feedback.red_dark'
                        size={7} 
                        />
                     
                    }/>

          </HStack>
  )}  
      >
        <CartItem />

      </Swipeable>
          }


      <VStack style={{  shadowColor: 'base.gray400', shadowOffset: { width: 19, height: 6 }, shadowRadius: 5, shadowOpacity: 0.6, elevation: 10}}
        position='absolute'
        bottom={0}
        p={8}
        justifyContent="center"
        alignContent="center"
        bg="base.white"
        width='100%'
      
      >
        <HStack justifyContent="space-between" alignContent="center" mb={4}>
          <Text
            fontFamily="roboto_regular"
            fontSize="text_Md"
            color="base.gray200"
          >
            Total
          </Text>
          <Text
            fontFamily="baloo2_bold"
            fontSize="title_Md"
            color="base.gray200"
          >
            $9.90
          </Text>
        </HStack>

        <HStack shadow={1}>
          <SizeButton
            height={11}
            width={74}
            bg="product.yellow_dark"
            title="Confirm order"
            color="base.white"
            pressedColor="product.yellow"
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

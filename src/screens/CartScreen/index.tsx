import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
  VStack,
  HStack,
  IconButton,
  Icon,
  Heading,
  View,
  Text,
  ScrollView
} from "native-base";

import Animated, { useSharedValue } from "react-native-reanimated";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { CartItem } from "@components/CartItem";
import { SizeButton } from "@src/components/SizeButton";
import { EmptyCart } from "@components/EmptyCart";

import Swipeable from "react-native-gesture-handler/Swipeable";

import { useNavigation } from '@react-navigation/native';
import {IRoutesNavigationParams } from '@routes/app.routes';

import { useCart  } from '@contexts/useCart';


export const CartScreen = () => {
  const scrollY = useSharedValue(0);


  const { cart, clearCart, cartTotal, generateCartTotal} = useCart();



  const handleRemove = () => {
    console.log("I was swiped");
  };

 

  const { navigate} = useNavigation<IRoutesNavigationParams>();

  const directToOrder = ()=>{

    // register the order details  and think of creating an order page
    // clear cart
    clearCart();
    navigate('orderConfirm')
  };

  useEffect(()=>{
    generateCartTotal()
  }, [cart])
//add StatusBar here because it is asking to manipulate an IOS file when trying to configure it through routes/app.routes.tsx
  return (
    <VStack bg="base.gray900" flex={1}>
    
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent' 
        translucent/>
     
      {!cart.length ? (
        <EmptyCart />
      ) : (

        
        
        <ScrollView 
          contentContainerStyle={{  height: "130%", }}
          showsVerticalScrollIndicator={false}
          >
        <Swipeable
          // ref={}
          containerStyle={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          onSwipeableOpen={handleRemove}
          overshootLeft={false}
          renderLeftActions={() => (
            <HStack
              bg="feedback.red_light"
              width="35%"
              alignItems="center"
              justifyContent="flex-start"
              px={6}
            >
              <IconButton
                onPress={handleRemove}
                _pressed={{
                  backgroundColor: "product.light_purple",
                }}
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    name="trash-can-outline"
                    color="feedback.red_dark"
                    size={7}
                  />
                }
              />
            </HStack>
          )}
        >

          {cart.map((coffee, index) =>{
           return  <CartItem 
                      key={index}
                      id={coffee.id}
                      imgSrc={coffee.imgSrc} 
                      title={coffee.title}
                      price={coffee.price}
                      size={coffee.coffeeDetails[0].size}
                      quantity={coffee.coffeeDetails[0].quantity}
              

                      />

          })}

      
         
          

        </Swipeable>




        
        </ScrollView>
      )}

      <VStack
        style={{
          shadowColor: "base.gray400",
          shadowOffset: { width: 10, height: 10 },
          shadowRadius: 5,
          shadowOpacity: 0.6,
          elevation: 10,
        
        }}
        position="absolute"
        bottom={0}
        p={8}
        justifyContent="center"
        alignContent="center"
        bg="base.white"
        width="100%"
      >
         
        <HStack justifyContent="space-between" alignContent="center" mb={4} >
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
             $ {cartTotal.toFixed(2)}
          </Text>
        </HStack>

        <HStack shadow={1}>
          <SizeButton
          onPress={directToOrder}
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

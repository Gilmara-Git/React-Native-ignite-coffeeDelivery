import { useEffect, useRef } from "react";
import { StatusBar , Alert } from "react-native";
import {
  VStack,
  HStack,
  IconButton,
  Icon,
  Text,
  ScrollView,
} from "native-base";

import Animated, { SlideInRight, SlideOutRight  } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CartItem } from "@components/CartItem";
import { SystemButton } from "@src/components/SystemButton";
import { EmptyCart } from "@components/EmptyCart";

import Swipeable from "react-native-gesture-handler/Swipeable";

import { useNavigation } from "@react-navigation/native";
import { IRoutesNavigationParams } from "@routes/app.routes";

import { useCart } from "@contexts/useCart";
import { Audio } from 'expo-av';

export const CartScreen = () => {

  const { cart, cartTotal, generateCartTotal, removeCoffee } = useCart();
  const orderNumberControl : string[] = [];


  const swipeableRefs =  useRef<Swipeable[]>([]);


  const handleRemove = (cartItemId: string, index: number ) => {
    
    swipeableRefs.current?.[index].close();

    Alert.alert('Delete Item? ','Please confirm your cancel!',[
      {
        text: 'Confirm', onPress:()=> removeCoffee(cartItemId)
      },
      { text: 'Cancel', style: 'cancel'}
    ])
    


  };

  const { navigate } = useNavigation<IRoutesNavigationParams>();

  const playSound = async()=>{
    const fileToPlay = require('../../assets/success.mp3');
  
    try{
      const { sound } = await Audio.Sound.createAsync(fileToPlay, { shouldPlay: true});

    
      await sound.setPositionAsync(0);
      await sound.playAsync();
  
    }catch(error){
      console.log(error)
  
    }
   
    
  }


  const handleToOrder = async() => {

    await playSound();
   
    orderNumberControl.push('CF');

    navigate("orderConfirm", { 
      orderTotal: cartTotal, 
      orderNumber: 'CoffeeOrder- ' + String(orderNumberControl.length - 1) +  String(orderNumberControl.length ) });
  };

  useEffect(() => {
    generateCartTotal();
  }, [cart]);
  //add StatusBar here because it is asking to manipulate an IOS file when trying to configure it through routes/app.routes.tsx
  return (
    <VStack bg="base.gray900" flex={1}>
      <StatusBar
        barStyle="dark-content"
        translucent
     
      />

      {!cart.length ? (
        <EmptyCart />
      ) : (
        <ScrollView
          contentContainerStyle={{ height: "130%" }}
          showsVerticalScrollIndicator={false}
        >
          { cart.map((coffee, index)=>{
            return (
          <Swipeable
            key={coffee.cartItemId}
            ref={(ref)=>{
              if(ref){
                swipeableRefs.current.push(ref)
              }
            }}
            containerStyle={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            onSwipeableOpen={()=>handleRemove( coffee.cartItemId, index)}
            overshootLeft={false}
            renderRightActions={()=>null}
            leftThreshold={10}
            renderLeftActions={() => (
              <HStack
                bg="feedback.red_light"
                width="35%"
                alignItems="center"
                justifyContent="flex-start"
                px={6}
              >
                <IconButton
                  onPress={()=>handleRemove( coffee.cartItemId, index)}
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
              <Animated.View
                // layout={Layout.springify()}
                entering={SlideInRight.duration(300)}
                exiting={SlideOutRight.duration(300)}
               >
               <CartItem
                  key={coffee.cartItemId}
                  id={coffee.id}
                  imgSrc={coffee.imgSrc}
                  title={coffee.title}
                  price={coffee.price}
                  size={coffee.coffeeDetails[0].size}
                  quantity={coffee.coffeeDetails[0].quantity}
                  cartItemId={coffee.cartItemId}
                />

              </Animated.View>
        
          </Swipeable>


            )
          })}
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
            $ {cartTotal.toFixed(2)}
          </Text>
        </HStack>

        <HStack shadow={1}>
          <SystemButton
            onPress={handleToOrder}
            height={11}
            width={74}
            bg="product.yellow_dark"
            title="Confirm order"
            color="base.white"
            pressedColor="product.yellow"
            isDisabled={cart.length===0}
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

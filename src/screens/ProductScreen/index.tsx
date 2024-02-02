import { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  IconButton,
  Icon,
  Text,
  Box,
  useToast,
  View
} from "native-base";
import Animated, { FlipInXUp, Keyframe } from "react-native-reanimated";

import Smoke from "@assets/smoke.png";
import CoffeeMug from "@assets/coffeeMug.png";
import { SizeButton } from "@components/SizeButton";

import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { IRoutesNavigationParams } from "@routes/app.routes";
import { flatList_DATA as database } from "@utils/coffeeData";
import { Loading } from "@components/Loading";
import { useCart } from "@contexts/useCart";
import { ImageSourcePropType } from "react-native";
import { Skia , Canvas, Path , useValue , runTiming, runSpring  } from '@shopify/react-native-skia';

type ProductParams = {
  coffeeId: number;
};

type coffeeProductType = {
  label: string;
  title: string;
  description: string;
  price: string;
  imgSrc: ImageSourcePropType;
};

export const ProductScreen = () => {
  const [coffee, setCoffee] = useState<coffeeProductType>();
  const [loading, setLoading] = useState(false);
  const [coffeeSize, setCoffeeSize] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [readyToOrder, setReadyToOrder] = useState(false);

  const { cart, addCoffee } = useCart();
  const  pathEnd  = useValue(0);
  const { params } = useRoute();
  const { coffeeId } = params as ProductParams;

  const toast = useToast();
  const { goBack, navigate } = useNavigation<IRoutesNavigationParams>();
  const SIZE = 18;
  const SIZE_X = 26;
  const SIZE_Y = 22;
  const STROKE = 2;
  const RADIUS = (SIZE - STROKE)/2;

  const path = Skia.Path.Make();
  path.addCircle(SIZE_X,SIZE_Y, RADIUS);


  const handleCoffeeSize = (size: string) => {
    setCoffeeSize(size);
  };

  const handleReturnHome = () => {
    goBack();
  };

  const goCart = () => {
    navigate("cartScreen");
  };

  const addItem = () => {
    const total = Number(coffee!.price) * qty;

    const item = {
      id: coffeeId,
      label: coffee!.label,
      imgSrc: coffee!.imgSrc,
      title: coffee!.title,
      description: coffee!.description,
      price: coffee!.price,
      coffeeDetails: [
        {
          size: coffeeSize,
          quantity: qty,
        },
      ],
      itemTotal: total,
      cartTotal: 0,
    };
    addCoffee(item);
  };

  const handleItemQty = (action: string) => {
    if (action === "plus") {
      setQty((prevState) => prevState + 1);
    }

    if (action === "minus" && qty > 0) {
      setQty((prevState) => prevState - 1);
    }
  };

  const AnimatedSmoke = new Keyframe({
    0: { opacity: 0, transform: [{ translateX: -5 }, { translateY: 0 }] },
    20: { opacity: 0.1, transform: [{ translateX: 5 }, { translateY: -5 }] },
    50: { opacity: 0.6, transform: [{ translateX: -5 }, { translateY: -8 }] },
    70: { opacity: 0.7, transform: [{ translateX: 5 }, { translateY: -10 }] },
    100: { opacity: 1, transform: [{ translateX: 0 }, { translateY: -12 }] },
  })
    .delay(800)
    .duration(2000);

  useEffect(()=>{
    if(cart.length > 0) {
      // pathEnd.current = 1
      runTiming(pathEnd, 1, { duration: 800 })
    }else {
      // pathEnd.current = 0;
      runTiming(pathEnd, 0, { duration:800 } )
    }
  },[cart.length])

  useEffect(() => {
    if (coffeeSize !== "" && qty > 0) {
      setReadyToOrder(true);
    } else {
      setReadyToOrder(false);
    }
  }, [coffeeSize, qty]);

  useEffect(() => {
    try {
      setLoading(true);
      database.find((coffee) => {
        if (coffee.id === coffeeId) {
          setCoffee({
            label: coffee.label,
            price: coffee.price,
            description: coffee.description,
            title: coffee.title,
            imgSrc: coffee.imgSrc,
          });
        }
      });
    } catch (e) {
      console.log(e);
      toast.show({
        title: "Error",
        description: "Could not find coffee details, pleas try later.",
        duration: 3000,
        placement: "top",
        backgroundColor: "#C44117",
      });
      goBack();
    } finally {
      setLoading(false);
    }
  }, [coffeeId]);

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#000000" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: "130%",
      }}
    >
      {loading ? (
        <Loading size={15} spinnerColor="#FFFFFF" />
      ) : (
        <VStack bg="base.gray100" flex={1}>
          <HStack
            justifyContent="space-between"
            px={4}
            pt={8}
            alignItems="center"
          >
            <IconButton
              onPress={handleReturnHome}
              icon={
                <Icon
                  as={Fontisto}
                  name="arrow-left"
                  size={3}
                  color="#FFFFFF"
                />
              }
              _pressed={{
                bg: "base.gray200",
              }}
            />

<View>


            <IconButton
              onPress={goCart}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="cart"
                  size={5}
                  color={cart.length ? "#8047F8" : "#C47F17"}
                />
              }
              _pressed={{
                bg: "base.gray200",
              }}
            />
          <Canvas style={{ 
            height: SIZE *2, 
            width: SIZE * 2, 
            position: 'absolute',
            top: -16,
            right: 8
            
            }} >
            <Path 
                path={path}
                color='#8047F8'
                style='stroke'
                strokeWidth={STROKE}
                start={0}
                end={pathEnd}
            
            />



          </Canvas>
          {cart.length > 0  &&
          
          <Box 
            position='absolute'
            top={-2} 
            right={3}
        
          >

            <Text  
                color='base.white'
                fontSize='2xs'
                fontFamily='roboto_regular'
                >
                  {cart.length}
            </Text>
                  </Box>
          
          }
            </View>


          </HStack>

          <VStack px={4}>
            <HStack>
              <Box
                mt={6}
                mb={1}
                ml={2}
                bg="base.gray200"
                alignItems="center"
                rounded="xl"
                py={1}
                flexShrink={1}
                p={2}
              >
                <Text color="base.white">{coffee?.label}</Text>
              </Box>
            </HStack>

            <HStack px={4} justifyContent="space-between" alignItems="center">
              <Text
                fontFamily="baloo2_bold"
                fontSize="title_Lg"
                color="base.white"
              >
                {coffee?.title}
              </Text>
              <Text
                fontFamily="baloo2_bold"
                fontSize="title_Xl"
                color="product.yellow"
              >
                <Text fontFamily="roboto_regular" fontSize="text_Sm">
                  $
                </Text>{" "}
                {coffee?.price}
              </Text>
            </HStack>

            <HStack px={4}>
              <Text
                fontFamily="roboto_regular"
                fontSize="text_Md"
                color="base.gray500"
              >
                {coffee?.description}
              </Text>
            </HStack>

            <VStack mt={10} height="280" zIndex={1} alignItems="center">
              <Animated.Image
                entering={AnimatedSmoke}
                style={{ position: "absolute", top: -8 }}
                source={Smoke}
                alt="Coffee Smoke"
              />

              <Animated.Image
                entering={FlipInXUp.springify()
                  .damping(12)
                  .mass(1)
                  .stiffness(5)
                  .restDisplacementThreshold(0.1)
                  .restSpeedThreshold(2)}
                style={{
                  position: "absolute",
                  bottom: -47,
                  width: 290,
                  height: 260,
                }}
                source={CoffeeMug}
              />
            </VStack>
          </VStack>

          <VStack pt={9} px={4} bg="base.gray900" flexGrow={1} zIndex={-1}>
            <Text
              fontFamily="roboto_regular"
              fontSize="text_Sm"
              color="base.gray400"
            >
              Select the size
            </Text>

            <HStack justifyContent="space-between" pt={1}>
              <SizeButton
                title="114 oz"
                active={coffeeSize === "114"}
                color="base.gray300"
                pressedColor="base.gray600"
                height={10}
                bg="base.gray700"
                onPress={() => handleCoffeeSize("114 oz")}
              />
              <SizeButton
                title="140 oz"
                active={coffeeSize === "140 oz"}
                color="base.gray300"
                pressedColor="base.gray600"
                height={10}
                bg="base.gray700"
                onPress={() => handleCoffeeSize("140 oz")}
              />
              <SizeButton
                title="227 oz"
                active={coffeeSize === "227 oz"}
                color="base.gray300"
                pressedColor="base.gray600"
                height={10}
                bg="base.gray700"
                onPress={() => handleCoffeeSize("227 oz")}
              />
            </HStack>
            <Box mt={5} p={2} bg="base.gray700" rounded="md">
              <HStack
                alignItems="center"
                height={12}
                justifyContent="space-around"
              >
                <HStack
                  alignItems="center"
                  height={12}
                  justifyContent="space-around"
                >
                  <IconButton
                    icon={
                      <Icon
                        as={AntDesign}
                        name="minus"
                        size={5}
                        color="product.brand_purple"
                      />
                    }
                    _pressed={{ bg: "base.gray600" }}
                    onPress={() => handleItemQty("minus")}
                  />
                  <Text
                    fontFamily="roboto_regular"
                    fontSize="text_Md"
                    color="base.gray100"
                    px={2}
                  >
                    {qty}
                  </Text>
                  <IconButton
                    icon={
                      <Icon
                        as={AntDesign}
                        name="plus"
                        size={5}
                        color="product.brand_purple"
                      />
                    }
                    _pressed={{ bg: "base.gray600" }}
                    onPress={() => handleItemQty("plus")}
                  />
                </HStack>

                <HStack
                  alignItems="center"
                  height={12}
                  justifyContent="space-around"
                >
                  <SizeButton
                    title="ADD"
                    bg="product.dark_purple"
                    width={48}
                    color="base.white"
                    pressedColor="product.brand_purple"
                    height={11}
                    isDisabled={!readyToOrder}
                    onPress={addItem}
                    _disabled={{
                      backgroundColor: "base.gray300",
                    }}
                  />
                </HStack>
              </HStack>
            </Box>

            <HStack></HStack>
          </VStack>
        </VStack>
      )}
    </Animated.ScrollView>
  );
};

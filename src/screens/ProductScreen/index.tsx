import { useEffect } from "react";
import { ScrollView } from "react-native";
import {
  VStack,
  HStack,
  IconButton,
  IIconButtonProps,
  Icon,
  Text,
  Box,
  View,
} from "native-base";
import Animated, {
  FlipInXUp,
  Keyframe,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import Smoke from "@assets/smoke.png";
import CoffeeMug from "@assets/coffeeMug.png";
import { SizeButton } from "@components/SizeButton";

import { AntDesign } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

// title e label , description virão por parâmetros na rota
interface ProductScreenProps {
  darkTopBackgroundColor: (nuance: boolean) => void;
  // title: string;
  // label: string
  // descripton: string
}

export const ProductScreen = ({
  darkTopBackgroundColor,
}: ProductScreenProps) => {
  console.log("traditional".length);
  const labelLength = "sweet".length;
  const top = useSharedValue(-15);

  const AnimatedSmoke = new Keyframe({
    0: { opacity: 0, transform: [{ translateX: -5 }, { translateY: 0 }] },
    20: { opacity: 0.1, transform: [{ translateX: 5 }, { translateY: -5 }] },
    50: { opacity: 0.6, transform: [{ translateX: -5 }, { translateY: -8 }] },
    70: { opacity: 0.7, transform: [{ translateX: 5 }, { translateY: -10 }] },
    100: { opacity: 1, transform: [{ translateX: 0 }, { translateY: -12 }] },
  })
    .delay(800)
    .duration(2000);

  useEffect(() => {
    darkTopBackgroundColor(true);
  }, []);

  return (
    // Decider se vai usar este Header ou a da React Navigation

    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#000000" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: "130%",
      }}
    >
      <VStack bg="base.gray100" flex={1}>
        <HStack
          justifyContent="space-between"
          px={4}
          pt={8}
          alignItems="center"
        >
          <IconButton
            icon={
              <Icon as={Fontisto} name="arrow-left" size={3} color="#FFFFFF" />
            }
            _pressed={{
              bg: "base.gray200",
            }}
          />

          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="cart-heart"
                size={4}
                color="#FFFFFF"
              />
            }
            _pressed={{
              bg: "base.gray200",
            }}
          />
        </HStack>

        <VStack px={4}>
          <Box
            mt={6}
            mb={1}
            ml={2}
            bg="base.gray200"
            alignItems="center"
            rounded="xl"
            py={1}
            width={labelLength < 11 ? "25%" : "35%"}
          >
            <Text color="base.white">SWEET</Text>
          </Box>

          <HStack px={4} justifyContent="space-between" alignItems="center">
            <Text
              fontFamily="baloo2_bold"
              fontSize="title_Lg"
              color="base.white"
            >
              Irish
            </Text>
            <Text
              fontFamily="baloo2_bold"
              fontSize="title_Xl"
              color="product.yellow"
            >
              <Text fontFamily="roboto_regular" fontSize="text_Sm">
                $
              </Text>{" "}
              9.90
            </Text>
          </HStack>

          <HStack px={4}>
            <Text
              fontFamily="roboto_regular"
              fontSize="text_Md"
              color="base.gray500"
            >
              Coffee with a shot of Irish whiskey, sugar and whipped cream
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
              title="114oz"
              active={false}
              color="base.gray300"
              pressedColor="base.gray600"
              height={10}
            />
            <SizeButton
              title="140oz"
              active={false}
              color="base.gray300"
              pressedColor="base.gray600"
              height={10}
            />
            <SizeButton
              title="227oz"
              active={true}
              color="base.gray300"
              pressedColor="base.gray600"
              height={10}
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
                  onPress={() => console.log("Sou o ----")}
                />
                <Text
                  fontFamily="roboto_regular"
                  fontSize="text_Md"
                  color="base.gray100"
                  px={2}
                >
                  1
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
                  onPress={() => console.log("Sou o ----")}
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
                />
              </HStack>
            </HStack>
          </Box>

          <HStack></HStack>
        </VStack>
      </VStack>
    </Animated.ScrollView>
  );
};

import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import coffeeCup from "@src/assets/vector.png";
import coffeeDelivery from "@src/assets/coffeeDelivery.png";
import { View, Image, Center, HStack } from "native-base";
import Animated, {
  FadeInRight,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";

type SplashAnimatedProps = {
  unMountSplashScreen: (status: boolean) => void;
};

export const SplashAnimated = ({
  unMountSplashScreen,
}: SplashAnimatedProps) => {
  const [runAnimation, setRunAnimation] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const circleScale = useSharedValue(1.5);
  const marginLeft = useSharedValue(0);

  const stopAnimation = () => {
    marginLeft.value = 2.5;
    setTimeout(() => {
      SplashScreen.hideAsync();
      unMountSplashScreen(true);
    }, 1000);
  };

  const startAnimation = async () => {
    await new Promise((resolve) => {
      return resolve(
        setTimeout(() => {
          setRunAnimation(true);
        }, 1500)
      );
    });
  };

  const AnimatedCircle = useAnimatedStyle(() => {
    const circleRadius = screenWidth / 2;

    return {
      width: circleRadius,
      height: circleRadius,
      borderRadius: circleRadius,
      position: "absolute",
      top: screenHeight / 2.5,
      left: circleRadius / 2,
      backgroundColor: "#8047f8",
      opacity: 0.6,
      zIndex: 0,
      transform: [
        {
          scale: interpolate(
            circleScale.value,
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6]
          ),
        },
      ],
    };
  });

  useEffect(() => {
    circleScale.value = withTiming(6, { duration: 800, easing: Easing.ease });
    startAnimation();
  }, []);

  return (
    <View flex={1} backgroundColor="#4b2995">
      <Animated.View style={AnimatedCircle} />
      <Center flex={1}>
        <HStack>
          <View zIndex={1}>
            <Animated.View>
              <Image
                source={coffeeCup}
                alt="Coffee Cup"
                width="44"
                height="68"
                mr="2.5"
              />
            </Animated.View>
          </View>

          {runAnimation && (
            <Animated.View
              entering={FadeInRight.duration(900)
                .easing(Easing.ease)
                .withCallback(() => {
                  "worklet";
                  runOnJS(stopAnimation)();
                })}
            >
              <Image
                source={coffeeDelivery}
                alt="Coffee Cup"
                width="95"
                height="71"
              />
            </Animated.View>
          )}
        </HStack>
      </Center>
    </View>
  );
};

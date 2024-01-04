import { useEffect, useState } from "react";
import { Text, VStack, HStack, View, Image } from "native-base";
import { Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import coffeeBeans from "@assets/coffeeBeans.png";

type HomeProps = {
  darkTopBackgroundColor: (nuance: boolean) => void;
};

export const Home = ({ darkTopBackgroundColor }: HomeProps) => {
  const screenHeight = Dimensions.get("window").height;
  const [textValue, setTextValue] = useState("");

  const handleTextValue = (text: string) => {
    setTextValue(text);
  };

  const AnimatedTop = useAnimatedStyle(() => {
    return {
      height: screenHeight / 2.5,
      backgroundColor: "#272221",
    };
  });

  const AnimatedBottom = useAnimatedStyle(() => {
    return {
      alignItems: "center",
      justifyContent: "center",
      height: screenHeight / 2,
      backgroundColor: "#FAFAFA",
    };
  });

  useEffect(() => {
    darkTopBackgroundColor(true);
  }, []);

  return (
    <VStack width="full">
      <Header
        leftIcon="map-marker-alt"
        title="Elizabeth, NJ"
        rightIcon="shopping-cart"
      />

      <Animated.View style={AnimatedTop}>
        <HStack pt={12} px={8} alignItems="center" justifyContent="center">
          <View>
            <Text
              fontFamily="baloo2_bold"
              fontSize="title_Md"
              color="base.gray900"
            >
              Find the perfect coffee any time of the day.
            </Text>

            <Input
              value={textValue}
              onChangeText={handleTextValue}
              zIndex="1"
            />
            <View alignItems="flex-end" ml={2} bg="base.gray500">
              <Image
                position="absolute"
                right="-25"
                top="-1"
                source={coffeeBeans}
                alt="Coffee Beans"
                width="83"
                height="83"
              />
            </View>
          </View>
        </HStack>
      </Animated.View>

      <Animated.View style={AnimatedBottom}>
        <Text color="base.gray100">Bottom Content</Text>
      </Animated.View>
    </VStack>
  );
};

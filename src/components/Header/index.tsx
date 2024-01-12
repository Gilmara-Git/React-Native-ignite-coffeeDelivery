import { useEffect } from "react";
import { HStack, IconButton, Icon } from "native-base";

import { FontAwesome, Fontisto } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";

type HeaderProps = {
  leftIcon?: string;
  title: string;
  rightIcon?: string;
  scrollY: SharedValue<number>;
  opacityLine: SharedValue<number>;
};

export const Header = ({
  leftIcon,
  title,
  rightIcon,
  scrollY,
}: HeaderProps) => {
  const AnimatedDivisorLine = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [280, 400], [0, 1]),
    };
  });

  const AnimatedHeaderStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [280, 400],
        ["#272221", "#FAFAFA"]
      ),
    };
  });

  const AnimatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollY.value,
        [280, 400],
        ["#FAFAFA", "#272221"]
      ),
    };
  });

  return (
    <Animated.View style={AnimatedHeaderStyle}>
      <HStack p={4} alignItems="center" justifyContent="flex-start">
        <IconButton
          icon={<Icon as={Fontisto} name={leftIcon} size="5" color="#8047F8" />}
          onPress={() => {
            console.log("I was name pin");
          }}
        />
        <Animated.Text
          style={[
            {
              fontFamily: "Roboto_400Regular",
              fontSize: 16,
              flex: 1,
              marginLeft: -1,
            },
            AnimatedTextStyle,
          ]}
        >
          {title}
        </Animated.Text>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={FontAwesome}
                name={rightIcon}
                size="5"
                color="#C47F17"
              />
            }
            onPress={() => {
              console.log("I was name shopping cart");
            }}
          />
        </HStack>
      </HStack>

      <Animated.View
        style={[
          { height: 0.4, backgroundColor: "#D7D5D5" },
          AnimatedDivisorLine,
        ]}
      />
    </Animated.View>
  );
};

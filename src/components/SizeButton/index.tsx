import { useEffect } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "native-base";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

type SizeButton = TouchableOpacityProps & {
  title: string;
  applyRedBorder: boolean;
  isChecked: boolean;
};

export const SizeButton = ({
  title,
  applyRedBorder,
  isChecked,
  ...rest
}: SizeButton) => {
  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
  const hasNoSize = useSharedValue(0);
  const checkedSize = useSharedValue(0);
  const scaleButtonSize = useSharedValue(1);

  const AnimatedBorderError = useAnimatedStyle(() => {
    return {
      borderWidth: hasNoSize.value === 0 ? 0 : 2,
      borderColor: interpolateColor(
        hasNoSize.value,
        [0, 1],
        ["transparent", "#E8BAAB"]
      ),
      backgroundColor: interpolateColor(
        hasNoSize.value,
        [0, 1],
        ["#EDEDED", "#FAFAFA"]
      ),
    };
  });

  const AnimatedBorderCoffeeSelected = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        checkedSize.value,
        [0, 1],
        ["#EDEDED", "#FAFAFA"]
      ),
      borderWidth: checkedSize.value === 0 ? 0 : 1.5,
      borderColor: interpolateColor(
        checkedSize.value,
        [0, 1],
        ["transparent", "#4B2995"]
      ),
      transform: [
        {
          scale: scaleButtonSize.value,
        },
      ],
    };
  });

  useEffect(() => {
    hasNoSize.value = withTiming(applyRedBorder ? 1 : 0, { duration: 700 });
  }, [applyRedBorder]);

  useEffect(() => {
    checkedSize.value = withTiming(isChecked ? 1 : 0, { duration: 700 });
    scaleButtonSize.value = withTiming(isChecked ? 1.05 : 1);
  }, [isChecked]);

  return (
    <AnimatedButton
      style={[
        AnimatedBorderError,
        AnimatedBorderCoffeeSelected,
        {
          height: 40,
          width: "30%",
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EDEDED",
        },
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      <Text fontFamily="roboto_regular" fontSize="text_Sm" color="base.gray300">
        {title.toUpperCase()}
      </Text>
    </AnimatedButton>
  );
};

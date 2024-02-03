import { HStack, IconButton, Icon } from "native-base";

import { FontAwesome, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";

import { useNavigation } from "@react-navigation/native";
import { IRoutesNavigationParams } from '@routes/app.routes';

type HeaderProps = {
  leftIcon?: string;
  title: string;
  rightIcon?: string;
  scrollY: SharedValue<number>;
  // opacityLine?: SharedValue<number>;
  size: string
};

export const Header = ({
  leftIcon,
  title,
  rightIcon,
  scrollY,
  size
}: HeaderProps) => {

  const {navigate} = useNavigation<IRoutesNavigationParams>();

  const handleGoMapView =()=>{
    navigate('mapViewScreen')
  };


  const handleGoCart =()=>{
    navigate('cartScreen')
  };

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
       
          icon={<Icon as={Fontisto} name={leftIcon} size={size} color="#8047F8" />}
          onPress={handleGoMapView}
          _pressed={{
            bg:'transparent'
          }}
        />
        <Animated.Text
          style={[
            {
              fontFamily: 'Baloo2_700Bold',
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
                as={MaterialCommunityIcons}
                name={rightIcon}
                size="5"
                color="#C47F17"
              />
              
            }
            onPress={handleGoCart}
            _pressed={{
              bg:'transparent'
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

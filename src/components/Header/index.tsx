import { useEffect } from 'react';
import { HStack, IconButton, Icon, Box, Text  } from "native-base";

import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";

import { useNavigation } from "@react-navigation/native";
import { IRoutesNavigationParams } from '@routes/app.routes';
import { useCart } from '@contexts/useCart';
import { Skia , Canvas, Path , useValue , runTiming } from '@shopify/react-native-skia';


type HeaderProps = {
  leftIcon?: string;
  title: string;
  rightIcon?: string;
  scrollY: SharedValue<number>;
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
  const { cart }  = useCart();
  const  pathEnd  = useValue(0);

  const SIZE = 18;
  const SIZE_X = 26;
  const SIZE_Y = 22;
  const STROKE = 2;
  const RADIUS = (SIZE - STROKE)/2;

  const path = Skia.Path.Make();
  path.addCircle(SIZE_X,SIZE_Y, RADIUS);


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


  useEffect(()=>{
    if(cart.length > 0) {
      // pathEnd.current = 1
      runTiming(pathEnd, 1, { duration: 800 })
    }else {
      // pathEnd.current = 0;
      runTiming(pathEnd, 0, { duration:800 } )
    }
  },[cart.length])
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
                color={cart.length ? "#8047F8" : "#C47F17"}
              />
              
            }
            onPress={handleGoCart}
            _pressed={{
              bg:'transparent'
            }}
          />
         <Canvas
                style={{
                  height: SIZE * 2,
                  width: SIZE * 2,
                  position: "absolute",
                  top: -16,
                  right: 8,
                }}
              >
                <Path
                  path={path}
                  color="#8047F8"
                  style="stroke"
                  strokeWidth={STROKE}
                  start={0}
                  end={pathEnd}
                />
              </Canvas>
              {cart.length > 0 && (
                <Box position="absolute" top={-3} right={3}>
                  <Animated.Text
                    style={[
                      {  
                        color:"base.white",
                      fontSize:12,
                      fontFamily:"Roboto_400Regular" }, AnimatedTextStyle]}
                   
                  >
                    {cart.length}
                  </Animated.Text>
                </Box>
              )}

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

import { useEffect } from 'react';
import { Pressable, IPressableProps } from "native-base";
import Animated, { useSharedValue, interpolateColor, useAnimatedStyle , withTiming, Easing} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CoffeeCategoriesProps = IPressableProps & {
  category: string;
  active: boolean;

};

export const CoffeeCategories = ({
  category,
  active,

  ...rest
}: CoffeeCategoriesProps) => {

    const colorActive = useSharedValue(0);

    const AnimatedTextStyle = useAnimatedStyle(()=>{
        return {
            color: withTiming(interpolateColor(
                colorActive.value, 
                [0,1], 
                ['#8047F8','#FFFFFF'],
               
                ),
                { duration: 200, easing: Easing.ease}
                )
                
             

        }
    })

    const AnimatedPressableStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor: interpolateColor(
                colorActive.value, 
                [0,1], 
                ['#FFFFFF','#8047F8']
                )
        }
    });

    useEffect(()=>{
      colorActive.value =  active ? 1 : 0;
    },[active])
  return (
    <Animated.View>
    <AnimatedPressable style={AnimatedPressableStyle}
        borderColor="product.dark_purple"
        rounded='14'
        borderWidth={1} 
        mr={4}
        px={1}
        {...rest}>
        
      <Animated.Text
        style={[{ padding: 6, fontFamily: 'Roboto_700Bold', fontSize: 10, textAlign: 'center',}, AnimatedTextStyle]}
      
      >
        {category.toUpperCase()}
      </Animated.Text>
  
    </AnimatedPressable>
    </Animated.View>
  );
};

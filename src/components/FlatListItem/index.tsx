import { Heading, Image, Text, VStack } from "native-base";
import { ImageSourcePropType } from "react-native";
import { Label } from "@components/Label";
import Animated , { useAnimatedStyle , interpolate, SharedValue, Extrapolate, ZoomIn} from "react-native-reanimated";

type FlatListItemProps = {
  label: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  price: string;
  scrollX: SharedValue<number>;
  cardSize: number
  index: number
};

export const FlatListItem = ({
  label,
  title,
  description,
  image,
  price,
  scrollX,
  cardSize,
  index

}: FlatListItemProps) => {

 
// defining the scroll positions []
  const scrollXPositions = [
    (index - 1) * cardSize,
    (index) * cardSize,
    (index + 1) * cardSize
  ];

  const animatedStyles = useAnimatedStyle(()=>{
    //defining the scale based on scrollXPositions
    const scale = interpolate(scrollX.value, 
      scrollXPositions,
      [.7, 1.1, .7],
      Extrapolate.CLAMP
      );
     

      return{
        transform: [{
          scale: scale
        }]
      }
  },[scrollX.value]);


  return (
    <Animated.View 
      entering={ZoomIn.delay(index * 100)}
      style={[animatedStyles]}>
      <VStack
        bg="base.gray800"
        my={100}
        mx={4}
        alignItems="center"
        paddingTop={12}
        paddingX={3}
        width="208"
        height="258"
        borderTopLeftRadius={8}
        borderBottomRightRadius={8}
        borderTopRightRadius={32}
        borderBottomLeftRadius={32}
      >
        <Image
          source={image}
          alt="Coffee display"
          width="120"
          height="120"
          position="absolute"
          top="-50"
        />

        <Label label={label} />

        <Heading
          fontFamily="baloo2_bold"
          fontSize="title_Md"
          color="base.gray200"
        >
          {title}
        </Heading>

        <Text
          numberOfLines={2}
          fontFamily="roboto_regular"
          fontSize="text_Xs"
          color="base.gray400"
          textAlign="center"
        >
          {description}
        </Text>

        <Text
          fontSize="title_Lg"
          fontFamily="baloo2_bold"
          color="product.yellow_dark"
        >
          <Text fontSize="title_Sm" fontFamily="roboto_regular">
            $
          </Text>{" "}
          {price}
        </Text>
      </VStack>
    </Animated.View>
  );
};

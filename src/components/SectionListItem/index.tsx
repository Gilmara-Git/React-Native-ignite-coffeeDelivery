import { HStack, Text, Image, VStack, Heading, View } from "native-base";
import { ImageSourcePropType } from "react-native";

type SectionListItemProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  price: string;
};

export const SectionListItem = ({
  image,
  title,
  description,
  price,
}: SectionListItemProps) => {
  return (
    <HStack
      bg="base.gray800"
      mb={8}
      p={4}
      borderTopLeftRadius={10}
      borderBottomLeftRadius={48}
      borderTopRightRadius={48}
      borderBottomRightRadius={10}
    >
      <View width={24} height={24}>
        <Image
          source={image}
          alt="Coffee Image"
          position="absolute"
          top="-33"
        />
      </View>
      <VStack width={44} ml={3}>
        <Heading
          fontSize="title_Sm"
          fontFamily="baloo2_bold"
          color="base.gray200"
        >
          {title}
        </Heading>

        <Text
          fontSize="text_Xs"
          fontFamily="roboto_regular"
          color="base.gray400"
        >
          {description}
        </Text>

        <Text
          fontSize="title_Md"
          fontFamily="baloo2_bold"
          color="product.yellow_dark"
        >
          <Text fontSize="title_Sm" fontFamily="roboto_regular">
            $
          </Text>{" "}
          {price}
        </Text>
      </VStack>
    </HStack>
  );
};

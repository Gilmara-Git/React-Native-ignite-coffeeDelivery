import { HStack, Text } from "native-base";

type LabelProps ={
    title: string;
}

export const Label = ({ title }: LabelProps) => {
  return (
    <HStack >
      <Text
        bg='product.purple_light'
        borderColor="product.purple_light"
        borderRadius={12}
        borderWidth={1}
        p={1}
        px={2}
        mr={4}
        color="product.dark_purple"
        fontFamily="roboto_bolder"
        fontSize="tag"
        textAlign="center"
      >
        {title.toUpperCase()}
      </Text>
    </HStack>
  );
};

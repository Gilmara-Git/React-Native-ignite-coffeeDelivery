import { HStack, Text } from "native-base";

type LabelProps = {
  label: string;
};

export const Label = ({ label }: LabelProps) => {
  return (
    <HStack
      backgroundColor="product.purple_light"
      mt={8}
      mb={4}
      borderRadius={12}
      p={1}
    >
      <Text
        color="product.dark_purple"
        borderColor="product.dark_purple"
        fontFamily="roboto_bolder"
        fontSize="tag"
        textAlign="center"
      >
        {label.toUpperCase()}
      </Text>
    </HStack>
  );
};

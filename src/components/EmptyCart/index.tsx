import { VStack, IconButton, Icon, Text } from "native-base";
import { SizeButton } from "../SizeButton";
import { FontAwesome } from "@expo/vector-icons";

export const EmptyCart = () => {
  return (
    <VStack 
        borderTopWidth={0.3} 
        borderColor="base.gray500" 
        p={12}
        justifyContent='center'
        alignItems='center'
        >
      <IconButton
        icon={
          <Icon as={FontAwesome} name="shopping-cart" color="base.gray500" />
        }
      />
      <Text
        fontFamily='roboto_regular'
        fontSize='text_Sm'
        color='base.gray400'
        mb={7}
      >
        You cart is empty.
      </Text>

      <SizeButton 
        width={60} 
        height={11} 
        title="See Catalog" 
        color='base.white' 
        bg='product.dark_purple' 
        pressedColor='product.brand_purple' 
        />
    </VStack>
  );
};

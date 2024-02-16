import { VStack, IconButton, Icon, Text } from "native-base";
import { SystemButton } from "../SystemButton";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { IRoutesNavigationParams } from "@src/routes/app.routes";

export const EmptyCart = () => {
  const { navigate } = useNavigation<IRoutesNavigationParams>();

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

      <SystemButton 
        width={60} 
        height={11} 
        title="See Catalog" 
        color='base.white' 
        bg='product.dark_purple' 
        pressedColor='product.brand_purple' 
        onPress={()=>navigate('home')}
        />
    </VStack>
  );
};

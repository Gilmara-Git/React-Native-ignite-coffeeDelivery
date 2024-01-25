import { HStack , VStack, Image , Text , View, Container, IconButton, Icon} from 'native-base';
import Irish from '../../assets/irish.png';
import  { AntDesign , MaterialCommunityIcons } from '@expo/vector-icons';
// will receive id through params, so the item details can be pulled from the array

export const CartItem = ()=>{
const handleRemove = ()=>{
  console.log('Trash was clicked')
}

    return (
      <>
        <HStack height={0.5} bg="base.gray800" />
        <HStack px={6} py={3} bg="base.gray900">
          <HStack>
            <Image
              source={Irish}
              alt="Coffee mug image"
              height={16}
              width={16}
            />
          </HStack>

          <VStack flex={1}>
            <HStack ml={2} justifyContent="space-between">
              <Text
                fontFamily="roboto_regular"
                fontSize="text_Md"
                color="base.gray100"
              >
                Irish
              </Text>
              <Text
                fontFamily="baloo2_bold"
                fontSize="title_Sm"
                color="base.gray100"
              >
                $ 9.90
              </Text>
            </HStack>

            <View ml={2}>
              <Text
                fontFamily="roboto_regular"
                fontSize="text_Sm"
                color="base.gray400"
              >
                227oz
              </Text>
            </View>

            <HStack ml={2}  >
              <HStack
                mt={1}
                width={28}
                height={9}
                borderWidth={1}
                borderColor="base.gray600"
                rounded={8}
                justifyContent='center'
                alignItems='center'
              
              >

                <IconButton  
                   _pressed={
                    {
                        backgroundColor: 'base.gray700',
                    }
                  } 
                icon={ 
                    <Icon 
                        as={AntDesign} 
                        name='minus'
                        color='product.brand_purple'
                        size={5}
                        
                        />
                    
                    }/>
                <Text 
                    px={1}
                    fontFamily='roboto_regular'
                    fontSize='text_Md'
                    color='base.gray100'
                    >
                        1
                </Text>

                <IconButton  
                       _pressed={
                        {
                            backgroundColor: 'base.gray700',
                        }
                      } 
                    icon={ 
                    <Icon 
                        as={AntDesign} 
                        name='plus'
                        color='product.brand_purple'
                        size={5}
                        
                        />
                    
                    }/>
              </HStack>
              <IconButton 
              onPress={handleRemove}
              _pressed={
                {
                    backgroundColor: 'base.gray700',
                }
              } 
              
              icon={ 
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='trash-can-outline'
                        color='product.brand_purple'
                        size={5} 
                        />
                     
                    }/>
            </HStack>
          </VStack>
        </HStack>
        <HStack height={0.5} bg="base.gray800" />
      </>
    );
};
import { useState, useEffect  } from 'react';
import { HStack , VStack, Image , Text , View, IconButton, Icon} from 'native-base';

import  { AntDesign , MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native';

import { useCart } from '@contexts/useCart';

type CartItemProps = {
  imgSrc: ImageSourcePropType,
  title: string,
  price: string,
  size: string,
  quantity: number;
  id: number;
 
};

export const CartItem = ({ imgSrc, title, price, size , quantity , id }: CartItemProps)=>{
  
  const initialItemSubTotal = quantity * Number(price);

  const [ updatedQty, setUpdatedQty] = useState<number>(quantity);
  const [ itemTSubTotal, setItemSubTotal] = useState<number>(initialItemSubTotal);

  const { cart , removeCoffee, generateCartTotal  } = useCart();
  console.log(cart.length, 'linha27 not cartScreen')

  const handleRemove = (id: number)=>{
      removeCoffee(id);
  };


const updateItemInCart = (id:number, action: string)=>{

  const currentInCart = [...cart];
  let qty = 0;
  let currentItemTotal = 0; 

  const itemToUpdate = currentInCart.find(item => item.id === id);

  if(action === 'plus'){
  qty = ++itemToUpdate!.coffeeDetails[0].quantity;
  itemToUpdate!.coffeeDetails[0].quantity  = qty; 
  setUpdatedQty(qty);

  currentItemTotal = Number(itemToUpdate?.price) * qty;
  itemToUpdate!.itemTotal = currentItemTotal;
  setItemSubTotal(currentItemTotal);
  }

  if(action === 'minus'){
    if(itemToUpdate!.coffeeDetails[0].quantity > 1){
      qty = --itemToUpdate!.coffeeDetails[0].quantity;
      itemToUpdate!.coffeeDetails[0].quantity  = qty; 
      setUpdatedQty(qty);

      currentItemTotal = itemToUpdate!.itemTotal - Number(price)
      itemToUpdate!.itemTotal = currentItemTotal;
      setItemSubTotal(currentItemTotal);
    

    }else{
      removeCoffee(id);
    }

  }
};

useEffect(()=>{
  generateCartTotal();
}, [updatedQty, itemTSubTotal, cart.length])

    return (
      <>
        <HStack height={0.5} bg="base.gray800" />
        <HStack px={6} py={3} bg="base.gray900">
          <HStack>
            <Image
              source={imgSrc}
              alt="Coffee mug image"
              height={16}
              width={16}
              mr={2}
            />
          </HStack>

          <VStack flex={1}>
            <HStack ml={2} justifyContent="space-between">
              <Text
                fontFamily="roboto_regular"
                fontSize="text_Md"
                color="base.gray100"
              >
                {title}
              </Text>
              <Text
                fontFamily="baloo2_bold"
                fontSize="title_Sm"
                color="base.gray100"
              >
                $ {itemTSubTotal.toFixed(2)}
              </Text>
            </HStack>

            <View ml={2}>
              <Text
                fontFamily="roboto_regular"
                fontSize="text_Sm"
                color="base.gray400"
              >
                {size}
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
                        onPress={()=>updateItemInCart(id, 'minus')}
                        />
                    
                    }/>
                <Text 
                    px={1}
                    fontFamily='roboto_regular'
                    fontSize='text_Md'
                    color='base.gray100'
                    >
                        {updatedQty}
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
                        onPress={() => updateItemInCart(id, 'plus')}
                        
                        />
                    
                    }/>
              </HStack>
              <IconButton 
              onPress={()=>handleRemove(id)}
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
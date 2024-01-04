import { HStack, Pressable , IPressableProps, Text } from "native-base";

type CoffeeCategoriesProps = IPressableProps &{ 
    category: string
}

export const CoffeeCategories = ({ category , ...rest}: CoffeeCategoriesProps)=>{
 
    return (
        <HStack >
            <Pressable
                {...rest} >
                <Text
                    borderColor='product.brand_purple' 
                    borderRadius={12} 
                    borderWidth={1}
                    p={1} 
                    px={2}
                    mr={4}    
                    color='product.brand_purple'
                    fontFamily='roboto_bolder'
                    fontSize='tag'
                    textAlign='center'
                    >
                        {category.toUpperCase()}
                </Text>
            </Pressable>
        </HStack>
    )
};
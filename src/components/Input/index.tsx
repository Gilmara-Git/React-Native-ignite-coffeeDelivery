import { Input as InputNativeBase, IInputProps, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type InputProps  = IInputProps;

export const Input =( { ...rest}: InputProps)=>{
    return (
        <InputNativeBase
            borderRadius={8} 
            type='password'
            size='xl'
            mt={2}
            borderColor='transparent'
            bg='base.gray200'
            placeholder="Search"
            placeholderTextColor='base.gray400'
            color='base.gray400'
            fontFamily='roboto_regular'
            fontSize='text_Sm'
            InputLeftElement={
                <Icon as={<Ionicons name='search-outline'/>} 
                 size={6} 
                 color='base.gray400'
                 ml={4}
                 />}
            alignItems='center'
            _focus={
                {
                    borderColor:'transparent',
                    backgroundColor:'base.gray200'
                }
            }

            {...rest}
        

        />
    )
};
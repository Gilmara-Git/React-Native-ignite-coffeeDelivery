import { CartContext } from '@contexts/appContext';
import { useContext} from 'react';

export const useCart = ()=>{
    const context =  useContext(CartContext);
    return context;
};
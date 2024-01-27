import { createContext, ReactNode , useState } from 'react';
import { IImageProps } from 'native-base';

type AppContextProviderProps = {
    children: ReactNode;
};

type coffeeType = {
    id: number;
    title: string;
    description: string;
    price: string;
    label: string;
    imgSrc: IImageProps;

};

type CartContextProps = {
    cart: coffeeType[];
    addCoffee: ()=> void;
    removeCoffee: ()=> Promise<void>;
    clearCart: ()=> void;

}

export const CartContext = createContext({} as CartContextProps);

export const AppContextProvider = ({children}:AppContextProviderProps)=>{
    
    const [ cart, setCart ]  = useState<coffeeType[]>([]);

    const addCoffee = ()=>{};
    const removeCoffee = async ()=>{};
    const clearCart = ()=>{};



    return (

     <CartContext.Provider value={{
        cart,
        addCoffee,
        removeCoffee,
        clearCart

     }}>
        {children}
     </CartContext.Provider>
    )
};
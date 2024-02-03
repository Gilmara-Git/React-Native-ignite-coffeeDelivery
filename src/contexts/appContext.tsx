import { createContext, ReactNode, useState, useEffect } from "react";
import { ImageSourcePropType } from "react-native";

type AppContextProviderProps = {
  children: ReactNode;
};

type coffeeType = {
  id: number;
  label: string;
  imgSrc: ImageSourcePropType;
  title: string;
  description: string;
  price: string;
  coffeeDetails: {
    size: string;
    quantity: number;
  }[];
  itemTotal: number;
  cartItemId: string
};


type CartContextProps = {
  cart: coffeeType[];
  addCoffee: (item: coffeeType) => void;
  removeCoffee: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  generateCartTotal: () => void;
};

export const CartContext = createContext({} as CartContextProps);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [cart, setCart] = useState<coffeeType[]>([]);
  const [cartTotal, setCartTotal] = useState(0);


  const addCoffee = (cartItem: coffeeType) => {
    setCart((prevState) => [...prevState, cartItem]);
  };

  const removeCoffee = (cartItemId: string) => {
    const currentCart = [...cart];

    const updatedCart = currentCart.filter((coffee) => coffee.cartItemId !== cartItemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const generateCartTotal = () => {
    const subTotalArray: number[] = [];
    cart.forEach((cartItem) => {
      subTotalArray.push(cartItem.itemTotal);
      const total = subTotalArray.reduce(
        (accumulator: number, current: number) => accumulator + current
      );
      setCartTotal(total);
    });

    if (cart.length === 0) {
      setCartTotal(0);
    }
  };

  useEffect(() => {
    generateCartTotal();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        addCoffee,
        removeCoffee,
        clearCart,
        generateCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

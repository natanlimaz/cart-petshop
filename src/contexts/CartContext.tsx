import { createContext, ReactNode, useState } from 'react';

import { ProductProps } from '../pages/home';

type CartContextData = {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
}

type CartProviderProps = {
    children: ReactNode;
}

type CartProps = {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider( { children }: CartProviderProps) {

    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");

    function addItemCart(newitem: ProductProps) {
        const indexItem = cart.findIndex( item => item.id === newitem.id);

        if(indexItem !== -1) {
            const cartList = cart;

            cartList[indexItem].amount += 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const data = {
            ...newitem,
            amount: 1,
            total: newitem.price
        }

        setCart(products => [...products, data]);
        totalResultCart([...cart, data]);

    }

    function removeItemCart(product: CartProps) {
        const indexItem = cart.findIndex( item => item.id === product.id);

        // caso tenha mais de um desse produto no carrinho, tira apenas um e atualiza os valores do total
        if(cart[indexItem].amount > 1) {
            const cartList = cart;

            cartList[indexItem].amount -= 1;
            cartList[indexItem].total -= cart[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        // Caso não tenha mais que um, tenha dois ou mais, filtre o array retornando tudo menos o item removido
        const removeItem = cart.filter((item) => item.id !== cart[indexItem].id);
        setCart(removeItem);
        totalResultCart(removeItem);

    }

    function totalResultCart(items: CartProps[]) {
        const myCart = items;
        const result = myCart.reduce( (acc, item) => { return acc + item.total}, 0);
        const resultFormated = result.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        setTotal(resultFormated);
    }

    return (
        <CartContext.Provider 
            value={ {
                cart,
                cartAmount: cart.length,
                addItemCart,
                removeItemCart,
                total  
            } }
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
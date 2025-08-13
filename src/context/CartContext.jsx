import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        // retrive cart from localStorage if it exist
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //add products to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                //if already there increase quantity
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    //remove ftom cart
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };


    //Calculate total
    const getTotal = () =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    //increase or decrease quantity
    const updateQuantity = (id, delta) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}
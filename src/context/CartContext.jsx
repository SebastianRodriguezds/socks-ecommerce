import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const {token, user} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [animateCart, setAnimateCart] = useState(false);

    useEffect(()=>{
        const loadCart = async ()=> {
            if (token) {
                try{
                    const res = await axios.get("https://socks-ecommerce.onrender.com/api/users/cart",{
                        headers: {Authorization: `Bearer ${token}`},
                    });
                    setCart(res.data.cart || []);
                }catch (err) {
                    console.error("Error loading cart: ", err);
                    setCart([]);
                }
            }else{
                const savedCart = localStorage.getItem("cart");
                setCart(savedCart ? JSON.parse(savedCart): []);
            }
        };
        loadCart();
    }, [token]);

    //save cart in backedn or localstorage
     useEffect(() => {
    if (token) {
      axios.put(
        "https://socks-ecommerce.onrender.com/api/users/cart",
        { cart },
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch(err => console.error("Error updating cart:", err));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, token]);

    //add products to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item._id === product._id);
            
            if (existing) {
                //if already there increase quantity
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        
        });

        setAnimateCart(true);
        setTimeout(()=> setAnimateCart(false), 600);
    };

    //remove ftom cart
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    };


    //Calculate total
    const getTotal = () =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    //increase or decrease quantity
    const updateQuantity = (id, delta) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item._id === id ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter(item => item.quantity > 0)
        );
    };



    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal, updateQuantity, animateCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}
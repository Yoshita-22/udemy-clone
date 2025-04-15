import { useState,useEffect } from "react";

export const useCart = ()=>{
    const [cartItems, setCartItems] = useState([]);
    const isInCart = (course) =>
    cartItems.some((item) => item.id === course.id);
    
    const addToCart = (course) => {
        if (!isInCart(course)) setCartItems((prev) => [...prev, course]);
    };
    const removeFromCart = (course) => {
        setCartItems((prev) =>
          prev.filter((item) => item.id !== course.id)
        );
    };
    
    const clearCart = () => setCartItems([]);
    return { cartItems, addToCart, removeFromCart, isInCart, clearCart };
}
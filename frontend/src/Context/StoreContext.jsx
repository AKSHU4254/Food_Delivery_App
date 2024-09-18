import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)
import axios from "axios"


const StoreContextProvide = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const quantity = cartItems[item];
            
            if (quantity && quantity > 0) {
                const itemInfo = food_list.find((product) => product?._id === item);
    
                if (itemInfo && itemInfo?.price) {
                    totalAmount += itemInfo?.price * quantity;
                } else {
                    console.warn(`Item with id ${item} not found in food_list or price is invalid`);
                }
            }
        }
    
        console.log("Total Amount:", totalAmount);
        return totalAmount;
    };
    

    const fetchFoodList = async () => {
        const responce = await axios.get(url + "/api/food/list");
        setFoodList(responce.data.data)
    }

    const loadCartData = async(token) =>{
        const responce = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(responce.data.cartData);
    }


    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        setFoodList
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvide;
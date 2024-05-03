import React, { createContext, useState} from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);


const getDefaultCart = () => {
  let cart ={};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart());

 
  const addToCart = (itemId) => {
    console.log(`Adding item ${itemId} to cart`);
    
    setCartItems((prev) => {
        // Create a copy of the current cart state
        const updatedCart = { ...prev };
        
        // Increment the quantity of the specified item
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        
        console.log(`Updated cart state:`, updatedCart);
        
        return updatedCart;
    });
};




  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
  // }
 


  const removeFromCart = (itemId) => {
    console.log(`Removing item ${itemId} from cart`);
    
    setCartItems((prev) => {
        // Create a copy of the current cart state
        const updatedCart = { ...prev };
        
        // Check if the item exists in the cart and has a quantity greater than zero
        if (updatedCart[itemId] > 0) {
            // Decrement the quantity of the specified item
            updatedCart[itemId] -= 1;
            
            // Remove the item from the cart if its quantity reaches zero
            if (updatedCart[itemId] === 0) {
                delete updatedCart[itemId];
            }
        }
        
        console.log(`Updated cart state:`, updatedCart);
        
        return updatedCart;
    });
};


const getTotalCartAmount = () => {
  let total = 0;

  // Iterate through each item in cartItems
  for (const itemId in cartItems) {
    if (cartItems.hasOwnProperty(itemId) && cartItems[itemId] > 0) {
      // Find the corresponding product in all_product by its id
      const itemInfo = all_product.find((product) => product.id === itemId);
      
      // If itemInfo is found, add the total price of this item to the total cart amount
      if (itemInfo) {
        total += itemInfo.new_price * cartItems[itemId];
      }
    }
  }

  // Return the total cart amount
  return total;
};


const getTotalCartCount = () => {
  let totalItemCount = 0;

  // Iterate through each item in cartItems
  for (const itemId in cartItems) {
    if (cartItems.hasOwnProperty(itemId)) {
      // Add the quantity of the current item to totalItemCount
      totalItemCount += cartItems[itemId];
    }
  }

  // Return the total number of items in the cart
  return totalItemCount;
};


  const contextValue = {getTotalCartCount, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;



 




// import React, { createContext, useState } from "react";
// import all_product from "../components/Assets/all_product";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < all_product.length+1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// }

// const ShopContextProvider = (props) => {

//   const [cartItems, setCartItems] = useState(getDefaultCart());


//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
//     console.log(cartItems);
//   }

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
//   }

//   const contextValue = {all_product, cartItems, addToCart, removeFromCart};
  
//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   )
// }

// export default ShopContextProvider;
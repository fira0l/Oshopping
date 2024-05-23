import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';

export const ShopContext = createContext(null);

const GET_ALL_PRODUCTS_QUERY = gql`
  query GetAllProducts {
    products {
      product_id
      name
      description
      price
      category_id
      seller_id
      stock_quantity
      image
      created_at
    }
  }
`;

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS_QUERY);

  useEffect(() => {
    if (loading) console.log("Loading products...");
    if (error) console.error("Error fetching products:", error);
    if (data) console.log("Fetched products:", data);
  }, [loading, error, data]);

  useEffect(() => {
    if (!loading && !error && data) {
      setCartItems(getDefaultCart(data.products));
    }
  }, [loading, error, data]);

  const getDefaultCart = (products) => {
    let cart = {};
    if (products) {
      products.forEach(product => {
        cart[product.product_id] = 0; // Set initial quantity to zero
      });
    }
    return cart;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId] -= 1;
        if (updatedCart[itemId] === 0) {
          delete updatedCart[itemId];
        }
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems.hasOwnProperty(itemId) && cartItems[itemId] > 0) {
        const itemInfo = data.products.find((product) => product.product_id === itemId);
        if (itemInfo) {
          total += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  const getTotalCartCount = () => {
    let totalItemCount = 0;
    for (const itemId in cartItems) {
      if (cartItems.hasOwnProperty(itemId)) {
        totalItemCount += cartItems[itemId];
      }
    }
    return totalItemCount;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const contextValue = {
    getTotalCartCount,
    getTotalCartAmount,
    allProducts: data ? data.products : [],
    cartItems,
    addToCart,
    removeFromCart,
    user,
    setUser,
    clearCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

import React, { createContext, useState, useEffect } from "react";
import { useQuery, useMutation, gql } from '@apollo/client';

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

const GET_ALL_CATEGORIES_QUERY = gql`
  query GetAllCategories {
    getAllCategories {
      category_id
      name
    }
  }
`;

const DECREASE_STOCK_QUANTITY_MUTATION = gql`
  mutation DecreaseStockQuantity($product_id: ID!, $quantity: Int!) {
    decreaseStockQuantity(product_id: $product_id, quantity: $quantity) {
      product_id
      stock_quantity
    }
  }
`;

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);
  
  const { loading: loadingProducts, error: errorProducts, data: dataProducts } = useQuery(GET_ALL_PRODUCTS_QUERY);
  const { loading: loadingCategories, error: errorCategories, data: dataCategories } = useQuery(GET_ALL_CATEGORIES_QUERY);
  
  // Mutation hook for decreasing stock quantity
  const [decreaseStockQuantityMutation] = useMutation(DECREASE_STOCK_QUANTITY_MUTATION);

  useEffect(() => {
    if (loadingProducts) console.log("Loading products...");
    if (errorProducts) console.error("Error fetching products:", errorProducts);
    if (dataProducts) console.log("Fetched products:", dataProducts);
  }, [loadingProducts, errorProducts, dataProducts]);

  useEffect(() => {
    if (loadingCategories) console.log("Loading categories...");
    if (errorCategories) console.error("Error fetching categories:", errorCategories);
    if (dataCategories) console.log("Fetched categories:", dataCategories);
  }, [loadingCategories, errorCategories, dataCategories]);

  useEffect(() => {
    if (!loadingProducts && !errorProducts && dataProducts) {
      setCartItems(getDefaultCart(dataProducts.products));
    }
  }, [loadingProducts, errorProducts, dataProducts]);

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
        const itemInfo = dataProducts.products.find((product) => product.product_id === itemId);
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
  
  // Context value with mutation function included
  const contextValue = {
    getTotalCartCount,
    getTotalCartAmount,
    allProducts: dataProducts ? dataProducts.products : [],
    allCategories: dataCategories ? dataCategories.getAllCategories : [],
    cartItems,
    addToCart,
    removeFromCart,
    user,
    setUser,
    clearCart,
    decreaseStockQuantityMutation
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;


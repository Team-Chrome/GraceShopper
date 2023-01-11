import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import allProductsReducer from "../features/allProducts/allProductsSlice"

const store = configureStore({
  reducer: {
    
    auth: authReducer,
   
    cart: cartReducer,
    product: singleProductReducer,
 ,
    allProducts: allProductsReducer 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";

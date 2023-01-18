import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import allProductsReducer from "../features/allProducts/allProductsSlice";
import billingAddressReducer from "../features/checkout/billingSlice";
import shippingAddressReducer from "../features/checkout/shippingSlice";
import creditCardReducer from "../features/checkout/creditCardSlice";
import checkoutStageReducer from "../features/checkout/checkoutStageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    cart: cartReducer,
    product: singleProductReducer,

    allProducts: allProductsReducer,

    checkoutStage: checkoutStageReducer,
    billing: billingAddressReducer,
    shipping: shippingAddressReducer,
    credit: creditCardReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";

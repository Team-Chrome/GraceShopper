import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import Splash from "../features/Splash";
import { me } from "./store";
import Cart from "../features/cart/Cart";
import Checkout from "../features/checkout/Checkout";
import SingleProduct from "../features/singleProduct/singleProduct";
import AllProducts from "../features/allProducts/AllProducts";
import SingleUser from "../features/user/SingleUser";
import OrderComplete from "../features/checkout/OrderComplete";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Splash />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<AllProducts />} />
        <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route
          path="/signup"
          element={<AuthForm name="signup" displayName="Sign Up" />}
        />
        <Route path="/splash" element={<Splash />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/users/:email" element={<SingleUser />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordercomplete" element={<OrderComplete />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

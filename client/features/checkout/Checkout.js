import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../public/style.css";
import { fetchCart, selectCart, updateCartStatus } from "../cart/cartSlice";
import { selectCheckoutStage, setStage } from "./checkoutStageSlice";
import CreditForm from "./CreditForm";
import ShippingForm from "./ShippingForm";
import BillingForm from "./BillingForm";
import { USD } from "../../utils";
import { selectUser } from "../auth/authSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutStage = useSelector(selectCheckoutStage);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  console.log(cart);

  const userId = user.id;
  const cartId = cart.id;

  useEffect(() => {
    dispatch(fetchCart(userId));
    dispatch(setStage("1"));
  }, []);

  const submitForms = (evt) => {
    evt.preventDefault();
    dispatch(updateCartStatus(cartId, "CLOSED"));
    navigate("/ordercomplete");
  };

  return (
    <div>
      <div className="p-12 font-sans">
        <div
          onClick={() => navigate("/cart")}
          className="text-lg pb-8 underline underline-offset-8 hover:font-bold hover:cursor-pointer hover:text-slate-700"
        >
          Return to cart
        </div>
        <div className="text-2xl mb-12">Checkout</div>
        <div className="flex gap-24">
          <div>
            {checkoutStage === "1" ? (
              <ShippingForm />
            ) : (
              <div className="flex gap-24">
                <BillingForm className="w-1/2" />
                <CreditForm className="w-1/2" />
              </div>
            )}
          </div>
          <div className="flex-col items-center text-center border w-1/4 h-auto p-4">
            <div className="mb-8 text-lg font-semibold">Order Summary</div>
            <div className="flex justify-between">
              <div className="font-medium">Subtotal</div>
              <div>{`$${USD(cart.total)}`}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Shipping</div>
              <div className="font-medium">FREE</div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="font-bold text-lg">TOTAL</div>
              <div className="font-bold text-lg">{`$${USD(cart.total)}`}</div>
            </div>
            <div>
              {checkoutStage === "2" ? (
                <button
                  type="button"
                  onClick={submitForms}
                  className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  COMPLETE ORDER
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

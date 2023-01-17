import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../public/style.css";
import { fetchCart, selectCart } from "../cart/cartSlice";
import { selectCheckoutStage, setStage } from "./checkoutStageSlice";
import CreditForm from "./CreditForm";
import ShippingForm from "./ShippingForm";
import BillingForm from "./BillingForm";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const checkoutStage = useSelector(selectCheckoutStage);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    dispatch(setStage("1"));
  }, []);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    setCartTotal(calcCartTotal());
  }, [cart]);

  const submitForms = () => {
    document.getElementById("billingForm").submit();
    document.getElementById("creditForm").submit();
  };

  const calcCartTotal = () => {
    let cartTotal = 0;

    cart.items.map((item) => {
      cartTotal += item.product.price * item.quantity;
    });

    return cartTotal;
  };

  return (
    <div>
      <div className="p-12 font-sans">
        <div onClick={() => navigate("/cart")} className="">
          ---Return to cart
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
              <div>{`$${cartTotal}`}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Shipping</div>
              <div className="font-medium">FREE</div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="font-bold text-lg">TOTAL</div>
              <div className="font-bold text-lg">{`$${cartTotal}`}</div>
            </div>
            <div>
              {checkoutStage === "2" ? (
                <button
                  type="submit"
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

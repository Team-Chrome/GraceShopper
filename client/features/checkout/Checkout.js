import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../public/style.css";
import { fetchCart, selectCart } from "../cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const [cartTotal, setCartTotal] = useState(0);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    setCartTotal(calcCartTotal());
  }, [cart]);

  const calcCartTotal = () => {
    let cartTotal = 0;

    cart.items.map((item) => {
      cartTotal += item.product.price * item.quantity;
    });

    return cartTotal;
  };

  return (
    <>
      <div className="p-12 font-sans">
        <div className="text-2xl mb-12">Checkout</div>
        <div className="flex gap-24">
          <div className="w-full flex-col max-w-3/4">
            <form
              className="w-full bg-white shadow-lg rounded px-8 pb-8 mb-4 mt-0 border"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="nameOnCard"
                >
                  <p>Name on Card</p>
                </label>
                <input
                  name="nameOnCard"
                  type="text"
                  className="grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nameOnCard"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="cardNumber"
                >
                  <p>Card Number</p>
                </label>
                <input
                  name="cardNumber"
                  type="text"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cardNumber"
                  placeholder="1234 1234 1234 1234"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="cardNumber"
                >
                  <p>Card Number</p>
                </label>
                <input
                  name="cardNumber"
                  type="text"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cardNumber"
                  placeholder="1234 1234 1234 1234"
                />
              </div>
            </form>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

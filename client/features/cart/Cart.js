import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../public/style.css";

const Cart = () => {
  return (
    <>
      <div className="text-2xl m-4">Shopping Cart</div>
      <div className="flex gap-12 border">
        <table className="w-2/3 border">
          <thead>
            <tr className="flex items-center pb-6 pt-6 border-t-2 border-b-2 w-full">
              <th className="w-1/4 border">Product</th>
              <th className="w-1/4"></th>
              <th className="w-1/4">Quantity</th>
              <th className="w-1/4">Price</th>
              <th className="w-1/4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex items-center text-center w-full border-b-2 pb-4 pt-4">
              <td className="w-1/4 border">Coffee Picture</td>
              <td className="flex-col w-1/4">
                <div>Coffee Name</div>
                <div>Coffee Mfg</div>
                <div>Pack Size</div>
              </td>
              <td className="w-1/4">3 bags</td>
              <td className="w-1/4">$10.00</td>
              <td className="w-1/4">$30.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex-col items-center text-center border w-1/5 p-4">
          <div className="mb-4 text-lg font-semibold">Order Summary</div>
          <div className="flex justify-between">
            <div>Subtotal</div>
            <div>$30.00</div>
          </div>
          <div className="flex justify-between">
            <div>Shipping</div>
            <div>FREE</div>
          </div>
          <div className="flex justify-between">
            <div>TOTAL</div>
            <div>$30.00</div>
          </div>
          <button className=" mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

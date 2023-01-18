import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItemConfirmation = ({ product, quantity }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-black opacity-50 w-full h-full absolute z-10"></div>
      <div className="bg-white opacity-100 absolute w-5/12 h-56 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="grid place-items-center text-center w-full h-full p-8">
          <div className="border border-green-700 rounded-full w-12 h-12 flex">
            <img src="/images/complete-icon-6.png"></img>
          </div>
          <div className="font-sans text-lg font-medium">{`${quantity}x ${product.name} has been added to your cart!`}</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigate("/products");
              }}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                navigate("/cart");
              }}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemConfirmation;

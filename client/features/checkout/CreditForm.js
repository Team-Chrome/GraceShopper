import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../public/style.css";
import { useNavigate } from "react-router-dom";

const CreditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className="w-1/2 items-center text-center">
      <form
        className="w-full bg-white shadow-lg rounded px-8 pb-8 mb-4 mt-0 border"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 text-lg font-semibold">Credit Card</div>
        <div>
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
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardNumber"
              placeholder="1234 1234 1234 1234"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="expiration"
            >
              <p>Expiration Date</p>
            </label>
            <input
              name="expiration"
              type="text"
              className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiration"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="csv"
            >
              <p>Security Code(CSV)</p>
            </label>
            <input
              name="csv"
              type="text"
              className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="csv"
              placeholder="123"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreditForm;

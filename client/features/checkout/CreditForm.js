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
    <div className="flex gap-24">
      <div className="items-center text-center">
        <form
          className="w-full bg-white shadow-lg rounded px-8 mt-0 pb-8 mb-4 border"
          onSubmit={handleSubmit}
        >
          <div className="w-full text-center mb-4 text-lg font-semibold">
            Billing Address
          </div>
          <div>
            <div>
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="firstname"
              >
                <p>First Name</p>
              </label>
              <input
                name="firstname"
                type="text"
                className="w-fullshadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                placeholder="John"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="lastname"
              >
                <p>Last Name</p>
              </label>
              <input
                name="lastname"
                type="text"
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="address"
            >
              <p>Address</p>
            </label>
            <input
              name="address"
              type="text"
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              placeholder="123 Monument Valley Road"
            />
          </div>
          <div>
            <div className="w-4/9">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="city"
              >
                <p>City</p>
              </label>
              <input
                name="city"
                type="text"
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                placeholder="Great Barrington"
              />
            </div>
            <div className="w-1/9">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="state"
              >
                <p>State</p>
              </label>
              <input
                name="state"
                type="text"
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                placeholder="MA"
              />
            </div>
            <div className="w-4/9">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="zip"
              >
                <p>Zip Code</p>
              </label>
              <input
                name="zip"
                type="text"
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="zip"
                placeholder="01230"
              />
            </div>
          </div>
        </form>
      </div>
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
                htmlFor="cvv"
              >
                <p>Security Code(CVV)</p>
              </label>
              <input
                name="cvv"
                type="text"
                className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cvv"
                placeholder="123"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditForm;

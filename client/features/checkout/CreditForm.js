import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../public/style.css";
import { useNavigate } from "react-router-dom";
import { createCreditCard } from "./creditCardSlice";
import { selectUser } from "../auth/authSlice";

const CreditForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expiration, setExpiration] = useState();
  const [csv, setCsv] = useState();

  const [disabled, setDisabled] = useState(false);

  const { id } = useSelector(selectUser);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      createCreditCard({
        name,
        cardNumber,
        expiration,
        csv,
        userId: id,
      })
    );
    setDisabled(true);
  };

  return (
    <div className="w-1/2 items-center text-center">
      <form
        id="creditform"
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
              onChange={(e) => setName(e.target.value)}
              disabled={disabled}
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
              onChange={(e) => setCardNumber(e.target.value)}
              disabled={disabled}
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
              onChange={(e) => setExpiration(e.target.value)}
              disabled={disabled}
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
              onChange={(e) => setCsv(e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={disabled}
          onClick={handleSubmit}
          className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Confirm Credit Card Info
        </button>
      </form>
    </div>
  );
};

export default CreditForm;

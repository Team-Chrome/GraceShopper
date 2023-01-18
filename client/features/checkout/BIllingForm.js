import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../public/style.css";
import { useNavigate } from "react-router-dom";
import { createBillingAddress } from "./billingSlice";
import { selectUser } from "../auth/authSlice";

const BillingForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      createBillingAddress({
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        userId: id,
      })
    );
  };

  return (
    <div className="w-1/2 items-center text-center">
      <form
        id="billingForm"
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div>
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
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="phone"
            >
              <p>Phone Number</p>
            </label>
            <input
              name="phone"
              type="text"
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              placeholder="4134131938"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Confirm Billing Info
        </button>
      </form>
    </div>
  );
};

export default BillingForm;

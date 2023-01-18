import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createShippingAddress,
  fetchShippingAddress,
  selectShippingAddress,
} from "./shippingSlice";
import { selectUser } from "../auth/authSlice";
import { setStage } from "./checkoutStageSlice";
import { useParams } from "react-router-dom";
import "../../../public/style.css";

const ShippingForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);
  const shipping = useSelector(selectShippingAddress);

  const [firstName, setFirstName] = useState(shipping.firstName);
  const [lastName, setLastName] = useState(shipping.lastName);
  const [address, setAddress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [state, setState] = useState(shipping.state);
  const [zip, setZip] = useState(shipping.zip);
  const [phone, setPhone] = useState(shipping.phone);

  useEffect(() => {
    dispatch(fetchShippingAddress({ userId: id }));
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(setStage("2"));
    dispatch(
      createShippingAddress({
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
    <div className="w-full">
      <form
        className="w-full bg-white shadow-lg rounded px-8 mt-0 pb-8 mb-4 border"
        onSubmit={handleSubmit}
      >
        <div className="w-full text-center mb-4 text-lg font-semibold">
          Shipping Address
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
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
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
              required
            />
          </div>
        </div>
        <div className="w-2/3">
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
            required
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
              required
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
              required
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
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </div>
          <div className="w-4/9">
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
              placeholder="413-413-1938"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;

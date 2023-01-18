import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUserAync, selectSingleUser } from "./singleUserSlice";

const SingleUser = () => {
  const { email } = useParams();
  console.log("identification...........", email);
  const dispatch = useDispatch();
  const user = useSelector(selectSingleUser);
  console.log("is my user getting returned", user);
  console.log("with my products be revealed?", user.cart);
  for (let key in user.cart) {
    console.log("these are keys for each.....", key);
    console.log("does this work?", user.cart[key]);
  }

  console.log("user >>>>>>>>>>>>>>>>>>>", user);
  useEffect(() => {
    dispatch(fetchSingleUserAync(email));
  }, [dispatch, user.id]);

  return (
    <div>
      <h1>Users!!!!!!</h1>
      <div className="product">
        <h1>User Email:{user.email}</h1>

        <h1>
          Cart Status:
          {user.cart ? user.cart.status : " None"}
        </h1>

        {user.cart && user.cart.products ? (
          user.cart.products.map((element) => {
            return (
              <ul className="productDetails">
                <li key={1} className="product-span">
                  Name: {element.name}
                </li>
                <img
                  key={2}
                  src={element.imageUrl.slice(1)}
                  className="product-span"
                />
                <li key={3} className="product-span">
                  Roaster: {element.roaster}
                </li>
                <li key={4} className="product-span">
                  Origin: {element.origin}
                </li>
                <li key={5} className="product-span">
                  Price: {element.price}
                </li>
                <li key={6} className="product-span">
                  Description: {element.description}
                </li>
                <li key={7} className="product-span">
                  Quantity: {element.cartItem.quantity}
                </li>
                <li key={8} className="product-span">
                  Price: {element.cartItem.price}
                </li>
              </ul>
            );
          })
        ) : (
          <h1>"There was a problem accessing products" </h1>
        )}
      </div>
    </div>
  );
};

export default SingleUser;

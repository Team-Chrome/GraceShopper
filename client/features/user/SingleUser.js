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
      <div>
        <h1>User Email:{user.email}</h1>

        <h1>
          Cart Status:
          {user.cart ? user.cart.status : " None"}
        </h1>

        <h1>
          {user.cart && user.cart.products
            ? user.cart.products[0].name
            : "There was a problem accessing products"}
        </h1>
      </div>
    </div>
  );
};

export default SingleUser;

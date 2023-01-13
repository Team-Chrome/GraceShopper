import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../public/style.css";
import { fetchCart, selectCart, updateItem, removeItem } from "./cartSlice";
import { selectUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { USD } from "../../utils";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, [user]);

  const handleUpdateItem = (item, operator) => {
    const cartItem = { cartId: item.cartId, productId: item.productId };

    if (operator === "decrement" && item.quantity - 1 === 0) {
      dispatch(removeItem(cartItem));
      return;
    }

    if (operator === "increment") {
      cartItem.quantity = item.quantity + 1;
    } else cartItem.quantity = item.quantity - 1;

    dispatch(updateItem(cartItem));
  };

  const handleDeleteItem = (item) => {
    const cartItem = { cartId: item.cartId, productId: item.productId };
    dispatch(removeItem(cartItem));
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <div className="p-12 font-sans">
      <div className="text-2xl mb-12">Shopping Cart</div>
      <div className="flex gap-12">
        <table className="w-2/3">
          <thead>
            <tr className="flex items-center pb-6 pt-6 border-t-2 border-b-2 w-full">
              <th className="w-1/4">Product</th>
              <th className="w-1/3"></th>
              <th className="w-1/6">Quantity</th>
              <th className="w-1/6">Price</th>
              <th className="w-1/6">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => {
              return (
                <tr
                  key={item.product.id}
                  className="flex items-center text-center w-full border-b-2 pb-4 pt-4"
                >
                  <td className="w-1/4">
                    <img
                      onClick={() => {
                        navigate(`/products/${item.product.id}`);
                      }}
                      className="w-32 h-32 m-auto hover:cursor-pointer"
                      src={item.product.imageUrl}
                    ></img>
                  </td>
                  <td className="flex-col w-1/3 ">
                    <div
                      onClick={() => {
                        navigate(`/products/${item.product.id}`);
                      }}
                      className="font-extrabold hover:cursor-pointer hover:text-slate-700"
                    >
                      {item.product.name}
                    </div>
                    <div className="text-sm mb-3">{item.product.roaster}</div>
                    <div className="font-light text-sm italic">
                      {item.product.description}
                    </div>
                  </td>
                  <td className="w-1/6 relative">
                    <button
                      onClick={() => handleUpdateItem(item, "decrement")}
                      className="text-gray-600 hover:text-white hover:bg-blue-500 border h-full w-7 mr-2 rounded-md cursor-pointer"
                    >
                      <span className="m-auto font-thin">-</span>
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => handleUpdateItem(item, "increment")}
                      className="text-gray-600 hover:text-white hover:bg-blue-500 border h-full w-7 ml-2 rounded-md cursor-pointer"
                    >
                      <span className="m-auto font-thin">+</span>
                    </button>
                    <div
                      onClick={() => {
                        handleDeleteItem(item);
                      }}
                      className="text-xs text-blue-800 absolute left-1/2 -translate-x-1/2 mt-3 hover:text-blue-500 hover:cursor-pointer"
                    >
                      Delete
                    </div>
                  </td>
                  <td className="w-1/6">{`$${USD(item.price)}`}</td>
                  <td className="w-1/6">
                    {`$${USD(item.price * item.quantity)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex-col items-center text-center border w-1/5 h-64 p-4">
          <div className="mb-8 text-lg font-semibold">Order Summary</div>
          <div className="flex justify-between">
            <div className="font-medium">Subtotal</div>
            <div>{`$${USD(cart.total)}`}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium">Shipping</div>
            <div className="font-medium">FREE</div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="font-bold text-lg">TOTAL</div>
            <div className="font-bold text-lg">{`$${USD(cart.total)}`}</div>
          </div>
          <button
            onClick={() => {
              handleCheckoutClick();
            }}
            className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

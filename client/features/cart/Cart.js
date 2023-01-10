import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  return (
    <>
      <div>
        <div>Shopping Cart</div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>Coffee Picture</tr>
            <tr className="flex-col">
              <div>Coffee Name</div>
              <div>Coffee Mfg</div>
              <div>Pack Size</div>
            </tr>
            <tr>3 bags</tr>
            <tr>$10.00</tr>
            <tr>$30.00</tr>
          </tbody>
        </table>
      </div>
      <div className="flex-col">
        <div>Order Summary</div>
        <div>
          <div>Items: 3</div>
          <div>$30.00</div>
        </div>
        <div>Shipping</div>
        <div>TOTAL:$30.00</div>
        <button>CHECKOUT</button>
      </div>
    </>
  );
};

export default Cart;

import React from "react";
import "../../../public/style.css";

const OrderComplete = () => {
  return (
    <div className="flex-col items-center text-center mb-12">
      <img className="object-center" src="/images/complete-icon-6.png" />
      <h1>Congratulations, your order has been placed!</h1>
    </div>
  );
};

export default OrderComplete;

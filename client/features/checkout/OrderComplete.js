import React from "react";
import "../../../public/style.css";
import { useNavigate } from "react-router-dom";

const OrderComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-col items-center text-center mb-12">
      <img
        className="w-32 h-32 m-auto mt-24"
        src="/images/complete-icon-6.png"
      />
      <h1 className="text-green-700 text-2xl p-8">
        Congratulations, your order has been placed!
      </h1>
      <p
        onClick={() => navigate("/products")}
        className="text-lg p-8 underline underline-offset-8 hover:font-bold hover:cursor-pointer hover:text-slate-700"
      >
        Keep Shopping
      </p>
    </div>
  );
};

export default OrderComplete;

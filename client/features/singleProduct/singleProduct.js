import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const dummyData = {
  name: "Medium Roast Coffee",
  imageUrl: "/splashPagePictures/1.jpg",
  roaster: "Blend",
  description: "Starbucks Whole Coffee Bean",
  price: "$10.99",
  quantity: 100,
};

const SingleProduct = () => {
  const [product, setProduct] = useState({ ...dummyData });
  const { id } = useParams();

  return (
    <div className="product">
      <img src={product.imageUrl} className="productImg" />
      <ul className="productDetails">
        <li>{product.name}</li>
        <li>{`Roaster: ${product.roaster}`}</li>
        <li>{`Origin: ${product.origin}`}</li>
        <li>{`Description: ${product.description}`}</li>
        <li>{`Price: ${product.price}`}</li>
        <li>{`Quantity: ${product.quantity}`}</li>
      </ul>
    </div>
  );
};

export default SingleProduct;

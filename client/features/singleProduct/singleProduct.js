import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./singleProductSlice";
import { addItem } from "../cart/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let product = useSelector(selectSingleProduct);

  console.log("product in component...............", product);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, []);

  const handleAddItem = (item) => {
    const cartItem = {};
    cartItem.cartId = item.cartId;
    cartItem.productId = item.productId;
    cartItem.quantity = item.quantity;
    dispatch(addItem(cartItem));
  };

  if (product[0]) {
    product = product[0];
    console.log("image URL...........", product.imageUrl);
  }

  return (
    <div className="product">
      <img src={product.imageUrl} className="productImg" />
      <img src="/" className="productImg" />
      <ul className="productDetails">
        <li className="product-span">{product.name}</li>
        <li>
          <span className="product-span">Roaster: </span>
          {product.roaster}
        </li>
        <li>
          <span className="product-span">Origin: </span>
          {product.origin}
        </li>
        <li>
          <span className="product-span">Description: </span>
          {product.description}
        </li>
        <li>
          <span className="product-span">Price: </span>
          {product.price}
        </li>
      </ul>
      <button
        onClick={() => {
          handleAddItem(product);
        }}
      >
        Add Item Cart
      </button>
    </div>
  );
};

export default SingleProduct;

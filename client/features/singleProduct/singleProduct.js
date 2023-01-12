import React, { useEffect, useState } from "react";
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
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, []);

  const handleAddItem = (item) => {
    // Change the code below when the functionality of adding an item to a userid's cart is implemented by Derek
    console.log("button handler fired!");
    console.log("quantity..............", quantity);
    // productId, quantity, userId
    const cartItem = {};

    cartItem.productId = item.id;
    cartItem.quantity = quantity;
    console.log("cartItem...........", cartItem);
    dispatch(addItem(cartItem));
  };

  return (
    <div className="product">
      {product.imageUrl ? (
        <img src={product.imageUrl.slice(1)} className="productImg" />
      ) : (
        <h1>Where is the image?</h1>
      )}
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
          {`$${product.price}`}
        </li>

        <label htmlFor="quantity">Add Amount:</label>

        <input
          type="number"
          name="qautitiy"
          min="1"
          max="10"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="block border-black border-2"
        />

        <button
          type="submit"
          className="add-item"
          onClick={() => {
            handleAddItem(product);
          }}
        >
          Add to Cart
        </button>
      </ul>
    </div>
  );
};

export default SingleProduct;

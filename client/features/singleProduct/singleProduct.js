import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./singleProductSlice";
import { addItem } from "../cart/cartSlice";
import { v4 } from "uuid";
import { authenticate } from "../auth/authSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let product = useSelector(selectSingleProduct);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, []);

  /* start of changes for dealing with guest */
  const itemRef = useRef();
  const [guestDispatch, setGuestDispatch] = useState(false);
  const user = useSelector((state) => state.auth.me);
  const userId = useSelector((state) => state.auth.me.id);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    console.log("running guest check");
    if (guestDispatch && isLoggedIn) {
      console.log("zzzzzzzzzz we will need to add", itemRef.current);
      //need to recall handleItem now
      handleAddItem(itemRef.current);
    }
  }, [isLoggedIn, guestDispatch]);

  const handleAddItem = (item) => {
    console.log("zzzzzzzzz", isLoggedIn);
    if (!isLoggedIn) {
      console.log("need to create guest user");
      const guestUser = v4() + "@guest.com";
      const method = "signup";
      console.log("zzzzzzzzz", guestUser);
      dispatch(authenticate({ email: guestUser, password: "junk", method }));
      setGuestDispatch(true);
      itemRef.current = item;
      //we need to recall handleAddItem once we know the account is created
    } else {
      //finally we can do addItem here knowing we have a userId
      console.log("yeahhh the user is", user);
    }
  };
  /* end of changes for dealing with guest */

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

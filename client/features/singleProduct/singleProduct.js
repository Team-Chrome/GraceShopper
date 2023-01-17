import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./singleProductSlice";
import { addItem, fetchCart, selectCart, updateItem } from "../cart/cartSlice";
import { v4 } from "uuid";
import { authenticate } from "../auth/authSlice";
import { trimEnd } from "lodash";
import EditSingleProduct from "./editSingleProduct";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let product = useSelector(selectSingleProduct);
  const [quantity, setQuantity] = useState(1);
  const [editMode, setEditMode] = useState({
    status: false,
    buttonText: "Edit",
  });
  const cart = useSelector(selectCart);

  useEffect(() => {
    window.scrollTo(0,0)
    dispatch(fetchSingleProductAsync(id));
    dispatch(fetchCart(user.id));
  }, []);

  /* start of changes for dealing with guest */
  const itemRef = useRef();
  const [guestDispatch, setGuestDispatch] = useState(false);
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  console.log(user);

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

      // see if the items exist in state before you make calls to the backend

      const itemToAdd = {
        productId: product.id,
        quantity,
        price: product.price,
        userId: user.id,
      };

      if (!cart.items) {
        dispatch(addItem(itemToAdd));
      }

      if (cart.items) {
        const itemToUpdate = cart.items.filter((item) => {
          if (item.productId === product.id) {
            return item;
          }
        });

        if (itemToUpdate[0]) {
          const newQty = Number(itemToUpdate[0].quantity) + Number(quantity);
          dispatch(
            updateItem({
              cartId: cart.id,
              productId: product.id,
              quantity: newQty,
            })
          );
        } else {
          dispatch(addItem(itemToAdd));
        }
      }
    }
  };

  const handleEditClick = () => {
    if (editMode.status === false) {
      setEditMode({ status: true, buttonText: "Save Changes" });
    } else {
      setEditMode({ status: false, buttonText: "Edit" });
    }
  };

  return (
    <div>
      {editMode.status === true ? (
        <EditSingleProduct product={product} />
      ) : (
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

            {user.isAdmin ? (
              <button
                onClick={() => {
                  handleEditClick();
                }}
                className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                {editMode.buttonText}
              </button>
            ) : (
              <button
                type="submit"
                className="add-item"
                onClick={() => {
                  handleAddItem(product);
                }}
              >
                Add to Cart
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

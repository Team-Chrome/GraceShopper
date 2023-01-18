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
import EditSingleProduct from "./editSingleProduct";
import AddItemConfirmation from "./addItemConfirmation";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let product = useSelector(selectSingleProduct);
  const [quantity, setQuantity] = useState(1);
  const [editMode, setEditMode] = useState({
    status: false,
    buttonText: "Edit",
  });
  const [itemAdded, setItemAdded] = useState(false);

  const cart = useSelector(selectCart);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSingleProductAsync(id));
    dispatch(fetchCart(user.id));
  }, []);

  /* start of changes for dealing with guest */
  const itemRef = useRef();
  const [guestDispatch, setGuestDispatch] = useState(false);
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    if (guestDispatch && isLoggedIn) {
      //need to recall handleItem now
      handleAddItem(itemRef.current);
    }
  }, [isLoggedIn, guestDispatch]);

  const handleAddItem = (item) => {
    setItemAdded(true);
    if (!isLoggedIn) {
      const guestUser = v4() + "@guest.com";
      const method = "guest";
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
        <div className="product relative w-full h-screen z-0 font-sans">
          {itemAdded ? (
            <AddItemConfirmation product={product} quantity={quantity} />
          ) : null}

          <div className="flex justify-center p-24 gap-2">
            {product.imageUrl ? (
              <img
                className="w-96 h-auto"
                src={
                  product.imageUrl[0] == "."
                    ? product.imageUrl.slice(1)
                    : product.imageUrl
                }
              />
            ) : (
              <h1>Where is the image?</h1>
            )}

            <ul className="productDetails p-4">
              <li className="product-span text-4xl font-black">
                {product.name}
              </li>
              <li className="font-medium mb-4">{product.roaster}</li>
              <li className="mb-12 text-3xl text-red-800">{`$${product.price}`}</li>
              <li className="mb-2 font-light">
                <span className="font-medium">Origin: </span>
                {product.origin}
              </li>
              <p className="font-medium">About this item: </p>
              <li className="font-light text-sm mb-12">
                {product.description}
              </li>
              <div className="flex gap-2 mb-2 items-center">
                <label htmlFor="quantity">Qty:</label>

                <input
                  type="number"
                  name="qautitiy"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="border-black border text-center w-12 h-8"
                />
              </div>
              <div className="">
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
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => {
                      handleAddItem(product);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

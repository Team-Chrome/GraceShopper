import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSingleProductAsync,
  updateSingleProductAsync,
} from "./singleProductSlice";

const EditSingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleUpdateProduct = (event) => {
    event.preventDefault();

    const [name, roaster, origin, description, price, imageUrl] = Array.from(
      event.target
    ).map((element) => element.value);

    if (!imageUrl) {
      imageUrl = product.imageUrl;
    }

    const updatedProduct = {
      id: product.id,
      name,
      roaster,
      origin,
      description,
      price,
      imageUrl,
    };

    dispatch(updateSingleProductAsync(updatedProduct));
    console.log(
      "updated product has been dispatched..............",
      updatedProduct
    );
    Navigate(`/products/${product.id}`);
  };

  const handleDelete = (id) => {
    console.log("delete button has been clicked.......");
    dispatch(deleteSingleProductAsync(id));
    Navigate(`/products`);
  };

  return (
    <div className="editPageDiv">
      <h1>Edit Mode</h1>
      <form onSubmit={handleUpdateProduct} id="editPageForm">
        <label htmlFor="name" className="editProductLabel">
          Name:
        </label>
        <input type="text" name="name" defaultValue={product.name} />

        <label htmlFor="roaster" className="editProductLabel">
          Roaster:
        </label>
        <input
          type="text"
          name="roaster"
          defaultValue={product.roaster}
          className="editProductInput"
        />

        <label htmlFor="origin" className="editProductLabel">
          Origin:
        </label>
        <input type="text" name="origin" defaultValue={product.origin} />

        <label htmlFor="description" className="editProductLabel">
          description:
        </label>
        <input
          type="text"
          name="description"
          defaultValue={product.description}
        />

        <label htmlFor="price" className="editProductLabel">
          price:
        </label>
        <input type="text" name="price" defaultValue={product.price} />

        <label htmlFor="imageUrl" className="editProductLabel">
          imageUrl
        </label>
        <input type="text" name="imageUrl" defaultValue={product.imageUrl} />
        <img src={product.imageUrl.slice(1)} />

        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => handleDelete(product.id)}>Delete</button>
    </div>
  );
};

export default EditSingleProduct;

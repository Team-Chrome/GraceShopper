import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleProductAsync } from "./singleProductSlice";

const EditSingleProduct = ({ product }) => {
  const dispatch = useDispatch();

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

    console.log("Im just messing around..............", updatedProduct);
    dispatch(updateSingleProductAsync(updatedProduct));
  };

  return (
    <div className="editPageDiv">
      <h1>Edit Mode</h1>
      <form onSubmit={handleUpdateProduct} id="editPageForm">
        <label htmlFor="name" className="product-span">
          Name:
        </label>
        <input
          type="text"
          name="name"
          defaultValue={product.name}
          onClick={(event) => {
            handleChangeElement(event);
          }}
        />

        <label htmlFor="roaster" className="product-span">
          Roaster:
        </label>
        <input type="text" name="roaster" defaultValue={product.roaster} />

        <label htmlFor="origin" className="product-span">
          Origin:
        </label>
        <input type="text" name="origin" defaultValue={product.origin} />

        <label htmlFor="description" className="product-span">
          description:
        </label>
        <input
          type="text"
          name="description"
          defaultValue={product.description}
        />

        <label htmlFor="price" className="product-span">
          price:
        </label>
        <input type="text" name="price" defaultValue={product.price} />

        <label htmlFor="imageUrl" className="product-span">
          imageUrl
        </label>
        <input type="text" name="imageUrl" />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditSingleProduct;

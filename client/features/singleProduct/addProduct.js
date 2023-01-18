import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSingleProductAsync } from "./singleProductSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleAddProduct = (event) => {
    event.preventDefault();

    const [id, name, roaster, origin, description, price, quantity, imageUrl] =
      Array.from(event.target).map((element) => element.value);

    console.log(name);

    const addProduct = {
      id,
      name,
      roaster,
      origin,
      description,
      price,
      quantity,
      imageUrl,
    };
    console.log("addProduct", addProduct);

    dispatch(addSingleProductAsync(addProduct));
    Navigate("/products");
  };

  return (
    <div>
      <h1>Add Product Page</h1>
      <form onSubmit={handleAddProduct}>
        <label htmlFor="id">id:</label>
        <input type="text" name="id" />

        <label htmlFor="name">Name:</label>
        <input type="text" name="name" />

        <label htmlFor="roaster">Roaster:</label>
        <input type="text" name="roaster" />

        <label htmlFor="origin">Origin:</label>
        <input type="text" name="origin" />

        <label htmlFor="description">Description:</label>
        <input type="text" name="description" />

        <label htmlFor="price">Price:</label>
        <input type="text" name="price" />

        <label htmlFor="quantity">Quantity:</label>
        <input type="text" name="quantity" />

        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" />

        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default AddProduct;

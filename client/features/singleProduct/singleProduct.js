import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSingleProduct } from "./singleProductSlice";

// const dummyData = {
//   name: "Medium Roast Coffee",
//   imageUrl: "/splashPagePictures/1.jpg",
//   roaster: "Blend",
//   description: "Starbucks Whole Coffee Beans",
//   price: "$10.99",
//   quantity: 100,
// };

const SingleProduct = () => {
  // const [product, setProduct] = useState({ ...dummyData });
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);

  // useEffect(() => {
  //   dispatch(fetchSingleStudentAsync(id));
  // }, [dispatch, id]);

  return (
    <div className="product">
      <img src={product.imageUrl} className="productImg" />
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
        <li>
          <span className="product-span">Quantity: </span>
          {product.quantity}
        </li>
      </ul>
    </div>
  );
};

export default SingleProduct;

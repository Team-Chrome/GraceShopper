import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../app/store";
import allProductsSlice, {
  fetchAllProducts,
} from "../allProducts/allProductsSlice";
import { fetchCart, selectCart, clearCart } from "../cart/cartSlice";
import { setSearchKey } from "../allProducts/allProductsSlice";

// additional feature: a drop down from search bar to filter through search results

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInUserName = useSelector((state) => state.auth.me.email);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { items } = useSelector((state) => state.allProducts);

  useEffect(() => {
    console.log("upon logging in", user);
    if (user.id) {
      dispatch(fetchCart(user.id));
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    let totalItems = 0;

    cart.items.map((item) => {
      totalItems += item.quantity;
    });
    setItemCount(totalItems);
  }, [cart]);

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    dispatch(clearCart());
    Navigate("/login");
  };

  // const handleSubmitx = (event) => {
  //   let filteredItems = items.filter((element) =>
  //     element.name.toLowerCase().includes(search.toLowerCase())
  //   );

  //   console.log("filteredItems", filteredItems);
  //   event.preventDefault();
  //   setSearch("");
  // };

  const handleSubmit = (event) => {
    console.log("aaaaaaaaaaaaaa submitting", search);
    const selectedCategory = event.target[0].value;
    if (selectedCategory == "USER") {
      console.log('if statement sees "User"', selectedCategory);
      Navigate(`/users/${search}`);
    }
    console.log("searchCategory should be accurate", selectedCategory);

    event.preventDefault();
    dispatch(setSearchKey(search));
  };

  return (
    <div id="backdrop">
      <nav>
        <div className="nav" id="backdrop">
          {/* The navbar will show these links before you log in */}
          <h1>GraceShopper</h1>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <form
            onSubmit={(ev) => {
              handleSubmit(ev);
            }}
          >
            <select name="catergory" className="text-black">
              <option value="USER">USER EMAIL</option>
              <option value="PRODUCT">PRODUCT</option>
            </select>
            <input
              className="nav-input"
              type="text"
              name="searchbar"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <Link id="link-img" to="/cart">
            <img src="/shoppingcartcopy.png" />
            {itemCount} Cart Items!
          </Link>

          {isLoggedIn ? (
            <button
              style={{ float: "right" }}
              type="button"
              onClick={logoutAndRedirectHome}
            >
              Logout {loggedInUserName}
            </button>
          ) : (
            [<Link to="/login">Login</Link>, <Link to="/signup">Sign Up</Link>]
          )}
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

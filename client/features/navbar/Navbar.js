import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../app/store";
import allProductsSlice, {
  fetchAllProducts,
} from "../allProducts/allProductsSlice";
import { fetchCart, selectCart } from "../cart/cartSlice";

// additional feature: a drop down from search bar to filter through search results

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInUserName = useSelector((state) => state.auth.me.email);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    setItemCount(cart.items.length);
  }, [cart]);

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSubmit = (event) => {
    let obj = {};
    for (let i = 0; items.length > i; i++) {
      if (items[i].name.includes(search)) {
        obj = { ...items[i] };
      }
    }
    event.preventDefault();
    setSearch("");
  };

  return (
    <div id="backdrop">
      <nav>
        <div className="nav" id="backdrop">
          {/* The navbar will show these links before you log in */}
          <h1>GraceShopper</h1>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <form onSubmit={handleSubmit}>
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

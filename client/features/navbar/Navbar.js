import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
// import { selectCart } from "../cart/cartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInUserName = useSelector((state) => state.auth.me.email);
  const cartItems = useSelector((state) => state.cart.items);
  console.log("CART ITEM LEGNTH BEFORE", cartItems);
  console.log("CART ITEM LEGNTH BEFORE", cartItems.length);

  useEffect(() => {
    console.log("AFTER CART LENGTH", cartItems.length);
  }, []);

  const [search, setSearch] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSubmit = (event) => {
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
          <form>
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

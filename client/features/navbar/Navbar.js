import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInUserName = useSelector((state) => state.auth.me.email);

  const [search, setSearch] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/products");
    }
  }, [isLoggedIn]);

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
          <form nav-form>
            <input
              className="nav-input"
              type="text"
              name="searchbar"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <Link id="link-img">
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

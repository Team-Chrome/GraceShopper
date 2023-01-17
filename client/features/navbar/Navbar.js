import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../app/store";
import allProductsSlice, {
  fetchAllProducts,
} from "../allProducts/allProductsSlice";
import { fetchCart, selectCart, clearCart } from "../cart/cartSlice";
import { setSearchKey } from "../allProducts/allProductsSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInUserName = useSelector((state) => state.auth.me.email);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [isUserSelected, setIsUserSelected] = useState(false);
  console.log("isUserSelected................................", isUserSelected);

  const { items } = useSelector((state) => state.allProducts);

  useEffect(() => {
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

  if (!isUserSelected) {
    useEffect(() => {
      console.log("zzzzzzzzzz search activity", search);
      dispatch(setSearchKey(search));
    }, [search]);
  } else {
    console.log("isUserSelected.........................", isUserSelected);
    useEffect(() => {
      console.log("user search,,..........,", search);
    }, []);
  }
  const handleUserSearch = (event) => {
    event.preventDefault();
    if (!isUserSelected) return "";
    event.preventDefault();
    console.log("onSubmit in the form works!!");
    console.log(
      "event.target.value, this function should not submit if",
      event.target.value
    );
    Navigate(`/users/${search}`);
  };

  return (
    <div id="backdrop">
      <nav>
        <div className="nav" id="backdrop">
          {/* The navbar will show these links before you log in */}
          <h1>GraceShopper</h1>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          {user.isAdmin ? (
            <form onSubmit={handleUserSearch}>
              <select
                name="catergory"
                className="text-black"
                onChange={(event) => {
                  event.target.value == "USER"
                    ? setIsUserSelected(true)
                    : setIsUserSelected(false);
                }}
              >
                <option value="PRODUCT" key="1">
                  PRODUCT
                </option>
                <option value="USER" key="2">
                  USER EMAIL
                </option>
              </select>
              <input
                className="nav-input"
                type="text"
                name="searchbar"
                value={search}
                placeholder="Search..."
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          ) : (
            <input
              className="nav-input"
              type="text"
              name="searchbar"
              value={search}
              placeholder="Search..."
              onChange={(event) => setSearch(event.target.value)}
            />
          )}

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

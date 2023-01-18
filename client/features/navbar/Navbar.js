import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../app/store";
import allProductsSlice, {
  fetchAllProducts,
} from "../allProducts/allProductsSlice";
import { fetchCart, selectCart, clearCart } from "../cart/cartSlice";
import { setSearchKey } from "../allProducts/allProductsSlice"

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
    navigate("/login");
  };

  const handleSubmitx = (event) => {
    let obj = {};
    for (let i = 0; items.length > i; i++) {
      if (items[i].name.includes(search)) {
        obj = { ...items[i] };
      }
    }
    event.preventDefault();
    setSearch("");
  };

  const handleSubmit = event => {
    //console.log('aaaaaaaaaaaaaa submitting', search)
    event.preventDefault();
    dispatch(setSearchKey(search))
  }

  useEffect(()=>{
    dispatch(setSearchKey(search))
  },[search])

  return (
    <div key="backdrop" id="backdrop">
      <nav key="navKey">
        <div key="backdropNav" className="nav" id="backdrop">
          {/* The navbar will show these links before you log in */}
          <h1 key="gs">GraceShopper</h1>
          <Link key="linkHome" to="/home">Home</Link>
          <Link key="linkProducts" to="/products">Products</Link>
          <form key="searchBar" onClick={(ev)=>{ev.preventDefault()}} >
            <input
              key="inputSearch"
              className="nav-input"
              type="text"
              name="searchbar"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button key="searchButton" type="submit">Search</button>
          </form>

          <Link key="linkCart" id="link-img" to="/cart">
            <img key="cartImg" src="/shoppingcartcopy.png" />
            {itemCount} Cart Items!
          </Link>

          {isLoggedIn ? (
            <button
              key="logOut"
              style={{ float: "right" }}
              type="button"
              onClick={logoutAndRedirectHome}
            >
              Logout {loggedInUserName}
            </button>
          ) : (
            [<Link key="loginKey" to="/login">Login</Link>, <Link to="/signup">Sign Up</Link>]
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  const handleSubmit = (event) => {
    console.log("aaaaaaaaaaaaaa submitting", search);
    event.preventDefault();
    dispatch(setSearchKey(search));
  };

  const logInSignUpComponent = () => {
    return (
      <div>
        <Link
          className=" text-lg hover:underline underline-offset-8"
          to="/login"
        >
          Login
        </Link>

        <Link
          className=" text-lg hover:underline underline-offset-8"
          to="/signup"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  const loggedInGuest = () => {
    return (
      <div>
        <p>Logged in as guest</p>
        <div>{logInSignUpComponent()}</div>
      </div>
    );
  };

  const loggedInUser = () => {
    return (
      <div>
        <button type="button" onClick={logoutAndRedirectHome}>
          Logout {loggedInUserName}
        </button>
        {logInSignUpComponent()}
      </div>
    );
  };

  const userTypeCheck = () => {
    if (isLoggedIn && !user.isGuest) {
      return loggedInUser();
    }

    if (isLoggedIn && user.isGuest) {
      return loggedInGuest();
    }

    return logInSignUpComponent();
  };

  return (
    <div>
      <nav className="bg-slate-800 h-24 w-screen text-stone-200 font-sans ">
        <div className="flex items-center justify-between pl-4 pr-4">
          {/* The navbar will show these links before you log in */}
          <Link className="text-3xl font-extrabold" to="/home">
            Coffee Castle
          </Link>
          <Link to="/products">
            <div className=" text-lg hover:underline underline-offset-8">
              Products
            </div>
          </Link>
          <form
            onChange={(ev) => {
              handleSubmit(ev);
            }}
          >
            <input
              className="w-fullshadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="searchbar"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              className="ml-3 border border-stone-200 rounded-lg p-2 hover:bg-stone-200 hover:text-slate-800"
              type="submit"
            >
              Search
            </button>
          </form>

          <div className="rounded-full bg-slate-400 flex w-16 h-16">
            <Link className="flex relative m-auto" to="/cart">
              <img className="h-8" src="/shoppingcartcopy.png" />
              <div className="rounded-full w-6 h-6 bg-green-800 flex items-center justify-center absolute left-4 -bottom-2 text-sm">
                {itemCount}
              </div>
            </Link>
          </div>
          {userTypeCheck()}
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

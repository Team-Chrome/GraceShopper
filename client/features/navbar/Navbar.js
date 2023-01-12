import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInUserName = useSelector(state=>state.auth.me.email)

  const [search, setSearch] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(()=>{
    if (isLoggedIn) {
      navigate('/products')
    }
  },[isLoggedIn])

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch("");
  };

  return (
    <div>
      <h1>GraceShopper</h1>
      <nav className="topnav">
          <div className="topnav">
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <form>
              <input
                type="text"
                name="searchbar"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                id="navbar-input"
              />
              <button type="submit">Search</button>
            </form>
            <Link>
              <img src="/icons8-shopping-cart-48.png"></img>
              <h2>{itemCount}</h2>
            </Link>

            {isLoggedIn ? ( 
              
                <button style={{float:'right'}} type="button" onClick={logoutAndRedirectHome}>
                  Logout {loggedInUserName}
                </button>
              
            ) : ( [
            <Link to="/login">Login</Link>,
            <Link to="/signup">Sign Up</Link> ])}
          </div>
        
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

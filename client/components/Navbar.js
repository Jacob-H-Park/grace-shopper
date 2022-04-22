import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => {

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  return (
    <nav>
      <Link to="/">
        <h1>Bloom</h1>
      </Link>
      {isLoggedIn ? (
        isAdmin ? (
          <div>
            <Link to="/home">Home</Link>

            <a onClick={() => dispatch(logout())}>
              Logout
            </a>
            <Link to="/cart">Cart</Link>
            <Link to="/inventory_management">Inventory Management</Link>
            <Link to="/user_management">User Management</Link>
          </div>
        ) : (
          <div>
            <Link to="/home">Home</Link>

            <a onClick={() => dispatch(logout())}>
              Logout
            </a>
            <Link to="/cart">Cart</Link>
          </div>
        )
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
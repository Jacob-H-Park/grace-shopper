import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/home">
          Bloom
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        {isLoggedIn ? (
          isAdmin ? (
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="#">
                    Flowers
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="#">
                    Meet The Team
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/inventory_management">
                    Inventory Management
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/user_management">
                    User Management
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link"
                    onClick={() => dispatch(logout())}
                    to="/home"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="#">
                    Flowers
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="#">
                    Meet The Team
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link"
                    onClick={() => dispatch(logout())}
                    to="/home"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )
        ) : (
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" to="/home">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">
                  Flowers
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">
                  Meet The Team
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* <nav>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        {isLoggedIn ? (
          isAdmin ? (
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link to="/home">Home</Link>
                </li>
                <li class="nav-item">Flowers</li>
                <li class="nav-item">Meet The Team</li>
                <li class="nav-item">
                  <Link to="/cart">Cart</Link>
                </li>
                <li class="nav-item">
                  <Link to="/inventory_management">Inventory Management</Link>
                </li>
                <li class="nav-item">
                  <Link to="/user_management">User Management</Link>
                </li>
                <li class="nav-item">
                  <a onClick={() => dispatch(logout())}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link to="/home">Home</Link>
                </li>
                <li class="nav-item">Flowers</li>
                <li class="nav-item">Meet The Team</li>
                <li class="nav-item">
                  <Link to="/cart">Cart</Link>
                </li>
                <li class="nav-item">
                  <a onClick={() => dispatch(logout())}>Logout</a>
                </li>
              </ul>
            </div>
          )
        ) : (
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/home">Home</Link>
              </li>
              <li class="nav-item">Flowers</li>
              <li class="nav-item">Meet The Team</li>
              <li class="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li class="nav-item">
                <Link to="/signup">Sign Up</Link>
              </li>
              <li class="nav-item">
                <Link to="/cart">Cart</Link>
              </li>
              <li class="nav-item">
                <a onClick={() => dispatch(logout())}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </nav> */}
    </nav>
  );
};

export default Navbar;

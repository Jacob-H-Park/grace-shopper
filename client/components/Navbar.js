import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  return(
    <div>
      <Link to="/">
        <h1>Bloom</h1>
      </Link>
      <div>
        {isLoggedIn === true && isAdmin === true && 
        <div>
          <Link to="/home">Home</Link> 
          <div>inventory management</div>
          <div>User Information management</div>
        </div>} 

        {isLoggedIn === true && isAdmin === false && 
        <div>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">Cart</Link>
        </div>}

        {isLoggedIn === false &&
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        }
      </div>
{/* 
      <nav>
        {isLoggedIn ? (
          <div>

            
            <Link to="/home">Home</Link>

            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div>

            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav> */}
      <hr />
    </div>
  )
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

import React from "react";
import { connect } from "react-redux";
import auth from "../store/auth";
import Flowers from "./Flowers";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, isAdmin } = props;
  return isAdmin ? (
    <div>
      <h3>
        Welcome Admin {username.slice(0, 1).toUpperCase()}
        {username.slice(1)}
      </h3>
      <Flowers />
    </div>
  ) : (
    <div>
      <h3>Welcome, {username}</h3>
      <Flowers />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapState)(Home);

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  withRouter,
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Flowers from "./components/Flowers";
import SingleFlower from "./components/SingleFlower";
import EditProduct from "./components/EditProduct";
import ProductInfo from "./components/ProductInfo";
import UserInfo from "./components/UserInfo";
import Checkout from "./components/Checkout";
import { me } from "./store";

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Router>
        <Navbar />
        {isLoggedIn ? (
          isAdmin ? (
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/cart" component={Cart} />
              <Route
                exact
                path="/inventory_management"
                component={ProductInfo}
              />
              <Route path="/editflowerinfo/:id" component={EditProduct} />
              <Route exact path="/user_management" component={UserInfo} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/cart" component={Cart} />
            </Switch>
          )
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
          </Switch>
        )}
        <Switch>
          <Route exact path="/" component={Flowers} />
          <Route path="/flower/:id" component={SingleFlower} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Router>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(App));

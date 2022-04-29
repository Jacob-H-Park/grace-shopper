import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withRouter,
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { Login, Signup } from "./components/AuthForm";
import Cart from "./components/Cart";
import GuestCart from "./components/GuestCart";
import Navbar from "./components/Navbar";
import Flowers from "./components/Flowers";
import SingleFlower from "./components/SingleFlower";
import EditProduct from "./components/EditProduct";
import ProductInfo from "./components/ProductInfo";
import UserInfo from "./components/UserInfo";
import Welcome from "./components/Welcome";
import EditUserInfo from "./components/EditUserInfo";
import ChangePassword from "./components/ChangePassword";
import ADdashboard from "./components/ADdashboard";
import AddProduct from "./components/Addproduct";

import { me } from "./store";
import { fetchProducts } from "./store/flowers";

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchFlowers();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div className="root-container">
        <Router>
          <Navbar />
          {isLoggedIn ? (
            isAdmin ? (
              <Switch>
                <Route exact path="/admin_dashboard" component={ADdashboard} />
                <Route path="/editflowerinfo/:id" component={EditProduct} />
                <Route exact path="/account" component={UserInfo} />
                <Route path="/account/edit" component={EditUserInfo} />
                <Route path="/account/password" component={ChangePassword} />
                <Route path="/cart" component={Cart} />
                <Route path="/admin_products" component={ProductInfo} />
                <Route path="/add_product" component={AddProduct} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/account" component={UserInfo} />
                <Route path="/account/edit" component={EditUserInfo} />
                <Route path="/account/password" component={ChangePassword} />
                <Route path="/cart" component={Cart} />
              </Switch>
            )
          ) : (
            <Switch>
              <Route path="/cart" component={GuestCart} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          )}
          <Switch>
            <Route path="/home" component={Welcome} />
            <Route path="/flowers/:id" component={SingleFlower} />
            <Route path="/flowers" component={Flowers} />
          </Switch>
        </Router>
      </div>
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
    loadInitialData: () => dispatch(me()),
    fetchFlowers: () => dispatch(fetchProducts()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(App));

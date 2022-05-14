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
import LandingPage from "./components/LandingPage";
import MeetTheTeam from "./components/MeetTheTeam";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddProduct from "./components/AddProduct";
import UserList from "./components/admin/components/UserList";
import NewUser from "./components/admin/components/NewUser";
import User from "./components/admin/components/User";
import UserOrders from "./components/UserOrders";
import Footer from "./components/Footer";
import FlowerCategories from "./components/FlowerTypes/FlowerCategories";
import Account from "./components/Account";
import FavoriteList from "./components/FavoriteList";
import { myContext } from './Context';
import { me } from "./store";
import { fetchProducts } from "./store/flowers";

class App extends Component {
  static contextType = myContext;

  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchFlowers();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    // user object is immediatly available in the frontend for the whole APP right after oauth login
    const userObject = this.context;

    return (
      <div className="root-container">
        <Router>
          <Navbar />
          {isLoggedIn ? (
            isAdmin ? (
              <Switch>
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/account" component={Account} />
                <Route path="cart" component={Cart} />
                <Route exact path="/" component={LandingPage} />
                <Route path="/flowers/:id" component={SingleFlower} />
                <Route path="/flowers" component={Flowers} />
                <Route path="/user-orders" component={UserOrders}/>
                <Route path="/meet_the_team" component={MeetTheTeam} />
                <Route path="/sig-bouquets" component={FlowerCategories} />
                <Route path="/sympathy" component={FlowerCategories} />
                <Route path="/preserved-rosesy" component={FlowerCategories} />
                <Route path="/favorite" component={FavoriteList} />
                <Route path="/:type" component={FlowerCategories} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/account" component={Account} />
                <Route path="/cart" component={Cart} />
                <Route exact path="/" component={LandingPage} />
                <Route path="/flowers/:id" component={SingleFlower} />
                <Route path="/flowers" component={Flowers} />
                <Route path="/user-orders" component={UserOrders}/>
                <Route path="/meet_the_team" component={MeetTheTeam} />
                <Route path="/sig-bouquets" component={FlowerCategories} />
                <Route path="/sympathy" component={FlowerCategories} />
                <Route path="/preserved-rosesy" component={FlowerCategories} />
                <Route path="/favorite" component={FavoriteList} />
                <Route path="/:type" component={FlowerCategories} />
              </Switch>
            )
          ) : (
            <Switch>
              <Route path="/cart" component={GuestCart} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route exact path="/" component={LandingPage} />
              <Route path="/flowers/:id" component={SingleFlower} />
              <Route path="/flowers" component={Flowers} />
              <Route path="/user-orders" component={UserOrders}/>
              <Route path="/meet_the_team" component={MeetTheTeam} />
              <Route path="/sig-bouquets" component={FlowerCategories} />
              <Route path="/sympathy" component={FlowerCategories} />
              <Route path="/preserved-rosesy" component={FlowerCategories} />
              <Route path="/favorite" component={FavoriteList} />
              <Route path="/:type" component={FlowerCategories} />
            </Switch>
          )}
          {/* <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/flowers/:id" component={SingleFlower} />
            <Route path="/flowers" component={Flowers} />
            <Route path="/user-orders" component={UserOrders}/>
            <Route path="/meet_the_team" component={MeetTheTeam} />
            <Route path="/sig-bouquets" component={FlowerCategories} />
            <Route path="/sympathy" component={FlowerCategories} />
            <Route path="/preserved-rosesy" component={FlowerCategories} />
            <Route path="/favorite" component={FavoriteList} />
            <Route path="/:type" component={FlowerCategories} />
          </Switch> */}
          <Footer />
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

import React from "react";
import { Link, BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import UserList from "./components/UserList";
import User from "./components/User";
import NewUser from "./components/newUser";
import ProductInfo from "../ProductInfo";
import AddProduct from "../AddProduct";
import EditProduct from "../EditProduct";
import "./style/ADdashboard.css";

const ADdashboard = ()=>{
    return (
        <div>
            {/* <Link to="/admin_products">View Products</Link>
            <Link to="/admin_orders">View Orders</Link>
            <Link to="/admin_promotion">View Promotion</Link> */}
            <Router>
                {/* <Topbar /> */}
                <div className="container">
                    <Sidebar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/users">
                            <UserList />
                        </Route>
                        <Route path="/user/:userId">
                            <User />
                        </Route>
                        <Route path="/newUser">
                            <NewUser />
                        </Route>
                        <Route path="/admin_products">
                            <ProductInfo />
                        </Route>
                        <Route path="/add_product">
                            <AddProduct />
                        </Route>
                        <Route path="/editflowerinfo/:id" component={EditProduct} />  
                    </Switch>
                </div>
            </Router>
        </div>

    )
}

export default ADdashboard;
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Flowers from "./components/Flowers";
import SingleFlower from "./components/SingleFlower";
import ProductInfo from "./components/Inventory"
import UserInfo from "./components/UserInfo";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes />
      <Switch>
        <Route exact path="/" component={Flowers} />
        <Route path="/flower/:id" component={SingleFlower} />
      </Switch>
      <Route exact path="/inventory_management" component={ProductInfo} />
      <Route exact path="/user_management" component={UserInfo} />
    </Router>
  );
};

export default App;

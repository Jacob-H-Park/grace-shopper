import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Products from "./components/Products";
import SingleFlower from "./components/SingleFlower";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes />

      <Switch>
        <Route exact path="/" component={Products} />
        <Route path="/flower/:id" component={SingleFlower} />
      </Switch>
    </Router>
  );
};

export default App;

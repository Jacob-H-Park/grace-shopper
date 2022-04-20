import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Flowers from "./components/Flowers";
import SingleFlower from "./components/SingleFlower";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes />

      <Switch>
        <Route path="/" component={Flowers} />
        <Route path="/flower/:id" component={SingleFlower} />
      </Switch>
    </Router>
  );
};

export default App;

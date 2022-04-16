import React from "react";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Products />
      <Routes />
    </div>
  );
};

export default App;

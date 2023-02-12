import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import history from "./history";
import store from "./store";
import App from "./App";
import { theme } from "./siteTheme";
import Context from './Context';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Context>
          <App />
        </Context>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);

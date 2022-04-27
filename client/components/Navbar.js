import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { logout } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  // Nav Tabs display differently for different role: Admin, User, Guest
  const navTabsAdmin = [
    { tab: "Flowers", url: "/flowers" },
    { tab: "Meet The Team", url: "#" },
    { tab: "Admin Dashboard", url: "/admin_dashboard" },
    { tab: "User Management", url: "/user_management" },
  ];

  const navTabsUser = [
    { tab: "Flowers", url: "/flowers" },
    { tab: "Meet The Team", url: "#" },
    { tab: "Account", url: "/account" },
  ];

  const navTabsGuest = [
    { tab: "Flowers", url: "/flowers" },
    { tab: "Meet The Team", url: "#" },
    { tab: "Sign Up", url: "/signup" },
    { tab: "Login", url: "/login" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          color="white"
          fontFamily="Abril Fatface"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Link to="/home">Bloom.</Link>
        </Typography>

        {isLoggedIn ? (
          isAdmin ? (
            <Stack
              direction="row"
              divider={
                <Divider color="white" orientation="vertical" flexItem />
              }
              spacing={2}
            >
              {navTabsAdmin.map(({ tab, url }) => {
                return (
                  <Link to={url}>
                    <Button color="inherit">{tab}</Button>
                  </Link>
                );
              })}
              <Link to="/login">
                <Button color="inherit" onClick={() => dispatch(logout())}>
                  Logout
                </Button>
              </Link>
              <Link to="/cart">
                <IconButton color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </Link>
            </Stack>
          ) : (
            <Stack
              direction="row"
              divider={
                <Divider color="white" orientation="vertical" flexItem />
              }
              spacing={2}
            >
              {navTabsUser.map(({ tab, url }) => {
                return (
                  <Link to={url}>
                    <Button color="inherit">{tab}</Button>
                  </Link>
                );
              })}
              <Link to="/login">
                <Button color="inherit" onClick={() => dispatch(logout())}>
                  Logout
                </Button>
              </Link>
              <Link to="/cart">
                <IconButton color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </Link>
            </Stack>
          )
        ) : (
          <Stack
            direction="row"
            divider={<Divider color="white" orientation="vertical" flexItem />}
            spacing={2}
          >
            {navTabsGuest.map(({ tab, url }) => {
              return (
                <Link to={url}>
                  <Button color="inherit">{tab}</Button>
                </Link>
              );
            })}
            <Link to="/cart">
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

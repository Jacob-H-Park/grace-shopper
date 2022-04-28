import React, { useState } from "react";
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
  Drawer,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { logout } from "../store";
import Cart from "./Cart";
import GuestCart from "./GuestCart";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { order, isLoggedIn, isAdmin } = useSelector((state) => ({
    order: state.order || { products: [] },
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin
  }));

  const dispatch = useDispatch();



  let cartCount = 0;

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

  //TO DO: Add item count to cart logo
  if(order.products) {
    console.log(order);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Checking which cart should be displayed */}
        {isLoggedIn ? (
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Cart />
          </Drawer>
        ) : (
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <GuestCart />
          </Drawer>
        )}

        {/* Check which options should be available in the NavBar */}
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
              <IconButton color="inherit" onClick={() => setOpen(true)}>
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
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
              <IconButton color="inherit" onClick={() => setOpen(true)}>
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
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

            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

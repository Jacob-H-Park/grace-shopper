import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Drawer } from "@mui/material";

import Cart from "./Cart";
import GuestCart from "./GuestCart";
import AdminStack from "./NavbarStacks/AdminStack";
import UserStack from "./NavbarStacks/UserStack";
import GuestStack from "./NavbarStacks/GuestStack";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { isLoggedIn, isAdmin } = useSelector((state) => ({
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  }));

  // Nav Tabs display differently for different role: Admin, User, Guest
  const navTabsAdmin = [
    { tab: "Meet The Team", url: "/meet_the_team" },
    { tab: "Admin Dashboard", url: "/admin" },
  ];

  const navTabsUser = [{ tab: "Meet The Team", url: "/meet_the_team" }];

  const navTabsGuest = [
    { tab: "Meet The Team", url: "/meet_the_team" },
    { tab: "Sign Up", url: "/signup" },
    { tab: "Login", url: "/login" },
  ];

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
          <Link to="/">Bloom.</Link>
        </Typography>

        {isLoggedIn ? (
          isAdmin ? (
            <AdminStack
              navTabsAdmin={navTabsAdmin}
              setOpen={setOpen}
              isAdmin={isAdmin}
            />
          ) : (
            <UserStack navTabsUser={navTabsUser} setOpen={setOpen} />
          )
        ) : (
          <GuestStack navTabsGuest={navTabsGuest} setOpen={setOpen} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

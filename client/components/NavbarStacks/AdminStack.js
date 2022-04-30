import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Stack, Button, Divider, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { logout } from "../../store";

const AdminStack = ({ setOpen, navTabsAdmin }) => {
  const dispatch = useDispatch();

  return (
    <Stack
      direction="row"
      divider={<Divider color="white" orientation="vertical" flexItem />}
      spacing={2}
    >
      {navTabsAdmin.map(({ tab, url }) => {
        return (
          <Link key={tab} to={url}>
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
        <Badge badgeContent={1} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Stack>
  );
};

export default AdminStack;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Stack,
  Button,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountMenu from "../HelperComponents/AccountMenu";
import FlowerMenu from "../HelperComponents/FlowerMenu";

const UserStack = ({ navTabsUser, setOpen }) => {
  const dispatch = useDispatch();

  return (
    <Stack
      direction="row"
      divider={<Divider color="white" orientation="vertical" flexItem />}
      spacing={2}
    >
      <FlowerMenu />
      {navTabsUser.map(({ tab, url }) => {
        return (
          <Link key={tab} to={url}>
            <Button color="inherit">{tab}</Button>
          </Link>
        );
      })}
      <AccountMenu />
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <Badge badgeContent={0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Stack>
  );
};

export default UserStack;

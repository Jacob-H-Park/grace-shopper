import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Stack, Button, Divider, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountMenu from "../HelperComponents/AccountMenu";
import FlowerMenu from "../HelperComponents/FlowerMenu";

const UserStack = ({ navTabsUser, setOpen }) => {
  const {
    order: { products },
  } = useSelector((state) => ({ order: state.order || { products: [] } }));

  let total;
  if (products) {
    total = products.reduce(
      (acc, flower) => (acc += flower.lineItem.quantity),
      0
    );
  }

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
        <Badge badgeContent={total || 0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Stack>
  );
};

export default UserStack;

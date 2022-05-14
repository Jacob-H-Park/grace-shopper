import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Stack, Button, Divider, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountMenu from "../HelperComponents/AccountMenu";
import FlowerMenu from "../HelperComponents/FlowerMenu";
import { getCart } from "../../store/order.js";

const AdminStack = ({ setOpen, navTabsAdmin, isAdmin }) => {
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
      {navTabsAdmin.map(({ tab, url }) => {
        return (
          <Link key={tab} to={url}>
            <Button color="inherit">{tab}</Button>
          </Link>
        );
      })}
      <AccountMenu isAdmin={isAdmin} />
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <Badge badgeContent={total || 0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Stack>
  );
};

export default AdminStack;

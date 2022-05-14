import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stack, Button, Divider, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlowerMenu from "../HelperComponents/FlowerMenu";

const GuestStack = ({ navTabsGuest, setOpen }) => {
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
      {navTabsGuest.map(({ tab, url }) => {
        return (
          <Link key={tab} to={url}>
            <Button color="inherit">{tab}</Button>
          </Link>
        );
      })}

      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <Badge badgeContent={total || 0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Stack>
  );
};

export default GuestStack;

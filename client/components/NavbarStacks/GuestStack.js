import React from "react";
import { Link } from "react-router-dom";
import { Stack, Button, Divider, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const GuestStack = ({ navTabsGuest, setOpen }) => {
  return (
    <Stack
      direction="row"
      divider={<Divider color="white" orientation="vertical" flexItem />}
      spacing={2}
    >
      {navTabsGuest.map(({ tab, url }) => {
        return (
          <Link key={tab} to={url}>
            <Button color="inherit">{tab}</Button>
          </Link>
        );
      })}

      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <Badge badgeContent={1} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Stack>
  );
};

export default GuestStack;

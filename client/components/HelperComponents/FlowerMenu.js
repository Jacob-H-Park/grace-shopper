import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, } from "@mui/material";

const FlowerMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClick}>
        FLOWERS
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/flowers">
          <MenuItem onClick={handleClose} color="black">
            All Flowers
          </MenuItem>
        </Link>
        <Link to={{pathname: "/rose", state: 'rose'}}>
          <MenuItem onClick={handleClose} color="black">
            Roses
          </MenuItem>
        </Link>
        <Link to={{pathname: "/tulip", state: 'tulip'}}>
          <MenuItem onClick={handleClose} color="black">
            Tulips
          </MenuItem>
        </Link>
        <Link to={{pathname: "/orchid", state: 'orchid'}}>
          <MenuItem onClick={handleClose} color="black">
            Orchids
          </MenuItem>
        </Link>        
        <Link to={{pathname: "/sig-bouquets", state: 'signature_bouquets'}}>
          <MenuItem onClick={handleClose} color="black">
            Signature Bouquets
          </MenuItem>
        </Link>        
        <Link to={{pathname: "/sympathy", state: 'sympathy'}}>
          <MenuItem onClick={handleClose} color="black">
            Sympathy
          </MenuItem>
        </Link>        
        <Link to={{pathname: "/preserved-rosesy", state: 'preserved_rose'}}>
          <MenuItem onClick={handleClose} color="black">
            Preserved Roses
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default FlowerMenu;
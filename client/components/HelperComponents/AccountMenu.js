import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../../store";

const AccountMenu = ({ isAdmin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isAdmin ? (
          <MenuItem onClick={handleClose} color="black">
            Admin Portal
          </MenuItem>
        ) : null}

        <Link to="/account">
          <MenuItem onClick={handleClose} color="black">
            Edit Account
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Orders</MenuItem>
        <Link to="/login">
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(logout());
            }}
          >
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default AccountMenu;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";

import {
  decreaseQuantity,
  deleteLineItem,
  getCart,
  increaseQuantity,
} from "../store/order";


const Cart = () => {
  const { user, order } = useSelector((state) => ({
    user: state.auth,
    order: state.order || { products: [] },
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(user.id));
  }, []);

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(user.id, productId, order.id));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(user.id, productId, order.id));
  };

  const handleDelete = (productId) => {
    dispatch(deleteLineItem(user.id, productId, order.id));
  };

  const handleCheckOut = () => {
    console.log("Congratulations for your purchase!");
  }

  if (!order.products || order.products.length < 1) {
    return (
      <Box sx={{ width: "375px" }}>
        <img src="/Images/empty-cart.svg" className="empty-img" />
      </Box>
    );
  }

  if (order) {
    let total = order.products.reduce(
      (acc, flower) => (acc += flower.price * flower.lineItem.quantity),
      0
    );

    return (
      <Box sx={{ width: "375px" }}>
        <List sx={{ width: "375px", bgcolor: "white" }}>
          <ListItem>
            <h2>Your Cart:</h2>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          {order.products.map((product) => {
            return (
              <>
                <ListItem
                  alignItems="center"
                  secondaryAction={
                    <IconButton>
                      <ClearIcon
                        onClick={() => dispatch(handleDelete(product.id))}
                      />
                    </IconButton>
                  }
                >
                  <Box
                    display="flex"
                    component="div"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <IconButton
                      onClick={() => dispatch(handleIncrease(product.id))}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    {product.lineItem.quantity}
                    <IconButton
                      onClick={() => dispatch(handleDecrease(product.id))}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Box>
                  <ListItemAvatar
                    sx={{ marginRight: "1rem", marginLeft: ".5rem" }}
                  >
                    <Avatar src={product.image_url} variant="square" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          ${product.price}
                        </Typography>
                        {` x ${product.lineItem.quantity}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </>
            );
          })}
          <ListItem>
            <h3>Total: ${total}</h3>
          </ListItem>
        </List>
        <Link to="/checkout">
          <Button
            color="secondary"
            variant="contained"
            sx={{
              width: "90%",
              marginLeft: "16px",
              marginRight: "16px",
              marginBottom: "16px",
            }}
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
        </Link>
      </Box>
    );
  }
};

export default Cart;

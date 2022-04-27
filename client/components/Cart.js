import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  ListItemButton,
  Box,
  Button,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";

import { me } from "../store/auth";
import {
  decreaseQuantity,
  deleteLineItem,
  getCart,
  combineCart,
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

  // Check if there is a cart in the browser local storage
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    dispatch(combineCart(user.id, cart));
    // dispatch(getCart(user.id))
    localStorage.removeItem("cart");
  }

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(user.id, productId, order.id));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(user.id, productId, order.id));
  };

  const handleDelete = (productId) => {
    dispatch(deleteLineItem(user.id, productId, order.id));
  };

  if (!order.products || order.products.length < 1) {
    return (
      <Box sx={{ width: "375px" }}>
        <img src="/Images/empty-cart.svg" className="empty-img"/>
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
                  <Box display="flex" component="div" flexDirection="column" alignItems="center">
                    <IconButton onClick={() => dispatch(handleIncrease(product.id))}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                    {product.lineItem.quantity}
                    <IconButton onClick={() => dispatch(handleDecrease(product.id))}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Box>
                  <ListItemAvatar sx={{marginRight: '1rem', marginLeft: '.5rem'}}>
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
        <Button
          color="secondary"
          variant="contained"
          sx={{
            width: "90%",
            marginLeft: "16px",
            marginRight: "16px",
            marginBottom: "16px",
          }}
        >
          Check Out
        </Button>
      </Box>

      // <div className="cart-container">
      //   <h3>Your Cart</h3>
      //   <table>
      //     <thead>
      //       <tr>
      //         <th>Name</th>
      //         <th>Price</th>
      //         <th>Quantity</th>
      //         <th>Subtotal</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {order.products.map((product) => {
      //         return (
      //           <tr>
      //             <td>{product.name} </td>
      //             <td>{product.price}</td>
      //             <td>
      //               <IconButton>
      //                 <RemoveCircleOutlineIcon
      //                   onClick={() =>
      //                     dispatch(
      //                       handleDecrease(
      //                         product.id,
      //                         product.lineItem.quantity
      //                       )
      //                     )
      //                   }
      //                 />
      //               </IconButton>
      //               {product.lineItem.quantity}
      //               <IconButton>
      //                 <AddCircleOutlineIcon
      //                   onClick={() => dispatch(handleIncrease(product.id))}
      //                 />
      //               </IconButton>
      //             </td>
      //             <td>${product.price * product.lineItem.quantity}</td>
      //             <td>
      //               <IconButton>
      //                 <ClearIcon onClick={() => dispatch(handleDelete(product.id))} />
      //               </IconButton>
      //             </td>
      //           </tr>
      //         );
      //       })}
      //     </tbody>
      //   </table>
      //   <h4>Total: ${total}</h4>
      //   <Link to="/checkout">
      //     <button>Checkout</button>
      //   </Link>
      // </div>
    );
  }
};

export default Cart;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

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

const GuestCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log("this is the cart", cart);

  const [_cart, setCart] = useState(cart);
  const dispatch = useDispatch();

  const handleIncrease = (flowerName) => {
    cart[flowerName].quantity += 1;
    setCart({ ...cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleDecrease = (flowerName) => {
    if (cart[flowerName].quantity === 1) {
      handleDelete(flowerName);
    } else {
      cart[flowerName].quantity -= 1;
      setCart({ ...cart });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleDelete = (flowerName) => {
    delete cart[flowerName];
    setCart({ ...cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // If no product has been added to cart, return text showing "Your cart is empty!"
  if (!cart || !Object.entries(cart).length) {
    return (
      <Box sx={{ width: "375px" }}>
        <img src="/Images/empty-cart.svg" className="empty-img"/>
      </Box>
    );
  }

  let total = 0;
  if (cart) {
    const itemArray = Object.entries(cart);
    total = itemArray.reduce((acc, item) => {
      const price = item[1].price;
      const quantity = item[1].quantity;
      return (acc += price * quantity);
    }, 0);
  }

  return (
    <Box sx={{ width: "375px" }}>
      <List sx={{ width: "375px", bgcolor: "white" }}>
        <ListItem>
          <h2>Your Cart:</h2>
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        {Object.keys(cart).map((flowerName) => {
          return (
            <>
              <ListItem
                alignItems="center"
                secondaryAction={
                  <IconButton>
                    <ClearIcon
                      onClick={() => dispatch(handleDelete(flowerName))}
                    />
                  </IconButton>
                }
              >
                <Box display="flex" component="div" flexDirection="column" alignItems="center">
                  <IconButton onClick={() => dispatch(handleIncrease(flowerName))}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  {cart[flowerName].quantity}
                  <IconButton onClick={() => dispatch(handleDecrease(flowerName))}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
                <ListItemAvatar sx={{marginRight: '1rem', marginLeft: '.5rem'}}>
                  <Avatar src={cart[flowerName].image_url} variant="square" />
                </ListItemAvatar>
                <ListItemText
                  primary={flowerName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        ${cart[flowerName].price}
                      </Typography>
                      {` x ${cart[flowerName].quantity}`}
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

    // <div>
    //   <h3>Your Cart:</h3>
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
    //       {Object.keys(cart).map((flowerName) => {
    //         return (
    //           <tr>
    //             <td>{flowerName}</td>
    //             <td>{cart[flowerName].price}</td>
    //             <td>
    //               <button
    //                 onClick={() => handleDecrease(flowerName)}
    //               >
    //                 -
    //               </button>
    //               {cart[flowerName].quantity}
    //               <button
    //                 onClick={() => handleIncrease(flowerName)}
    //               >
    //                 +
    //               </button>
    //             </td>
    //             <td>${cart[flowerName].price * cart[flowerName].quantity} </td>
    //             <td>
    //               <button onClick={() => handleDelete(flowerName)}>
    //                 X
    //               </button>
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    //   <h4>Total: ${total}</h4>
    // </div>
  );
};

export default GuestCart;

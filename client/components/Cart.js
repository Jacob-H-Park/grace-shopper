import React, { useEffect ,useState } from "react";
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
  Box,
  Button,
  TextField
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";

import {
  decreaseQuantity,
  deleteLineItem,
  getCart,
  combineCart,
  increaseQuantity,
  fulfillOrder,
} from "../store/order";
import axios from "axios";

//still in process
const StripeCheckout = (itemsInCart) => {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemsInCart,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
};


const Cart = () => {
  const { user, order } = useSelector((state) => ({
    user: state.auth,
    order: state.order || { products: [] },
  }));
  const [promotionCode,setPromotionCode] = useState('')
  const [discount,setDiscount] = useState(0)
  const [discountErr, setDiscountErr] = useState('')
  const [show,setShow] = useState(false)
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
        <img src="/Images/empty-cart.svg" className="empty-img" />
      </Box>
    );
  }

  let total;
  let beforeDiscount;
  if (order) {
    beforeDiscount = order.products.reduce(
      (acc, flower) => (acc += flower.price * flower.lineItem.quantity),
      0
    )
    total = Math.round((1-discount)* beforeDiscount,2);
    console.log('code',promotionCode)
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

                    {product.lineItem.quantity === 1 ? (
                      <IconButton disabled>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => dispatch(handleDecrease(product.id))}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}
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
          
            <form onSubmit={async(ev)=> {
              ev.preventDefault()
              const promotion = (await axios.post('/api/promotions',{Code:promotionCode})).data[0];
              if(promotion!== undefined){
                const _discount = promotion.Discount 
                setDiscount(_discount)
                setShow(true)
              }else{
                setDiscountErr('Code is not valid')

              }
            }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: "row",
                margin: '1rem',
                justifyContent:'center',
                
              }}
              > 
                <TextField
                  id="promotion-code"
                  label="Promotion Code"
                  defaultValue=""
                  helperText={discountErr}
                  value = {promotionCode}
                  onChange={e=> setPromotionCode(e.target.value)}
                  size= 'medium'
                />
                {/* <input placeholder='Promotion Code'value = {promotionCode} onChange={e=> setPromotionCode(e.target.value)} type='text'></input>
                <p>{discountErr}</p> */}
                <Button type="submit" variant="outlined" sx={{
                  width: "80px",
                  height: "55px"
                }}>Apply</Button>
              </Box>
            </form>

            <ListItem sx={{
              display: "flex",
              flexDirection:"column",
              alignItems:'start',
              
            }}>
              { show ? <h5 style={{
                margin: '0px'
              }} >You Save: ${Math.round((beforeDiscount*discount),2)}</h5>:null}
              <h3>Total: ${total}</h3>
            </ListItem>
        </List>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            StripeCheckout(order.products);
            dispatch(fulfillOrder(order.id));
          }}
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
    );
  }
};

export default Cart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
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

  if (!order.products || order.products.length < 1) {
    return (
      <div className="cart-container">
        <h1>Your cart is empty!</h1>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }

  if (order) {
    let total = order.products.reduce(
      (acc, flower) => (acc += flower.price * flower.lineItem.quantity),
      0
    );

    return (
      <div className="cart-container">
        <h3>Your Cart:</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => {
              return (
                <tr>
                  <td>{product.name} </td>
                  <td>{product.price}</td>
                  <td>
                    <IconButton>
                      <RemoveCircleOutlineIcon
                        onClick={() =>
                          dispatch(
                            handleDecrease(
                              product.id,
                              product.lineItem.quantity
                            )
                          )
                        }
                      />
                    </IconButton>
                    {product.lineItem.quantity}
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() => dispatch(handleIncrease(product.id))}
                      />
                    </IconButton>
                  </td>
                  <td>${product.price * product.lineItem.quantity}</td>
                  <td>
                    <IconButton>
                      <ClearIcon onClick={() => dispatch(handleDelete(product.id))} />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h4>Total: ${total}</h4>
      </div>
    );
  }
};

export default Cart;

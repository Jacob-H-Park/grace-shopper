import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  const handleDecrease = (productId, quantity) => {
    if (quantity === 1) {
      dispatch(handleDelete(user.id, productId, order.id));
      console.log("quantity: ", quantity);
    } else {
      dispatch(decreaseQuantity(user.id, productId, order.id));
      console.log("quantity: ", quantity);
    }
  };

  const handleDelete = (productId) => {
    dispatch(deleteLineItem(user.id, productId, order.id));
  };

  if (!order.products || order.products.length < 1) {
    return (
      <div>
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
      <div>
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
                    <button
                      onClick={() =>
                        dispatch(
                          handleDecrease(product.id, product.lineItem.quantity)
                        )
                      }
                    >
                      -
                    </button>
                    {product.lineItem.quantity}
                    <button
                      onClick={() => dispatch(handleIncrease(product.id))}
                    >
                      +
                    </button>
                  </td>
                  <td>${product.price * product.lineItem.quantity}</td>
                  <td>
                    <button onClick={() => dispatch(handleDelete(product.id))}>
                      X
                    </button>
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

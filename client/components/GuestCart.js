import React from "react";
import { Link } from "react-router-dom";

const GuestCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log("this is the cart", cart);

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
          {Object.keys(cart).map((flowerName) => {
            return (
              <tr>
                <td>{flowerName}</td>
                <td>{cart[flowerName].price}</td>
                <td>{cart[flowerName].quantity}</td>
                <td>${cart[flowerName].price * cart[flowerName].quantity} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GuestCart;

import React, { useState } from "react";
import { Link } from "react-router-dom";


const GuestCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log("this is the cart", cart);

  const [_cart, setCart] = useState(cart);
  
  const handleIncrease = (flowerName) => {
    cart[flowerName].quantity += 1;
    setCart({...cart});
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleDecrease = (flowerName) => {
    if (cart[flowerName].quantity === 1) {
      handleDelete(flowerName);
    } else {
      cart[flowerName].quantity -= 1;
      setCart({...cart});
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleDelete = (flowerName) => {
    delete cart[flowerName];
    setCart({...cart});
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // If no product has been added to cart, return text showing "Your cart is empty!"
  if (!cart || !Object.entries(cart).length) {
    return (
      <div>
        <h1>Your cart is empty!</h1>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }

  let total = 0;
  if (cart) {
    const itemArray = Object.entries(cart);
    total = itemArray.reduce((acc, item) => {
      const price = item[1].price;
      const quantity = item[1].quantity;
      return acc += (price * quantity);
    }, 0);
  }

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
                <td>
                  <button
                    onClick={() => handleDecrease(flowerName)}
                  >
                    -
                  </button>
                  {cart[flowerName].quantity}
                  <button
                    onClick={() => handleIncrease(flowerName)}
                  >
                    +
                  </button>
                </td>
                <td>${cart[flowerName].price * cart[flowerName].quantity} </td>
                <td>
                  <button onClick={() => handleDelete(flowerName)}>
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
};

export default GuestCart;

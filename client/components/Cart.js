import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/order";
import { me } from "../store/auth";
import { Link } from "react-router-dom";


const Cart = () => {
  const user = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order) || { products: []};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(user.id));
  }, []);

  console.log(order);

  if(!order.products || order.products.length < 1) {
    return (
      <div>
        <h1>Your cart is empty!</h1>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }
  
  if(order) {
    return(
      <div>
        <h3>Your Cart:</h3>
        <ul>
          {order.products.map((product) => {
            return(
              <li>{product.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Cart;

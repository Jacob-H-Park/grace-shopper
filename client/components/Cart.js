import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../store/auth";
import { fetchCart } from "../store/order";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, [user]);

  // if (order.products && order.products.length > 0) {
  //   return (
  //     <div>
  //       <h3>{user.username}'s Cart</h3>
  //       <ul>
  //         {order.products.map((product) => {
  //           return <li>{product.name}</li>;
  //         })}
  //       </ul>
  //       <Link to="/payment">
  //         <button>Checkout</button>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1>Your cart is empty!</h1>
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;

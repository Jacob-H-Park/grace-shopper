import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../store/auth";
import { fetchCart } from "../store/order";

const Cart = () => {

  const user = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  },[]);

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, [user]);

  console.log(order);

  if(order.products && order.products.length > 0) {
    return(
      <div>
        <h3>{user.username}'s Cart</h3>
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

  return(
    <div>
      <h1>Your cart is empty!</h1>
    </div>
  )

}

export default Cart;
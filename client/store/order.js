import axios from "axios";

//ACTION TYPES
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_ORDER = "UPDATE_ORDER";
const GET_ORDERS = "GET_ORDERS";

//ACTION CREATORS
const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const _fulfillOrder = (orderFulfilled) => {
  return {
    type: UPDATE_ORDER,
    orderFulfilled,
  };
};

const _getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders
  };
};

//THUNKS
export const createCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const cart = (
          await axios.post(`/api/cart/${userId}`, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch(_addToCart(cart));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const fulfillOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const orderFulfilled = (
        await axios.put(`/api/cart/update/${orderId}`, { orderId })
      ).data;
      dispatch(_fulfillOrder(orderFulfilled));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCart = (userId, flower, quantity = 1) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      if (!userId) {
        const cart = JSON.parse(localStorage.getItem("cart"));

        if (!cart) {
          const cart = Object.assign(
            {},
            {
              [flower.name]: {
                price: flower.price,
                quantity: 1,
                id: flower.id,
                image_url: flower.image_url,
              },
            }
          );
          localStorage.setItem("cart", JSON.stringify(cart));
        } else if (!Object.keys(cart).includes(flower.name)) {
          cart[flower.name] = {
            price: flower.price,
            quantity: 1,
            id: flower.id,
            image_url: flower.image_url,
          };
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          cart[flower.name].quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } else {
        if (token) {
          const data = (
            await axios.post(
              `/api/cart/${userId}`,
              {
                productId: flower.id,
                quantity: quantity,
              },
              {
                headers: {
                  authorization: token,
                },
              }
            )
          ).data;
          dispatch(_addToCart(data));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getOrders = (userId) => {
  return async (dispatch) => {
    try {
      const orders = await (await axios.get(`/api/orders/fulfilled/${userId}`)).data;
      console.log(orders);
      dispatch(_getOrders(orders));
    } catch(err) {
      console.log(err);
    }
  }
}

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const allOrders = await (await axios.get('/api/orders')).data;
      console.log("ALL ORDERS", allOrders);
      dispatch(_getOrders(allOrders));
    } catch(err) {
      console.log(err);
    }
  }
}

export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const cart = (
          await axios.get(`/api/cart/${userId}`, {
            headers: {
              authorization: token,
            },
          })
        ).data;

        dispatch(_getCart(cart));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const combineCart = (userId, cart) => {
  return async (dispatch) => {
    /**
     * The "cart" object created in local storage looks like:
     * { flower_name_1: { price: 58, quantity: 1, id: 1 },
     *   flower_name_2: { price: 78, quantity: 1, id: 2 },
     *   flower_name_3: { price: 98, quantity: 1, id: 3 }
     * }
     */

    for (const item of Object.entries(cart)) {
      const flower = {
        id: item[1].id,
        quantity: item[1].quantity,
      };

      dispatch(addToCart(userId, flower, flower.quantity));
    }
  };
};

export const increaseQuantity = (userId, productId, orderId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/${userId}`, {
        orderId,
        productId,
        type: "increase",
      });

      dispatch(getCart(userId));
    } catch (e) {
      console.log(e);
    }
  };
};

export const decreaseQuantity = (userId, productId, orderId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/${userId}`, {
        orderId,
        productId,
        type: "decrease",
      });

      dispatch(getCart(userId));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteLineItem = (userId, productId, orderId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${userId}`, {
        data: { orderId, productId },
      });

      dispatch(getCart(userId));
    } catch (e) {
      console.log(e);
    }
  };
};
//REDUCER

const order = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    case UPDATE_ORDER:
      return action.orderFulfilled;
    default:
      return state;
  }
};

export const pastOrders = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}

export default order;

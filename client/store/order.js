import axios from "axios";

//ACTION TYPES
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";

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

export const addToCart = (userId, flower, quantity = 1) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      if (!userId) {
        const cart = JSON.parse(localStorage.getItem("cart"));

        if (!cart) {
          const cart = Object.assign(
            {},
            { [flower.name]: { price: flower.price, quantity: 1, id: flower.id } }
          );
          localStorage.setItem("cart", JSON.stringify(cart));
        } else if (!Object.keys(cart).includes(flower.name)) {
          cart[flower.name] = { price: flower.price, quantity: 1, id: flower.id };
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          cart[flower.name].quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } else {
        if (token) {
          const data = await axios.post(
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
          );
          dispatch(_addToCart(data));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
};

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
        console.log("GET GET GET CART:", cart);
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
      const name = item[0];
      const id = item[1].id;
      const quantity = item[1].quantity;
      const data = await axios.post(`/api/cart/${userId}`, {
        productId: id,
        quantity: quantity,
      });
      dispatch(_addToCart(data));
    }
  }
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
    default:
      return state;
  }
};

export default order;

/*put this into the log-in
        Object.entries(cart).forEach((item) => {
          const name = item[0];
          const quantity = item[1].quantity;
          const data = await axios.post(`/api/cart/${userId}`, {
            productId: flower.id,
            quantity: quantity,
          });
        });
*/

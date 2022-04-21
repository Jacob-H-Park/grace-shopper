import axios from "axios";

//ACTION TYPES
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

//ACTION CREATORS
const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart
  }
}

//THUNKS
export const createCart = (userId) => {
  return async (dispatch) => {
    try {
      const cart = (await (axios.post(`/api/cart/${userId}`))).data;
      dispatch(_addToCart(cart));
    } catch(e) {
      console.log(e);
    } 
  }
}


export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const cart = (await (axios.get(`/api/cart/${userId}`))).data;
      dispatch(_getCart(cart));
    } catch(e) {
      console.log(e);
    }
  }
}


//REDUCER

const order = (state ={}, action) => {
  switch(action.type) {
    case GET_CART: 
      return action.cart
    default:
      return state
  }
};

export default order;
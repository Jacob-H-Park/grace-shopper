import axios from "axios";

//ACTION CREATORS
const ADD_TO_CART = 'ADD_TO_CART';
const FETCH_CART = 'FETCH_CART';

const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart
  }
};

const _fetchCart = (cart) => {
  return {
    type: FETCH_CART,
    cart
  }
};

export const createCart = (userId) => {
  return async (dispatch) => {
    try{
      const data = (await axios.post(`/api/users/${userId}/cart`)).data;
      dispatch(_addToCart(data));
    } catch(e) {
      console.log(e);
    }
  }
}; 

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const data = await (await axios.get(`/api/users/${userId}/cart`)).data;
      dispatch(_fetchCart(data));
    } catch(e) {
      console.log(e);
    }
  }
};

export default function (state ={}, action) {
  switch(action.type) {
    case ADD_TO_CART:
      return action.cart;
    case FETCH_CART:
      return action.cart;
    default:
      return state;
  }
} 
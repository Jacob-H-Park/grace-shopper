import axios from "axios";


/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";

const _fetchProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

/* Thunks */

export const fetchProducts = () => {
  return async (dispatch) => {
    try{  
      const { data } = await axios.get("/api/products");
      dispatch(_fetchProducts(data));
    } catch(e) {
      console.log(e);
    }
  };
};

/* Product Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

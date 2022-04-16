import axios from "axios";
import history from "../history";

/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";

/* Thunks */

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    console.log(data);
    dispatch({ type: SET_PRODUCTS, products: data });
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

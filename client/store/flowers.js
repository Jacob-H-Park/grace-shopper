import axios from "axios";

/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";

/* Action Creators */
const _fetchProducts = (allFlowers) => {
  return {
    type: SET_PRODUCTS,
    allFlowers,
  };
};

/* Thunks */

export const fetchProducts = () => {
  return async (dispatch) => {
    const flowers = (await axios.get("/api/products")).data;
    dispatch(_fetchProducts(flowers));
  };
};

/* Flower Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.allFlowers;

    default:
      return state;
  }
}

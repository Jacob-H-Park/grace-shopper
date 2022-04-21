import axios from "axios";

/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

/* Action Creators */
const _fetchProducts = (allFlowers) => {
  return {
    type: SET_PRODUCTS,
    allFlowers,
  };
};
const _removeProducts = (flowerId) => {
  return {
    type: REMOVE_PRODUCT,
    flowerId,
  };
};

/* Thunks */

export const fetchProducts = () => {
  return async (dispatch) => {
    const flowers = (await axios.get("/api/products")).data;
    dispatch(_fetchProducts(flowers));
  };
};
export const removeProducts = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${id}`)
    dispatch(_removeProducts(id));
  };
};

/* Flower Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      console.log('set',state)
      return action.allFlowers;
    case REMOVE_PRODUCT:
      return state.filter(flower => flower.id !== action.flowerId)
    default:
      return state;
  }
}

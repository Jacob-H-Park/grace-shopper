import axios from "axios";

/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT"
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
const _updateProducts = (allFlowers) => {
  return {
    type: UPDATE_PRODUCT,
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
export const removeProducts = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${id}`)
    dispatch(_removeProducts(id));
  };
};
export const updateProducts = (id,name,price,stock) => {
  return async (dispatch) => {
    const data = (await axios.put(`/api/products/${id}`,{name:name,price:price,stock:stock}))
    console.log('update',data)
    const flowers = (await axios.get("/api/products")).data;
    dispatch(_updateProducts(flowers));
  };
};
/* Flower Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.allFlowers;
    case REMOVE_PRODUCT:
      return state.filter(flower => flower.id !== action.flowerId)
    case UPDATE_PRODUCT:
      return action.allFlowers
    default:
      return state;
  }
}

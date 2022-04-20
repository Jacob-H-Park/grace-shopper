import axios from "axios";
import history from "../history";

/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";
const FETCH_PRODUCTS_BY_TYPE = "FETCH_PRODUCTS_BY_TYPE";

/* Action Creators */
const _fetchProducts = (allFlowers) => {
  return {
    type: SET_PRODUCTS,
    allFlowers,
  };
};

const _loadFlowersByCategory = (flowersByCategory) => {
  return {
    type: FETCH_PRODUCTS_BY_TYPE,
    flowersByCategory,
  };
};

/* Thunks */

export const fetchProducts = () => {
  return async (dispatch) => {
    const flowers = (await axios.get("/api/products")).data;
    dispatch(_fetchProducts(flowers));
  };
};

export const loadFlowersByCategory = (category) => {
  console.log(category);
  return async (dispatch) => {
    const flowersByCategory = (await axios.get(`/api/flowers/${category}`))
      .data;
    dispatch(_loadFlowersByCategory(flowersByCategory));
  };
};

/* Product Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.allFlowers;
    case FETCH_PRODUCTS_BY_TYPE:
      return action.flowersByCategory;
    default:
      return state;
  }
}

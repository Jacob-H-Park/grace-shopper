import axios from "axios";

/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
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
const _updateProducts = (flowerToUpdate) => {
  return {
    type: UPDATE_PRODUCT,
    flowerToUpdate,
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
    const token = window.localStorage.getItem('token');
    if (token) {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          authorization: token
        }
      });
      dispatch(_removeProducts(id));
    }
  };
};
export const updateProducts = (flower, history) => {
  return async (dispatch) => {
    const { data: flowerToUpdate } = await axios.put(
      `/api/products/${flower.id}`,
      flower
    );
    dispatch(_updateProducts(flowerToUpdate));
    history.push("/inventory_management");
  };
};
export const createProducts = (name,price,category,stock,description, history) => {
  return async () => {
    await axios.post('/api/products/',{name,price,category,stock,description});
    history.push("/admin_products");
  };
};
/* Flower Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.allFlowers;
    case REMOVE_PRODUCT:
      return state.filter((flower) => flower.id !== action.flowerId);
    case UPDATE_PRODUCT:
      return state.map((flower) =>
        flower.id !== action.flowerToUpdate.id ? flower : action.flowerToUpdate
      );
    default:
      return state;
  }
}

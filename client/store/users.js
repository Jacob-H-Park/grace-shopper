import axios from "axios";

/* Action Types */
const GET_USERS = "GET_USERS";
const REMOVE_USER = "REMOVE_USER";


/* Action Creators */
const _fetchUsers = (allUsers) => {
  return {
    type: GET_USERS,
    allUsers,
  };
};

const _removeUser = (userId) => {
    return {
      type: REMOVE_USER,
      userId,
    };
  };

/* Thunks */

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users")).data;
    dispatch(_fetchUsers(users));
  };
};

export const removeUser = (id) => {
    return async (dispatch) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        await axios.delete(`/api/users/${id}`, {
          headers: {
            authorization: token
          }
        });
        dispatch(_removeUser(id));
      }
    };
  };


/* Users Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.allUsers;
    case REMOVE_USER:
      return state.filter(user => user.id !== action.userId);
    default:
      return state;
  }
}

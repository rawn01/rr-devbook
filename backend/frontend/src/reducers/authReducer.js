import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case REGISTER_FAIL: 
      localStorage.removeItem("token");

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default: 
      return state
  }
};

export default auth;
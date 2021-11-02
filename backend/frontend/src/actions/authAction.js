import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { setAlert } from "./alertAction";
import axios from "axios";

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "applicaton/json"
    }
  };
  
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("http://localhost:8000/api/users/signup", body, config); 

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch(ex) {
    const err = ex.response.data.message;

    if(err) {
      dispatch(setAlert(err, "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    })
  }
};
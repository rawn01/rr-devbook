import { v4 as uuid} from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType) => (dispatch) => {
  const payload = {
    id: uuid(),
    msg,
    alertType
  };

  dispatch({
    type: SET_ALERT,
    payload
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: payload.id
    })
  }, 2000);
}
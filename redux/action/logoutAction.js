import { USER_LOGOUT } from '../../constants/authConstant'

export const logoutAction = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOGOUT,
    payload: undefined,
  })
}
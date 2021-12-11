import { config } from "../../config"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../constants/authConstant"
import httpRequest from "../../utils/request"

export const loginService = (username, password, callback) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })


  try {
    const body = {
      username,
      password,
      grant_type: config.grantType,
      client_id: config.clientId,
      client_secret: config.clientSecret
    }

    const { data } = await httpRequest.post(
      `${config.baseUrl}/oauth/token`,
      false,
      null,
      body
    )

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })

    callback(data, null)

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response,
    })

    callback(null, error.response)
  }
}
import { config } from "../config"
import { REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/authConstant"
import httpRequest from "../utils/request"
import { getSession } from 'next-auth/client'
import axios from 'axios'


export const registerService = (regObj, callback) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST })

  try {
    const body = {
      username: regObj.username,
      password: regObj.password,
    }

    const { data } = await httpRequest.post(
      `${config.baseUrl}/register`,
      false,
      null,
      body
    )

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    })

    callback(data, null)
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response,
    })

    callback(null, error.response)
  }
}

export const loginService = async (service, token) => {
  //console.log("login service", service, token)
  try {

    const body = {
      accessToken: token,
      client_secret: config.GAV_CLIENT_SECRET,
      client_id: config.GAV_CLIENT_ID,
      //pessoa_cadastro_id:  2,


    }

    const { data } = await httpRequest.post(
      `${config.baseUrl}/api/auth/social/${service}`,
      false,
      null,
      body
    )
    return data

  } catch (error) {
    console.log("error = ---")
    console.log(error.response.data.message)
  }
}

export const getMe = async () => {
  try {
    const session = await getSession()
    if (session) {
      const token = session.access_token
      const { data: me } = await axios.get(
        `${config.baseUrl}/api/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )
      return me
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
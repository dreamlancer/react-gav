import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
  } from '../../constants/authConstant'
  
  const INITIAL_STATE = {}
  
  export const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return state
  
      case LOGIN_SUCCESS:
        return action.payload
  
      case LOGIN_FAIL:
        return {
          error: action.payload,
        }
  
      default:
        return state
    }
  }
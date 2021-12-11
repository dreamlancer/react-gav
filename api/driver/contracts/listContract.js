import { config } from "../config"
import {
    DRIVER_LIST_DRIVER_REQUEST,
    DRIVER_LIST_DRIVER_SUCCESS,
    DRIVER_LIST_DRIVER_FAIL
} from "../../../constants/driverConstant"
import httpRequest from "../../utils/request"

export const listContract = (queryParamsObj, callback) => async (dispatch) => {
    dispatch({ type: DRIVER_LIST_DRIVER_REQUEST })

    try {
        const token = getItem('token')
        const url = serialize(`${config.baseUrl}/motorista/contratos?`, queryParamsObj)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )

        dispatch({
            type: DRIVER_LIST_DRIVER_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: DRIVER_LIST_DRIVER_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
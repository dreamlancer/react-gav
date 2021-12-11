import { config } from "../../config"
import {
    RENT_LIST_FAIL,
    RENT_LIST_SUCCESS,
    RENT_LIST_REQUEST

} from "../../constants/rentConstant"
import httpRequest from "../../utils/request"
import serialize from '../../utils/serilizers'

export const listOfRental = (queryParamsObj, callback) => async (dispatch, getState) => {
    dispatch({ type: RENT_LIST_REQUEST })

    const token = 'Bearer ' + getState().userInfo.access_token

    try {
        const url = serialize(`${config.baseUrl}/api/alugueis?`, queryParamsObj)
        const { data } = await httpRequest.get(
            url,
            true,
            token)

            console.log('url', url);

        dispatch({
            type: RENT_LIST_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: RENT_LIST_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
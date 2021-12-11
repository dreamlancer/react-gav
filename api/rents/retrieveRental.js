import { config } from "../../config"
import {
    RENT_RETRIEVE_REQUEST,
    RENT_RETRIEVE_SUCCESS,
    RENT_RETRIEVE_FAIL

} from "../../constants/rentConstant"
import httpRequest from "../../utils/request"

export const retrieveRental = (obj, callback) => async (dispatch) => {
    dispatch({ type: RENT_RETRIEVE_REQUEST })

    try {
        const url = `${config.baseUrl}/alugueis/${obj.aluguel_id}`
        const { data } = await httpRequest.get(url)

        dispatch({
            type: RENT_RETRIEVE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: RENT_RETRIEVE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
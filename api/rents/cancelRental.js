import { config } from "../../config"
import {
    RENT_CANCEL_REQUEST,
    RENT_CANCEL_FAIL,
    RENT_CANCEL_SUCCESS
} from "../../constants/rentConstant"
import httpRequest from "../../utils/request"


export const cancelRental = (obj, callback) => async (dispatch) => {
    dispatch({ type: RENT_CANCEL_REQUEST })

    try {

        const body = {}

        const { data } = await httpRequest.put(
            `${config.baseUrl}/alugueis/${obj.aluguel_id}/cancelado`,
            false,
            null,
            body
        )

        dispatch({
            type: RENT_CANCEL_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: RENT_CANCEL_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
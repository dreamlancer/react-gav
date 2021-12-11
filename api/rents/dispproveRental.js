import { config } from "../../config"
import {
    RENT_DISAPPROVAL_FAIL,
    RENT_DISAPPROVAL_REQUEST,
    RENT_DISAPPROVAL_SUCCESS
} from "../../constants/rentConstant"
import httpRequest from "../../utils/request"


export const disapproveRental = (obj, callback) => async (dispatch) => {
    dispatch({ type: RENT_DISAPPROVAL_REQUEST })

    try {

        const body = {}

        const { data } = await httpRequest.put(
            `${config.baseUrl}/alugueis/${obj.aluguel_id}/reprovado`,
            false,
            null,
            body
        )

        dispatch({
            type: RENT_DISAPPROVAL_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: RENT_DISAPPROVAL_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
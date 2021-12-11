import { config } from "../../config"
import {
    RENT_APPROVAL_FAIL,
    RENT_APPROVAL_REQUEST,
    RENT_APPROVAL_SUCCESS
} from "../../constants/rentConstant"
import httpRequest from "../../utils/request"


export const approveRental = (obj, callback) => async (dispatch) => {
    dispatch({ type: RENT_APPROVAL_REQUEST })

    try {

        const body = {}

        const { data } = await httpRequest.put(
            `${config.baseUrl}/alugueis/${obj.aluguel_id}/aprovado`,
            false,
            null,
            body
        )

        dispatch({
            type: RENT_APPROVAL_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: RENT_APPROVAL_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
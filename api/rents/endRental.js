import { config } from "../../config"
import {
    RENT_END_REQUEST,
    RENT_END_FAIL,
    RENT_END_SUCCESS
} from "../../constants/rentConstant"
import httpRequest from "../../utils/request"


export const endRental = (obj, callback) => async (dispatch) => {
    dispatch({ type: RENT_END_REQUEST })

    try {

        const body = {}

        const { data } = await httpRequest.put(
            `${config.baseUrl}/alugueis/${obj.aluguel_id}/encerrado`,
            false,
            null,
            body
        )

        dispatch({
            type: RENT_END_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: RENT_END_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
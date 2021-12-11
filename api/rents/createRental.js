import { config } from "../../config"
import {
    RENT_CREATE_FAIL,
    RENT_CREATE_REQUEST,
    RENT_CREATE_SUCCESS
} from "../../constants/rentConstant"
import httpRequest from "../../utils/request"


export const createRental = (obj, callback) => async (dispatch) => {
    dispatch({ type: RENT_CREATE_REQUEST })

    try {
        const body = {
            valor_diaria: obj.valor_diaria,
            locatario_id: obj.locatario_id,
            carro_id: objcarro_id
        }

        const { data } = await httpRequest.post(
            `${config.baseUrl}/alugueis`,
            false,
            null,
            body
        )

        dispatch({
            type: RENT_CREATE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: RENT_CREATE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
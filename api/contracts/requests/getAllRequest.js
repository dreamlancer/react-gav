import { config } from "../config"
import {
    CONTRACTS_LIST_FAIL,
    CONTRACTS_LIST_SUCCESS,
    CONTRACTS_LIST_REQUEST
} from "../../constants/contractsConstant"
import httpRequest from "../../utils/request"

export const getAllRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_LIST_REQUEST })

    try {

        const { data } = await httpRequest.get(`${config.baseUrl}/contratos/${obj.contrato_id}/solicitacoes`)

        dispatch({
            type: CONTRACTS_LIST_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_LIST_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
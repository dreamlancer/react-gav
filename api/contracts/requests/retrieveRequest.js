import { config } from "../config"
import {
    CONTRACTS_RETRIEVE_FAIL,
    CONTRACTS_RETRIEVE_SUCCESS,
    CONTRACTS_RETRIEVE_REQUEST
} from "../../constants/contractsConstant"
import httpRequest from "../../utils/request"

export const retrieveRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_RETRIEVE_REQUEST })

    try {
        const token = getItem('token')

        const { data } = await httpRequest.get(`${config.baseUrl}/contratos/${contrato_id}/solicitacoes/${solicitacao_id}`, true, token)

        dispatch({
            type: CONTRACTS_RETRIEVE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_RETRIEVE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
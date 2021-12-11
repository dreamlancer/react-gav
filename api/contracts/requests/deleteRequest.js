import { config } from "../config"
import {
    CONTRACTS_DELETE_FAIL,
    CONTRACTS_DELETE_SUCCESS,
    CONTRACTS_DELETE_REQUEST
} from "../../constants/contractsConstant"
import httpRequest from "../../utils/request"

export const deleteRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_DELETE_REQUEST })

    try {
        const token = getItem('token')
        
        const { data } = await httpRequest.delete(`${config.baseUrl}/contratos/${obj.contrato_id}/solicitacoes/${obj.solicitacao_id}`, true, token)

        dispatch({
            type: CONTRACTS_DELETE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_DELETE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
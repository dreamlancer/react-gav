import { config } from "../config"
import {
    CONTRACTS_INTERMEDIATE_FAIL,
    CONTRACTS_INTERMEDIATE_SUCCESS,
    CONTRACTS_INTERMEDIATE_REQUEST
} from "../../constants/contractsConstant"
import httpRequest from "../../utils/request"

export const intermediateRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_INTERMEDIATE_REQUEST })

    try {
        const token = getItem('token')
        const data = {
        }
        const { data } = await httpRequest.put(
            `${config.baseUrl}/contratos/${obj.contrato}/solicitacoes/${obj.solicitacao}/intermediacao`,
            true,
            token,
            data
        )

        dispatch({
            type: CONTRACTS_INTERMEDIATE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_INTERMEDIATE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
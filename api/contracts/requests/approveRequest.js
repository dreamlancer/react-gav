import { config } from "../config"
import {
    CONTRACTS_APPROVE_FAIL,
    CONTRACTS_APPROVE_SUCCESS,
    CONTRACTS_APPROVE_REQUEST
} from "../../../constants/contractsConstant"
import httpRequest from "../../../utils/request"

export const approveRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_APPROVE_REQUEST })

    try {
        const token = getItem('token')
        const data = {
        }
        const { data } = await httpRequest.put(
            `${config.baseUrl}/contratos/${obj.contrato}/solicitacoes/${obj.solicitacao}/aprovada`,
            true,
            token,
            data
        )

        dispatch({
            type: CONTRACTS_APPROVE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_APPROVE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
import { config } from "../config"
import {
    CONTRACTS_DISAPPROVE_FAIL,
    CONTRACTS_DISAPPROVE_SUCCESS,
    CONTRACTS_DISAPPROVE_REQUEST
} from "../../constants/contractsConstant"
import httpRequest from "../../utils/request"

export const disapproveRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_DISAPPROVE_REQUEST })

    try {
        const token = getItem('token')
        const data = {
        }
        const { data } = await httpRequest.put(
            `${config.baseUrl}/contratos/${obj.contrato}/solicitacoes/${obj.solicitacao}/reprovada`,
            true,
            token,
            data
        )

        dispatch({
            type: CONTRACTS_DISAPPROVE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_DISAPPROVE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
import { config } from "../config"
import {
    CONTRACTS_UPDATE_FAIL,
    CONTRACTS_UPDATE_SUCCESS,
    CONTRACTS_UPDATE_REQUEST
} from "../../constants/contractsConstant"
import httpRequest from "../../utils/request"

export const retrieveRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_UPDATE_REQUEST })

    try {
        const token = getItem('token')
        const data = {
            descricao: obj.descricao,
            valor: obj.valor,
            pagador_id: obj.pagador_id,
            solicitacao_tipo_id: obj.solicitacao_tipo_id,
            orcamentos: obj.orcamentos

        }
        const { data } = await httpRequest.patch(`${config.baseUrl}/contratos/${obj.contrato_id}/solicitacoes/${obj.solicitacao_id}`, true, token, data)

        dispatch({
            type: CONTRACTS_UPDATE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_UPDATE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
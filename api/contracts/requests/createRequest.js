import { config } from "../../config"
import {
    CONTRACTS_CREATE_REQUEST,
    CONTRACTS_CREATE_SUCCESS,
    CONTRACTS_CREATE_FAIL
} from "../../constants/contractsConstant"
import httpRequest from "../../utils/request"
import getItem from '../../utils/localStroageAccess';


export const createRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: CONTRACTS_CREATE_REQUEST })

    try {
        const body = {
            descricao: obj.descricao,
            valor: obj.descricao,
            pagador_id: obj.pagador_id,
            solicitacao_tipo_id: obj.pagador_id,
            orcamentos: obj.orcamentos
        }

        const token = getItem('token')

        const { data } = await httpRequest.post(
            `${config.baseUrl}/contratos/{contrato_id}/solicitacoes`,
            true,
            token,
            body
        )

        dispatch({
            type: CONTRACTS_CREATE_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CONTRACTS_CREATE_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
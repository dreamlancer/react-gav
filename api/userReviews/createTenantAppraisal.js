import { config } from "../../config"
import {
    USER_REVIEW_CREATE_TENANT_APPRAISAL_FAIL,
    USER_REVIEW_CREATE_TENANT_APPRAISAL_REQUEST,
    USER_REVIEW_CREATE_TENANT_APPRAISAL_SUCCESS,

} from "../../constants/userReviewConstant"
import httpRequest from "../../utils/request"
import getItem from '../../utils/localStroageAccess';


export const createTenantAppraisal = (obj, callback) => async (dispatch) => {
    dispatch({
        type: USER_REVIEW_CREATE_TENANT_APPRAISAL_REQUEST
    })

    try {
        const body = {
            perfil_avaliador: obj.perfil_avaliador,
            nps: obj.nps,
            itens: obj.itens
        }

        const token = getItem('token')

        const { data } = await httpRequest.post(
            `${config.baseUrl}/locatarios/${obj.carro_id}/avaliacoes`,
            true,
            token,
            body
        )

        dispatch({
            type: USER_REVIEW_CREATE_TENANT_APPRAISAL_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: USER_REVIEW_CREATE_TENANT_APPRAISAL_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
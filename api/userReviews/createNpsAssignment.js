import { config } from "../../config"
import {
    USER_REVIEW_CREATE_NPS_ASSIGNMENT_REQUEST,
    USER_REVIEW_CREATE_NPS_ASSIGNMENT_SUCCESS,
    USER_REVIEW_CREATE_NPS_ASSIGNMENT_REQUEST_FAIL
} from "../../constants/userReviewConstant"
import httpRequest from "../../utils/request"
import getItem from '../../utils/localStroageAccess';


export const createNpsAssignmentService = (obj, callback) => async (dispatch) => {
    dispatch({ type: USER_REVIEW_CREATE_NPS_ASSIGNMENT_REQUEST })

    try {
        const body = {
            perfil_avaliador: obj.perfil_avaliador,
            nps: obj.nps,
            itens: obj.itens
        }

        const token = getItem('token') 
        
        const { data } = await httpRequest.post(
            `${config.baseUrl}/avaliacoes`,
            true,
            token,
            body
        )

        dispatch({
            type: USER_REVIEW_CREATE_NPS_ASSIGNMENT_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: USER_REVIEW_CREATE_NPS_ASSIGNMENT_REQUEST_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
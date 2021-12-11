import { config } from "../../config"
import {
    USER_REVIEW_CREATE_CAR_REQUEST,
    USER_REVIEW_CREATE_CAR_SUCCESS,
    USER_REVIEW_CREATE_CAR_FAIL
} from "../../constants/userReviewConstant"
import httpRequest from "../../utils/request"
import getItem from '../../utils/localStroageAccess';


export const createCarReview = (obj, callback) => async (dispatch) => {
    dispatch({ type: USER_REVIEW_CREATE_CAR_REQUEST })

    try {
        const body = {
            perfil_avaliador: obj.perfil_avaliador,
            nps: obj.nps,
            itens: obj.itens
        }

        const token = getItem('token')

        const { data } = await httpRequest.post(
            `${config.baseUrl}/carros/${obj.carro_id}/avaliacoes`,
            true,
            token,
            body
        )

        dispatch({
            type: USER_REVIEW_CREATE_CAR_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: USER_REVIEW_CREATE_CAR_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
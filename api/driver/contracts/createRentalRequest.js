import { config } from "../../config"
import {
  DRIVER_CREATE_RENTAL_REQUEST,
  DRIVER_CREATE_RENTAL_FAIL,
  DRIVER_LIST_DRIVER_SUCCESS
} from '../../../constants/driverConstant'
import httpRequest from "../../utils/request"
import getItem from '../../utils/localStroageAccess';


export const createRentalRequest = (obj, callback) => async (dispatch) => {
    dispatch({ type: DRIVER_CREATE_RENTAL_REQUEST })

    try {
        const body = {
            carro_id: obj.carro_id,
            data_entrega: obj.data_entrega
        }

        const token = getItem('token')

        const { data } = await httpRequest.post(
            `${config.baseUrl}/motorista/alugueis`,
            true,
            token,
            body
        )

        dispatch({
            type: DRIVER_LIST_DRIVER_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: DRIVER_CREATE_RENTAL_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
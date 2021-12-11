import { config } from "../../config"
import {
    DRIVER_CREATE_CONTRACTS_FAIL,
    DRIVER_CREATE_CONTRACTS_REQUEST,
    DRIVER_CREATE_CONTRACTS_SUCCESS
} from '../../../constants/driverConstant'
import httpRequest from "../../utils/request"
import getItem from '../../utils/localStroageAccess';


export const createContract = (obj, callback) => async (dispatch) => {
    dispatch({ type: DRIVER_CREATE_CONTRACTS_REQUEST })

    try {
        const body = {
            carro_id: obj.carro_id,
            data_entrega: obj.data_entrega
        }

        const token = getItem('token')

        const { data } = await httpRequest.post(
            `${config.baseUrl}/motorista/contratos`,
            true,
            token,
            body
        )

        dispatch({
            type: DRIVER_CREATE_CONTRACTS_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: DRIVER_CREATE_CONTRACTS_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
import { config } from "../../config"
import {
    CARS_RECOVER_REQUEST,
    CARS_RECOVER_SUCCESS,
    CARS_RECOVER_FAIL

} from "../../constants/carsConstant"
import httpRequest from "../../utils/request"

export const recoverAvaiableCar = (obj, callback) => async (dispatch) => {
    dispatch({ type: CARS_RECOVER_REQUEST })

    try {
      
        const token = getItem('token')

        const { data } = await httpRequest.get(`${config.baseUrl}/carros-disponiveis/${obj.carro_id}`,
            true,
            token
        )

        dispatch({
            type: CARS_RECOVER_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CARS_RECOVER_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
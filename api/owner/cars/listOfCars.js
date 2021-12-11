import { config } from "../../../config"
import {
    OWNER_LIST_OF_CARS_REQUEST,
    OWNER_LIST_OF_CARS_SUCCESS,
    OWNER_LIST_OF_CARS_FAIL

} from "../../../constants/owner"
import {
    CARS_DETAILS_REQUEST,
    CARS_DETAILS_SUCCESS,
    CARS_DETAILS_FAIL

} from "../../../constants/carsConstant"
import httpRequest from "../../../utils/request"
import serialize from '../../../utils/serilizers'
import { getSession } from 'next-auth/client'
import { notify, useInput } from "../../../utils/common"



export const ownerListOfCars = async (queryParamsObj, callback) => {

    try {
        const session = await getSession()
        const token = 'Bearer ' + session.access_token
        const url = serialize(`${config.baseUrl}/api/proprietario/carros?`, queryParamsObj)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        callback()
        console.log('session', session);
        return data

    } catch (error) {
        callback()
        notify("error", (error.response && error.response.data.message) || "")
        return null
    }
}

export const carDetails = (callback) => async (dispatch) => {
    dispatch({ type: CARS_DETAILS_REQUEST })

    try {
        const session = await getSession()
        const token = 'Bearer ' + session.access_token
        const url = serialize(`${config.baseUrl}/api/docs#operation/alugueisList`)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        console.log("data = ", data)

        dispatch({
            type: CARS_DETAILS_SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        dispatch({
            type: CARS_DETAILS_FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
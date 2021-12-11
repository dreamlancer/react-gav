import { config } from "../../config"
import { 
    ADS_LIST__REQUEST,
    ADS_LIST__SUCCESS,
    ADS_LIST__FAIL,
    SINGLE_ADD__REQUEST,
    SINGLE_ADD__SUCCESS,
    SINGLE_ADD__FAIL,
} from "../../constants/adsConstant"
import httpRequest from "../../utils/request"
import serialize from '../../utils/serilizers'
import { getSession } from 'next-auth/client'


export const listAds = (queryParamsObj, callback) => async (dispatch) => {
    dispatch({ type: ADS_LIST__REQUEST })

    try {
        const session = await getSession()
        const token = 'Basic ' + config.basicAuthToken
        const url = serialize(`${config.baseUrl}/api/anuncios?`, queryParamsObj)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        console.log("data = ", data)
        console.log("session",session);

        dispatch({
            type: ADS_LIST__SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: ADS_LIST__FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}


export const SingleAdd = (id,callback) => async (dispatch) => {
    dispatch({ type: SINGLE_ADD__REQUEST })

    try {
        const session = await getSession()
        const token = 'Basic ' + config.basicAuthToken
        const url = serialize(`${config.baseUrl}/api/anuncios/${id}`)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        console.log("data = ", data)
        console.log("session",session);

        dispatch({
            type: SINGLE_ADD__SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: SINGLE_ADD__FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
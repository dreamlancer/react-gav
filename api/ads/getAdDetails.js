import { config } from "../../config"
import { 
    ADS_DETAILS__REQUEST,
    ADS_DETAILS__SUCCESS,
    ADS_DETAILS__FAIL,
} from "../../constants/adsConstant"
import httpRequest from "../../utils/request"
import { getSession } from 'next-auth/client'


export const getAdDetails = (adId,callback) => async (dispatch) => {
    dispatch({ type: ADS_DETAILS__REQUEST })

    try {
        const session = await getSession()
        const token = 'Bearer ' + session.access_token
        const url = `${config.baseUrl}/api/anuncios/${adId}`
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        console.log("data = ", data)

        dispatch({
            type: ADS_DETAILS__SUCCESS,
            payload: data,
        })

        callback(data, null)
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: ADS_DETAILS__FAIL,
            payload: error.response,
        })

        callback(null, error.response)
    }
}
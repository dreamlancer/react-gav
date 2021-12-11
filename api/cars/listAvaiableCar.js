import { config } from "../../config"
import httpRequest from "../../utils/request"
import serialize from '../../utils/serilizers'
import { getSession } from 'next-auth/client'
import { notify, useInput } from "../../utils/common"
import { ToastContainer } from 'react-toastify'


export const driverListOfCars = async (queryParamsObj, cb) => {

    try {
        const session = await getSession()
        const token = 'Bearer ' + session.access_token
        const url = serialize(`${config.baseUrl}/api/carros-disponiveis?`, queryParamsObj)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        cb()
        return data

    } catch (error) {
        cb()
        notify("error", (error.response && error.response.data.message) || "")
        return null
    }
}

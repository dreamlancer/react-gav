import { config } from "../../config"
import {
    DRIVER_RECOVER_SUCCESS,
    DRIVER_RECOVER_FAIL,
    DRIVER_RECOVER_REQUEST
} from "../../constants/driverConstant"
import httpRequest from "../../utils/request"
import { getSession } from 'next-auth/client'
import { notify, useInput } from "../../utils/common"

export const recoverDriver = async(callback) => {

    try {
        const session = await getSession()
        const token = 'Bearer ' + session.access_token
        //console.log(session, token)
        const { data } = await httpRequest.get(
            `${config.baseUrl}/api/motorista`,
            true,
            token

        )
        callback()
        return data
    } catch (error) {
        console.log(error.response)
        //notify("error", error.response.data.message)
        callback()
        return null
    }
}
import {
    OWNER_RECOVER_OWNER_REQUEST,
    OWNER_RECOVER_OWNER_FAIL,
    OWNER_RECOVER_OWNER_SUCCESS
} from "../../constants/owner"
import { config } from "../../config"
import { notify, useInput } from "../../utils/common"
import httpRequest from "../../utils/request"
import { getSession } from 'next-auth/client'

export const recoverOwner = async (queryParamsObj, callback) => {


    try {
        const session = await getSession()
        //console.log(session)
        const token = 'Bearer ' + session.access_token
        const { data } = await httpRequest.get(
            `${config.baseUrl}/api/proprietario`,
            true,
            token)
        callback()
        return data

    } catch (error) {
        callback()
        // notify("error",  error.response && error.response.data.message)
        return null
    }
}
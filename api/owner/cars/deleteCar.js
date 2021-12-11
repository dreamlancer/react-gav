import { config } from "../../../config"
import httpRequest from "../../../utils/request"
import serialize from '../../../utils/serilizers'
import { getSession } from 'next-auth/client'
import { notify, useInput } from "../../../utils/common"



export const deleteCar = async (carro_id) => {

    try {
        const session = await getSession()
        const token = 'Bearer ' + session.access_token
        const url = `${config.baseUrl}/api/proprietario/carros/${carro_id}`
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        return data

    } catch (error) {
        notify("error", (error.response && error.response.data.message) || "")
        return null
    }
}
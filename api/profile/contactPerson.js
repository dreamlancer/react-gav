import { config } from "../../config"
import httpRequest from "../../utils/request"
import serialize from '../../utils/serilizers'
import { getSession } from 'next-auth/client'



export const ContactPerson = async () => {

    try {
        const session = await getSession()
        const token = 'Bearer ' + session.access_token
        const url = serialize(`${config.baseUrl}/api/proprietario/contratos`)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )
        console.log('data===', data)
        return data

    } catch (error) {
        return null
    }
}


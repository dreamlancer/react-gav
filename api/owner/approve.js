import { config } from "../../config"
import { getSession } from 'next-auth/client'
import httpRequest from "../../utils/request"

export const Approved = async (diaria,carroId) => {
    try {
        const body = {
            valor_diaria: diaria,
            carro_id: carroId,
        }
        //debugger
        const session = await getSession()
        const token = 'Bearer ' + session.access_token

        const { data } = await httpRequest.post(
            `${config.baseUrl}/api/alugueis`,
            true,
            token,
            body
        )
        console.log("updated data = ", data)
        return data

    } catch (error) {
        return null
    }
}
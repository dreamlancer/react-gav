import { config } from "../../config"
import { getSession } from 'next-auth/client'
import httpRequest from "../../utils/request"

export const updateAvaliar = async (nps,carro_id,itenArray) => {
    try {
        const body = {
            perfil_avaliador: "locatario",
            nps,
            itens: itenArray
        }
        //debugger
        const session = await getSession()
        const token = 'Bearer ' + session.access_token

        const { data } = await httpRequest.post(
            `${config.baseUrl}/api/locatarios/${carro_id}/avaliacoes`,
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
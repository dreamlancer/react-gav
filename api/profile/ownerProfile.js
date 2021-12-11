import { config } from "../../config"
import httpRequest from "../../utils/request"
import serialize from '../../utils/serilizers'
import { getSession } from 'next-auth/client'


export const prefilFornecedor = async(locadorId) => {


    try {
        const session = await getSession()
        const token = 'Basic ' + config.basicAuthToken
        const url = serialize(`${config.baseUrl}/api/locadores/${locadorId}?include=avaliacoes.detalhes,avaliacoes.avaliador.foto_perfil_arquivo,carros`)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )

        return data

    } catch (error) {
        console.log(error.response.data)
        return null
    }
}


import { config } from "../../config"
import httpRequest from "../../utils/request"
import serialize from '../../utils/serilizers'


export const painelMotorista  = async (locatorId) => {

    try {
        const token = 'Basic ' + config.basicAuthToken
        const url = serialize(`${config.baseUrl}/api/locatarios/${locatorId}?include=avaliacoes.detalhes,avaliacoes.avaliador.foto_perfil_arquivo,carros`)
        const { data } = await httpRequest.get(
            url,
            true,
            token
        )

        return data

    } catch (error) {
       return null
    }
}


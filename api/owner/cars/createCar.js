
import httpRequest from "../../../utils/request"
import { getSession } from 'next-auth/client'
import { notify, useInput } from "../../../utils/common"
import { RiMastercardFill } from "react-icons/ri"
import { config } from "../../../config"


export const createCar = async (newData) => {
  
    try {

        const endereco_retirada_principal = {
            "logradouro": newData.ruaCar,
            "cep": newData.cepCar,
            "numero": newData.numeroCar,
            "complemento": newData.complementoCar,
            "bairro": newData.bairroCar,
            "cidade_id": newData.cidadeIdCar
        }
        let arquivos = []
        if (newData.frontalId) {
            arquivos.push({ arquivo_id: newData.frontalId, carro_arquivo_tipo_id: 1, position: 1 })
        }

        if (newData.lateralDireitaId) {
            arquivos.push({ arquivo_id: newData.lateralDireitaId, carro_arquivo_tipo_id: 1, position: 2 })
        }

        if (newData.lateralEsquerdaId) {
            arquivos.push({ arquivo_id: newData.lateralEsquerdaId, carro_arquivo_tipo_id: 1, position: 3 })
        }

        if (newData.fundoId) {
            arquivos.push({ arquivo_id: newData.fundoId, carro_arquivo_tipo_id: 1, position: 4 })
        }

        if (newData.painelInternoId) {
            arquivos.push({ arquivo_id: newData.painelInternoId, carro_arquivo_tipo_id: 1, position: 5 })
        }

        const model = {
            description: newData.modelo,
            brand: {
                description: newData.marca
            }
        }

        const body = {
            ano: newData.anoCar,
            placa: newData.placaCar,
            endereco_retirada_principal: endereco_retirada_principal,
            model: model,
            arquivos
        }
        const session = await getSession()
        const token = 'Bearer ' + session.access_token

       
        console.log("body =", body)

        const res = await httpRequest.post(
            `${config.baseUrl}/api/proprietario/carros`,
            true,
            token,
            body)


        return res && res.data ? res.data : res

    } catch (error) {
        console.log('error', error.response);

        // notify("error", error.response ? error.response.data : '')
        return null
    }
}
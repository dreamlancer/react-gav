import { config } from "../../config"
import { getSession } from 'next-auth/client'
import httpRequest from "../../utils/request"
import { notify, useInput } from "../../utils/common"

export const updateDriver = async (newData, obj) => {
    try {

        const pessoa_fisica = { ...obj.pessoa_fisica, cpf: newData.cpf, nome: newData.nome }
        const endereco = [{
            "latitude": obj.latitude,
            "longitude": obj.longitude,
            "logradouro": newData.rua,
            "cep": newData.cep,
            "numero": newData.numero,
            "complemento": newData.complemento,
            "bairro": newData.bairro,
            "cidade_id": newData.cidadeId
        }]

        let pessoa_arquivos = []

        if (obj.pessoa_arquivos) {
            pessoa_arquivos = [...obj.pessoa_arquivos]
        }

        if (newData.cnhId) {
            pessoa_arquivos.push({ arquivo_id: newData.cnhId, pessoa_arquivo_tipo_id: 1 })
        }
        if (newData.segurandoId) {
            pessoa_arquivos.push({arquivo_id: newData.segurandoId, pessoa_arquivo_tipo_id: 2 })
        }

        if (newData.comprovanteId) {
            pessoa_arquivos.push({ arquivo_id: newData.comprovanteId, pessoa_arquivo_tipo_id: 3 })
        }
        if (newData.rgId) {
            pessoa_arquivos.push({ arquivo_id: newData.rgId, pessoa_arquivo_tipo_id: 5 })
        }

        const body = {
            telefone: obj.telefone,
            celular: newData.celular,
            email: newData.email,
            pessoa_tipo_id: obj.pessoa_tipo_id,
            pessoa_cadastro_id: obj.pessoa_cadastro_id,
            pessoa_status_id: obj.pessoa_status_id,
            recebe_via_administrador: obj.recebe_via_administrador,
            pessoa_fisica: pessoa_fisica,
            pessoa_juridica: obj.pessoa_juridica,
            endereco: [endereco],
            carros: obj.carros,
            pessoa_arquivos: obj.pessoa_arquivos,
            conta_bancaria: obj.conta_bancaria,
            ...(pessoa_arquivos.length && {pessoa_arquivos: pessoa_arquivos}),
            ...(newData.prefilId && { foto_perfil_arquivo_id: newData.prefilId })
        }
        //cnhID, rgId, segurandoId, comprovanteId, prefilId
        // debugger
        console.log("body = ", body)
        const session = await getSession()
        const token = 'Bearer ' + session.access_token

        const { data } = await httpRequest.patch(
            `${config.baseUrl}/api/motorista`,
            true,
            token,
            body
        )
        console.log("updated data = ", data)
        return data

    } catch (error) {
        console.log(error)
        notify("error", error.response ? error.response.data.message : '')
        return null
    }
}


export const getCep = async (cep) => {
    try {


        const session = await getSession()
        const token = 'Bearer ' + session.access_token

        const { data } = await httpRequest.get(
            `${config.baseUrl}/api/cep/${cep}`,
            true,
            token)
        return data

    } catch (error) {
        //console.log(error.response.data)

        return null
    }
}
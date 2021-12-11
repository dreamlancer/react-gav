import { config } from "../../../config"
import httpRequest from "../../../utils/request"
//import getItem from '../../../utils/localStroageAccess'
import { notify, useInput } from "../../../utils/common"



export const createPerson = async (email, celular, nome, senha, pessoa_cadastro_id, pessoa_tipo_id, cb) => {
    try {
        const body = {
            celular: celular,
            email: email,
            pessoa_tipo_id: pessoa_tipo_id,
            pessoa_cadastro_id: pessoa_cadastro_id,
            pessoa_fisica: {
                nome: nome
            },
            pessoa_juridica: {
                nome: nome
            },
            user: {
                password: senha,
                email: email

            }
        }

        const { data } = await httpRequest.post(
            `${config.baseUrl}/api/captacao/pessoas`,
            false,
            "",
            body
        )
        //console.log("data", data)
        notify('success', "Successfully Created")
        cb()
        return data
    } catch (error) {
        cb()
        let err = ""
        if("user.email" in error.response.data.errors ){
            err += error.response.data.errors["user.email"][0]
        }

        if("user.password" in error.response.data.errors ){
            err += error.response.data.errors["user.password"][0]
        }
        notify("error", err)
       // console.log(error.response.data.errors)
        return null
    }
}
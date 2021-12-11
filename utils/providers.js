import axios from 'axios'
import {config} from '../config'
import { createPerson } from '../api/cadastro/captasao/createPerson'

const domain = config.baseUrl

export const gavProvider = {
    clientId: config.GAV_CLIENT_ID,
    clientSecret: config.GAV_CLIENT_SECRET,
    grant_type: config.grantType
}

export const getToken = async (credentials) => {
    credentials.scope = ''
    credentials.grant_type = gavProvider.grant_type
    credentials.client_id = gavProvider.clientId
    credentials.client_secret = gavProvider.clientSecret
    //console.log("creadiantials  = ", credentials)
    try {
        const { data: tokens } = await axios.post(
            `${domain}/oauth/token`,
            credentials
        )
       // console.log(tokens)
        return tokens
    } catch (error) {
       console.log(error)
        return null
    }
}

export const getMe = async (access_token) => {
    try {
        const { data: me } = await axios.get(
            `${domain}/api/me`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json',
                },
            }
        )
        return me
    } catch (error) {
        console.log(error)
        return null
    }
}
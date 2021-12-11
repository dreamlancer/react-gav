import { config } from "../../config"
import httpRequest from "../../utils/request"
import { getSession } from 'next-auth/client'
import { notify, useInput } from "../../utils/common"
import { RiMastercardFill } from "react-icons/ri"
import axios from 'axios'


export const createFile = async (formData) => {

    try {

        const session = await getSession()
        const token = 'Bearer ' + session.access_token

        

        let defaultOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Accept-Language': 'en',
            },
        }


        Object.assign(defaultOptions.headers, {
            Authorization: token,
        })


        const res = await axios.post(`${config.baseUrl}/api/arquivos`, formData, { ...defaultOptions })
        console.log('res', res.data);
        
        //debugger
        return res && res.data ? res.data : res

    } catch (error) {
        console.log(error.response)
        // notify("error", error.response ? error.response.data : '')
        return null
    }
}
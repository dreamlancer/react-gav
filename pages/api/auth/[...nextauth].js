import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { config } from "../../../config"
import { gavProvider, getMe, getToken } from '../../../utils/providers'
import { loginService } from '../../../api/auth'
import { getSession } from 'next-auth/client'


const options = {
    providers: [
        Providers.Google({
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            authorizationUrl:'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
            scope:'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
            profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
            accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
            requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
        }),
        Providers.Facebook({
            clientId: config.FACEBOOK_CLIENT_ID,
            clientSecret: config.FACEBOOK_CLIENT_SECRET
        }),
        Providers.Credentials({
            name: "GAV",
            async authorize(credentials) {


                const tokens = await getToken(credentials)
                if (!tokens) {
                    return null
                }
                const me = await getMe(tokens.access_token)
                //console.log("me===>>", me)
                const user = {
                    ...tokens,
                    name: me.nome,
                    email: me.email,
                    userId: me.id,
                    photo: me.foto_perfil_arquivo ? me.foto_perfil_arquivo.link : ""

                }

                return user

            },
        }),

    ],
    site: process.env.NEXTAUTH_URL,
    pages: {
        signIn: "/login",
        error: '/login'
    },
    session: {
        jwt: true,
    },
    callbacks: {
        // async signIn(user, account, profile) {
        //     return true
        // },
        // async redirect(url, baseUrl) {
        //     // console.log('url', url);
        //     // console.log('baseUrl', baseUrl);

        //     return url
        // },
        async redirect(url, baseUrl) {
            // return baseUrl
            return config.nextAuthUrl;
        },
        
        async jwt(token, user, account, profile, isNewUser) {
            // console.log("token ===> ", token)
            // console.log("user ===> ", user)
            // console.log("account ===> ", account)
            // console.log("profile ===> ", profile)
            // console.log("isNewUser ===> ", isNewUser)

            if (user) {

                token = {
                    ...token,
                    ...user,
                    ...(account && account)
                }

            }

            return token
        },
        async session(session, token) {


            if (token && (token.type === 'oauth')) {

                const data = await loginService(token.provider, token.accessToken)
                //console.log("data = ", data)
                const me = await getMe(data.access_token)
                //console.log("me===>>", me)
                session = {
                    ...data,
                    name: me.nome,
                    email: me.email,
                    userId: me.id,
                    photo: me.foto_perfil_arquivo ? me.foto_perfil_arquivo.link : token.image ? token.image : ""

                }

            } else {
                session = {
                    ...session, ...token
                }
            }
            console.log("token ==", token)
            console.log("session == ", session)
            return session
        }


    },



}

export default (req, res) => NextAuth(req, res, options)
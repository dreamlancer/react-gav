const DEVELOPMENT = {
    nextAuthUrl: process.env.NEXTAUTH_URL,
    baseUrl: process.env.API_URL,
    grantType: process.env.GRANT_TYPE,
    basicAuthToken: process.env.BASIC_AUTH_TOKEN,
    GAV_CLIENT_SECRET: process.env.GAV_CLIENT_SECRET,
    GAV_CLIENT_ID: process.env.GAV_CLIENT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // GOOGLE_CLIENT_ID: '31651057818-h820onhd3h42kpgf5hih2kptc3m2mues.apps.googleusercontent.com',
    // GOOGLE_CLIENT_SECRET: 'VAnfQLrzpQvKFSSzMhfABbhX'
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET:  process.env.FACEBOOK_CLIENT_SECRET
}

export const config = DEVELOPMENT
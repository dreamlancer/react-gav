import { getSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const withAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter()
        const [verified, setVerified] = useState(false)

        useEffect(async () => {
            const session = await getSession()
            if (session) {
                setVerified(true)
            } else {
                Router.replace("/login")
            }
        }, [])

        if (verified) {
            return <WrappedComponent {...props} />
        } else {
            return null
        }
    }
}
export default withAuth

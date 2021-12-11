import { useState, useEffect } from "react"
import PublicHeader from "../../components/Partial/Public/Header"
import PublicFooter from "../../components/Partial/Public/Footer"
import { Container } from "react-bootstrap"
import { getSession } from "next-auth/client"
import DashboardHeader from "../../components/Partial/Dashboard/Header"

const PublicLayout = ({ children }) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        getToken()
    }, [])

    const getToken = async () => {
        const session = await getSession()

        console.log('session', session);
        setToken(session && session.access_token)
    }

    return (
        <>
            <Container>
                {
                    token ? <DashboardHeader /> : <PublicHeader />
                }

                <main style={{
                    minHeight: 'calc(100vh - 253px)'
                }}>
                    {children}
                </main>


            </Container>
            <PublicFooter />
        </>
    )
}

export default PublicLayout

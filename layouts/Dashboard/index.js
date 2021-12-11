import { Container } from "react-bootstrap"
import DashboardHeader from "../../components/Partial/Dashboard/Header"
import DashboardFooter from "../../components/Partial/Dashboard/Footer"
import withAuth from '../../utils/withAuth'

const DashboardLayout = ({ children }) => {
    return (
        <>
            <Container>
                <DashboardHeader />

                <main>
                    {children}
                </main>


            </Container>
            {/* <DashboardFooter /> */}
        </>
    )
}

export default withAuth(DashboardLayout)

import { useRouter } from "next/router"
import { Nav, Navbar } from "react-bootstrap"
import { UiButton } from "../../UI/Button"

const PublicHeader = () => {
    const router = useRouter()

    return (
        <Navbar collapseOnSelect expand="lg" className="w-100 border-bottom mb-3">
            <Navbar.Brand href="/">
                <img src="/images/logo.png" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-lg-auto align-items-center">
                    <Nav.Link onClick={() => {
                        router.push({
                            pathname: '/registrar',
                            query: { pessoa_cadastro_id: 2 },
                        })
                    }} className="d-flex flex-column text-text-center mx-lg-5">
                        <span className="text-dark">SOU PROPRIETÁRIO</span>
                        <span className="text-primary font-weight-bold">QUERO FORNECER</span>
                    </Nav.Link>

                    <Nav.Link onClick={() => {
                        router.push({
                            pathname: '/registrar',
                            query: { pessoa_cadastro_id: 3 },
                        })
                    }} className="d-flex flex-column text-text-center mx-lg-5">
                        <span className="text-dark">SOU MOTORISTA</span>
                        <span className="text-primary font-weight-bold">QUERO ALUGAR</span>
                    </Nav.Link>
                    <Nav.Link href="/login">
                        <UiButton variant="outline-primary" title="Login" className="px-5 font-weight-bold" />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default PublicHeader

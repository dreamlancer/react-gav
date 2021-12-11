import { useState } from "react"
import { Nav, Navbar, Dropdown } from "react-bootstrap"
import { HiMenuAlt2 } from "react-icons/hi"
import { RiCarLine, RiContactsBookLine } from "react-icons/ri"
import { FaRegCommentDots } from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { signOut, getSession } from 'next-auth/client'



const DashboardHeader = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const openMenu = () => {
        setIsOpen(true)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="w-100 border-bottom mb-3 px-md-3 px-0 py-2 dashboard-header">
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                <Navbar.Collapse id="responsive-navbar-nav" className="d-flex flex-row justify-content-between">
                    <Nav className="align-items-center">
                        <HiMenuAlt2 size="70" onClick={openMenu} className="cursor-pointer" color="#0044c8" />
                    </Nav>
                    <Nav className="ml-lg-auto align-items-center">
                        <Link href='/'>
                            <img className="cursor-pointer" src="/images/logo.png" />
                        </Link>
                    </Nav>
                    <Nav className="ml-lg-auto align-items-center custom-dropdown">
                        <Dropdown drop="down">
                            <Dropdown.Toggle id="dropdown-basic">
                                <img className="header-logo" src="/images/icon/user-icon.png" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/perfil-fornecedor/1124">Ver perfil</Dropdown.Item>
                                <Dropdown.Item onSelect={() => signOut()}>Sair</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <div className={`floating-wrapper ${isOpen ? 'floating-wrapper-open' : ''}`}>
                <div className="d-flex align-items-center flex-column">
                    <div className="mt-3 mb-5">
                        <HiMenuAlt2 onClick={closeMenu} size="70" color="#fff" className="cursor-pointer" />
                    </div>

                    <Link href="/meus-veiculos">
                        <div className="d-flex align-items-center justify-content-between single-floating-item mb-5 cursor-pointer">
                            <p className="p-0 text-white h2">Meus aluguéis</p>
                            <RiCarLine size="40" color="#fff" className="ml-5" />
                        </div>
                    </Link>

                    <Link href="/listar-carros-disponiveis-fornecedor">
                        <div className="d-flex align-items-center justify-content-between single-floating-item mb-5 cursor-pointer">
                            <p className="p-0 text-white h2">Conversas</p>
                            <FaRegCommentDots size="40" color="#fff" className="ml-5" />
                        </div>
                    </Link>


                    <Link href="/registrar-fornecedor-form">
                        <div className="d-flex align-items-center justify-content-between single-floating-item mb-5 cursor-pointer">
                            <p className="p-0 text-white h2">Meus dados</p>
                            <RiContactsBookLine size="40" color="#fff" className="ml-5" />
                        </div>
                    </Link>
                </div>
            </div>

            {isOpen ? <div onClick={closeMenu} className="back-shed"></div> : null}
        </>
    )
}

export default DashboardHeader
export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    console.log(session)
    if (!session) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return {}
    }
}
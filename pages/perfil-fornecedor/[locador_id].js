import React, { useState, useEffect } from 'react'
import { Col, Row } from "react-bootstrap"
import PublicLayout from "../../layouts/Public"
import ProfileAvatar from "../../components/Snippets/ProfileAvatar"
import SingleVehicle from "../../components/Snippets/SingleVehicle"
import RatingAvatar from "../../components/Snippets/RatingAvatar"
import Devider from "../../components/UI/Divider"
import { prefilFornecedor } from '../../api/profile/ownerProfile'
import { ratingDate } from '../../utils/common'
import { useRouter } from "next/router"
import { FullPageLoader } from '../../components/UI/Loader'



const ProfileAnother = () => {
    const router = useRouter()
    let locatorId = router.query.locador_id

    const [isLoading, setLoading] = useState(true)
    const [currentUrl, setCurrentUrl] = useState('')
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getPrefilFornecedor()
    }, [])

    const getPrefilFornecedor = async () => {

        if (!locatorId && typeof window !== "undefined") {
            locatorId = window.location.pathname.split("/").pop()
            setCurrentUrl(window.location.href)
        }

        const data = await prefilFornecedor(locatorId, () => {
            setLoading(false)
        })

        if (data != null) {
            setUserData(data)
        }

        setLoading(false)
    }

    return (
        <PublicLayout>
            {
                isLoading ? <FullPageLoader loading={isLoading} /> :
                    <div className="profile-area W-100">
                        <Row className="justify-content-center">
                            <Col lg={6} className="justify-content-center">
                                <ProfileAvatar
                                    name={userData.nome || ''}
                                    ratingCount={parseFloat(userData.nota) || 0}
                                    avatarUrl={userData && userData.foto_perfil_link ? userData.foto_perfil_link : '/images/icon/user-icon.png'}
                                />
                            </Col>
                            <Col lg={12} className="mt-5">
                                <p className="profile-area__link">Link divulgação fornecedor: {currentUrl}</p>
                                {
                                    userData && userData.carros && userData.carros.length > 0 &&
                                    <p className="profile-area__vehicle-title">Veículos disponíveis</p>
                                }
                            </Col>
                        </Row>
                        {
                            userData && userData.carros && userData.carros.length > 0 && userData.carros.map((car, i) => {
                                return (
                                    <Row key={i} className="justify-content-center">
                                        <Col lg={6} className="mt-5">
                                            <SingleVehicle title car={car} />
                                        </Col>
                                    </Row>
                                )
                            })
                        }

                        <p className="profile-area__rating-title">O que os motoristas falam</p>
                        <p className="profile-area__rating-text">{userData && userData.avaliacoes && userData.avaliacoes.length} Avaliações</p>
                        <Row className="justify-content-center mt-5">
                            <Col lg={7}>
                                {userData && userData.avaliacoes && userData.avaliacoes.length > 0 && userData.avaliacoes.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <RatingAvatar
                                                imagePath={item.foto_perfil_arquivo ? item.foto_perfil_arquivo : '/images/icon/user-icon.png'}
                                                rating={item.avaliador && item.avaliador.nota && parseFloat(item.avaliador.nota) || 0}
                                                date={item.updated_at && ratingDate(item.updated_at)}
                                                title={item.avaliador.nome}
                                                details={item.descricao} />
                                            <Devider />
                                        </div>
                                    )
                                }
                                )}
                            </Col>
                        </Row>

                    </div>
            }

        </PublicLayout>
    )
}

export default ProfileAnother

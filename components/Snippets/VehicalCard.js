import React, { useEffect } from "react"
import Slider from "react-slick"
import { useState } from "react"
import { Row, Col } from "react-bootstrap"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiFillHome } from "react-icons/ai"
import { BiDollar } from "react-icons/bi"
import { FaPiggyBank, FaTools } from "react-icons/fa"
import { TiShoppingCart } from "react-icons/ti"
import { VscFileBinary } from "react-icons/vsc"
import Link from "next/link"
import { getSession } from 'next-auth/client'
import { useRouter } from "next/router"
import { getMe } from '../../api/auth'




const VehicleCard = ({ onReserveClick, listAdd }) => {
    const router = useRouter()
    const [rating, setRating] = useState()
    const [info, setInfo] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        getToken()
        getInfo()
    }, [])


    const getInfo = async () => {
        const data = await getMe()
        setInfo(data.pessoa_cadastro_id)
    }

    const getToken = async () => {
        const session = await getSession()
        setToken(session && session.access_token)
    }


    const SampleNextArrow = ({ onClick }) => {
        return (
            <div onClick={onClick} className="vehicle-next-arrow">
                <AiOutlineArrowRight size={30} />
            </div>
        )
    }

    const SamplePrevArrow = ({ onClick }) => {
        return (
            <div onClick={onClick} className="vehicle-prev-arrow">
                <AiOutlineArrowLeft size={30} />
            </div>
        )
    }




    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }




    return (
        <div className="vehicles-card-area__card-section d-flex justify-content-center mb-4">
            <div className="vehicles-card-area__card-section-single-card">
                <div className="vehicles-card-area__card-section-single-card-header">
                    <Row>
                        <Col lg={8} className="vehicles-card-area__card-section-single-card-header-left">
                            {listAdd.modelo && <p>{listAdd.modelo.descricao}</p>}
                            {/* <StarRatings
                                starDimension="15px"
                                rating={0}
                                starSpacing="5px"
                                starRatedColor="white"
                                starHoverColor="white"
                                starEmptyColor="white"
                                changeRating={(rating) => setRating(rating)}
                                numberOfStars={5}
                                name='rating'
                            /> */}
                        </Col>
                        {listAdd.avaliacoes && <Col lg={4} className="vehicles-card-area__card-section-single-card-header-right">
                            <p>{listAdd.avaliacoes.avaliador.nome}</p>
                            <Link href="/perfil-fornecedor">
                                <img
                                    className="vehicles-card-area__card-section-single-card-header-right-avatar cursor-pointer"
                                    src={listAdd.avaliacoes.avaliador.foto_perfil_arquivo.link}>
                                </img>
                            </Link>
                        </Col>}
                    </Row>
                </div>

                <Row>
                    <Col>
                        <Slider {...settings}>
                            {listAdd && listAdd.links_fotos && listAdd.links_fotos.map((item, i) => {
                                return <div className="vehicles-card-area__card-section-single-card-slider">
                                    <img className="img-fluid" src={item.link}></img>
                                </div>
                            })}
                        </Slider>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} className="vehicles-card-area__card-section-single-card-icon-block mb-2">
                        <BiDollar size={35} className="vehicles-card-area__card-section-single-card-icon-block-icon" />
                        <div>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-name">Diária</p>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-amount">R$ {listAdd.valor_diaria}</p>
                        </div>
                    </Col>
                    <Col lg={4} className="vehicles-card-area__card-section-single-card-icon-block mb-2">
                        <FaPiggyBank size={35} className="vehicles-card-area__card-section-single-card-icon-block-icon" />
                        <div>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-name">Caução</p>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-amount">{listAdd.valor_caucao}% do total</p>
                        </div>
                    </Col>
                    {listAdd.forma_de_pagamento && <Col lg={3} className="vehicles-card-area__card-section-single-card-icon-block mb-2">
                        <TiShoppingCart size={35} className="vehicles-card-area__card-section-single-card-icon-block-icon" />
                        <div>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-name">Forma de pagamento</p>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-amount">{listAdd.forma_de_pagamento}</p>
                        </div>
                    </Col>}
                    <Col lg={3} className="vehicles-card-area__card-section-single-card-icon-block mb-2">
                        <AiFillHome size={30} className="vehicles-card-area__card-section-single-card-icon-block-icon" />
                        <div>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-name">Seguro</p>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-amount">{listAdd.tem_seguro}</p>
                        </div>
                    </Col>
                    {listAdd.frequencia_de_manutencao && <Col lg={3} className="vehicles-card-area__card-section-single-card-icon-block mb-2">
                        <FaTools size={30} className="vehicles-card-area__card-section-single-card-icon-block-icon" />
                        <div>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-name">Manutenção</p>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-amount">{listAdd.frequencia_de_manutencao}</p>
                        </div>
                    </Col>}
                    {listAdd.placa && <Col lg={5} className="vehicles-card-area__card-section-single-card-icon-block mb-2">
                        <VscFileBinary size={35} className="vehicles-card-area__card-section-single-card-icon-block-icon" />
                        <div>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-name">Final de placa</p>
                            <p className="vehicles-card-area__card-section-single-card-icon-block-amount">{listAdd.placa}</p>
                        </div>
                    </Col>}
                </Row>
                <Row>
                    <Col lg={6}>
                        <button onClick={() => token ? router.push('/ver-meu-anuncio') : onReserveClick()} className="single-vehicle-btn single-vehicle-btn-des mx-auto d-block">
                            Reservar
                        </button>
                    </Col>
                    <Col lg={6}>
                        <button onClick={() => token ? router.push(info === 2 ?'/listar-carros-disponiveis-fornecedor' : '/listar-carros-disponiveis' ) : onReserveClick()} className="single-vehicle-btn single-vehicle-btn-ver mx-auto d-block">
                            Conversar
                        </button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default VehicleCard

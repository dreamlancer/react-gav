import DashboardLayout from "../../layouts/Dashboard"
import Link from "next/link"
import {
	Col,
	Row,
	Tab,
	Nav,
} from "react-bootstrap"
import { AiOutlineStar } from "react-icons/ai"
import { AiFillStar } from "react-icons/ai"
import { FaCarAlt } from "react-icons/fa"
import { GoCheck } from "react-icons/go"
import { IoIosArrowDown } from "react-icons/io"
import Devider from "../../components/UI/Divider"
import { useEffect, useState } from "react"
import { SingleAdd, listAds } from "../../api/ads/listAds"
import { useDispatch } from "react-redux"

const ViewMyAd = () => {
	const dispatch = useDispatch()
    const [carAds, setCarAds] = useState({})

	const [data, setdata] = useState({})
	const [isLodding, setLodding] = useState(true)

	useEffect(() => {
		getAds()
	}, [])

	const getAds = () => {
		dispatch(SingleAdd(2, (res, err) => {
			setLodding(false)
			setdata(res)
		}))
	}
	useEffect(() => {
        getFullAds()
    }, [])

    const getFullAds = () => {
        const queryParamsObj = {
            per_page: 15,
            page: 1,
        }
        dispatch(listAds(queryParamsObj, (res, err) => {
            if (res) {
                setCarAds(res.data.carro)
            }
        }))
    }
	console.log('addd', data)
	console.log('full', carAds)


	return (
		<DashboardLayout>
			<div className="view-my-ad-area">
				<h2 className="charac-header">VOYAGE MSI</h2>
				<p className="mb-0">anúncio profissional</p>
				<Row>
					<Col md={8}>
						<Tab.Container id="left-tabs-example" defaultActiveKey="first">
							<Row className="pb-4">
								<Col md={9} xs={8}>
									<Tab.Content>
										{data.links_fotos && data.links_fotos.map((item, i) => {
											return <Tab.Pane key={i} eventKey={data.links_fotos.posicao}>
												<div className="img-container">
													<img
														className="w-100 img-fluid"
														src={item.link}
													/>
												</div>
											</Tab.Pane>
										})}
									</Tab.Content>
								</Col>
								<Col md={3} xs={4}>
									<Nav variant="pills" className="flex-column ">

										{data.links_fotos && data.links_fotos.map((item, i) => {
											return <Nav.Item key={i}>
												<Nav.Link eventKey={data.links_fotos.posicao} className="my-ad-nav-tab-link">
													<div className="img-container">
														<img
															className="w-100 img-fluid"
															src={item.link}
														/>
													</div>
												</Nav.Link>
											</Nav.Item>
										})}
									</Nav>
								</Col>
							</Row>
						</Tab.Container>
						<div className="view-ad-description">
							{
								data && data.descricao &&
								<h3 className="charac-header">Descrição</h3>
							}
							<p className="section-para w-75">{data && data.descricao}</p>
							{/* <div className="d-flex view-ad-btn-grp w-75">
								<button className="text-center d-block w-100 view-ad-btn view-ad-des-btn mr-2">
									Manutenção
                </button>
								<button className="text-center d-block w-100 view-ad-btn view-ad-des-btn mr-2">
									Editar
                </button>
								<button className="text-center d-block w-100 view-ad-btn view-ad-des-btn">
									Compartilhar
                </button>
							</div> */}
						</div>
					</Col>
					<Col sm={4}>
						<div className="view-my-ad-right">
							{data.valor_diaria && <p className="view-my-ad-right-t-para">Diária R$ {data.valor_diaria}</p>}
							<div className="view-profile-container">
								{/* <div className="veiw-profile d-flex justify-content-md-center justify-content-between align-items-center">
									<div className="img-container">
										<img
											className="w-100 img-fluid"
											src="/images/home/vehicles/my-add-b1.png"
										/>
									</div>
									<div className="d-flex justify-content-center align-items-center flex-column p-3 text-white">
										<h3 className="text-white profile-name">Raphaela Guedes</h3>
										<div className="d-flex justify-content-center align-items-center">
											<p className="mb-0 mr-2 profile-rating">Avaliação</p>
											<div className="star d-flex">
												<AiOutlineStar />
												<AiOutlineStar />
												<AiOutlineStar />
												<AiOutlineStar />
												<AiOutlineStar />
											</div>
										</div>
									</div>
								</div> */}

								<Link href="/perfil-fornecedor/1124">
									<button className="text-center d-block w-100 view-ad-btn">
										Ver meu perfil
                </button>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
				<hr></hr>
				<Row>
					<Col lg={6}>
						<h3 className="py-5 charac-header">Características</h3>
						<Row>
							{/* <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Categoria</p>
										<p className="mb-0 charac-bottom-name">Sedan</p>
									</div>
								</div>
							</Col> */}
							{/* {data.modelo.descricao && <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Modelo</p>
										<p className="mb-0 charac-bottom-name">{data.modelo.descricao}</p>
									</div>
								</div>
							</Col>}
							{data.modelo.marca.descricao && <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Marca</p>
										<p className="mb-0 charac-bottom-name">{data.modelo.marca.descricao}</p>
									</div>
								</div>
							</Col>} */}
							{data.ano && <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Ano</p>
										<p className="mb-0 charac-bottom-name">{data.ano}</p>
									</div>
								</div>
							</Col>}
							{data.limite_km_mensal > 0 && <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Km</p>
										<p className="mb-0 charac-bottom-name">{data.limite_km_mensal} km</p>
									</div>
								</div>
							</Col>}
							{/* <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Potência</p>
										<p className="mb-0 charac-bottom-name">1.6</p>
									</div>
								</div>
							</Col> */}
						</Row>
						{/* <Row>
							<Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Combustível</p>
										<p className="mb-0 charac-bottom-name">Flex</p>
									</div>
								</div>
							</Col>
							<Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Câmbio</p>
										<p className="mb-0 charac-bottom-name">Automático</p>
									</div>
								</div>
							</Col>
						</Row> */}

						<Row>
							{/* <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Cor</p>
										<p className="mb-0 charac-bottom-name">Prata</p>
									</div>
								</div>
							</Col> */}
							{data.placa && <Col md={4}>
								<div className="d-flex align-items-center charac-content">
									<FaCarAlt className="charac-icon" />
									<div className="charac-grp-name ml-3">
										<p className="mb-0 charac-upper-name">Final de placa</p>
										<p className="mb-0 charac-bottom-name">{data.placa}</p>
									</div>
								</div>
							</Col>}
						</Row>
					</Col>
					{/* <Col lg={6}>
						<h3 className="py-5 charac-header">Adicionais</h3>
						<Row>
							<Col md={6}>
								<p className="mb-0 additional-list">
									{" "}
									<span className="additional-icon">
										<GoCheck />
									</span>{" "}
                  Vidro Fumê
                </p>
							</Col>
							<Col md={6}>
								<p className="mb-0 additional-list">
									{" "}
									<span className="additional-icon">
										<GoCheck />
									</span>{" "}
                  Airbag
                </p>
							</Col>
							<Col md={6}>
								<p className="mb-0 additional-list">
									{" "}
									<span className="additional-icon">
										<GoCheck />
									</span>{" "}
                  Kit Multimidea
                </p>
							</Col>
							<Col md={6}>
								<p className="mb-0 additional-list">
									{" "}
									<span className="additional-icon">
										<GoCheck />
									</span>{" "}
                  Suporte de Celular
                </p>
							</Col>
							<Col md={6}>
								<p className="mb-0 additional-list">
									{" "}
									<span className="additional-icon">
										<GoCheck />
									</span>{" "}
                  Carregador de Celular
                </p>
							</Col>
						</Row>
					</Col> */}
				</Row>
				<hr></hr>
				<Col lg={6}>
					<h3 className="py-5 charac-header">Condições de Aluguel</h3>
					<Row>
						{data.valor_diaria && <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Diária</p>
									<p className="mb-0 charac-bottom-name">R$ {data.valor_diaria}</p>
								</div>
							</div>
						</Col>}
						{/* <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Caução</p>
									<p className="mb-0 charac-bottom-name">Voyage</p>
								</div>
							</div>
						</Col> */}
						{/* {data.modelo.marca.descricao && <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Marca</p>
									<p className="mb-0 charac-bottom-name">{data.modelo.marca.descricao}</p>
								</div>
							</div>
						</Col>} */}
						{data && data.ano && <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Ano</p>
									<p className="mb-0 charac-bottom-name">{data && data.ano}</p>
								</div>
							</div>
						</Col>}
						{data && data.limite_km_mensal > 0 && <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Km</p>
									<p className="mb-0 charac-bottom-name">{data && data.limite_km_mensal} km</p>
								</div>
							</div>
						</Col>}
						{/* <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Potência</p>
									<p className="mb-0 charac-bottom-name">1.6</p>
								</div>
							</div>
						</Col> */}
						{/* <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Combustível</p>
									<p className="mb-0 charac-bottom-name">Flex</p>
								</div>
							</div>
						</Col> */}
						{/* <Col md={4}>
							<div className="d-flex align-items-center charac-content">
								<FaCarAlt className="charac-icon" />
								<div className="charac-grp-name ml-3">
									<p className="mb-0 charac-upper-name">Câmbio</p>
									<p className="mb-0 charac-bottom-name">Automático</p>
								</div>
							</div>
						</Col> */}
					</Row>
				</Col>
				<hr></hr>
				<Row className="justify-content-center">
					<Col lg={6} md={10}>
						<h3 className="text-center charac-header pt-5">
							O que os motoristas falam
            </h3>
						<p className="text-center additional-list">{carAds && carAds.avaliacoes && carAds.avaliacoes.length} Avaliações</p>
						{carAds && carAds.avaliacoes && carAds.avaliacoes.length > 0 && carAds.avaliacoes.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <RatingAvatar
                                                imagePath={item.avaliador.foto_perfil_arquivo ? item.avaliador.foto_perfil_arquivo : '/images/icon/user-icon.png'}
                                                rating={item.nota_media && item.nota_media && parseFloat(item.nota_media) || 0}
                                                date={item.updated_at && ratingDate(item.updated_at)}
                                                title={item.avaliador.nome}
                                                details={item.descricao} />
                                            <Devider />
                                        </div>
                                    )
                                }
                                )}
						{/* <button className="text-center d-block driver-comment-load-more-btn w-100 img-fluid">
							Carregar mais avaliações{" "}
							<span className="d-block text-center">
								{" "}
								<IoIosArrowDown />{" "}
							</span>
						</button> */}
					</Col>
				</Row>
			</div>
		</DashboardLayout>
	)
}

export default ViewMyAd

import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import PublicLayout from "../../layouts/Public"
import VehicleCard from "../../components/Snippets/VehicalCard"
import PrimaryModal from "../../components/Snippets/PrimaryModal"
import GoogleMap from "../../components/Snippets/GoogleMap"
import { useDispatch } from "react-redux"
import { listAds } from "../../api/ads/listAds"
import { FullPageLoader } from "../../components/UI/Loader"


const places = [
    {
        lat: 34.091158,
        lng: -118.2795188
    },
    {
        lat: 34.0771192,
        lng: -118.2587199
    },
    {
        lat: 34.083527,
        lng: -118.370157
    },
    {
        lat: 34.0951843,
        lng: -118.283107
    },
]


const MyVehiclesCard = () => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [carAds, setCarAds] = useState({})
    const [isLoading, setLoding] = useState(true)

    useEffect(() => {
        getAds()
    }, [])

    const getAds = () => {
        const queryParamsObj = {
            per_page: 15,
            page: 1,
        }
        dispatch(listAds(queryParamsObj, (res, err) => {
            if (res) {
                setLoding(false)
                setCarAds(res.data)
            }
        }))
    }

    return (

        <PublicLayout>
            <div className="vehicles-card-area">


                {
                    isLoading ? <FullPageLoader loading={isLoading} /> :
                        <Row>
                            <Col lg={7} className="mb-lg-0 mb-3">
                                {/* <RangeFilter /> */}
                                <p className="vehicles-card-area__title">Exibindo {carAds && carAds.length} veículos</p>
                                {carAds && carAds.length > 0 && carAds.map((item, i) => {
                                    return <VehicleCard key={i} listAdd={item} onReserveClick={() => setShow(true)} />
                                })}
                            </Col>
                            <Col lg={5}>
                                <GoogleMap places={places} />
                            </Col>
                        </Row>
                }
                <PrimaryModal
                    show={show}
                    onClose={() => setShow(false)}
                    title="Faça seu login ou cadastre-se em nossa plataforma pararealizar a reserva!"
                />

            </div>
        </PublicLayout>
    )
}

export default MyVehiclesCard

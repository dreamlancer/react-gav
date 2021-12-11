import { useState, useEffect } from "react"
import { Col, Row, Button } from "react-bootstrap"
import ChatBox from "../../components/Snippets/ChatBox"
import SingleVehicleForDriver from "../../components/Snippets/SingleVehicleForDriver"
import DashboardLayout from "../../layouts/Dashboard"
import { getSession } from 'next-auth/client'
import { driverListOfCars } from '../../api/cars/listAvaiableCar'
import { ToastContainer } from 'react-toastify'
import { FullPageLoader } from "../../components/UI/Loader"

const Panel = ({ session }) => {

    const [rating, setRating] = useState()
    const [cars, setCars] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [singleCar, setSingleCar] = useState({})

    useEffect(async() => {
        await getCars()
        console.log(cars)
    }, [])

    const getCars = async () => {
        setLoading(true)
        const queryParamsObj = {
            per_page: 15,
            page: 1,
            include: 'modelo, carro_status'
        }
        const newCars = await driverListOfCars(queryParamsObj, () => { setLoading(false) })
        if (newCars) {
            setCars(newCars.data)

        }
    }

    return (
        <DashboardLayout>
            {
                isLoading ? <FullPageLoader loading={isLoading} /> :
                    <div >
                        <ToastContainer style={{ zIndex: 99999 }} />
                        <Row className="align-items-start">
                            <Col lg={6}>
                                {cars.length > 0 ? cars.map(function (car, i) {
                                    return (
                                        <button onClick={() => setSingleCar(car)}>
                                            <SingleVehicleForDriver car={car} key={i} />
                                        </button>
                                    )
                                }) : <div> No cars found</div>
                                }
                            </Col>
                            {cars.length &&
                                <Col lg={6} className="my-panel-area">
                                    <ChatBox  car={singleCar} /> 
                                     
                                </Col>
                            }
                        </Row>
                    </div>
            }
        </DashboardLayout>
    )
}

export default Panel

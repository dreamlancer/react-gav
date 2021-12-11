import { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import ChatBoxOwner from "../../components/Snippets/ChatBoxOwner"
import SingleVehicleForOwner from "../../components/Snippets/SingleVehicleForOwner"
import DashboardLayout from "../../layouts/Dashboard"
import { ownerListOfCars } from '../../api/owner/cars/listOfCars'
import { ToastContainer } from 'react-toastify'
import { FullPageLoader } from "../../components/UI/Loader"

const ListerCarros = () => {

    const [cars, setCars] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [singleCar, setSingleCar] = useState({})

    useEffect(async () => {
        await getCars()
    }, [])

    const getCars = async () => {
        setLoading(true)
        const queryParamsObj = {
            per_page: 15,
            page: 1,
            include: 'modelo, carro_status'
        }
        const newCars = await ownerListOfCars(queryParamsObj, () => { setLoading(false) })
        if (newCars) {
            setCars(newCars.data)
            setSingleCar(newCars.data && newCars.data.length > 0 && newCars.data[0])
        }
    }
    console.log('singleCar', singleCar)

    return (
        <DashboardLayout>
            {
                isLoading ? <FullPageLoader loading={isLoading} /> :
                    <div >
                        <ToastContainer style={{ zIndex: 99999 }} />
                        <Row className="align-items-start">
                            <Col lg={6}>
                                {cars.length > 0 ? cars.map((car, i) =>
                                    <button onClick={() => setSingleCar(car)} key={i}>
                                        <SingleVehicleForOwner car={car} key={i} />
                                    </button>) : <div> No cars found</div>
                                }
                            </Col>
                            {cars.length &&
                                <Col lg={6} className="my-panel-area">
                                    <ChatBoxOwner car={singleCar} />

                                </Col>
                            }
                        </Row>
                    </div>
            }
        </DashboardLayout>
    )
}

export default ListerCarros

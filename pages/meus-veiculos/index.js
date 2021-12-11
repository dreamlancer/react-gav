import { useEffect, useState } from "react"
import { Col, Row, Dropdown } from "react-bootstrap"
import Alert from 'react-bootstrap/Alert'
import SingleVehicle from "../../components/Snippets/SingleVehicle"
import DashboardLayout from "../../layouts/Dashboard"
import { FiSettings } from "react-icons/fi"
import { FaPlus } from "react-icons/fa"
import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"
import PrimaryModal from "../../components/Snippets/PrimaryModal"
import PrimaryRatingModal from "../../components/Snippets/RatingModal"
import { ownerListOfCars } from "../../api/owner/cars/listOfCars"
import { ContactPerson } from "../../api/profile/contactPerson"
import { deleteCar } from "../../api/owner/cars/deleteCar"
import { carDetails } from "../../api/owner/cars/listOfCars"
import { updateAvaliar } from "../../api/owner/avaliar"
import { useDispatch } from "react-redux"
import { FullPageLoader } from "../../components/UI/Loader"
import { notify, useInput } from "../../utils/common"
import { ToastContainer } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import { useRouter } from "next/router"



const MyVehicles = () => {
  const dispatch = useDispatch()
  const router = useRouter()


  const [show, setShow] = useState(false)
  const [cars, setCars] = useState([])
  const [modalCar, setModalCar] = useState({})
  const [person, setPerson] = useState({})
  const [avaliar, setAvaliar] = useState({})
  const [showAnother, setShowAnother] = useState(false)
  const [showLast, setShowLast] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [deleteAlertShow, setDeleteAlertShow] = useState(false)


  const [ratingOne, setRatingOne] = useState(0)
  const [ratingTwo, setRatingTwo] = useState(0)
  const [ratingThree, setRatingThree] = useState(0)
  const [ratingFour, setRatingFour] = useState(0)
  const [avaliarId, setAvaliarId] = useState(0)
  const [carroId, setCarroId] = useState(0)
  const [nps, setNps] = useState(null)




  useEffect(() => {
    getCars()
    getContactPerson()
  }, [])


  const getCars = async () => {
    setLoading(true)
    const queryParamsObj = {
      per_page: 15,
      page: 1,
      include: 'modelo, carro_status'
    }
    const newCars = await ownerListOfCars(queryParamsObj, () => {
      setLoading(false)
    })
    if (newCars != null) {
      setCars(newCars.data)
    }
    setLoading(false)
  }
  console.log('cars', cars)

  const removeCar = async (id) => {
    setLoading(true)
    const data = await deleteCar(id)
    //const data = []
    if (data) {
      const updatedCar = cars.filter((car) => {
        return car.id !== id
      })
      setCars(updatedCar)
    }
    setLoading(false)
  }

  const contactClicked = (car) => {
    setShowAnother(true)
    setModalCar(car)
    setCarroId(car.carro_status.id)
  }

  const getContactPerson = async () => {
    const newPerson = await ContactPerson(() => {
    })
    if (newPerson != null) {
      setPerson(newPerson.data)
    }
    setLoading(false)
  }

  const clickAvaliar = (item) => {
    setShowLast(true)
    setShowAnother(false)
    setAvaliar(item)
    setAvaliarId(item.id)
  }

  const NpsChange = (e) => {
    setNps(2)
  }

  const itens = [
    {
      "nota": ratingOne,
      "avaliacao_item_id": avaliarId,
    },
    {
      "nota": ratingTwo,
      "avaliacao_item_id": avaliarId,
    },
    {
      "nota": ratingThree,
      "avaliacao_item_id": avaliarId,
    },
    {
      "nota": ratingFour,
      "avaliacao_item_id": avaliarId,
    }
  ]

  const avaliarClick = async () => {
    const updated = await updateAvaliar(nps, carroId, itens)
  }

  return (
    <DashboardLayout>
      {
        isLoading ? <FullPageLoader loading={isLoading} /> :
          <div className="my-vehicles-area">
            <ToastContainer style={{ zIndex: 99999 }} />
            <div>
              {
                cars.length > 0 ? cars.map(function (car, i) {
                  return (
                    <Row key={i}>
                      <Col xl={6}>
                        <SingleVehicle status="rent" car={car} />
                        {/* Status = "available" or "rent" */}
                      </Col>
                      <Col lg={{ span: 4, offset: 2 }} className="custom-dropdown mb-lg-0 mb-5">
                        <Dropdown drop="down" className="d-flex justify-content-end">
                          <Dropdown.Toggle id="dropdown-basic">
                            <FiSettings className="d-block ml-auto single-vehicle-setting-icon cursor-pointer" />
                          </Dropdown.Toggle>
                          {car.carro_status_id != 2 ?
                            <Dropdown.Menu>

                              <Dropdown.Item href="#/action-1" onClick={() => {
                                router.push({
                                  pathname: '/ver-meu-anuncio',
                                })
                              }}>Ver anúncio</Dropdown.Item>
                              <Dropdown.Item href="#/action-2" onClick={() => contactClicked(car)}>Ver contrato</Dropdown.Item>
                              <Dropdown.Item href="#/action-2" onClick={() => setShow(true)} >Excluir</Dropdown.Item>
                            </Dropdown.Menu> :
                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-2" onClick={() => setShow(true)} >Excluir</Dropdown.Item>
                            </Dropdown.Menu>}


                          <Alert variant="danger" show={deleteAlertShow} onClose={() => setDeleteAlertShow(false)} dismissible>
                            <Alert.Heading>Tem certeza?</Alert.Heading>

                            <hr />
                            <div className="d-flex justify-content-end">
                              <Button onClick={() => removeCar(car.id)} variant="outline-success">
                                Sim
                              </Button>
                            </div>
                          </Alert>
                        </Dropdown>
                        {
                          car.carro_status_id === 2 ?

                            <button onClick={() => {
                              router.push({
                                pathname: '/listar-carros-disponiveis-fornecedor',
                              })
                            }} className="single-vehicle-btn ml-auto d-block">
                              Conversar
                            </button> :
                            <Col lg={12} className="custom-dropdown mb-lg-0 mb-5">
                              <button onClick={() => {
                                router.push({
                                  pathname: '/ver-meu-anuncio',
                                })
                              }} className="single-vehicle-btn single-vehicle-btn-ver ml-auto d-block">
                                Ver anúncio
                              </button>
                              {/* <button className="single-vehicle-btn single-vehicle-btn-des ml-auto d-block">
                                Destacar
                              </button> */}
                            </Col>

                        }

                      </Col>

                    </Row>


                  )
                }) : <div> No cars found</div>
              }
              <Col lg={{ span: 4, offset: 8 }} className="pr-0">

                <Link href={{ pathname: '/registrar-fornecedor-form', query: { step: '2' } }}>
                  <button className="single-vehicle-btn single-vehicle-btn-adi ml-auto d-block">
                    Adicionar Veículo <FaPlus className="mr-2" />
                  </button>
                </Link>
              </Col>
            </div>
            <PrimaryModal
              twoBtn
              show={show}
              onClick={() => setDeleteAlertShow(true)}
              onClose={() => setShow(false)}
              title="Tem certeza que deseja apagar esseanúncio, tal ação não poderá ser desfeita!"
            />

            <PrimaryModal
              show={showNext}
              onClose={() => setShowNext(false)}
            >
              <div className="my-vehicles-area__modal">
                <AiOutlineArrowLeft onClick={() => setShowNext(false)} className="my-vehicles-area__modal-back" />
                <p className="my-vehicles-area__modal-title">Avaliação</p>
                <div className="d-md-flex justify-content-between align-items-center">
                  <img src="/images/logo.png" />
                  <p className="my-vehicles-area__modal-des">"O seu feedback é muito importante para o seu e o nosso sucesso. Nos avalie!"</p>
                </div>
                <div className="my-vehicles-area__rating-block-right">
                  <p className="pt-4">Recomendaria a GAV para outros fornecedores que querem alugar?</p>
                  <div className="my-vehicles-area__rating-block-right-block py-4">
                    <p>Não</p>
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                        <label className="form-check-label" for="flexRadioDefault1">
                          1
                                         </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                        <label className="form-check-label" for="flexRadioDefault2">
                          2
                                         </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                        <label className="form-check-label" for="flexRadioDefault2">
                          3
                                      </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                        <label className="form-check-label" for="flexRadioDefault2">
                          4
                                    </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                        <label className="form-check-label" for="flexRadioDefault2">
                          5
                                      </label>
                      </div>
                    </div>
                    <p>Sim</p>
                  </div>
                </div>

                <button className="my-vehicles-area__btn2">
                  Deixe o seu comentário sobre esse motorista..
                    </button>

                <button className="my-vehicles-area__btn mx-auto d-block">
                  Avaliar
                     </button>
              </div>
            </PrimaryModal>
            <PrimaryRatingModal
              show={showLast}
              onClose={() => setShowLast(false)}
              person={avaliar}
              npsChange={NpsChange}
              ratingOne={ratingOne}
              ratingOneChange={(ratingOne) => setRatingOne(ratingOne)}
              ratingTwo={ratingTwo}
              ratingTwoChange={(ratingTwo) => setRatingTwo(ratingTwo)}
              ratingThree={ratingThree}
              ratingThreeChange={(ratingThree) => setRatingThree(ratingThree)}
              ratingFour={ratingFour}
              ratingFourChange={(ratingFour) => setRatingFour(ratingFour)}
              onClickAva={avaliarClick}
            />
            <PrimaryModal
              show={showAnother}
              onClose={() => setShowAnother(false)}
            >
              <div className="my-vehicles-area__modal">
                <AiOutlineArrowLeft onClick={() => setShowAnother(false)} className="my-vehicles-area__modal-back" />
                <p className="my-vehicles-area__modal-title">Contrato</p>
                <SingleVehicle car={modalCar} />
                <div className="my-vehicles-area__modal-person">
                  {person && person.length > 0 && person.map((item, i) => {
                    return item.carro.cobrancas.map((innerItem, index) => {
                      return <div key={index}>
                        <SingleVehicle
                          location="Locatário"
                          inicio="Início do contrato"
                          fim="Fim do contrato"
                          value1="Alexandre Garcia"
                          value2={innerItem.data_inicio}
                          value3={innerItem.data_fim}
                          ratingComponent
                          ratingNumber={4}
                          hasUnderline
                          avatar="/images/supplier-avatar.png"
                        />
                        <button onClick={() => clickAvaliar(item)} className="my-vehicles-area__btn mx-auto d-block my-3">
                          Avaliar
                        </button>
                      </div>
                    })
                  })}
                </div>
              </div>
            </PrimaryModal>
          </div>
      }
    </DashboardLayout>
  )
}

export default MyVehicles


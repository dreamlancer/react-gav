import { useState } from 'react'
import Devider from "../UI/Divider"
import StarRatings from 'react-star-ratings'



const SingleVehicle = ({ car, status, driverName, colorStatus, ratingComponent, ratingNumber, title, location, inicio, fim, hasUnderline, avatar, value1, value2, value3 }) => {

  const [rating, setRating] = useState()

  return (
    <>
      <div className="single-vehicle-area">
        <p className="text-right single-vehicle-date">Data do contrato</p>
        <div className="single-vehicle-container d-flex justify-content-start align-items-center">
          <div className={car && car.links_fotos && car.links_fotos.length > 0 ? "img-container2" : "img-container"}>
            <img className={`img-fluid ${car && car.links_fotos && car.links_fotos.length > 0 ? 'image' : 'avatar'}`}
            src={car && car.links_fotos && car.links_fotos.length > 0 ? car.links_fotos[0].link : avatar} />
          </div>


          <div className={location ? "d-flex" : "d-flex p-2 pl-md-5 pl-4"}>
            <div className="single-vehicle-title">
            <p>{location ? location : 'Modelo'}</p>
              <p>{inicio ? inicio : 'Placa'}</p>
              <p>{fim ? fim : 'Ano'}</p>
            </div>
            <div className="single-vehicle-value">
              <p>{value1 ? value1 : car && car.modelo && car.modelo.descricao}</p>
              <p>{value2 ? value2 : car && car.placa && car.placa}</p>
              <p>{value3 ? value3 : car && car.ano}</p>
            </div>
          </div>
          <div className="">
            {
              ratingComponent ? <div className="pl-5">
                <StarRatings
                  starDimension="25px"
                  rating={ratingNumber}
                  starSpacing="4px"
                  starRatedColor="#f6bf00"
                  starHoverColor="#f6bf00"
                  starEmptyColor="white"
                  changeRating={(rating) => setRating(rating)}
                  numberOfStars={5}
                  name='rating'
                />
              </div> :
                title ? <p className="single-vehicle-contents single-vehicle-contents--green pl-5">Alugando no momento</p>
                  :
                  <div className="p-4 pt-md-5 pt-0">
                    <div className="d-flex">
                      <div className="single-vehicle-title">
                        <p>Semana</p>
                        <p>Status</p>
                      </div>
                      <div className="single-vehicle-value">
                        <p>NEED DATA</p>
                        {
                          colorStatus ? <span className={status == "rent"
                            ? "single-vehicle-contents single-vehicle-contents--green"
                            : status == "available"
                              ? "single-vehicle-contents single-vehicle-contents--yellow"
                              : "single-vehicle-contents"}>
                            {status == "rent"
                              ? "Alugadu"
                              : status == "available"
                                ? "Disponível"
                                : "Em manutenção"}
                          </span> :
                            <p>{car && car.carro_status && car.carro_status.descricao || ''}</p>
                        }
                      </div>
                    </div>
                    {driverName && (
                      <p className="single-vehicle-bottom-text">
                        {driverName && "nome do motorista"}
                      </p>)}
                  </div>
            }

          </div>
        </div>
      </div>

      {hasUnderline ? hasUnderline : <Devider />}
    </>
  )
}

export default SingleVehicle

import { Modal } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import SingleVehicle from "./SingleVehicle"
import { AiOutlineArrowLeft } from "react-icons/ai"
import StarRatings from 'react-star-ratings'


const PrimaryRatingModal = ({
    show,
    onClose,
    person,
    ratingOne,
    ratingOneChange,
    ratingTwo,
    ratingTwoChange,
    ratingThree,
    ratingThreeChange,
    ratingFour,
    ratingFourChange,
    npsChange,
    onClickAva }) => {



    return (
        <Modal dialogClassName="my-modal" className="primary-modal" show={show} onHide={onClose}>
            <Modal.Body className="justify-content-center d-flex flex-column align-items-center">
                <FaTimes onClick={onClose} className="primary-modal__cross" />
                <div className="my-vehicles-area__modal">
                    <AiOutlineArrowLeft onClick={() => setShowLast(false)} className="my-vehicles-area__modal-back" />
                    <p className="my-vehicles-area__modal-title">Avaliação</p>
                    <SingleVehicle
                        location="Locatário"
                        inicio="Início do contrato"
                        fim="Fim do contrato"
                        value1="Alexandre Garcia"
                        value2={person.data_inicio}
                        value3={person.data_fim}
                        ratingComponent
                        ratingNumber={4}
                        avatar="/images/supplier-avatar.png"
                    />

                    <div className="my-vehicles-area__rating-block W-100">
                        <div className="my-vehicles-area__rating-block-group">
                            <div className="my-vehicles-area__rating-block-left">
                                <p>Cuidados com o veículo</p>
                                <StarRatings
                                    starDimension="30px"
                                    rating={ratingOne}
                                    starSpacing="4px"
                                    starRatedColor="#f6bf00"
                                    starHoverColor="#f6bf00"
                                    starEmptyColor="#f9f4b2"
                                    changeRating={ratingOneChange}
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                            <div className="my-vehicles-area__rating-block-left">
                                <p>Pontualidade nos pagamentos</p>
                                <StarRatings
                                    starDimension="30px"
                                    rating={ratingTwo}
                                    starSpacing="4px"
                                    starRatedColor="#f6bf00"
                                    starHoverColor="#f6bf00"
                                    starEmptyColor="#f9f4b2"
                                    changeRating={ratingTwoChange}
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                            <div className="my-vehicles-area__rating-block-left">
                                <p>Comunicação</p>
                                <StarRatings
                                    starDimension="30px"
                                    rating={ratingThree}
                                    starSpacing="4px"
                                    starRatedColor="#f6bf00"
                                    starHoverColor="#f6bf00"
                                    starEmptyColor="#f9f4b2"
                                    changeRating={ratingThreeChange}
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                            <div className="my-vehicles-area__rating-block-left">
                                <p>Infrações de Transito</p>
                                <StarRatings
                                    starDimension="30px"
                                    rating={ratingFour}
                                    starSpacing="4px"
                                    starRatedColor="#f6bf00"
                                    starHoverColor="#f6bf00"
                                    starEmptyColor="#f9f4b2"
                                    changeRating={ratingFourChange}
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                        </div>
                        <div className="my-vehicles-area__rating-block-right">
                            <p>Recomendaria esse motorista?</p>
                            <div className="my-vehicles-area__rating-block-right-block">
                                <p>Não</p>
                                <div className="d-flex align-items-center justify-content-center" onChange={() => npsChange}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value={1} name="flexRadioDefault" id="flexRadioDefault1"></input>
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            1
                                         </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value={2} name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            2
                                         </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value={3} name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            3
                                      </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value={4} name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            4
                                    </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value={5} name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            5
                                      </label>
                                    </div>
                                </div>
                                <p>Sim</p>
                            </div>
                        </div>
                    </div>
                    <button className="my-vehicles-area__btn2">
                        Deixe o seu comentário sobre esse motorista..
                    </button>

                    <button onClick={onClickAva} className="my-vehicles-area__btn mx-auto d-block">
                        Avaliar
                     </button>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default PrimaryRatingModal

import { Col, Row } from "react-bootstrap"
import { UiButton } from "../UI/Button"
import { WizardInput } from "../UI/TextInput"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { getCep } from '../../api/driver/updateDriver'
import { createCar } from '../../api/owner/cars/createCar'
import { notify } from "../../utils/common"


const VehicleDetails = ({
  marca, modelo, ano, placa, cep, estado, cidade, rua, semana,
  caucao, diaria, numero, complemento, bairro, cidadeId,
  handleCarInput,  processing,
  activeStep, vehicleNextClick, vehicleBack
}) => {




  return (
    <div>
      <Row>
        <Col lg={12} className="mb-4">
          <div className="text-center h5">Onde o motorista vai retirar o veículo?</div>
        </Col>
        <Col lg={4} md={6}>
          <div className="mr-lg-3">
            <div className="mb-5">
              <WizardInput label="Marca:" name="marca" value={marca} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Modelo:" name="modelo" value={modelo} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Ano:" name="ano" value={ano} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Placa:" name="placa" value={placa} handleOwner={handleCarInput} />
            </div>
          </div>
          <div className="text-center">
            <p className="h3 font-weight-bold">Motorista pode comprar após o contrato?</p>

            <div className="custom-radios mt-2">
              <div>
                <input type="radio" id="yes" name="color" value="yes" checked />
                <label for="yes">
                  Sim
                </label>
              </div>

              <div>
                <input type="radio" id="no" name="color" value="no" />
                <label for="no">
                  Não
                </label>
              </div>

            </div>
          </div>
        </Col>

        <Col lg={4} md={6}>
          <div className="mx-lg-3">
            <div className="mb-5">
              <WizardInput label="CEP:" name="cep" value={cep} handleOwner={handleCarInput} required />
            </div>
            <div className="mb-5">
              <WizardInput label="Estado:" name="estado" value={estado} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Cidade:" name="cidade" value={cidade} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Rua:" name="rua" value={rua} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Complemento:" name="complemento" value={complemento} handleOwner={handleCarInput} required />
            </div>
          </div>
        </Col>

        <Col lg={4}>
          <div className="ml-lg-3">
            <div className="mb-5">
              <WizardInput label="Diária:" name="diaria" value={diaria} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Semana:" name="semana" value={semana} handleOwner={handleCarInput} />
            </div>
            <div className="mb-5">
              <WizardInput label="Caução:" name="caucao" value={caucao} handleOwner={handleCarInput} />
            </div>

            <div className="mx-lg-5">
              {
                activeStep === 0 ?
                  <UiButton title="Cancelar" variant="secondary" className="w-100 mb-4 next-btn" onClick={() => router.push('/')} /> :
                  <UiButton title="Voltar" variant="secondary" className="w-100 mb-4 next-btn" onClick={vehicleBack} />
              }
              <UiButton title="Próximo" className="w-100 next-btn" onClick={vehicleNextClick} loading={processing} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default VehicleDetails

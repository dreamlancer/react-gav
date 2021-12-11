import { Col, Row } from "react-bootstrap"
import { UiButton } from "../UI/Button"
import { WizardInput } from "../UI/TextInput"
import { useRouter } from 'next/router'

const PersonalInfo = ({ activeStep, personalNextClick, driver, changeDriver }) => {
  const router = useRouter()
 // console.log("driver  =", driver)
  return (
    <div>
      <Row>
        <Col lg={4}>
          <div className="mr-lg-3">
            <div className="mb-5">
              <WizardInput label="Nome:" name="nome" value={driver.nome} handleOwner={changeDriver} />
            </div>
            <div className="mb-5">
              <WizardInput label="Email:"  name="email" value={driver.email} handleOwner={changeDriver}/>
            </div>
            <div className="mb-5">
              <WizardInput label="Celular:"  name="celular" value={driver.celular} handleOwner={changeDriver}/>
            </div>
            <div className="mb-5">
              <WizardInput label="CPF/CNPJ:"  name="cpf" value={driver.cpf} handleOwner={changeDriver} />
            </div>
          </div>
        </Col>

        <Col lg={4}>
          <div className="mx-lg-3">
            <div className="mb-5">
              <WizardInput label="CEP:"   name="cep" value={driver.cep} handleOwner={changeDriver} />
            </div>
            <div className="mb-5">
              <WizardInput label="Estado:"   name="estado" value={driver.estado} handleOwner={changeDriver} />
            </div>
            <div className="mb-5">
              <WizardInput label="Cidade:"   name="cidade" value={driver.cidade} handleOwner={changeDriver} />
            </div>
            <div className="mb-5">
              <WizardInput label="Bairro:"   name="bairro" value={driver.bairro} handleOwner={changeDriver}  />
            </div>
            <div className="mb-5">
              <WizardInput label="Rua:"   name="rua" value={driver.rua} handleOwner={changeDriver} />
            </div>
          </div>
        </Col>

        <Col lg={4}>
          <div className="ml-lg-3">
            <div className="mb-5">
              <WizardInput label="Número:"  name="numero" value={driver.numero} handleOwner={changeDriver}  />
            </div>
            <div className="mb-5">
              <WizardInput label="Complemento:"  name="complemento" value={driver.complemento} handleOwner={changeDriver}  />
            </div>

            <div className="mx-lg-5">
              {
                activeStep === 0 ?
                  <UiButton title="Cancelar" variant="secondary" className="w-100 mb-4 next-btn" onClick={() => router.push('/')} /> :
                  <UiButton title="Voltar" variant="secondary" className="w-100 mb-4 next-btn" onClick={() => router.push('/')} />
              }
              <UiButton title="Próximo" className="w-100 next-btn" onClick={personalNextClick} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PersonalInfo

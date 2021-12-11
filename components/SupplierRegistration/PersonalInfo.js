import { Col, Row } from "react-bootstrap"
import { UiButton } from "../UI/Button"
import { WizardInput } from "../UI/TextInput"
import { useRouter } from "next/router"


const PersonalInfo = ({ activeStep, personalNextClick, owner, handleOwner, processing }) => {
  const router = useRouter()
  return (
    <div>
      <Row>
        <Col lg={4}>
          <div className="mr-lg-3">
            <div className="mb-5">
              <WizardInput label="Nome:" name="nome" value={owner.nome} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="Email:" name="email" value={owner.email} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="Celular:" name="celular" value={owner.celular} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="CPF/CNPJ:" name="cpf" value={owner.cpf} handleOwner={handleOwner} />
            </div>
          </div>
        </Col>

        <Col lg={4}>
          <div className="mx-lg-3">
            <div className="mb-5">
              <WizardInput label="CEP:" name="cep" value={owner.cep} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="Estado:" name="estado" value={owner.estado} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="Cidade:" name="cidade" value={owner.cidade} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="Bairro:" name="bairro" value={owner.bairro} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="Rua:" name="rua" value={owner.rua} handleOwner={handleOwner} />
            </div>
          </div>
        </Col>


        <Col lg={4}>
          <div className="ml-lg-3">
            <div className="mb-5">
              <WizardInput label="Número:" name="numero" value={owner.numero} handleOwner={handleOwner} />
            </div>
            <div className="mb-5">
              <WizardInput label="Complemento:" name="complemento" value={owner.complemento} handleOwner={handleOwner} />
            </div>

            <div className="mx-lg-5 d-sm-flex d-lg-block ">
              {activeStep === 0 ? (
                <UiButton
                  title="Cancelar"
                  variant="secondary"
                  className="w-100 mb-lg-4 mb-sm-0 mr-sm-3 mr-lg-0 next-btn personal-info-r-btn"
                  onClick={() => router.push("/")}
                />
              ) : (
                  <UiButton
                    title="Voltar"
                    variant="secondary"
                    className="w-100 mb-4 next-btn"
                    onClick={() => router.push("/")}
                  />
                )}
              <UiButton
                title="Próximo"
                className="w-100 next-btn mt-sm-0 mt-3"
                onClick={personalNextClick}
                loading={processing}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PersonalInfo

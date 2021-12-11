import { Col, Row } from "react-bootstrap"
import Link from "next/link"
import { UiButton } from "../UI/Button"
import { useRouter } from 'next/router'
import UploadPhoto from "../UI/Photo"

const UploadVehiclePhotos = ({
  loadingFrontal, frontalUrl, onFrontalChange,
  loadingLateralDireita, lateralDireitaUrl, onLateralDireitaChange,
  loadingLateralEsquerda, lateralEsquerdaUrl, onLateralEsquerdaChange,
  loadingFundo, fundoUrl, onFundoChange,
  loadingPainelInterno, painelInternoUrl, onPainelInternoChange,
  processing, activeStep, uploadBack, uploadCarDetails
}) => {
  const router = useRouter()

  return (
    <div>
      <Row>
        <Col lg={3} md={6} className="mb-5">
          <div className="mr-lg-3">
            <UploadPhoto text="Frontal" name="frontal" id="frontal" loading={loadingFrontal} src={frontalUrl} onFileChange={onFrontalChange} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Lateral Direita" name="lateralDireita" loading={loadingLateralDireita} id="lateralDireita" src={lateralDireitaUrl} onFileChange={onLateralDireitaChange} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Lateral Esquerda" name="lateralEsquerda" loading={loadingLateralEsquerda} id="lateralEsquerda" src={lateralEsquerdaUrl} onFileChange={onLateralEsquerdaChange} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Fundo" name="fundo" id="fundo" loading={loadingFundo} src={fundoUrl} onFileChange={onFundoChange} />
          </div>
        </Col>


      </Row>

      <Row className="justify-content-between">
        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Painel Interno" name="painelInterno" id="painelInterno" loading={loadingPainelInterno} src={painelInternoUrl} onFileChange={onPainelInternoChange} />
          </div>
        </Col>

        {/* <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Adicionar + Fotos" />
          </div>
        </Col> */}

        <Col lg={4} className="mb-5 mt-lg-5 pt-lg-5">
          <div className="mx-lg-3">
            {
              activeStep === 0 ?
                <UiButton title="Cancelar" variant="secondary" className="w-100 mb-4 next-btn" onClick={() => router.push('/')} /> :
                <UiButton title="Voltar" variant="secondary" className="w-100 mb-4 next-btn" onClick={uploadBack} />
            }
            <UiButton title="Próximo" className="w-100 next-btn" loading={processing} onClick={uploadCarDetails} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default UploadVehiclePhotos

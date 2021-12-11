import { Col, Row } from "react-bootstrap"
import { UiButton } from "../UI/Button"
import { useRouter } from 'next/router'
import UploadPhoto from "../UI/Photo"
import { useState } from "react"
import { createFile } from "../../api/files/createFiles"
import { updateDriver } from '../../api/driver/updateDriver'
import { ToastContainer } from 'react-toastify'



const UploadPhotos = ({ activeStep, uploadBack, driver, prevDriver }) => {

  const router = useRouter()

  const [cnhUrl, setCnhUrl] = useState(null)
  const [rgUrl, setRgUrl] = useState(null)
  const [segurandoUrl, setSegurandoUrl] = useState(null)
  const [comprovanteUrl, setComprovanteUrl] = useState(null)
  const [prefilUrl, setPrefilUrl] = useState(null)

  const [cnhId, setCnhId] = useState(null)
  const [rgId, setRgId] = useState(null)
  const [segurandoId, setSegurandoId] = useState(null)
  const [comprovanteId, setComprovanteId] = useState(null)
  const [prefilId, setPrefilId] = useState(null)


  const onFileChangeCnh = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setCnhUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()
    formData.append("file", value)

    const res = await createFile(formData)

    if (res) {
      setCnhId(res.id)
    }
  }

  const onFileChangeRg = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setRgUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()
    formData.append("file", value)

    const res = await createFile(formData)

    if (res) {
      setRgId(res.id)
    }
  }

  const onFileChangeSegurando = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setSegurandoUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()
    formData.append("file", value)

    const res = await createFile(formData)

    if (res) {
      setSegurandoId(res.id)
    }
  }

  const onFileChangeComprovante = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setComprovanteUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()
    formData.append("file", value)

    const res = await createFile(formData)

    if (res) {
      setComprovanteId(res.id)
    }
  }

  const onFileChangePrefil = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setPrefilUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()
    formData.append("file", value)

    const res = await createFile(formData)

    if (res) {
      setPrefilId(res.id)
    }
  }

  const uploadAndRedirect = async () => {
    const updated = await updateDriver({ ...driver, cnhId, rgId, segurandoId, comprovanteId, prefilId }, prevDriver)
    if (updated) {
      router.push('/listar-carros-disponiveis')

    }
  }

  return (
    <div>
      <Row>
        <ToastContainer style={{ zIndex: 99999 }} />
        <Col lg={3} md={6} className="mb-5">
          <div className="mr-lg-3">
            <UploadPhoto text="CNH" name="cnh" src={cnhUrl} id="cnh" onFileChange={onFileChangeCnh} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="RG" name="rg" src={rgUrl} id="rg" onFileChange={onFileChangeRg} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Segurando CNH" name="segurando" id="segurando" src={segurandoUrl} onFileChange={onFileChangeSegurando} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Comprovante de endereço" name="comprovante" id="comprovante" src={comprovanteUrl} onFileChange={onFileChangeComprovante} />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-lg-between">
        <Col lg={3} md={6} className="mb-5">
          <div className="mx-lg-3">
            <UploadPhoto text="Foto de perfil" name="prefil" id="prefil" src={prefilUrl} onFileChange={onFileChangePrefil} />
          </div>
        </Col>

        <Col lg={3} className="mb-5">
          <div className="ml-lg-3">
            {
              activeStep === 0 ?
                <UiButton title="Cancelar" variant="secondary" className="w-100 mb-4 next-btn" onClick={() => router.push('/')} /> :
                <UiButton title="Voltar" variant="secondary" className="w-100 mb-4 next-btn" onClick={uploadBack} />
            }
            <UiButton title="Próximo" className="w-100 next-btn" onClick={uploadAndRedirect} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default UploadPhotos

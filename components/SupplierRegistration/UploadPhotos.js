import { Col, Row } from "react-bootstrap"
import { UiButton } from "../UI/Button"
import { useRouter } from "next/router"
import UploadPhoto from "../UI/Photo"
import { useState, useEffect, createFactory } from "react"
import { createFile } from '../../api/files/createFiles'
import { updateOwner } from '../../api/owner/updateOwner'
import { notify } from "../../utils/common"


const UploadPhotos = ({ activeStep, uploadBack, personalNextClick, owner, prevOwner }) => {
  // console.log(owner)

  const [processing, setProcessing] = useState("")
  const [cnhId, setCnhId] = useState(null)
  const [comprovanteId, setComprovanteId] = useState(null)
  const [prefilId, setPrefilId] = useState(null)

  const [cnhUrl, setCnhUrl] = useState(null)
  const [comprovanteUrl, setComprovanteUrl] = useState(null)
  const [prefilUrl, setPrefilUrl] = useState(null)



  const onCnhChange = async (event) => {
    // Update the state 
    const value = event.target.files[0]
    if (value) {
      setCnhUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)

    if (res) {
      setCnhId(res.id)

    }

  }

  const onComChange = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setComprovanteUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)

    if (res) {
      setComprovanteId(res.id)

    }
  }

  const onPrefilChange = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setPrefilUrl(URL.createObjectURL(value))
    }

    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)

    if (res) {
      setPrefilId(res.id)

    }
  }



  const uploadAndNext = async () => {
    setProcessing(true)
    // Create an object of formData 

    //debugger
    //console.log("-------------", cnhId)
    await updateOwner({ ...owner, cnhId, comprovanteId, prefilId }, prevOwner)

    notify('success', 'User data updated')

    setProcessing(false)
    personalNextClick()
  }

  return (
    <div>
      <Row>
        <Col lg={3} md={6} className="mb-lg-0 mb-4">
          <div className="mr-lg-3">
            <UploadPhoto text="CNH/RG:" name="cnh" src={cnhUrl} id="cnh" onFileChange={onCnhChange} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-lg-0 mb-4">
          <div className="mx-lg-3">
            <UploadPhoto text="Comprovante de residência" src={comprovanteUrl} id="comprovante" name="comprovante" onFileChange={onComChange} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-lg-0 mb-4">
          <div className="mx-lg-3">
            <UploadPhoto text="Foto de perfil" name="prefil" src={prefilUrl} id="prefil" onFileChange={onPrefilChange} />
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-lg-0 mb-4 upload-photos-top">
          <div className="ml-lg-3">
            {activeStep === 0 ? (
              <UiButton
                title="Cancelar"
                variant="secondary"
                className="w-100 mb-4 next-btn"
                onClick={() => router.push("/")}
              />
            ) : (
                <UiButton
                  title="Voltar"
                  variant="secondary"
                  className="w-100 mb-4 next-btn"
                  onClick={uploadBack}
                />
              )}
            <UiButton
              title="Próximo"
              className="w-100 next-btn"
              onClick={uploadAndNext}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default UploadPhotos

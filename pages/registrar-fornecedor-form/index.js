import DashboardLayout from '../../layouts/Dashboard'
import { useState, useEffect, createFactory } from "react"
import PersonalInfo from '../../components/SupplierRegistration/PersonalInfo'
import UploadPhotos from '../../components/SupplierRegistration/UploadPhotos'
import VehicleDetails from '../../components/SupplierRegistration/VehicleDetails'
import UploadVehiclePhotos from '../../components/SupplierRegistration/UploadVehiclePhotos'
import { getSession } from 'next-auth/client'
import { getMe } from '../../utils/providers'
import { ToastContainer } from 'react-toastify'
import { recoverOwner } from '../../api/owner/recoverOwner'
import { getCep } from '../../api/driver/updateDriver'

import { useRouter } from 'next/router'
import { notify } from '../../utils/common'
import { FullPageLoader } from '../../components/UI/Loader'
import { createFile } from '../../api/files/createFiles'
import { createCar } from '../../api/owner/cars/createCar'



const SupplierRegistrationForm = () => {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)
  const [owner, setOwner] = useState({})

  const [activeStep, setActiveStep] = useState(0)
  const [nome, setnome] = useState("")
  const [email, setemail] = useState("")
  const [celular, setcelular] = useState("")
  const [cpf, setcpf] = useState("")
  const [cep, setcep] = useState("")
  const [estado, setestado] = useState("")
  const [bairro, setbairro] = useState("")
  const [rua, setrua] = useState("")
  const [numero, setnumero] = useState("")
  const [cidade, setcidade] = useState("")
  const [complemento, setcomplemento] = useState("")
  const [cidadeId, setCidadeId] = useState("")
  const [processing, setProcessing] = useState(false)



  const [marcaCar, setMarcaCar] = useState("aa")
  const [modeloCar, setModeloCar] = useState("a")
  const [anoCar, setAnoCar] = useState("2021")
  const [placaCar, setPlacaCar] = useState("a")
  const [cepCar, setCepCar] = useState("a")
  const [estadoCar, setEstadoCar] = useState("a")
  const [cidadeCar, setCidadeCar] = useState("a")
  const [ruaCar, setRuaCar] = useState("a")
  const [semanaCar, setSemanaCar] = useState("a")
  const [caucaoCar, setCaucaoCar] = useState("a")
  const [diariaCar, setDiariaCar] = useState("a")
  const [numeroCar, setNumeroCar] = useState("a")
  const [complementoCar, setComplementoCar] = useState("a")
  const [bairroCar, setBairroCar] = useState("a")
  const [cidadeIdCar, setCidadeIdCar] = useState("a")

  const [frontalId, setFrontalId] = useState("")
  const [frontalUrl, setFrontalUrl] = useState("")
  const [loadingFrontal, setLoadingFrontal] = useState(false)
  const [lateralDireitaId, setLateralDireitaId] = useState("")
  const [lateralDireitaUrl, setLateralDireitaUrl] = useState("")
  const [loadingLateralDireita, setLoadingLateralDireita] = useState(false)
  const [lateralEsquerdaId, setLateralEsquerdaId] = useState("")
  const [lateralEsquerdaUrl, setLateralEsquerdaUrl] = useState("")
  const [loadingLateralEsquerda, setLoadingLateralEsquerda] = useState(false)
  const [fundoId, setFundoId] = useState("")
  const [fundoUrl, setFundoUrl] = useState("")
  const [loadingFundo, setLoadingFundo] = useState(false)
  const [painelInternoId, setPainelInternoId] = useState("")
  const [painelInternoUrl, setPainelInternoUrl] = useState("")
  const [loadingPainelInterno, setLoadingPainelInterno] = useState(false)
  const [carProcessing, setCarProcessing] = useState(false)


  useEffect(async () => {
    setLoading(true)
    const data = await recoverOwner({}, () => {
      setLoading(false)
    })

    if (data) {
      console.log(data)
      setOwner(data)
      setnome(data.nome)
      setemail(data.email)
      setcelular(data.celular)
      if (data.pessoa_fisica && data.pessoa_fisica.cpf) {
        setcpf(data.pessoa_fisica.cpf)
      }

      if (data.endereco.length) {
        const addr = data.endereco[0]
        if (addr.cidade && addr.cidade.descricao) {
          setcidade(addr.cidade.descricao)
          setCidadeId(addr.cidade.id)
        }
        if (addr.cidade && addr.cidade.estado && addr.cidade.estado.descricao) {
          setestado(addr.cidade.estado.descricao)
        }
        if (addr.cep) {
          setcep(addr.cep)
        }
        if (addr.bairro) {
          setbairro(addr.bairro)
        }
        if (addr.logradouro) {
          setrua(addr.logradouro)
        }
        if (addr.numero) {
          setnumero(addr.numero)
        }
        if (addr.complemento) {
          setcomplemento(addr.complemento)
        }
      }
    }
    if (router.query && router.query.step) {
      setActiveStep(parseInt(router.query.step))
    } else {
      setActiveStep(2)
    }
  }, [])


  const handleOwner = async (e) => {

    const name = e.target.name
    const value = e.target.value

    switch (name) {
      case "nome":
        setnome(value)
        break
      case "email":
        setemail(value)
        break
      case "celular":
        setcelular(value)
        break
      case "cpf":
        setcpf(value)
        break
      case "cep":
        console.log("value = ", value)
        setcep(value)
        setLoading(true)
        const addr = await getCep(value)
        if (addr) {
          console.log("add = ", addr)
          setbairro(addr.bairro)
          setrua(addr.logradouro)
          setcidade(addr.cidade.descricao)
          setestado(addr.cidade.estado.descricao)
          setCidadeId(addr.cidade.id)
        }
        setLoading(false)
        break
      case "estado":
        setestado(value)
        break
      case "bairro":
        setbairro(value)
        break
      case "rua":
        setrua(value)
        break
      case "cidade":
        setcidade(value)
        break
      case "numero":
        setnumero(value)
        break
      case "complemento":
        setcomplemento(value)
        break

    }

  }


  const handleCarInput = async (e) => {

    const name = e.target.name
    const value = e.target.value

    switch (name) {
      case "marca":
        setMarcaCar(value)
        break
      case "modelo":
        setModeloCar(value)
        break
      case "ano":
        setAnoCar(value)
        break
      case "placa":
        setPlacaCar(value)
        break
      case "cep":
        console.log("value = ", value)
        setCepCar(value)
        const addr = await getCep(value)
        if (addr) {
          console.log("add = ", addr)
          setBairroCar(addr.bairro)
          setRuaCar(addr.logradouro)
          setCidadeCar(addr.cidade.descricao)
          setEstadoCar(addr.cidade.estado.descricao)
          setCidadeIdCar(addr.cidade.id)
        }
        break
      case "estado":
        setEstadoCar(value)
        break
      case "rua":
        setRuaCar(value)
        break
      case "numero":
        setNumeroCar(value)
        break
      case "complemento":
        setComplementoCar(value)
        break
      case "semana":
        setSemanaCar(value)
        break
      case "caucao":
        setCaucaoCar(value)
        break
      case "diaria":
        setDiariaCar(value)
        break
      case "cidade":
        setCidadeCar(value)
        break

    }
  }


  const onFrontalChange = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setFrontalUrl(URL.createObjectURL(value))
    }

    setLoadingFrontal(true)

    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)

    setLoadingFrontal(false)

    if (res) {
      setFrontalId(res.id)
    }
  }

  const onLateralDireitaChange = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setLateralDireitaUrl(URL.createObjectURL(value))
    }
    setLoadingLateralDireita(true)

    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)
    setLoadingLateralDireita(false)

    if (res) {
      setLateralDireitaId(res.id)

    }
  }

  const onLateralEsquerdaChange = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setLateralEsquerdaUrl(URL.createObjectURL(value))
    }
    setLoadingLateralEsquerda(true)
    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)
    setLoadingLateralEsquerda(false)

    if (res) {
      setLateralEsquerdaId(res.id)

    }
  }

  const onFundoChange = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setFundoUrl(URL.createObjectURL(value))
    }
    setLoadingFundo(true)

    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)
    setLoadingFundo(false)

    if (res) {
      setFundoId(res.id)

    }
  }

  const onPainelInternoChange = async (event) => {
    const value = event.target.files[0]
    if (value) {
      setPainelInternoUrl(URL.createObjectURL(value))
    }
    setLoadingPainelInterno(true)

    let formData = new FormData()

    formData.append(
      "file",
      value
    )
    const res = await createFile(formData)
    setLoadingPainelInterno(false)

    if (res) {
      setPainelInternoId(res.id)

    }
  }

  const vehicleNextClick = () => {
    if (!marcaCar || !modeloCar || !anoCar || !placaCar || !cepCar || !estadoCar || !cidadeCar || !ruaCar || !semanaCar || !caucaoCar) {
      notify('error', 'Please check the input fields')
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const uploadCarDetails = async () => {
    console.log('hi');
    //debugger
   
    setCarProcessing(true)
    const data = await createCar({
      marcaCar, modeloCar, anoCar, placaCar, cepCar, estadoCar, cidadeCar, ruaCar, semanaCar,
      caucaoCar, diariaCar, numeroCar, complementoCar, bairroCar, cidadeIdCar,
      frontalId, lateralDireitaId, lateralEsquerdaId, fundoId, painelInternoId
    })
    if (data) {
      console.log("updated data", data)
      notify('success', 'Car added successfully')
    }
    setCarProcessing(false)

    // setActiveStep(prevActiveStep => prevActiveStep + 1)
  }


  const getStepContent = step => {
    switch (step) {
      case 0:
        return <PersonalInfo
          activeStep={activeStep}
          owner={{ nome, email, celular, cpf, cep, estado, bairro, rua, numero, cidade, complemento, cidadeId }}
          handleOwner={handleOwner}
          personalNextClick={() => setActiveStep(prevActiveStep => prevActiveStep + 1)}
          processing={processing}
        />

      case 1:
        return <UploadPhotos
          activeStep={activeStep}
          owner={{ nome, email, celular, cpf, cep, estado, bairro, rua, numero, cidade, complemento, cidadeId }}
          prevOwner={owner}
          personalNextClick={() => setActiveStep(prevActiveStep => prevActiveStep + 1)}
          uploadBack={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}
        />

      case 2:
        return <VehicleDetails
          marca={marcaCar}
          modelo={modeloCar}
          ano={anoCar}
          placa={placaCar}
          cep={cepCar}
          estado={estadoCar}
          cidade={cidadeCar}
          rua={ruaCar}
          semana={semanaCar}
          caucao={caucaoCar}
          diaria={diariaCar}
          numero={numeroCar}
          complemento={complementoCar}
          bairro={bairroCar}
          cidadeId={cidadeIdCar}
          activeStep={activeStep}
          handleCarInput={handleCarInput}
          vehicleNextClick={vehicleNextClick}
          vehicleBack={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}
        />

      case 3:
        return <UploadVehiclePhotos
          loadingFrontal={loadingFrontal}
          frontalUrl={frontalUrl}
          onFrontalChange={onFrontalChange}

          loadingLateralDireita={loadingLateralDireita}
          lateralDireitaUrl={lateralDireitaUrl}
          onLateralDireitaChange={onLateralDireitaChange}

          loadingLateralEsquerda={loadingLateralEsquerda}
          lateralEsquerdaUrl={lateralEsquerdaUrl}
          onLateralEsquerdaChange={onLateralEsquerdaChange}

          loadingFundo={loadingFundo}
          fundoUrl={fundoUrl}
          onFundoChange={onFundoChange}

          loadingPainelInterno={loadingPainelInterno}
          painelInternoUrl={painelInternoUrl}
          onPainelInternoChange={onPainelInternoChange}

          activeStep={activeStep}
          personalNextClick={() => setActiveStep(prevActiveStep => prevActiveStep + 1)}
          uploadBack={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}
          processing={carProcessing}
          uploadCarDetails={uploadCarDetails}
        />

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      {
        isLoading ? <FullPageLoader loading={isLoading} /> :
          <div className="supplier-reg-area mb-5">
            <ToastContainer style={{ zIndex: 99999 }} />
            <h2 className="text-primary mb-3">
              {activeStep === 0 ? 'Meus dados' :
                activeStep === 1 ? 'Upload Fotos' :
                  activeStep === 2 ? 'Dados do Veículo' :
                    activeStep === 3 && 'Fotos do Veículo'}
            </h2>

            <div className="-12 d-flex justify-content-between mb-5 pb-3">
              <button
                className={`reg-step-btn ${activeStep === 0 ? 'reg-step-btn-active' : activeStep > 0 ? 'reg-step-btn-done' : ''}`}
                onClick={() => setActiveStep(0)}>
                <span className="reg-step-header"></span>
                <span>Dados Pessoais</span>
              </button>
              <button
                disabled={activeStep === 0 ? true : false}
                className={`reg-step-btn ${activeStep === 1 ? 'reg-step-btn-active' : activeStep > 1 ? 'reg-step-btn-done' : ''}`}
                onClick={() => setActiveStep(1)}>
                <span className="reg-step-header"></span>
                <span>Upload Fotos</span>
              </button>
              <button
                className={`reg-step-btn ${activeStep === 2 ? 'reg-step-btn-active' : activeStep > 2 ? 'reg-step-btn-done' : ''}`}
                onClick={() => setActiveStep(2)}>
                <span className="reg-step-header"></span>
                <span>Dados do Veículo</span>
              </button>
              <button
                disabled={activeStep === 0 || 2 ? true : false}
                className={`reg-step-btn ${activeStep === 3 ? 'reg-step-btn-active' : activeStep > 3 ? 'reg-step-btn-done' : ''}`}
                onClick={() => setActiveStep(3)}>
                <span className="reg-step-header"></span>
                <span>Fotos do Veículo</span>
              </button>
            </div>

            {getStepContent(activeStep)}

          </div>
      }
    </DashboardLayout>
  )
}

export default SupplierRegistrationForm

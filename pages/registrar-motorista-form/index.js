import DashboardLayout from '../../layouts/Dashboard'
import { useState, useEffect } from "react"
import PersonalInfo from '../../components/DriverRegistration/PersonalInfo'
import UploadPhotos from '../../components/DriverRegistration/UploadPhotos'
import { recoverDriver } from '../../api/driver/recoverDriver'
import { updateDriver, getCep } from '../../api/driver/updateDriver'
import { useInput } from "../../utils/common"

const DriverRegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isLodding, setLodding] = useState(false)
  const [error, setError] = useState("")
  const [exDriver, setExDriver] = useState({})

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

  const changeDriver = async (e) => {
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
        setLodding(true)
        const addr = await getCep(value)
        if (addr) {
          console.log("add = ", addr)
          setbairro(addr.bairro)
          setrua(addr.logradouro)
          setcidade(addr.cidade.descricao)
          setestado(addr.cidade.estado.descricao)
          setCidadeId(addr.cidade.id)
        }
        setLodding(false)
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
  useEffect(async () => {
    setLodding(true)
    const data = await recoverDriver(() => {
      setLodding(false)
    })

    if (data) {
      console.log(data)
      setExDriver(data)
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

  }, [])

  const clickAndNext = async () => {
    //const updated = await updateDriver({ nome, email, celular, cpf, cep, estado, bairro, rua, numero, cidade, complemento, cidadeId }, exDriver)
    //if(updated){
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    //}
  }



  const getStepContent = step => {
    switch (step) {
      case 0:
        return <PersonalInfo
          activeStep={activeStep}
          driver={{ nome, email, celular, cpf, cep, estado, bairro, rua, numero, cidade, complemento }}
          changeDriver={changeDriver}
          personalNextClick={clickAndNext}
        />
      case 1:
        return <UploadPhotos
          driver={{ nome, email, celular, cpf, cep, estado, bairro, rua, numero, cidade, complemento }}
          activeStep={activeStep}
          prevDriver={exDriver}
          uploadBack={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}
        />
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="supplier-reg-area mb-5">
        <h2 className="text-primary mb-3">
          {activeStep === 0 ? 'Meus dados' :
            activeStep === 1 && 'Upload Fotos'}
        </h2>

        <div className="d-flex mb-5 pb-3">
          <button
            className={`reg-step-btn w-auto pr-5 ${activeStep === 0 ? 'reg-step-btn-active' : activeStep > 0 ? 'reg-step-btn-done' : ''}`}
            onClick={() => setActiveStep(0)}>
            <span className="reg-step-header"></span>
            <span>Dados Pessoais</span>
          </button>
          <button
            className={`reg-step-btn w-auto ${activeStep === 1 ? 'reg-step-btn-active' : activeStep > 1 ? 'reg-step-btn-done' : ''}`}
            onClick={() => setActiveStep(1)}>
            <span className="reg-step-header"></span>
            <span>Upload Fotos</span>
          </button>
        </div>

        {getStepContent(activeStep)}

      </div>
    </DashboardLayout>
  )
}

export default DriverRegistrationForm

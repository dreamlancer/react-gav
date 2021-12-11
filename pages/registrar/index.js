import { SocialButton, UiButton } from "../../components/UI/Button"
import { AuthInput } from "../../components/UI/TextInput"
import { FcGoogle } from "react-icons/fc"
import { ImFacebook } from "react-icons/im"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/client'
import { createPerson } from '../../api/cadastro/captasao/createPerson'
import { notify, useInput } from "../../utils/common"
import { useRouter } from "next/router"
import { ToastContainer } from 'react-toastify'


const DriverRegistration = () => {
  const router = useRouter()
  const pessoa_cadastro_id = router.query.pessoa_cadastro_id

  const [nome, handleNome] = useInput("")
  const [email, handleEmail] = useInput("")
  const [celular, handleCelular] = useInput("")
  const [senha, handleSenha] = useInput("")
  const [isLodding, setLodding] = useState(false)
  const [showPassword, setShowPassword] = useState(true)



  const submitRegisterForm = async (e) => {
    e.preventDefault()
    setLodding(true)
    try {
      const data = await createPerson(email, celular, nome, senha, pessoa_cadastro_id, 1, () => {
        setLodding(false)
      })
      if (data) {
        signIn('credentials',
          {
            username: email,
            password: senha,
            // The page where you want to redirect to after a 
            // successful login
            //callbackUrl: `${window.location.origin}/registrar-motorista-form` 
          }
        )
      }
    } catch (err) {
      console.log(err)
    }


    // signIn('credentials',
    //   {
    //     email,
    //     senha,
    //     // The page where you want to redirect to after a 
    //     // successful login
    //     callbackUrl: `${window.location.origin}/registrar-motorista-form` 
    //   }
    // )

  }

  const handleProvider = (event) => {
    console.log(event.target.name)
    if (event.target.name !== undefined) {
      //await loginService(event.target.name)
      signIn(event.target.name)

    }

  }

  useEffect(() => {
    if (!pessoa_cadastro_id) {
      router.push('/escolha-registro')
    }
  }, [])

  return (
    <div className="login-area text-center">
      <ToastContainer style={{ zIndex: 99999 }} />
      <div className="login-outer">
        <div className="login-logo mb-2">
          <Link href="/">
            <img className="cursor-pointer" src="/images/logo.png" alt="" />
          </Link>
        </div>

        <div className="login-form">
          <form onSubmit={submitRegisterForm}>
            <div className="mr-4">
              <AuthInput required label="Nome" name="nome" value={nome} onChange={handleNome} />
              <AuthInput required label="Email" type="email" name="email" value={email} onChange={handleEmail} />
              <AuthInput required label="Celular" type="tel" pattern="[+]{1}[0-9]{11,14}" name="celular" value={celular} onChange={handleCelular} />
              <AuthInput required label="Senha" type={showPassword ? 'password' : 'text'} name="senha" value={senha} onChange={handleSenha} />
            </div>
            <div className="login-eye-icon d-flex justify-content-end">
              {
                showPassword ?
                  <FaEye onClick={() => setShowPassword(!showPassword)} className="mb-3" size="20" /> :
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="mb-3" size="20" />
              }
            </div>
            <div className="mx-3">
              {/* <Link href="/registrar-motorista-form"> */}
              <UiButton
                loading={isLodding}
                title="Entrar"
                type="submit"
                className="w-100 py-lg-2 py-1 login-btn" />
            </div>
          </form>
        </div>



        <div className="login-footer">
          <p className="login-text-left text-left pt-4">Ou entre com</p>

          <div className="mx-3 mt-3">
            <SocialButton title="Google" icon={<FcGoogle />} name="google" onClick={handleProvider} />
          </div>


          <div className="mx-3 mt-3">
          <SocialButton title="Facebook" icon={<ImFacebook />} name="facebook" onClick={handleProvider}/>
          </div>


          <p className="login-bottom-text">
            <Link href="/escolha-registro">
              <span className="cursor-pointer"> Voltar</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DriverRegistration

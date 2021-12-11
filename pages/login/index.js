import { SocialButton, UiButton } from "../../components/UI/Button"
import { AuthInput } from "../../components/UI/TextInput"
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import { FcGoogle } from "react-icons/fc"
import { ImFacebook } from "react-icons/im"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import Link from "next/link"
import React, { useState, useEffect } from 'react'
import { notify } from "../../utils/common"
import { signIn } from 'next-auth/client'
import { getMe } from '../../api/auth'


const LoginPage = () => {
	//const dispatch = useDispatch()
	const router = useRouter()

	// const [username, setUsername] = useState('motorista.mkp.gav@gmail.com ')
	const [username, setUsername] = useState('')
	// const [username, setUsername] = useState('janderson.rdsilva@gmail.com')
	// const [password, setPassword] = useState('12345678')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(true)
	const [isLodding, setLodding] = useState(false)
	const [error, setError] = useState("")

	const submitLogin = (e) => {
		e.preventDefault()
		setLodding(true)
		try {
			signIn('credentials',
				{
					username: username,
					password: password,
				}
			).then(data => {
				console.log('data', data)
				return
				setLodding(false)
			}).catch(error => {
				notify('error', error)
				setLodding(false)
			})
		} catch (error) {
			notify('error', error)
			setLodding(false)
		}

	}

	const handleInput = (event) => {
		if (event.target.name === "username") {
			setUsername(event.target.value)
		} else if (event.target.name === "password") {
			setPassword(event.target.value)
		}
	}
	const handleProvider = (event) => {
		console.log(event.target.name)
		if (event.target.name !== undefined) {
			signIn(event.target.name)
		}

	}

	useEffect(async () => {

		const params = new URLSearchParams(window.location.search)
		for (let p of params) {
			if (p[0] === "error") {
				// notify("error", "Error in " + p[1])
			}
		}
		setLodding(true)
		const data = await getMe()
		console.log('me data', data)
		if (data) {
			// debugger
			if (data.pessoa_cadastro_id === 2) {
				router.push('/registrar-fornecedor-form')
			}
			if (data.pessoa_cadastro_id === 3) {
				router.push('/registrar-motorista-form')
			}

		}
		setLodding(false)

	}, [])


	return (
		<div className="login-area text-center">
			<ToastContainer style={{ zIndex: 99999 }} />
			<div className="login-outer">
				<div className="login-logo mb-4">
					<Link href="/">
						<img className="cursor-pointer" src="/images/logo.png" alt="" />
					</Link>
				</div>
				<div className="login-form">
					<form onSubmit={submitLogin} >
						<div className="mr-4">
							<AuthInput
								required
								type="email"
								label="Email"
								name="username"
								value={username}
								onChange={handleInput}
							/>
							<AuthInput
								required
								type={showPassword ? 'password' : 'text'}
								label="Senha"
								name="password"
								value={password}
								onChange={handleInput} />
						</div>

						<div className="login-eye-icon d-flex justify-content-end">
							{
								showPassword ?
									<FaEye onClick={() => setShowPassword(!showPassword)} className="mb-3" size="20" /> :
									<FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="mb-3" size="20" />
							}
						</div>

						<p className="login-forget d-flex justify-content-center align-items-center">
							<FaLock className="mr-3" />
              Esqueceu sua senha?
            </p>
						<div className="mx-3 mt-3">
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
						<SocialButton title="Facebook" icon={<ImFacebook />} name="facebook" onClick={handleProvider} />
					</div>


					<p className="login-bottom-text">
						Não tem uma conta?
            <Link href="/escolha-registro">
							<span className="cursor-pointer"> Cadastre-se</span>
						</Link>
					</p>
				</div>
			</div>
		</div >
	)
}

export default LoginPage


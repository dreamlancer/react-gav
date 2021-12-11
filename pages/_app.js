import { Provider } from 'react-redux'
import { store } from '../redux/store'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/main.scss'
import { Provider as NextAuthProvider } from 'next-auth/client'

const MyApp = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextAuthProvider>
  )
}


export default MyApp

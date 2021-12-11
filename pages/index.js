import PageHead from "../components/UI/PageHead"
import PublicLayout from "../layouts/Public"
import Banner from "../components/Home/Banner"
import HowItWorks from "../components/Home/HowItWorks"
import Supplier from "../components/Home/Supplier"
import Driver from "../components/Home/Driver"
import WhyGav from "../components/Home/WhyGav"
import Faq from "../components/Home/Faq"
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'


const Home = () => {
  //const [session, loading] = useSession()
  //console.log("session = ", session)
  
  return (
    <>
      <PageHead title="Gav" />
      <PublicLayout>
        <Banner />
        <HowItWorks />
        <Supplier />
        <Driver />
        <WhyGav />
        <Faq />
      </PublicLayout>
    </>
  )
}

export default Home
// export async function getServerSideProps({ req, res }) {
//   const session = await getSession({req})
//   //console.log(session)
//  // console.log(req)
//   if (!session && req) {
//     res.statusCode = 302
//     res.setHeader('Location', `/login`)
//     res.end()
//   }
//   //res.statusCode = 302
//   //res.setHeader('Location', `/`) // Replace <link> with your url link
//   return { props: {} }
// }
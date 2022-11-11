import { useRouter } from 'next/router'

import '../styles/global.css'

import ProfileContext from '../utils/context/ProfileContext'
import useProfile from '../utils/hooks/useProfile'
import ProtectedRoutes from '../utils/constants/rutas/protectedRoutes'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  return (
    <ProfileContext.Provider value={useProfile()}>
      <Component {...pageProps} />
    </ProfileContext.Provider>
  )
}
export default MyApp
    // <ProfileContext.Provider value={useProfile()}>
    //   <ProtectedRoutes router={router}>
    //     <Component {...pageProps} />
    //   </ProtectedRoutes>
    // </ProfileContext.Provider>
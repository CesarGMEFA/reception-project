import '../styles/global.css'

import ProfileContext from '../utils/context/ProfileContext'
import useProfile from '../utils/hooks/useProfile'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ProfileContext.Provider value={useProfile()}>
      <Component {...pageProps} />
    </ProfileContext.Provider>
  )
}
export default MyApp
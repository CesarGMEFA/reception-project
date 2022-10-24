import { useContext } from 'react'

import { appRoute } from '..'

import ProfileContext from '../../context/ProfileContext';

import { supabase } from '../../supabaseClient'

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes = ({router, children}) => {
  const {profile} = useContext(ProfileContext)
  const session = supabase.auth.session()
  
  let unprotectedRoutes = [
    appRoute.INDEX,
    appRoute.CLIENTE,
    appRoute.RECEPCION,
    appRoute.AGREGAR,
    appRoute.ANALISIS
  ];
  
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  
  if (isBrowser() && !session && !pathIsProtected) {
    router.push("/login")
  } else if (isBrowser() && session && router.pathname === "/login") {
    router.back()
  } else if (isBrowser() && session && profile[0].role === "asistente" && router.pathname === appRoute.AGREGAR) {
     router.back()
  }
  
  return children
};

export default ProtectedRoutes
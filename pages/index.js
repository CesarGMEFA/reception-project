import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Layout from "../layout/Layout"

import List from "../components/List"
import Empty from "../components/Empty"

import { supabase } from "../utils/supabaseClient"

const Index = ({ allData }) => {
  const router = useRouter()
  const [session, setSession] = useState(null)

  // useEffect(() => {
  //   (async() => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession()
  //     setSession(session)
  //   })();
  //   if(!!session) {
  //     router.push("/login")      
  //     return
  //   }
  // }, [])


  return (
		<Layout>
			{allData.length ? <List allData={allData} /> : <Empty />}
		</Layout>
  );
}

export default Index

export const getServerSideProps = async (ctx) => {
  const s = createServerSupabaseClient(ctx)
  
  const {
    data: { session }
  } = await s.auth.getSession()

  console.log('index => ', session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }


  let { data: receptions, error } = await supabase
        .from('receptions')
        .select('*')
        .order('id', { ascending: false })
  if (error) throw error
  return {
    props: {
      allData: receptions
    },
  };
}
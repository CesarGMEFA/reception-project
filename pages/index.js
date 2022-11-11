import { useState, useEffect } from "react"

import Layout from "../layout/Layout"

import List from "../components/List"
import Empty from "../components/Empty"

import { supabase } from "../utils/supabaseClient"

const Index = ({ allData }) => {

  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())
  }, [])

  return (
		<Layout>
			{allData.length ? <List allData={allData} /> : <Empty />}
		</Layout>
  );
}

export default Index

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
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
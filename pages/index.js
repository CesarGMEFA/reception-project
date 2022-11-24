import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { useEffect, useContext } from "react"

import Layout from "../layout/Layout"

import List from "../components/List"
import Empty from "../components/Empty"

import ProfileContext from "../utils/context/ProfileContext"

const Index = ({ allData, profile: p }) => {
  const { setProfile } = useContext(ProfileContext)

  useEffect(() => {
    setProfile(p)
  }, [])

  return (
		<Layout>
			{allData.length ? <List allData={allData} /> : <Empty />}
		</Layout>
  );
}

export default Index

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  
  const {
    data: { session }
  } = await supabase.auth.getSession()

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

  let { data: profile, error: e } = await supabase
	  .from('profiles')
	  .select('*')
	  .eq('userId', session.user.id)
  if (e) throw e;

  return {
    props: {
      allData: receptions,
      profile
    },
  };
}
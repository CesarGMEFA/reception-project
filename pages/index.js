import Layout from "../layout/Layout"

import List from "../components/List"
import Empty from "../components/Empty"
import Auth from "../components/Auth"

import { supabase } from "../utils/supabaseClient"

const Index = ({ allData }) => {
  return (
    <Layout>
      {/* <Empty /> */}
      <List allData={allData}/>
    </Layout>
   )
}

export default Index

export async function getServerSideProps() {
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

  // const [isLoading, setIsLoading] = useState(true)
  // const [session, setSession] = useState(null)

  // useEffect(() => {
  //   setSession(supabase.auth.session())

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [])

  // return (
  //   <React.Fragment>
  //     {!session ? (
  //       <Auth />
  //     ) : (
  //       <Home />
  //     )}
  //   </React.Fragment>
  //   <Home />
  //  )
import React from 'react'

import Layout from '../layout/Layout'

import Empty from '../components/Empty'
import List from '../components/List'

const Home = () => {

  // useEffect(() => {
  //   try {
  //     const user = supabase.auth.user()
  //     console.log('user', user)
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }, [])

  return (
    <Layout>
      {/* <Empty /> */}
      <List />
    </Layout>
  )
}

export default Home
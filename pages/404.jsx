import Link from "next/link";

import Layout from "../layout/Layout"

export default function error404(){
  return (
    <Layout>
      <p>Error 404. Esta pagina no se ha encontrado.
        {' '}
        Regrese al {' '}
        <Link href="/">
          <a>incio.</a>
        </Link>
      </p>
      <style jsx>{`
        p {
          display: block;
        }
        a {
          color: blue;
          text-decoration: underline;
        }
        a:hover {
          color: purple;
        }
      `}</style>
    </Layout>
  )
}
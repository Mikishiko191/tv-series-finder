import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import '../styles/globals.css'

import Container from '@mui/material/Container'

// Components
import { Navigation } from '../components/Navigation/Navigation'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Navigation />
      <SWRConfig value={{ provider: () => new Map() }}>
        <Container maxWidth="lg" style={{ marginBottom: 50, marginTop: 64 }}>
          <Component {...pageProps} />
        </Container>
      </SWRConfig>
    </>
  )
}

export default App

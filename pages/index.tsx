import Head from 'next/head'
import { useContext } from 'react'

import { HandsContext } from '../context/hands'
import initialize from '../modules/mediapipe'
import { HandsContextType } from '../types'

export default function Home() {
  const handsContext = useContext(HandsContext) as HandsContextType
  const hands = initialize(handsContext)

  return (
    <div>
      <Head>
        <title>Theremin</title>
        <meta name="description" content="A virtual instrument." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="">
        <div id="container" className="container">
          <video className="input_video" hidden></video>
        </div>
      </main>
    </div>
  )
}

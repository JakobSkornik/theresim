import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <title>Theremin</title>
        <meta name="description" content="A virtual instrument." />
        <link rel="icon" href="/favicon.ico" />
        <link
        href="https://fonts.googleapis.com/css?family=Press+Start+2P"
        rel="stylesheet"
        />
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
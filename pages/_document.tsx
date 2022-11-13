import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <title>Theresim</title>
      <meta name="description" content="A virtual instrument." />
      <link rel="icon" href="/favicon.svg" />
      <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

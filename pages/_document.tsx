import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <title>Theresim</title>
      <meta name="description" content="A virtual instrument." />
      <link rel="icon" href="/favicon.svg" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

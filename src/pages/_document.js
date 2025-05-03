import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/img/icon.png" sizes="200x200" />
        </Head>
        <body>
          <Main />
          <NextScript /> 
        </body>
      </Html>
    );
  }
}

export default MyDocument;

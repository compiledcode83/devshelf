import Document, { Main, Head, Html, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }
  render() {
    return (
      <Html
        lang="pl-PL"
        prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#"
        itemScope
        itemType="http://schema.org/WebPage"
      >
        <Head>
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
            as="stylesheet"
          />
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

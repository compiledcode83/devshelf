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
            href="/fonts/GalanoClassicAltMedium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/GalanoClassicAltRegular.woff2"
            type="font/woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/GalanoClassicAltSemiBold.woff2"
            type="font/woff2"
            as="font"
            crossOrigin=""
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

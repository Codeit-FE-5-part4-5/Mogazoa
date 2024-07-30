import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="sideBar" />
        <div id="floating" />
      </body>
    </Html>
  );
};

export default Document;

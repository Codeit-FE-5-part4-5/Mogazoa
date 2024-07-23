import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="sideBar"></div>
        <div id="floating"></div>
      </body>
    </Html>
  );
}

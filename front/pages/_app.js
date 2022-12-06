import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import WidthProvider from "../components/WidthProvider";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ACCEPT_LOG_CREATE_REQUEST } from "../reducers/accept";
import wrapper from "../store/configureStore";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const Fourleaf = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const getIpClient = useCallback(async () => {
    const isCheck = sessionStorage.getItem("QSIDSPDSDQDAQSTEFA");

    if (!isCheck && router.pathname.indexOf("admin") === -1) {
      try {
        const ipData = await fetch("https://geolocation-db.com/json/");
        const locationIp = await ipData.json();

        sessionStorage.setItem(
          "QSIDSPDSDQDAQSTEFA",
          "ISDGSAWDCASDHERGEKIJCSDMK"
        );

        dispatch({
          type: ACCEPT_LOG_CREATE_REQUEST,
          data: {
            ip: locationIp.IPv4,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    getIpClient();
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Head>
          <title>기관형 과학기술인 협동조합 교류회 | administrator</title>

          <meta name="author" content="4LEAF SOFTWARE <4leaf.ysh@gmail.com>" />
          {/* <!-- OG tag  --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.sample.com/" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image" content="./og_img.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.sample.com" />

          <meta
            name="keywords"
            content="과학기술 협동조합, 기관형 과학기술인 협동조합, 기술 사업화, 협동조합 성장 지원, 협동조합 지원 사업, 과학기술 비즈니스, 과학기술 비즈니스 모델링, 지속가능한 과학기술 발전, 지속가능한 과학기술 비즈니스, 과학기술 마케팅, 기술 투자 유치, 과학기술 매칭 서비스, 과학기술 공동 비즈니스, 과학기술 협업, 과학기술 협동조합 운영 지원"
          />
          <meta
            property="og:keywords"
            content="과학기술 협동조합, 기관형 과학기술인 협동조합, 기술 사업화, 협동조합 성장 지원, 협동조합 지원 사업, 과학기술 비즈니스, 과학기술 비즈니스 모델링, 지속가능한 과학기술 발전, 지속가능한 과학기술 비즈니스, 과학기술 마케팅, 기술 투자 유치, 과학기술 매칭 서비스, 과학기술 공동 비즈니스, 과학기술 협업, 과학기술 협동조합 운영 지원"
          />

          <meta
            name="description"
            content={
              "기관형 과학기술인 협동조합 교류회(Institutional Cooperative Association of Scientists and Technologists)란 법인 조합원이 최소 5개 이상 또는 50% 이상인 과학기술인 협동조합들간의 교류회입니다."
            }
          />
          <meta
            property="og:description"
            content={
              "기관형 과학기술인 협동조합 교류회(Institutional Cooperative Association of Scientists and Technologists)란 법인 조합원이 최소 5개 이상 또는 50% 이상인 과학기술인 협동조합들간의 교류회입니다."
            }
          />

          {/* 프리텐다드 폰트 */}
          <link
            href="https://webfontworld.github.io/pretendard/Pretendard.css"
            rel="stylesheet"
          />

          {/* 나눔스퀘어 네오 폰트 */}
          <link
            href="https://fonts.cdnfonts.com/css/nanumsquare-neo"
            rel="stylesheet"
          />

          {/* 구글 로그인 */}
          <meta
            name="google-signin-client_id"
            content="1092536473300-8sdb19s6g973htdhpkdgotpr156n8qv2.apps.googleusercontent.com"
          ></meta>

          {/* <script
          src="https://apis.google.com/js/platform.js?onload=init"
          async
          defer
        ></script> */}
          <script
            src="https://apis.google.com/js/platform.js"
            async
            defer
          ></script>

          {/* 카카오 */}
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
            Kakao.init('1681af47f9121c2e20b64480bbc3e631');
            `,
            }}
          />
        </Head>

        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  Text,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled, { ThemeContext } from "styled-components";
import Head from "next/head";

import { useState } from "react";
import { useCallback } from "react";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";

const Greetings = ({}) => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ICAST | 인사말</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`calc(100vh - 137px)`} ju={`flex-start`}>
          <LeftMenu />

          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <Wrapper
              ju={`flex-start`}
              al={`flex-start`}
              margin={width < 900 ? `50px 0 100px` : `100px 0 100px`}
            >
              <Text
                fontSize={`32px`}
                fontWeight={`600`}
                margin={width < 900 ? `0 0 15px` : `0 0 36px`}
              >
                인사말
              </Text>
              <Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={`0 0 30px`}
                  al={width < 700 ? `flex-start` : `center`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png"
                    alt="icon"
                    width={`14px`}
                    margin={width < 700 ? `6px 10px 0 0` : `0 10px 0 0`}
                  />
                  <Wrapper
                    width={`calc(100% - 14px - 10px)`}
                    al={`flex-start`}
                    fontSize={width < 700 ? `18px` : `20px`}
                    fontWeight={`600`}
                  >
                    기관형 과학기술인 협동조합 교류회장 인사말
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  margin={`0 0 25px`}
                  fontSize={width < 700 ? `14px` : `18px`}
                  al={`flex-start`}
                >
                  4차 산업시대의 심화와 더불어 미중 갈등이 고조되고 있는 요즘,
                  과학기술의 중요성이 어느 때보다 부각되고 있습니다. 과학기술을
                  통한 국가 및 지역, 사회, 기업의 산업경쟁력을 강화하기 위해
                  과학기술정보통신부는 2019년부터 대학, 중소기업 등 지역
                  과학기술 혁신 주체가 중심이 되는 기관형 과학기술인협동조합을
                  육성 지원해왔습니다.
                </Wrapper>

                <Wrapper
                  margin={`0 0 25px`}
                  fontSize={width < 700 ? `14px` : `18px`}
                  al={`flex-start`}
                >
                  2022년 기관형 과학기술인협동조합 성장지원사업의 사업목적에
                  따라 기관형 과학기술인협동조합교류회를 공식 출범하게
                  되었습니다. 기관형 과학기술인 협동조합 간 정보 및 상호 교류와
                  공동프로젝트, 공동 비즈니스를 통한 공동 발전 및 국가, 지역,
                  사회 경제 발전에 기여할 수 있는 교류회가 되길 바랍니다.
                </Wrapper>

                <Wrapper
                  margin={`0 0 25px`}
                  fontSize={width < 700 ? `14px` : `18px`}
                  al={`flex-start`}
                >
                  과학기술인협동조합간의 상호협력과 공동 발전 모색을 위해 출범한
                  기관형 과학기술인 협동조합 교류회에 여러분의 적극적인 참여와
                  기여 부탁드립니다.
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-end`}
                  al={`flex-end`}
                  margin={`40px 0 0`}
                >
                  <Text fontSize={width < 700 ? `16px` : `20px`}>
                    기관형과학기술인 협동조합 교류회장
                  </Text>
                  {/* <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/about-page/img_sign.png"
                    alt="signImg"
                    width={`auto`}
                  /> */}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Greetings;

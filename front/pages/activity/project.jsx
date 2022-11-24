import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  CustomPage,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";

const Project = () => {
  ////// GLOBAL STATE //////
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>iCAST | 공동 프로젝트</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />
              <Wrapper
                wrap={`nowrap`}
                dr={`row`}
                ju={`flex-start`}
                fontSize={width < 900 ? `18px` : `20px`}
                fontWeight={`700`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png`}
                  width={`14px`}
                  margin={`0 6px 0 0`}
                />
                기관형 과학기술인 협동조합 교류회 공동 프로젝트
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                al={`flex-start`}
                margin={`34px 0 170px`}
              >
                <Wrapper
                  width={width < 900 ? `100%` : `calc(100% / 3.1)`}
                  margin={width < 900 && `0 0 20px`}
                  al={`flex-start`}
                >
                  <Image
                    alt="thumnail"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/activity-img/project1.png`}
                  />
                  <Text
                    fontSize={`20px`}
                    fontWeight={`bold`}
                    margin={`25px 0 10px`}
                    isNeo
                  >
                    1. 인공지능학습데이터구축사업
                  </Text>
                  <Text fontSize={width < 900 ? `14px` : `16px`}>
                    과학기술 분야별 인공지능 기술을 확용한 학습데이터 구축사업,
                    각 조합의 전문분야를 인공지능 기술로 구현할 학습데이터 구축
                    향후 시스템화
                  </Text>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `calc(100% / 3.1)`}
                  margin={width < 900 && `0 0 20px`}
                  al={`flex-start`}
                >
                  <Image
                    alt="thumnail"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/activity-img/project2.png`}
                  />
                  <Text
                    fontSize={`20px`}
                    fontWeight={`bold`}
                    margin={`25px 0 10px`}
                    isNeo
                  >
                    2. 과학기술 혁신 사업
                  </Text>
                  <Text fontSize={width < 900 ? `14px` : `16px`}>
                    과학기술분야별 혁신 기술 동향 분석 및 협업 사업, 조합의
                    전문분야 혁신 기술 공유
                  </Text>
                  <Wrapper ju={`flex-start`} dr={`row`}>
                    <Image
                      alt="faceicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_face-book.png`}
                      width={`28px`}
                      margin={`0 8px 0 0`}
                    />
                    <Image
                      alt="youtubeicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_youtube.png`}
                      width={`28px`}
                      margin={`0 8px 0 0`}
                    />
                    <Image
                      alt="instaicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_insta.png`}
                      width={`28px`}
                      margin={`0 8px 0 0`}
                    />
                    <Image
                      alt="blogicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_blog.png`}
                      width={`28px`}
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `calc(100% / 3.1)`}
                  al={`flex-start`}
                >
                  <Image
                    alt="thumnail"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/activity-img/project3.png`}
                  />
                  <Text
                    fontSize={`20px`}
                    fontWeight={`bold`}
                    margin={`25px 0 10px`}
                    isNeo
                  >
                    3. 미래과학기술 선도 사업
                  </Text>
                  <Text fontSize={width < 900 ? `14px` : `16px`}>
                    과학기술분야별 미래선도 기술 및 전망 제시, 각 조합의
                    전문분야 기술의 미래 전망 제시
                  </Text>
                  <Wrapper ju={`flex-start`} dr={`row`}>
                    <Image
                      alt="faceicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_face-book.png`}
                      width={`28px`}
                      margin={`0 8px 0 0`}
                    />
                    <Image
                      alt="youtubeicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_youtube.png`}
                      width={`28px`}
                      margin={`0 8px 0 0`}
                    />
                    <Image
                      alt="instaicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_insta.png`}
                      width={`28px`}
                      margin={`0 8px 0 0`}
                    />
                    <Image
                      alt="blogicon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_blog.png`}
                      width={`28px`}
                    />
                  </Wrapper>
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

export default Project;

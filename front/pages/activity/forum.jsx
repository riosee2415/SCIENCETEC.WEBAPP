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

const Box = styled(Wrapper)`
  width: calc(100% / 4 - 14px);
  margin: 0 18px 60px 0;
  align-items: flex-start;

  &:nth-child(4n) {
    margin: 0 0 60px 0;
  }

  @media (max-width: 1280px) {
    width: calc(100% / 3 - 12px);

    &:nth-child(4n) {
      margin: 0 18px 60px 0;
    }

    &:nth-child(3n) {
      margin: 0 0 60px 0;
    }
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - 5px);
    margin: 0 10px 60px 0;

    &:nth-child(4n) {
      margin: 0 10px 60px 0;
    }

    &:nth-child(3n) {
      margin: 0 10px 60px 0;
    }

    &:nth-child(2n) {
      margin: 0 0 60px 0;
    }
  }
`;

const Forum = () => {
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
        <title>iCAST</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />
              <Wrapper
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
                기관형 과학기술인 협동조합 iCAST Forum
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `14px` : `16px`}
                margin={`16px 0 36px`}
              >
                과학기술 트렌드, 이슈, 이해당사자들간의 연결의 장 iCAST Forum을
                소개합니다.
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                <Box>
                  <Image
                    alt="thumnail"
                    margin={`0 0 10px`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/activity-img/project1.png`}
                  />
                  <Text fontSize={width < 900 ? `14px` : `16px`}>
                    탄소중립으로 가는 길 : 원자력으로 할 수 있는 것들,
                    탄소중립으로 가는 길 : 원자력으...
                  </Text>
                </Box>
              </Wrapper>

              <CustomPage />
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

export default Forum;

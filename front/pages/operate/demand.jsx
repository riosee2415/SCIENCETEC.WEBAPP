import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  Image,
  RsWrapper,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { RightCircleOutlined } from "@ant-design/icons";

const Btn = styled(Wrapper)`
  width: 335px;
  height: 180px;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid ${Theme.basicTheme_C};
  background: ${(props) =>
    props.isActive ? props.theme.basicTheme_C : props.theme.white_C};
  color: ${(props) =>
    props.isActive ? props.theme.white_C : props.theme.basicTheme_C};

  &:hover {
    cursor: pointer;
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Demand = () => {
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
        <title>iCAST | 수요조사</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`calc(100vh - 137px)`}>
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
                기관형 과학기술인 커뮤니티 조사
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 100px`}>
                <Btn margin={width < 800 ? `0 0 20px` : `0 20px 0 0`}>
                  사업수행 현황조사 참여하기&nbsp;
                  <RightCircleOutlined />
                </Btn>
                <Btn>
                  사업 수요조사 참여하기&nbsp;
                  <RightCircleOutlined />
                </Btn>
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

export default Demand;

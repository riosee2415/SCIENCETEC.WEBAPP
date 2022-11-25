import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  CommonButton,
  CustomSelect,
  Image,
  RsWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { Select } from "antd";
import OpBoard from "../../components/OpBoard";
import OpWrite from "../../components/OpWrite";

const Notice = () => {
  ////// GLOBAL STATE //////
  const { viewType, tempType } = useSelector((state) => state.notice);
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
        <title>iCAST | 공지사항</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />

              {viewType === "list" && (
                <>
                  <Wrapper
                    wrap={`nowrap`}
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={width < 900 ? `17px` : `20px`}
                    fontWeight={`700`}
                  >
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png`}
                      width={`14px`}
                      margin={`0 6px 0 0`}
                    />
                    기관형 과학기술인 협동조합 공지사항
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 20px`}>
                    <CustomSelect width={`90px`}>
                      <Select placeholder="전체">
                        <Select.Option>전체</Select.Option>
                        <Select.Option></Select.Option>
                      </Select>
                    </CustomSelect>
                    <TextInput
                      type="text"
                      placeholder="검색어를 입력해주세요."
                      width={width < 900 ? `150px` : `230px`}
                      height={`40px`}
                      margin={`0 10px`}
                    />
                    <CommonButton
                      width={`90px`}
                      height={`40px`}
                      fontSize={`16px`}
                    >
                      검색하기
                    </CommonButton>
                  </Wrapper>
                  <OpBoard boardType="공지사항" />
                </>
              )}
              {viewType === "write" && <OpWrite />}
              {viewType === "detail" && null}
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

export default Notice;

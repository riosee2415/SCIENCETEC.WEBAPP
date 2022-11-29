import React, { useCallback } from "react";
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
import { SHARE_PROJECT_REQUEST } from "../../reducers/shareProject";

const Association = () => {
  ////// GLOBAL STATE //////
  const { shareProjects } = useSelector((state) => state.shareProject);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>iCAST | 회원조합소개</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `16px` : `18px`}
                margin={`0 0 50px`}
              >
                • 기관형 과학기술인 협동조합 교류회 회원 협동조합과 기업들을
                소개합니다.
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                al={`flex-start`}
                margin={`0 0 160px`}
              >
                <Wrapper width={width < 1000 ? `100%` : `49%`}>
                  <Wrapper
                    wrap={`nowrap`}
                    borderBottom={`2px solid ${Theme.basicTheme_C}`}
                    padding={`0 0 20px`}
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
                    기술융합협동조합
                  </Wrapper>
                  <Image
                    alt="image"
                    src={
                      shareProjects &&
                      shareProjects[0] &&
                      shareProjects[0].imagePath
                    }
                    onClick={() =>
                      moveLinkHandler(
                        shareProjects &&
                          shareProjects[0] &&
                          shareProjects[0].link
                      )
                    }
                    cursor={`pointer`}
                  />
                  <Wrapper
                    dr={`row`}
                    height={`55px`}
                    fontSize={`16px`}
                    borderTop={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      대표자명
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[0] &&
                        shareProjects[0].repreName}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      설립연도
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[0] &&
                        shareProjects[0].viewEstimateDate}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      직원수
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[0] &&
                        shareProjects[0].viewEmpCnt}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      업종
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[0] &&
                        shareProjects[0].jobType}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    height={`75px`}
                    fontSize={`16px`}
                    borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      주업무
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                      fontSize={`14px`}
                    >
                      {shareProjects &&
                        shareProjects[0] &&
                        shareProjects[0].importantWork}
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  width={width < 1000 ? `100%` : `49%`}
                  margin={width < 1000 ? `30px 0 0` : `0`}
                >
                  <Wrapper
                    wrap={`nowrap`}
                    borderBottom={`2px solid ${Theme.basicTheme_C}`}
                    padding={`0 0 20px`}
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
                    회원법인조합
                  </Wrapper>
                  <Image
                    alt="image"
                    onClick={() =>
                      moveLinkHandler(
                        shareProjects &&
                          shareProjects[1] &&
                          shareProjects[1].link
                      )
                    }
                    src={
                      shareProjects &&
                      shareProjects[1] &&
                      shareProjects[1].imagePath
                    }
                    cursor={`pointer`}
                  />
                  <Wrapper
                    dr={`row`}
                    height={`55px`}
                    fontSize={`16px`}
                    borderTop={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      대표자명
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[1] &&
                        shareProjects[1].repreName}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      설립연도
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[1] &&
                        shareProjects[1].viewEstimateDate}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      직원수
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[1] &&
                        shareProjects[1].viewEmpCnt}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      업종
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                    >
                      {shareProjects &&
                        shareProjects[1] &&
                        shareProjects[1].jobType}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    height={`75px`}
                    fontSize={`16px`}
                    borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      fontWeight={`bold`}
                      color={Theme.grey2_C}
                      width={width < 900 ? `100px` : `180px`}
                    >
                      주업무
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 100px)`
                          : `calc(100% - 180px)`
                      }
                      al={`flex-start`}
                      fontSize={`14px`}
                    >
                      {shareProjects &&
                        shareProjects[1] &&
                        shareProjects[1].importantWork}
                    </Wrapper>
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

    context.store.dispatch({
      type: SHARE_PROJECT_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Association;

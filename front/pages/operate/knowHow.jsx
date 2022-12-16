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
import Theme from "../../components/Theme";
import { DownloadOutlined, LinkOutlined } from "@ant-design/icons";

const Perform = () => {
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
        <title>iCAST | 운영 노하우</title>
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
                기관형 과학기술인 협동조합 성장지원 사업 수행 안내
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 50px`}
                fontSize={width < 900 ? `16px` : `18px`}
              >
                • 조합 비즈니스 모델 정하기
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Image
                  alt="그래프"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/operate-page/img_know-how1.png`}
                  width={
                    width < 1280 ? (width < 800 ? `100%` : `38%`) : `385px`
                  }
                />
                <Image
                  margin={width < 800 ? `30px 0 0` : `0`}
                  alt="그래프"
                  src={
                    width < 800
                      ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/operate-page/img_know-how2_m.png`
                      : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/operate-page/img_know-how2.png`
                  }
                  width={
                    width < 1280 ? (width < 800 ? `100%` : `60%`) : `541px`
                  }
                />
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`100px 0 14px`}
                fontSize={width < 900 ? `16px` : `18px`}
              >
                • 우수 조합 사례
                <a
                  href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/%E1%84%8E%E1%85%A1%E1%86%B7%E1%84%80%E1%85%A9)%2B%E1%84%80%E1%85%AA%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%B5%E1%84%89%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B5%E1%86%AB%2B%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%2B%E1%84%8B%E1%85%AE%E1%84%89%E1%85%AE%E1%84%89%E1%85%A1%E1%84%85%E1%85%A8%E1%84%8C%E1%85%B5%E1%86%B8_.pdf`}
                  download
                >
                  <CommonButton
                    width={`82px`}
                    height={`20px`}
                    padding={`0`}
                    kindOf={`grey2`}
                    margin={`0 0 0 10px`}
                  >
                    다운로드 <DownloadOutlined />
                  </CommonButton>
                </a>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`0 0 12px`}
                fontSize={width < 900 ? `16px` : `18px`}
              >
                • 조합 운영 Tip
              </Wrapper>
              <Wrapper
                radius={`5px`}
                bgColor={Theme.lightGrey_C}
                padding={`20px`}
                margin={`0 0 160px`}
                fontSize={`18px`}
                al={`flexs-tart`}
              >
                <a href={`https://sites.google.com/new`} target={`_blank`}>
                  <Text isHover margin={`0 0 12px`}>
                    홈페이지 <LinkOutlined />
                  </Text>
                </a>
                <a
                  href={`http://www.djse.org/app/board/view?md_id=board001&bc_code=13&code=904&page=1`}
                  target={`_blank`}
                >
                  <Text isHover margin={`0 0 12px`}>
                    기장 및 회계 <LinkOutlined />
                  </Text>
                </a>
                <a href={`https://posep.org/`} target={`_blank`}>
                  <Text isHover margin={`0 0 12px`}>
                    비즈니스 <LinkOutlined />
                  </Text>
                </a>
                <a
                  href={`https://www.bizinfo.go.kr/web/index.do`}
                  target={`_blank`}
                >
                  <Text isHover margin={`0 0 12px`}>
                    마케팅 <LinkOutlined />
                  </Text>
                </a>
                <a href={`https://bluepoint.ac/`} target={`_blank`}>
                  <Text isHover>
                    투자 <LinkOutlined />
                  </Text>
                </a>
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

export default Perform;

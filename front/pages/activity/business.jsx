import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import SubBanner from "../../components/SubBanner";

const Business = () => {
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
        <title>iCAST | 공동 비지니스</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <SubBanner />
          <RsWrapper
            dr={`row`}
            al={`flex-start`}
            position={`relative`}
            margin={width < 900 ? `50px 0 0` : `100px 0 0`}
          >
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`32px`}
                fontWeight={`600`}
                margin={width < 900 ? `0 0 15px` : `0 0 36px`}
              >
                공동 비즈니스
              </Text>
            </Wrapper>
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
              기관형 과학기술인 협동조합 교류회 공동 비즈니스
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
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/activity-img/business1.png`}
                />
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  margin={`25px 0 10px`}
                  isNeo
                >
                  1. 과학기술교육훈련 사업
                </Text>
                <Text fontSize={width < 900 ? `14px` : `16px`}>
                  과학기술분야별 교육 및 훈련 프로그램을 공동 개발 운영
                </Text>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `calc(100% / 3.1)`}
                margin={width < 900 && `0 0 20px`}
                al={`flex-start`}
              >
                <Image
                  alt="thumnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/activity-img/business2.png`}
                />
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  margin={`25px 0 10px`}
                  isNeo
                >
                  2. 공동 구매사업
                </Text>
                <Text fontSize={width < 900 ? `14px` : `16px`}>
                  조합들이 필요하는 물품, 장비의 공동 구매 추진
                </Text>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `calc(100% / 3.1)`}
                al={`flex-start`}
              >
                <Image
                  alt="thumnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/activity-img/business3.png`}
                />
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  margin={`25px 0 10px`}
                  isNeo
                >
                  3. 공동 판매사업
                </Text>
                <Text fontSize={width < 900 ? `14px` : `16px`}>
                  조합들의 개발성과물의 공동판매, 마케팅 (smart store 연계)
                </Text>
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

export default Business;

import React from "react";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  SpanText,
  Text,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import Head from "next/head";
import LeftMenu from "../../components/LeftMenu";
import SubBanner from "../../components/SubBanner";

const Index = ({}) => {
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
        <title>ICAST | 설립안내</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <SubBanner />

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
                설립절차
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
                    기관형 과학기술인 협동조합 설립절차
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 25px`}>
                  <Image
                    width={`8px`}
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle-small.png"
                  />
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    기관형 과학기술인 협동조합이란?
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 25px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    과학기술관련 서비스를 위해 5인 이상의 발기인(조합원, 이공계
                    과학기술인 법인조합원 5인 혹은 50% 이상)이 모여 부처의
                    장에게 인가 및 설립등기를 거쳐 설립한 협동조합을 말합니다.
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 25px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    <Text>
                      기관형 과학기술인 협동조합&nbsp;
                      <SpanText color={Theme.basicTheme_C} fontWeight={`700`}>
                        설립 절차도
                      </SpanText>
                    </Text>
                  </Wrapper>
                </Wrapper>

                <Wrapper al={`flex-start`}>
                  <Image
                    src={
                      width < 700
                        ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/img_process_m.png"
                        : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/img_process.png"
                    }
                    alt="img"
                    width={width < 700 ? `100%` : `auto`}
                  />
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
export default Index;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  ColWrapper,
  RowWrapper,
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  SpanText,
  Text,
  CommonButton,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled, { ThemeContext } from "styled-components";
import Head from "next/head";
import Popup from "../components/popup/popup";
import Mainslider from "../components/slide/MainSlider";
import ToastEditorComponent from "../components/editor/ToastEditorComponent";
import CC01 from "../components/common/CC01";

const Home = ({}) => {
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
        <title>ICAST</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper bgColor={Theme.lightGrey_C} padding={`50px 0`}>
            <RsWrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 100px`}>
                <Wrapper
                  width={width < 700 ? `100%` : `49%`}
                  radius={`20px`}
                  overflow={`hidden`}
                >
                  <Mainslider />
                </Wrapper>

                <Wrapper
                  width={width < 700 ? `100%` : `49%`}
                  margin={width < 700 ? `20px 0 0` : `0`}
                  height={width < 700 ? `350px` : `440px`}
                  bgColor={Theme.white_C}
                  radius={`20px`}
                ></Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 25px`}>
                <Text fontSize={`24px`} isNeo={true} color={Theme.subTheme_C}>
                  <SpanText color={Theme.basicTheme_C}>공지</SpanText>
                  사항
                </Text>

                <Text fontSize={`16px`} margin={`0 0 0 20px`}>
                  기관형 과학기술인 협동조합 교류화의 소식
                </Text>
              </Wrapper>
            </RsWrapper>
          </Wrapper>

          <RsWrapper>
            <Wrapper
              padding={`40px`}
              border={`6px solid ${Theme.subTheme2_C}`}
              radius={`10px`}
              dr={`row`}
              margin={`0 0 100px`}
            >
              <Wrapper
                width={width < 1280 ? `100%` : `calc(100% - 450px)`}
                padding={width < 1280 ? `0 0 30px` : `0 50px 0 0`}
              >
                <Wrapper
                  dr={`row`}
                  ju={width < 700 ? `space-around` : `flex-start`}
                  margin={`0 0 30px`}
                >
                  <CommonButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      전체
                    </Text>
                  </CommonButton>
                  <CommonButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      공지사항
                    </Text>
                  </CommonButton>
                  <CommonButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      열린알림방
                    </Text>
                  </CommonButton>
                  <CommonButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      자료실
                    </Text>
                  </CommonButton>
                  <CommonButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      FAQ
                    </Text>
                  </CommonButton>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  height={`60px`}
                  borderBottom={`1px dashed ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    width={width < 700 ? `25%` : `10%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                    fontWeight={`700`}
                    color={Theme.subTheme_C}
                  >
                    공지사항
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    width={`75%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                  >
                    지
                  </Wrapper>
                  <Wrapper
                    display={width < 700 ? `none` : `flex`}
                    al={`flex-end`}
                    width={`15%`}
                    fontSize={`16px`}
                    color={Theme.grey_C}
                  >
                    2022.12.12
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  height={`60px`}
                  borderBottom={`1px dashed ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    width={width < 700 ? `25%` : `10%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                    fontWeight={`700`}
                    color={Theme.subTheme_C}
                  >
                    공지사항
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    width={`75%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                  >
                    지
                  </Wrapper>
                  <Wrapper
                    display={width < 700 ? `none` : `flex`}
                    al={`flex-end`}
                    width={`15%`}
                    fontSize={`16px`}
                    color={Theme.grey_C}
                  >
                    2022.12.12
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  height={`60px`}
                  borderBottom={`1px dashed ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    width={width < 700 ? `25%` : `10%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                    fontWeight={`700`}
                    color={Theme.subTheme_C}
                  >
                    공지사항
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    width={`75%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                  >
                    지
                  </Wrapper>
                  <Wrapper
                    display={width < 700 ? `none` : `flex`}
                    al={`flex-end`}
                    width={`15%`}
                    fontSize={`16px`}
                    color={Theme.grey_C}
                  >
                    2022.12.12
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  height={`60px`}
                  borderBottom={`1px dashed ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    width={width < 700 ? `25%` : `10%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                    fontWeight={`700`}
                    color={Theme.subTheme_C}
                  >
                    공지사항
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    width={`75%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                  >
                    지
                  </Wrapper>
                  <Wrapper
                    display={width < 700 ? `none` : `flex`}
                    al={`flex-end`}
                    width={`15%`}
                    fontSize={`16px`}
                    color={Theme.grey_C}
                  >
                    2022.12.12
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  height={`60px`}
                  borderBottom={`1px dashed ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    width={width < 700 ? `25%` : `10%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                    fontWeight={`700`}
                    color={Theme.subTheme_C}
                  >
                    공지사항
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    width={`75%`}
                    fontSize={width < 700 ? `13px` : `16px`}
                  >
                    지
                  </Wrapper>
                  <Wrapper
                    display={width < 700 ? `none` : `flex`}
                    al={`flex-end`}
                    width={`15%`}
                    fontSize={`16px`}
                    color={Theme.grey_C}
                  >
                    2022.12.12
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Image
                src=""
                alt="img"
                height={`380px`}
                width={width < 1280 ? `100%` : `450px`}
                display={width < 700 ? `none` : `flex`}
              />
            </Wrapper>
          </RsWrapper>
          <Wrapper
            bgColor={Theme.lightGrey_C}
            padding={`30px 0`}
            wrap={`nowrap`}
            overflow={`auto`}
          >
            <RsWrapper>
              <Wrapper dr={`row`} ju={`space-between`} minWidth={`900px`}>
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_gover.png"
                  alt="logo"
                  width={`15%`}
                />
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_nrf.png"
                  alt="logo"
                  width={`10%`}
                />
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_coop.png"
                  alt="logo"
                  width={`10%`}
                />
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_setcoop.png"
                  alt="logo"
                  width={`18%`}
                />
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_social.png"
                  alt="logo"
                  width={`10%`}
                />
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_posep.png"
                  alt="logo"
                  width={`20%`}
                />
              </Wrapper>
            </RsWrapper>
          </Wrapper>
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
export default Home;

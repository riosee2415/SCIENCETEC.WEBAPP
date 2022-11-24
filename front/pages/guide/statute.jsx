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
  ColWrapper,
  RowWrapper,
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  SpanText,
  Text,
  CommonButton,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled, { ThemeContext } from "styled-components";
import Head from "next/head";
import Popup from "../../components/popup/popup";
import Mainslider from "../../components/slide/MainSlider";
import ToastEditorComponent from "../../components/editor/ToastEditorComponent";
import CC01 from "../../components/common/CC01";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCallback } from "react";
import { Modal } from "antd";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";

const Statute = ({}) => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const [isDown, setIsDown] = useState(false);
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  const downToggle = useCallback(() => {
    setIsDown(!isDown);
  }, [isDown]);
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ICAST | 설립안내</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />

            <Wrapper
              width={width < 1100 ? `100%` : `calc(100% - 280px)`}
              ju={`flex-start`}
              al={`flex-start`}
              margin={`0 0 100px`}
            >
              <BreadCrumb />
              <Text fontSize={`24px`} isNeo={true} margin={`25px 0`}>
                관련법령
              </Text>

              <Wrapper
                borderTop={`1px solid ${Theme.lightGrey2_C}`}
                padding={`25px 0 0`}
              >
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
                    기관형 과학기술인 협동조합 관련법령
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 15px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    협동조합 기본법
                    <Image
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/link.png"
                      alt="icon"
                      width={`15px`}
                      margin={`0 0 0 5px`}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 15px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    국가연구개발혁신법
                    <Image
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/link.png"
                      alt="icon"
                      width={`15px`}
                      margin={`0 0 0 5px`}
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
export default Statute;

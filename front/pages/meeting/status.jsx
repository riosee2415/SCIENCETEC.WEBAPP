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
  CustomSelect,
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
import { Modal, Select } from "antd";

const Status = ({}) => {
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
        <title>ICAST | 교류회</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`}>
              <Wrapper width={`240px`}></Wrapper>
              <Wrapper
                width={`calc(100% - 240px)`}
                height={`100vh`}
                ju={`flex-start`}
                padding={`0 0 0 40px`}
                al={`flex-start`}
              >
                <Text fontSize={`24px`} isNeo={true} margin={`25px 0`}>
                  현황
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
                      fontSize={`20px`}
                      fontWeight={`600`}
                    >
                      기관형 과학기술인 협동조합 교류회 현황
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomSelect>
                      <Select>
                        <Select.Option>1</Select.Option>
                        <Select.Option>1</Select.Option>
                        <Select.Option>1</Select.Option>
                      </Select>
                    </CustomSelect>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <Modal visible={isDown} footer={null} closable={false}>
            <Wrapper padding={`50px 0`}>
              <Text fontSize={`24px`} isNeo={true}>
                자료 준비 중
              </Text>

              <Text fontSize={`16px`} margin={`15px 0 0`}>
                해당 자료는 협회에서 준비 중입니다.
              </Text>
              <Text fontSize={`16px`} margin={`0 0 30px`}>
                빠른 시일내로 자료를 제공해드리도록 하겠습니다.
              </Text>

              <CommonButton
                kindOf={`subTheme`}
                width={`130px`}
                height={`45px`}
                fontSize={`18px`}
                fontWeight={`600`}
                onClick={downToggle}
              >
                확인
              </CommonButton>
            </Wrapper>
          </Modal>
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
export default Status;

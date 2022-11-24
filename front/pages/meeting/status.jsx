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
  TextInput,
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
          <RsWrapper padding={`0 0 160px`}>
            <Wrapper dr={`row`}>
              <Wrapper width={`240px`}></Wrapper>
              <Wrapper
                width={width < 700 ? `100%` : `calc(100% - 240px)`}
                ju={`flex-start`}
                padding={width < 700 ? `0` : `0 0 0 40px`}
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

                  <Wrapper
                    dr={`row`}
                    ju={width < 700 ? `space-between` : `flex-start`}
                    margin={`0 0 20px`}
                  >
                    <CustomSelect>
                      <Select defaultValue={"전체"}>
                        <Select.Option>1</Select.Option>
                        <Select.Option>1</Select.Option>
                        <Select.Option>1</Select.Option>
                      </Select>
                    </CustomSelect>

                    <TextInput
                      width={width < 700 ? `160px` : `230px`}
                      height={`40px`}
                      margin={`0 10px`}
                      placeholder="검색어를 입력해주세요."
                    />

                    <CommonButton height={`40px`} fontSize={`16px`}>
                      검색하기
                    </CommonButton>
                  </Wrapper>

                  <Wrapper overflow={`auto`} wrap={`nowrap`} al={`flex-start`}>
                    <Wrapper minWidth={`1100px`}>
                      <Wrapper
                        borderTop={`2px solid ${Theme.basicTheme_C}`}
                        dr={`row`}
                        height={`48px`}
                      >
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`5%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            번호
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`21%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            조합명
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`7%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            지역
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`7%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            설립 년도
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            법인 조합원
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            개인 조합원
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            조합유형
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            사업유형
                          </Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          bgColor={Theme.lightGrey_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          borderRight={`none`}
                          width={`12%`}
                        >
                          <Text
                            fontSize={`14px`}
                            isNeo={true}
                            fontWeight={`700`}
                          >
                            주요사업
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper dr={`row`} height={`48px`}>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`5%`}
                        >
                          <Text fontSize={`16px`}>번호</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`21%`}
                        >
                          <Text fontSize={`16px`}>조합명</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`7%`}
                        >
                          <Text fontSize={`16px`}>지역</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`7%`}
                        >
                          <Text fontSize={`16px`}>설립 년도</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text fontSize={`16px`}>법인 조합원</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text fontSize={`16px`}>개인 조합원</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text fontSize={`16px`}>조합유형</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          width={`12%`}
                        >
                          <Text fontSize={`16px`}>사업유형</Text>
                        </Wrapper>
                        <Wrapper
                          height={`100%`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          borderTop={`none`}
                          borderLeft={`none`}
                          borderRight={`none`}
                          width={`12%`}
                        >
                          <Text fontSize={`16px`}>주요사업</Text>
                        </Wrapper>
                      </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Status;

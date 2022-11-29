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

const Document = ({}) => {
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
                  <Wrapper width={`calc(100% - 14px - 10px)`} al={`flex-start`}>
                    <Text
                      fontSize={width < 700 ? `18px` : `20px`}
                      fontWeight={`600`}
                    >
                      기관형 과학기술인 협동조합 교류회&nbsp;
                      <SpanText color={Theme.basicTheme_C}>설립 서류</SpanText>
                    </Text>
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
                    ju={`flex-start`}
                    dr={`row`}
                  >
                    <Text>정관 필수 기재 사항 (정관 작성)</Text>
                    <Wrapper dr={`row`} width={`auto`}>
                      <CommonButton
                        kindOf={`subTheme2`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                        margin={`0 10px`}
                      >
                        표준정관
                        <DownloadOutlined />
                      </CommonButton>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    목적
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    명칭 및 주된 사무소의 소재지
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    조합원의 가입, 탈퇴 및 제명에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    출자 1좌의 금액과 납입 방법 및 시기, 조합원의 출자좌수 한도
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    조합원의 권리와 의무에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    잉여금과 손실금의 처리에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    적립금의 적립 방법 및 사용에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    사업의 범위 및 회계에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    기관 및 임원에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    공고의 방법에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    출자금의 양도에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    그밖의 총회, 이사회 운영 등에 필요한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    의료기관 소재지(의료복지사회적협동조합에 한함)
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                    fontWeight={`700`}
                  >
                    필수 서류 (설립 목적)
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}></Text>
                  <Wrapper
                    width={`calc(100% -  15px)`}
                    bgColor={Theme.lightGrey_C}
                    padding={`20px`}
                    al={`flex-start`}
                  >
                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        0.설립신고서
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        1. 정관 사본
                      </Text>
                      <CommonButton
                        kindOf={`subTheme2`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                        margin={`0 10px 0 0`}
                      >
                        표준정관
                        <DownloadOutlined />
                      </CommonButton>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        2. 창립총회 개최 공고문
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        3. 창립총회 의사록 사본
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        4. 임원명부
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        5. 사업 계획서
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        6. 수입 지출 예산서
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        7. 출자 1좌당 금액과 조합원 또는 회원별로 인수하려는
                        출자좌를 적은 서류 (출자자명부)
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        8. 발기인 및 설립동의자 명부
                      </Text>

                      <CommonButton
                        kindOf={`grey3`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    합병 또는 분할을 의결할 총회 의사록 (합병·분할로 설립하려는
                    경우에만 제출)
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    공고의 방법에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    해산에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    출자금의 양도에 관한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    그밖의 총회, 이사회 운영 등에 필요한 사항
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 5px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    al={`flex-start`}
                  >
                    의료기관 소재지 (의료복지사회적협동조합에 함함)
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
export default Document;

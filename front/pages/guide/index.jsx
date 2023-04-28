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
import styled from "styled-components";

const GuideTitle = styled(Wrapper)`
  width: auto;
  padding: 5px 15px;
  font-size: 16px;
  background-color: ${Theme.subTheme2_C};
  color: ${Theme.basicTheme_C};
  border-radius: 30px;
  margin: 15px 0 10px;

  @media (max-width: 800px) {
    font-size: 14px;
  }
`;

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

                <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process1.png"
                    />

                    <GuideTitle>1. 발기인 모집</GuideTitle>
                    <Text color={Theme.grey2_C}>5인 이상 혹은</Text>
                    <Text color={Theme.grey2_C}>50% 이상 과학기술인</Text>
                    <Text color={Theme.grey2_C}>(법인)</Text>
                  </Wrapper>
                  <Wrapper height={`130px`} width={`auto`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                      width={`15px`}
                      margin={`0 20px`}
                    />
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process2.png"
                    />

                    <GuideTitle>2. 정관작성</GuideTitle>
                    <Text color={Theme.grey2_C}>발기인이 작성,</Text>
                    <Text color={Theme.grey2_C}>발기인 전원</Text>
                    <Text color={Theme.grey2_C}>기명 날인</Text>
                  </Wrapper>
                  {width < 800 ? null : (
                    <Wrapper height={`130px`} width={`auto`}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                        width={`15px`}
                        margin={`0 20px`}
                      />
                    </Wrapper>
                  )}

                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process3.png"
                    />

                    <GuideTitle>3. 설립동의자 모집</GuideTitle>
                    <Text color={Theme.grey2_C}>발기인에게</Text>
                    <Text color={Theme.grey2_C}>설립동의서 제출</Text>
                  </Wrapper>
                  <Wrapper height={`130px`} width={`auto`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                      width={`15px`}
                      margin={`0 20px`}
                    />
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process4.png"
                    />

                    <GuideTitle>4. 창립총회 공고</GuideTitle>
                    <Text color={Theme.grey2_C}>창립총회 개최</Text>
                    <Text color={Theme.grey2_C}>7일 전까지</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process5.png"
                    />

                    <GuideTitle>5. 창립총회 개최</GuideTitle>
                    <Text color={Theme.grey2_C}>창립총회의사록 작성</Text>
                  </Wrapper>
                  <Wrapper height={`130px`} width={`auto`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                      width={`15px`}
                      margin={`0 20px`}
                    />
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process6.png"
                    />

                    <GuideTitle>6. 사무인수인계</GuideTitle>
                    <Text color={Theme.grey2_C}>발기인 → 주사무소</Text>
                    <Text color={Theme.grey2_C}>소재지 관할</Text>
                    <Text color={Theme.grey2_C}>시·도지사</Text>
                  </Wrapper>
                  {width < 800 ? null : (
                    <Wrapper height={`130px`} width={`auto`}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                        width={`15px`}
                        margin={`0 20px`}
                      />
                    </Wrapper>
                  )}
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process7.png"
                    />

                    <GuideTitle>7. 신고확인증 발급</GuideTitle>
                    <Text color={Theme.grey2_C}>신고를 받은 날부터</Text>
                    <Text color={Theme.grey2_C}>20알 이내,</Text>
                    <Text color={Theme.grey2_C}>시도지사 → 발기인</Text>
                  </Wrapper>
                  <Wrapper height={`130px`} width={`auto`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                      width={`15px`}
                      margin={`0 20px`}
                    />
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process8.png"
                    />

                    <GuideTitle>8. 설립사무의 인계</GuideTitle>
                    <Text color={Theme.grey2_C}>발기인 → 이사장</Text>
                    <Text color={Theme.grey2_C}>으로의 인계</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process9.png"
                    />

                    <GuideTitle>9. 출자금 납입</GuideTitle>
                    <Text color={Theme.grey2_C}>조합원 → 이사장</Text>
                  </Wrapper>
                  <Wrapper height={`130px`} width={`auto`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                      width={`15px`}
                      margin={`0 20px`}
                    />
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process10.png"
                    />

                    <GuideTitle>10. 설립등기</GuideTitle>
                    <Text color={Theme.grey2_C}>주된 사무소 소재지</Text>
                    <Text color={Theme.grey2_C}>관할 등기소</Text>
                  </Wrapper>
                  {width < 800 ? null : (
                    <Wrapper height={`130px`} width={`auto`}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                        width={`15px`}
                        margin={`0 20px`}
                      />
                    </Wrapper>
                  )}
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process11.png"
                    />

                    <GuideTitle>11. 출자금 납입</GuideTitle>
                    <Text color={Theme.grey2_C}>주된 사무소 소재지</Text>
                    <Text color={Theme.grey2_C}>관할 세무서</Text>
                  </Wrapper>
                  <Wrapper height={`130px`} width={`auto`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/arrow.png`}
                      width={`15px`}
                      margin={`0 20px`}
                    />
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `40%` : `auto`}
                    margin={width < 800 ? `0` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process12.png"
                    />

                    <GuideTitle>12. 협동조합 설립</GuideTitle>
                    <Text color={Theme.grey2_C}>협동조합 설립</Text>
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
export default Index;

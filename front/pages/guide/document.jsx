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
  CommonButton,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import Head from "next/head";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCallback } from "react";
import SubBanner from "../../components/SubBanner";

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
                서류
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
                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/1.+%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8+%E1%84%91%E1%85%AD%E1%84%8C%E1%85%AE%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB(2020).hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`subTheme2`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                          margin={`0 10px`}
                        >
                          표준정관
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                      {/* <CommonButton
                        kindOf={`grey3`}
                        fontSize={`12px`}
                        padding={`0`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton> */}
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
                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/0.+%5B%E1%84%87%E1%85%A7%E1%86%AF%E1%84%8C%E1%85%B5+%E1%84%8C%E1%85%A62%E1%84%92%E1%85%A9%E1%84%89%E1%85%A5%E1%84%89%E1%85%B5%E1%86%A8%5D+(%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%C2%B8+%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%92%E1%85%A1%E1%86%B8%E1%84%92%E1%85%AC)%E1%84%89%E1%85%A5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B8%E1%84%89%E1%85%B5%E1%86%AB%E1%84%80%E1%85%A9%E1%84%89%E1%85%A5.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        1. 정관 사본
                      </Text>
                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/1.+%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8+%E1%84%91%E1%85%AD%E1%84%8C%E1%85%AE%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB(2020).hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`subTheme2`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                          margin={`0 10px 0 0`}
                        >
                          표준정관
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                      {/* <CommonButton
                        kindOf={`grey3`}
                        fontSize={`12px`}
                        padding={`0`}
                        width={`80px`}
                        height={`20px`}
                        onClick={downToggle}
                      >
                        다운로드
                        <DownloadOutlined />
                      </CommonButton> */}
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        2. 창립총회 개최 공고문
                      </Text>
                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/2.+(%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%85%E1%85%B5%E1%86%B8)%E1%84%8E%E1%85%A9%E1%86%BC%E1%84%92%E1%85%AC+%E1%84%80%E1%85%A2%E1%84%8E%E1%85%AC+%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A9%E1%84%86%E1%85%AE%E1%86%AB.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        3. 창립총회 의사록 사본
                      </Text>
                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/3.+(%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%85%E1%85%B5%E1%86%B8)%E1%84%8E%E1%85%A9%E1%86%BC%E1%84%92%E1%85%AC+%E1%84%8B%E1%85%B4%E1%84%89%E1%85%A1%E1%84%85%E1%85%A9%E1%86%A8.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        4. 임원명부
                      </Text>

                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/4.+%5B%E1%84%87%E1%85%A7%E1%86%AF%E1%84%8C%E1%85%B5+%E1%84%8C%E1%85%A63%E1%84%92%E1%85%A9%E1%84%89%E1%85%A5%E1%84%89%E1%85%B5%E1%86%A8%5D+%E1%84%8B%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%86%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        5. 사업 계획서
                      </Text>

                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/5.+%5B%E1%84%87%E1%85%A7%E1%86%AF%E1%84%8C%E1%85%B5+%E1%84%8C%E1%85%A64%E1%84%92%E1%85%A9%E1%84%89%E1%85%A5%E1%84%89%E1%85%B5%E1%86%A8%5D+(%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%C2%B8+%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%92%E1%85%A1%E1%86%B8%E1%84%92%E1%85%AC)%E1%84%89%E1%85%A1%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%80%E1%85%A8%E1%84%92%E1%85%AC%E1%86%A8%E1%84%89%E1%85%A5.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        6. 수입 지출 예산서
                      </Text>

                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/6.+%5B%E1%84%87%E1%85%A7%E1%86%AF%E1%84%8C%E1%85%B5+%E1%84%8C%E1%85%A65%E1%84%92%E1%85%A9%E1%84%89%E1%85%A5%E1%84%89%E1%85%B5%E1%86%A8%5D+(%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%C2%B8+%E1%84%92%E1%85%A7%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%92%E1%85%A1%E1%86%B8%E1%84%92%E1%85%AC)%E1%84%89%E1%85%AE%E1%84%8B%E1%85%B5%E1%86%B8%E3%86%8D%E1%84%8C%E1%85%B5%E1%84%8E%E1%85%AE%E1%86%AF+%E1%84%8B%E1%85%A8%E1%84%89%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A5.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        7. 출자 1좌당 금액과 조합원 또는 회원별로 인수하려는
                        출자좌를 적은 서류 (출자자명부)
                      </Text>

                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/7.8.+%5B%E1%84%87%E1%85%A7%E1%86%AF%E1%84%8C%E1%85%B5+%E1%84%8C%E1%85%A66%E1%84%92%E1%85%A9%E1%84%89%E1%85%A5%E1%84%89%E1%85%B5%E1%86%A8%5D+(%E1%84%87%E1%85%A1%E1%86%AF%E1%84%80%E1%85%B5%E1%84%8B%E1%85%B5%E1%86%AB+%E1%84%86%E1%85%B5%E1%86%BE+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%8C%E1%85%A1%C2%B8+%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%AF%E1%86%AB(%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB))%E1%84%86%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                      <Text fontSize={`18px`} margin={`0 10px 0 0`}>
                        8. 발기인 및 설립동의자 명부
                      </Text>

                      <a
                        href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/7.8.+%5B%E1%84%87%E1%85%A7%E1%86%AF%E1%84%8C%E1%85%B5+%E1%84%8C%E1%85%A66%E1%84%92%E1%85%A9%E1%84%89%E1%85%A5%E1%84%89%E1%85%B5%E1%86%A8%5D+(%E1%84%87%E1%85%A1%E1%86%AF%E1%84%80%E1%85%B5%E1%84%8B%E1%85%B5%E1%86%AB+%E1%84%86%E1%85%B5%E1%86%BE+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B8%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%8C%E1%85%A1%C2%B8+%E1%84%8C%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%AF%E1%86%AB(%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB))%E1%84%86%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE.hwp`}
                        download
                      >
                        <CommonButton
                          kindOf={`grey3`}
                          fontSize={`12px`}
                          padding={`0`}
                          width={`80px`}
                          height={`20px`}
                          onClick={downToggle}
                        >
                          다운로드
                          <DownloadOutlined />
                        </CommonButton>
                      </a>
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

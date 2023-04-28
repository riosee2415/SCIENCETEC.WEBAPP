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
  ATag,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import Head from "next/head";
import LeftMenu from "../../components/LeftMenu";
import SubBanner from "../../components/SubBanner";
import styled from "styled-components";
import { Popover } from "antd";

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
                    <Popover
                      placement="top"
                      content={
                        <Wrapper>
                          <Text fontSize={`16px`}>&lt;표준정관&gt;</Text>
                        </Wrapper>
                      }
                    >
                      <Image
                        width={`130px`}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process2.png"
                      />
                    </Popover>

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
                    <Popover
                      placement="top"
                      content={
                        <Wrapper>
                          <Text fontSize={`16px`}>
                            &lt;발기인 및 설립동의서&gt;
                          </Text>
                        </Wrapper>
                      }
                    >
                      <Image
                        width={`130px`}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process3.png"
                      />
                    </Popover>

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
                    <Popover
                      placement="top"
                      content={
                        <Wrapper>
                          <Text fontSize={`16px`}>&lt;총회 개최공고문&gt;</Text>
                        </Wrapper>
                      }
                    >
                      <Image
                        width={`130px`}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process4.png"
                      />
                    </Popover>
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
                    <Popover
                      placement="top"
                      content={
                        <Wrapper>
                          <Text fontSize={`16px`}>&lt;총회 의사록&gt;</Text>
                        </Wrapper>
                      }
                    >
                      <Image
                        width={`130px`}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process5.png"
                      />
                    </Popover>

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
                    <Popover
                      placement="top"
                      content={
                        <Wrapper>
                          <Text fontSize={`16px`} margin={`0 0 10px`}>
                            &lt;설립신고서&gt;
                          </Text>

                          <Wrapper al={`flex-start`}>
                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/0.+[별지+제2호서식]+(협동조합¸+협동조합연합회)설립신고서.hwp`}
                              download
                            >
                              <Text>0. 설립신고서</Text>
                            </ATag>

                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/1.+협동조합+표준정관(2020).hwp`}
                              download
                            >
                              <Text>1. 정관 사본</Text>
                            </ATag>

                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/2.+(창립)총회+개최+공고문.hwp`}
                              download
                            >
                              <Text>2. 창립총회 개최 공고문</Text>
                            </ATag>

                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/3.+(창립)총회+의사록.hwp`}
                              download
                            >
                              <Text>3. 창립총회 의사록 사본</Text>
                            </ATag>

                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/4.+[별지+제3호서식]+임원명부.hwp`}
                              download
                            >
                              <Text>4. 임원명부</Text>
                            </ATag>

                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/5.+[별지+제4호서식]+(협동조합¸+협동조합연합회)사업계획서.hwp`}
                              download
                            >
                              <Text>5. 사업 계획서</Text>
                            </ATag>

                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/6.+[별지+제5호서식]+(협동조합¸+협동조합연합회)수입ㆍ지출+예산서.hwp`}
                              download
                            >
                              <Text>6. 수입 지출 예산서</Text>
                            </ATag>

                            <ATag
                              width={`auto`}
                              href={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/file/7.8.+[별지+제6호서식]+(발기인+및+설립동의자¸+조합원(회원))명부.hwp`}
                              download
                            >
                              <Text>
                                7. 출자 1좌당 금액과 조합원 또는 회원별로
                                인수하려는 출자좌를 적은 서류 (출자자명부)
                              </Text>
                            </ATag>
                            <Text>8. 발기인 및 설립동의자 명부</Text>
                          </Wrapper>

                          <Text fontSize={`16px`}>&lt;관할사무소&gt;</Text>
                        </Wrapper>
                      }
                    >
                      <Image
                        width={`130px`}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process6.png"
                      />
                    </Popover>

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
                    width={width < 800 ? `40%` : `150px`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Image
                      width={`130px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process9.png"
                    />

                    <GuideTitle>9. 출자금 납입</GuideTitle>
                    <Text color={Theme.grey2_C}>
                      - 기일을 정하여 조합원이 되려는 자에게 출자금 납입 안내
                    </Text>
                    <Text color={Theme.grey2_C}>
                      - 이사장 명의 계좌로 출자금을 납입
                    </Text>
                    <Text color={Theme.grey2_C}>
                      ※ 출자금 납입 시 반드시 개별 조합원 명의로 정해진 출자금을
                      이체할 것
                    </Text>
                    <Text color={Theme.grey2_C}>
                      ※ 법인 등기 후에는 법인명의 통장을 개설하여 출자금을 이체
                    </Text>
                    <Text color={Theme.grey2_C}>
                      - 설립 등기 시 출자금 납입영수증 또는 은행에서 발급한
                      잔액증명서를 제출해야
                    </Text>
                    <Text color={Theme.grey2_C}>
                      ※ 설립신고서 상 출자금 납입총액과 통장잔고 일치해야 함
                    </Text>
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
                    width={width < 800 ? `40%` : `150px`}
                    margin={width < 800 ? `0 0 30px` : `0 0 55px`}
                  >
                    <Popover
                      placement="top"
                      content={
                        <Wrapper>
                          <Text fontSize={`16px`}>&lt;설립등기서류&gt;</Text>

                          <Wrapper al={`flex-start`} margin={`10px 0`}>
                            <Text>① 설립등기 신청서(관할 등기소 구비)</Text>
                            <Text>② 설립신고확인증</Text>
                            <Text>③ 창립총회 의사록 원본 1부(공증 필수)</Text>
                            <Text fontSize={`12px`}>
                              ※ 공증 받을 때 지참 서류가 있으므로 공증사무실에
                              반드시 확인할 것
                            </Text>
                            <Text>④ 정관 원본 1부</Text>
                            <Text>
                              ⑤ 출자금 총액 납입증명서(은행잔액증명서 혹은
                              출자금 납입확인서)
                            </Text>
                            <Text>⑥ 인감신고서(관할 등기소 구비)</Text>
                            <Text fontSize={`12px`}>
                              ※ 법인 인감도장 제작하여 지참, 이사장 인감과
                              인감증명서도 지참
                            </Text>
                            <Text>
                              ⑦ 등록면허세 영수필확인서(주 사무소 소재지
                              시·군·구청 세무과 방문)
                            </Text>

                            <Text fontSize={`12px`}>
                              ※ 반드시 설립 등기 전에 세무과를 방문하여
                              등록면허세 납부 후 영수필확인서 지참할 것
                            </Text>
                            <Text>
                              ⑧ 임원의 취임승낙서, 인감증명서, 주민등록등(초)본
                              -&gt;
                            </Text>
                            <Text margin={`0 0 0 15px`}>
                              취임승낙서에는 선출된 임원의 인감 날인 -&gt;
                            </Text>
                            <Text margin={`0 0 0 15px`}>
                              법인이 임원인 경우 법인 인감날인, 법인인감증명서,
                              등기사항전부증명서, 직무수행자의 선임증명서 -&gt;
                            </Text>
                            <Text margin={`0 0 0 15px`}>
                              임원은 이름과 주민번호, 이사장은 주소까지 등기
                            </Text>
                            <Text>
                              ⑨ 위임장 : 대리인이 신청할 경우(이사장 인감날인,
                              인감증명서 첨부)
                            </Text>
                            <Text fontSize={`12px`}>
                              ※ 기본적으로 법인의 등기 등 사무에 관한 처리
                              주체는 이사장이 됨. 다만, 이사장이 아닌 이사, 직원
                              등이 대리하여 등기할 경우 위임장 필수 지참
                            </Text>
                          </Wrapper>
                          <Text fontSize={`16px`}>&lt;법원서류&gt;</Text>
                        </Wrapper>
                      }
                    >
                      <Image
                        width={`130px`}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process10.png"
                      />
                    </Popover>

                    <GuideTitle>10. 설립등기</GuideTitle>
                    <Wrapper al={`flex-start`}>
                      <Text color={Theme.grey2_C}>
                        - 출자금 납입 완료된 시점으로부터 14일 이내에 설립등기
                      </Text>
                      <Text color={Theme.grey2_C}>1) 공증</Text>
                      <Text color={Theme.grey2_C}>
                        - 공증필요서류 : 창립총회 의사록 원본 2부(기명날인,
                        간인완료), 정관 원본 1부 (기명날인 및 간인완료),
                        이사장진술서(공증사무소에서 제공), 발기인 및 설립동 의자
                        명부, 공증용 위임장(공증사무소에서 제공, 해당 위임장에
                        의결정족수만큼 의 인감도장 날인 필요), 조합원
                        인감증명서(3개월 이내 유효, 위임장에 인감도장 을 찍은
                        조합원 전원 필요)
                      </Text>
                      <Text color={Theme.grey2_C}>
                        ※ 공증사무소마다 조금씩 상이하므로 반드시 사전에 확인
                        필요
                      </Text>
                      <Text color={Theme.grey2_C}>
                        - 의결정족수 : 창립총회 의사는 과반참석에 3분의 2 이상의
                        동의로 의결되므로 과반의 3분의 2에 해당하는 인원의
                        인감을 찍는 것이 원칙이나, 공증사무소마다 요청하는
                        인원의 수가 상이하므로 사전에 확인하는 것이 좋음
                      </Text>
                      <Text color={Theme.grey2_C}>2) 설립등기서류 (6번)</Text>
                    </Wrapper>
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
                    width={width < 800 ? `40%` : `150px`}
                    margin={width < 800 ? `0` : `0 0 55px`}
                  >
                    <Popover
                      placement="top"
                      content={
                        <Wrapper>
                          <Text fontSize={`16px`}>
                            내용 관할 세무서 사업자등록 제출서류
                          </Text>

                          <Wrapper margin={`10px 0 0`} al={`flex-start`}>
                            <Text>① 설립신고서 및 사업자등록 신청서</Text>
                            <Text>② 정관 사본</Text>
                            <Text>③ 법인등기부등본</Text>
                            <Text>
                              ④ 법인명의 임대차계약서(사업장 임차한 경우에 한함)
                            </Text>
                            <Text>⑤ 조합원 명부</Text>
                            <Text>
                              ⑥ 사업허가·등록·신고필증(해당 법인에 한함)
                            </Text>
                            <Text>⑦ 현물출자명세서(현물출자법인에 한함)</Text>
                            <Text>⑧ 법인인감</Text>
                          </Wrapper>
                        </Wrapper>
                      }
                    >
                      <Image
                        width={`130px`}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/establish-page/process11.png"
                      />
                    </Popover>

                    <GuideTitle>11. 출자금 납입</GuideTitle>
                    <Wrapper al={`flex-start`}>
                      <Text color={Theme.grey2_C}>1) 등록면허세 납부</Text>
                      <Text color={Theme.grey2_C}>
                        - 등록면허세는 주사무소 소재지 관할 시청 또는 구청
                        세무민원실에 방문・납부
                      </Text>
                      <Text color={Theme.grey2_C}>
                        - 제출서류 : 설립인가증, 정관, 출자자명부, 출자금
                        총액납입증명서(금융기관이 작성한 잔고증명서 등)
                      </Text>
                      <Text color={Theme.grey2_C}>
                        ※ 제출서류는 관할 시청마다 조금씩 상이하므로 반드시
                        사전에 확인 필요
                      </Text>
                      <Text color={Theme.grey2_C}>
                        - 등록면허세는 출자금 총액에 따라 결정
                      </Text>
                      <Text color={Theme.grey2_C}>
                        ・ 출자금 총액의 1000분의 4가 부과됨
                      </Text>
                      <Text color={Theme.grey2_C}>
                        ・ 주사무소 소재지가 수도권 인구과밀억제권역에 해당될
                        경우, 3배 중과세
                      </Text>
                      <Text color={Theme.grey2_C}>
                        ・ 등록면허세 최소 세액은 112,500원 + 지방교육세 30%
                        (22,400원)
                      </Text>
                      <Text color={Theme.grey2_C}>
                        인구과밀억제권역에 해당할 경우 405,000원 납부
                      </Text>
                      <Text color={Theme.grey2_C}>2) 사업자등록 (7번내용)</Text>
                    </Wrapper>
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

import React, { useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { RightCircleOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import Status from "../../components/demand/Status";
import Business from "../../components/demand/Business";
import { SURVEY_LIST_REQUEST } from "../../reducers/survey";
import { useEffect } from "react";

const Btn = styled(Wrapper)`
  width: 335px;
  height: 180px;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid ${Theme.basicTheme_C};
  background: ${(props) =>
    props.isActive ? props.theme.basicTheme_C : props.theme.white_C};
  color: ${(props) =>
    props.isActive ? props.theme.white_C : props.theme.basicTheme_C};

  &:hover {
    cursor: pointer;
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Demand = () => {
  ////// GLOBAL STATE //////

  const { quesList, innerList } = useSelector((state) => state.survey);

  ////// HOOKS //////
  const width = useWidth();

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState(0);
  const [visible, isVisible] = useState(false);

  const [surveyList, setSurveyList] = useState([]);

  ////// USEEFFECT //////

  useEffect(() => {
    if (quesList && innerList) {
      const quesArr = [];

      quesList.map((d) => {
        quesArr.push({
          id: d.id,
          ques: d.value,
          sort: d.sort,
          inner: innerList.filter((value) => value.SurveyQuestionId === d.id),
        });

        setSurveyList(quesArr);
      });
    }
  }, [quesList, innerList]);

  ////// TOGGLE //////
  const visibleToggle = useCallback(() => {
    isVisible((prev) => !prev);
  }, [visible]);
  ////// HANDLER //////

  const typeHandler = useCallback(
    (data) => {
      setCurrentTab(data);

      dispatch({
        type: SURVEY_LIST_REQUEST,
        data: {
          type: data,
        },
      });
    },
    [currentTab]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>iCAST | 수요조사</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`calc(100vh - 137px)`} ju={`flex-start`}>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />
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
                기관형 과학기술인 커뮤니티 조사
              </Wrapper>

              {currentTab === 0 && (
                <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 100px`}>
                  <Btn
                    margin={width < 800 ? `0 0 20px` : `0 20px 0 0`}
                    onClick={() => typeHandler(1)}
                  >
                    사업수행 현황조사 참여하기&nbsp;
                    <RightCircleOutlined />
                  </Btn>
                  <Btn onClick={() => typeHandler(2)}>
                    사업 수요조사 참여하기&nbsp;
                    <RightCircleOutlined />
                  </Btn>
                </Wrapper>
              )}

              {currentTab === 1 && (
                <>
                  <Wrapper
                    wrap={`nowrap`}
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={width < 900 ? `18px` : `20px`}
                    margin={`35px 0 16px`}
                    fontWeight={`700`}
                  >
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle-small.png`}
                      width={`8px`}
                      margin={`0 6px 0 0`}
                    />
                    사업수행 현황조사
                  </Wrapper>
                  <Status surveyList={surveyList} />
                </>
              )}

              {currentTab === 2 && (
                <>
                  <Wrapper
                    wrap={`nowrap`}
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={width < 900 ? `18px` : `20px`}
                    margin={`35px 0 16px`}
                    fontWeight={`700`}
                  >
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle-small.png`}
                      width={`8px`}
                      margin={`0 6px 0 0`}
                    />
                    사업 수요조사
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `16px` : `18px`}
                    margin={`0 0 20px`}
                  >
                    • 사업 수요 조사 파악 및 향후 사업 확대와 과학기술인
                    협동조합 지원을 현실화하고 방향을 재정립하고자실시되는
                    조사입니다.
                  </Wrapper>
                  <Wrapper
                    bgColor={Theme.subTheme4_C}
                    radius={`5px`}
                    padding={`20px`}
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0 0 40px`}
                  >
                    <Text
                      fontSize={width < 900 ? `16px` : `20px`}
                      fontWeight={`bold`}
                      color={Theme.basicTheme_C}
                      margin={`0 16px 0 0`}
                    >
                      기관형 과학기술인 협동조합이란?
                    </Text>
                    <Text
                      fontSize={`16px`}
                      color={Theme.basicTheme_C}
                      onClick={visibleToggle}
                      isHover
                    >
                      {visible ? `접기` : `펼치기`}
                    </Text>

                    {visible && (
                      <>
                        <Wrapper al={`flex-start`} margin={`16px 0 0`}>
                          <Text fontSize={`18px`} fontWeight={`600`}>
                            • 개념 및 정의
                          </Text>
                          <Text
                            fontSize={width < 900 ? `14px` : `16px`}
                            padding={`0 0 0 12px`}
                          >
                            기관형 과학기술인 협동조합'이란 「협동조합
                            기본법」에 의해 설립된 협동조합(조합원 5인 이상)으로
                            이공계 출신 과학기술인 법인 조합원이 50%이상인
                            협동조합으로서 R&D 전문과학기술인(대학 및 출연연,
                            연구소 등 개인)과 기업 및 시민사회 등 기관이 협업을
                            통해 국가혁신 성과증진을 위해 지역 및 사회 혁신을
                            추진하는 협동조합을 말함
                          </Text>
                        </Wrapper>
                        <Wrapper al={`flex-start`} margin={`16px 0 0`}>
                          <Text fontSize={`18px`} fontWeight={`600`}>
                            • 지원내용
                          </Text>
                          <Text
                            fontSize={width < 900 ? `14px` : `16px`}
                            padding={`0 0 0 12px`}
                          >
                            1. 「협동조합 기본법」 에 의해 설립된 협동조합(5인
                            이상)
                          </Text>
                          <Text
                            fontSize={width < 900 ? `14px` : `16px`}
                            padding={`0 0 0 12px`}
                          >
                            2. 조합원 중 이공계(과학기술인) 법인 조합원이 50%
                            이상인 협동조합 (법인 조합원의 경우, 이공계 인력이
                            2명 이상 근무하는 법인은 이공계 조합원 1인으로 간주)
                          </Text>
                          <Text
                            fontSize={width < 900 ? `14px` : `16px`}
                            padding={`0 0 0 12px`}
                          >
                            3. 과학기술 관련 서비스** 등을 주된 사업으로
                            활동하는 협동조합
                          </Text>
                        </Wrapper>
                      </>
                    )}
                  </Wrapper>

                  <Business surveyList={surveyList} />
                </>
              )}
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

export default Demand;

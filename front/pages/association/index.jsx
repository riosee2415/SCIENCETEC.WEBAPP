import React, { useCallback } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import {
  SHARE_PROJECT_REQUEST,
  UNDER_LIST_REQUEST,
} from "../../reducers/shareProject";
import { Empty, Modal } from "antd";
import useInput from "../../hooks/useInput";
import { useState } from "react";
import ShareProdSlider from "../../components/slide/shareProdSlider";

const Association = () => {
  ////// GLOBAL STATE //////
  const { shareProjects, underList } = useSelector(
    (state) => state.shareProject
  );
  ////// HOOKS //////
  const width = useWidth();

  const searchInput = useInput(``);

  const [vModal, setVModal] = useState(false);
  ////// REDUX //////
  const dispatch = useDispatch();
  ////// USEEFFECT //////
  ////// TOGGLE //////

  const vModalToggle = useCallback(
    (data) => {
      if (data) {
        dispatch({
          type: UNDER_LIST_REQUEST,
          data: {
            shareProjectId: data.id,
          },
        });
      }

      setVModal(!vModal);
    },
    [vModal]
  );

  ////// HANDLER //////

  const searchInputHandler = useCallback(() => {
    dispatch({
      type: SHARE_PROJECT_REQUEST,
      data: {
        searchname: searchInput.value,
      },
    });
  }, [searchInput]);

  const searchHandler = useCallback((data) => {
    console.log(data);
    dispatch({
      type: SHARE_PROJECT_REQUEST,
      data: {
        searchData: data,
      },
    });
  }, []);

  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);

  ////// DATAVIEW //////

  const datum = [
    {
      value: 1,
      name: "ㄱ",
    },
    {
      value: 2,
      name: "ㄴ",
    },
    {
      value: 3,
      name: "ㄷ",
    },
    {
      value: 4,
      name: "ㄹ",
    },
    {
      value: 5,
      name: "ㅁ",
    },
    {
      value: 6,
      name: "ㅂ",
    },
    {
      value: 7,
      name: "ㅅ",
    },
    {
      value: 8,
      name: "ㅇ",
    },
    {
      value: 9,
      name: "ㅈ",
    },
    {
      value: 10,
      name: "ㅊ",
    },
    {
      value: 11,
      name: "ㅋ",
    },
    {
      value: 12,
      name: "ㅌ",
    },
    {
      value: 13,
      name: "ㅍ",
    },
    {
      value: 14,
      name: "ㅎ",
    },
  ];

  return (
    <>
      <Head>
        <title>iCAST | 회원조합소개</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `16px` : `18px`}
              >
                • 기관형 과학기술인 협동조합 교류회 회원 협동조합과 기업들을
                소개합니다.
              </Wrapper>

              <Wrapper al={`flex-start`} margin={`50px 0 5px`}>
                <Text color={Theme.grey2_C}>
                  • 초성으로 검색할 수 있습니다.
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
                <CommonButton
                  margin={`0 5px 0 0`}
                  kindOf={`grey`}
                  onClick={() => searchHandler(0)}
                >
                  전체
                </CommonButton>
                {datum.map((data) => {
                  return (
                    <CommonButton
                      margin={`0 5px 0 0`}
                      kindOf={`grey`}
                      onClick={() => searchHandler(data.value)}
                    >
                      {data.name}
                    </CommonButton>
                  );
                })}

                <TextInput
                  height={`35px`}
                  width={`200px`}
                  placeholder="검색어를 입력해주세요."
                  {...searchInput}
                  onKeyDown={(e) => e.keyCode === 13 && searchInputHandler()}
                />
                <CommonButton
                  height={`35px`}
                  radius={`0`}
                  onClick={searchInputHandler}
                >
                  검색
                </CommonButton>
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                al={`flex-start`}
                margin={`0 0 160px`}
              >
                {shareProjects.length === 0 ? (
                  <Wrapper height={`200px`}>
                    <Empty description="조회된 회원조합이 없습니다." />
                  </Wrapper>
                ) : (
                  shareProjects.map((data) => {
                    return (
                      <Wrapper
                        width={width < 1000 ? `100%` : `49%`}
                        margin={`10px 0`}
                      >
                        <Wrapper
                          wrap={`nowrap`}
                          borderBottom={`2px solid ${Theme.basicTheme_C}`}
                          padding={`0 0 20px`}
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
                          {data.viewType}
                        </Wrapper>
                        <Image
                          alt="image"
                          src={data.imagePath}
                          onClick={() => moveLinkHandler(data.link)}
                          cursor={`pointer`}
                          height={`300px`}
                        />
                        <Wrapper
                          dr={`row`}
                          height={`55px`}
                          fontSize={`16px`}
                          borderTop={`1px solid ${Theme.lightGrey2_C}`}
                        >
                          <Wrapper
                            fontWeight={`bold`}
                            color={Theme.grey2_C}
                            width={width < 900 ? `100px` : `180px`}
                          >
                            조합명
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 900
                                ? `calc(100% - 100px)`
                                : `calc(100% - 180px)`
                            }
                            al={`flex-start`}
                          >
                            {data.name}
                          </Wrapper>
                        </Wrapper>

                        <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                          <Wrapper
                            fontWeight={`bold`}
                            color={Theme.grey2_C}
                            width={width < 900 ? `100px` : `180px`}
                          >
                            대표자명
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 900
                                ? `calc(100% - 100px)`
                                : `calc(100% - 180px)`
                            }
                            al={`flex-start`}
                          >
                            {data.repreName}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                          <Wrapper
                            fontWeight={`bold`}
                            color={Theme.grey2_C}
                            width={width < 900 ? `100px` : `180px`}
                          >
                            설립연도
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 900
                                ? `calc(100% - 100px)`
                                : `calc(100% - 180px)`
                            }
                            al={`flex-start`}
                          >
                            {data.viewEstimateDate}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                          <Wrapper
                            fontWeight={`bold`}
                            color={Theme.grey2_C}
                            width={width < 900 ? `100px` : `180px`}
                          >
                            직원수
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 900
                                ? `calc(100% - 100px)`
                                : `calc(100% - 180px)`
                            }
                            al={`flex-start`}
                          >
                            {data.viewEmpCnt}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                          <Wrapper
                            fontWeight={`bold`}
                            color={Theme.grey2_C}
                            width={width < 900 ? `100px` : `180px`}
                          >
                            업종
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 900
                                ? `calc(100% - 100px)`
                                : `calc(100% - 180px)`
                            }
                            al={`flex-start`}
                          >
                            {data.jobType}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          height={`75px`}
                          fontSize={`16px`}
                          borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                        >
                          <Wrapper
                            fontWeight={`bold`}
                            color={Theme.grey2_C}
                            width={width < 900 ? `100px` : `180px`}
                          >
                            주업무
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 900
                                ? `calc(100% - 100px)`
                                : `calc(100% - 180px)`
                            }
                            al={`flex-start`}
                            fontSize={`14px`}
                          >
                            {data.importantWork}
                          </Wrapper>

                          <Wrapper al={`flex-end`}>
                            <CommonButton onClick={() => vModalToggle(data)}>
                              자세히 보기
                            </CommonButton>
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                )}
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <Modal
            visible={vModal}
            onCancel={() => vModalToggle(null)}
            footer={null}
            width="800px"
          >
            <Wrapper padding={`50px`}>
              <ShareProdSlider datum={underList} />
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

    context.store.dispatch({
      type: SHARE_PROJECT_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Association;

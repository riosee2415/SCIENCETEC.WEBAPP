import React from "react";
import { useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import ClientLayout from "../../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  Text,
} from "../../../components/commonComponents";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { useState } from "react";
import { useCallback } from "react";
import { NOTICE_LIST_REQUEST } from "../../../reducers/notice";
import { useRouter } from "next/router";
import OpBoard from "../../../components/OpBoard";
import OpDetail from "../../../components/OpDetail";
import SubBanner from "../../../components/SubBanner";

const Box = styled(Wrapper)`
  flex-direction: row;
  height: 48px;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  cursor: pointer;

  &:hover {
    background: ${Theme.lightGrey_C};
  }
`;

const Index = ({}) => {
  ////// GLOBAL STATE //////
  const { viewType, notices, maxPage } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const [isDown, setIsDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////

  const otherPageCall = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ICAST | 설립안내</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`calc(100vh - 137px)`} ju={`flex-start`}>
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
                자료실
              </Text>
              {viewType === "list" && (
                <>
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
                        기관형 과학기술인 협동조합 자료실
                      </Wrapper>
                    </Wrapper>

                    {/* <Wrapper
                      overflow={`auto`}
                      wrap={`nowrap`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`}>
                        <Wrapper
                          borderTop={`2px solid ${Theme.basicTheme_C}`}
                          dr={`row`}
                          height={`48px`}
                          bgColor={Theme.subTheme4_C}
                          borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                        >
                          <Wrapper
                            height={`100%`}
                            width={width < 700 ? `10%` : `5%`}
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
                            width={width < 700 ? `90%` : `65%`}
                          >
                            <Text
                              fontSize={`14px`}
                              isNeo={true}
                              fontWeight={`700`}
                            >
                              제목
                            </Text>
                          </Wrapper>

                          <Wrapper
                            height={`100%`}
                            width={`15%`}
                            display={width < 700 ? `none` : `flex`}
                          >
                            <Text
                              fontSize={`14px`}
                              isNeo={true}
                              fontWeight={`700`}
                            >
                              일시
                            </Text>
                          </Wrapper>
                          <Wrapper
                            height={`100%`}
                            width={`15%`}
                            display={width < 700 ? `none` : `flex`}
                          >
                            <Text
                              fontSize={`14px`}
                              isNeo={true}
                              fontWeight={`700`}
                            >
                              비고
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        {notices.notices &&
                          (notices.notices.length === 0 ? (
                            <Wrapper margin={`100px 0`}>
                              <Empty description="자료가 없습니다." />
                            </Wrapper>
                          ) : (
                            notices.notices.map((data) => {
                              return (
                                <Box
                                  dr={`row`}
                                  height={`48px`}
                                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                                  onClick={() =>
                                    moveLinkHandler(
                                      `/guide/reference/${data.id}`
                                    )
                                  }
                                >
                                  <Wrapper
                                    height={`100%`}
                                    width={width < 700 ? `10%` : `5%`}
                                  >
                                    <Text
                                      fontSize={`14px`}
                                      isNeo={true}
                                      fontWeight={`700`}
                                    >
                                      {data.num}
                                    </Text>
                                  </Wrapper>
                                  <Wrapper
                                    height={`100%`}
                                    width={width < 700 ? `90%` : `65%`}
                                  >
                                    <Text
                                      fontSize={`14px`}
                                      isNeo={true}
                                      fontWeight={`700`}
                                    >
                                      {data.title}
                                    </Text>
                                  </Wrapper>

                                  <Wrapper
                                    height={`100%`}
                                    width={`15%`}
                                    display={width < 700 ? `none` : `flex`}
                                  >
                                    <Text
                                      fontSize={`14px`}
                                      isNeo={true}
                                      fontWeight={`700`}
                                    >
                                      {data.viewCreatedAt}
                                    </Text>
                                  </Wrapper>
                                  <Wrapper
                                    height={`100%`}
                                    width={`15%`}
                                    display={width < 700 ? `none` : `flex`}
                                  >
                                    <Text
                                      fontSize={`14px`}
                                      isNeo={true}
                                      fontWeight={`700`}
                                    ></Text>
                                  </Wrapper>
                                </Box>
                              );
                            })
                          ))}
                      </Wrapper>
                    </Wrapper> */}

                    <OpBoard
                      data={notices.notices}
                      maxPage={maxPage}
                      currentPage={currentPage}
                      otherPageCall={otherPageCall}
                      boardType="자료실"
                    />
                  </Wrapper>
                </>
              )}
              {viewType === "detail" && <OpDetail />}
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

    context.store.dispatch({
      type: NOTICE_LIST_REQUEST,
      data: {
        type: "자료실",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Index;

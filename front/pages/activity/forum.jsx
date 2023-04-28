import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomPage,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { FORUM_LIST_REQUEST } from "../../reducers/forum";
import { Empty, message } from "antd";
import SubBanner from "../../components/SubBanner";

const Box = styled(Wrapper)`
  width: calc(100% / 3 - 12px);

  margin: 0 18px 60px 0;
  align-items: flex-start;

  &:nth-child(3n) {
    margin: 0 0 60px 0;
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - 5px);
    margin: 0 10px 60px 0;

    &:nth-child(4n) {
      margin: 0 10px 60px 0;
    }

    &:nth-child(3n) {
      margin: 0 10px 60px 0;
    }

    &:nth-child(2n) {
      margin: 0 0 60px 0;
    }
  }

  & iframe,
  & object,
  & embed {
    width: 100%;
  }
`;

const Forum = () => {
  ////// GLOBAL STATE //////

  const { forumList, maxPage, st_forumListError } = useSelector(
    (state) => state.forum
  );

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  ////// REDUX //////
  ////// USEEFFECT //////

  // 리스트
  useEffect(() => {
    if (st_forumListError) {
      return message.error(st_forumListError);
    }
  }, [st_forumListError]);

  ////// TOGGLE //////
  ////// HANDLER //////

  const otherPageCall = useCallback(
    (page) => {
      dispatch({
        type: FORUM_LIST_REQUEST,
        data: {
          page: currentPage,
        },
      });

      setCurrentPage(page);
    },
    [currentPage]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>iCAST | 포럼</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <SubBanner />
          <RsWrapper
            dr={`row`}
            al={`flex-start`}
            position={`relative`}
            margin={width < 900 ? `50px 0 0` : `100px 0 0`}
          >
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`32px`}
                fontWeight={`600`}
                margin={width < 900 ? `0 0 15px` : `0 0 36px`}
              >
                포럼
              </Text>
            </Wrapper>
            <Wrapper
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
              기관형 과학기술인 협동조합 iCAST Forum
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `14px` : `16px`}
              margin={`16px 0 36px`}
            >
              과학기술 트렌드, 이슈, 이해당사자들간의 연결의 장 iCAST Forum을
              소개합니다.
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {forumList &&
                (forumList.length === 0 ? (
                  <Wrapper margin={`20px 0`}>
                    <Empty description="포럼이 없습니다." />
                  </Wrapper>
                ) : (
                  forumList.map((data) => {
                    return (
                      <Box key={data.id}>
                        <iframe
                          src={data.youtubeLink}
                          style={{
                            margin: `0 0 10px`,
                            border: 0,
                            height: width < 700 ? `150px` : `210px`,
                          }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        />
                        <Text fontSize={width < 900 ? `14px` : `16px`}>
                          {data.title}
                        </Text>
                      </Box>
                    );
                  })
                ))}
            </Wrapper>

            <CustomPage
              defaultCurrent={1}
              current={currentPage}
              total={maxPage * 10}
              onChange={otherPageCall}
            />
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
      type: FORUM_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Forum;

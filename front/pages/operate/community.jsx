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
  CustomSelect,
  Image,
  RsWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { message, Select } from "antd";
import OpBoard from "../../components/OpBoard";
import OpWrite from "../../components/OpWrite";
import OpDetail from "../../components/OpDetail";
import {
  NOTICE_DETAIL_REQUEST,
  NOTICE_LIST_REQUEST,
  SET_TEMP_TYPE,
} from "../../reducers/notice";
import { useEffect } from "react";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";

const Community = () => {
  ////// GLOBAL STATE //////
  const {
    viewType,
    notices,
    maxPage,
    st_noticeCreateDone,
    st_noticeCreateError,
  } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(0);

  const searchInput = useInput(``);
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (router.query) {
      if (router.query.type === "detail") {
        // 디테일 데이터 조회
        dispatch({
          type: NOTICE_DETAIL_REQUEST,
          data: { id: router.query.id },
        });

        setTimeout(() => {
          dispatch({
            type: SET_TEMP_TYPE,
            data: {
              boardType: "커뮤니티",
              viewType: "detail",
            },
          });
        }, 500);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (st_noticeCreateDone) {
      message.info("게시글이 작성되었습니다.");
      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          type: "커뮤니티",
        },
      });
    }
    if (st_noticeCreateError) {
      return message.error(st_noticeCreateError);
    }
  }, [st_noticeCreateDone, st_noticeCreateError]);

  ////// TOGGLE //////
  const searchValueToggle = useCallback((data) => {
    setSearchValue(data);
  }, []);

  ////// HANDLER //////

  const searchHandler = useCallback(() => {
    if (searchValue === 0) {
      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          type: "커뮤니티",
          page: 1,
          title: searchInput.value,
        },
      });
    } else {
      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          type: "커뮤니티",
          page: 1,
          content: searchInput.value,
        },
      });
    }

    setCurrentPage(1);
  }, [searchInput]);

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);

      if (searchValue === 0) {
        dispatch({
          type: NOTICE_LIST_REQUEST,
          data: {
            type: "커뮤니티",
            page: changePage,
            title: searchInput.value,
          },
        });
      } else {
        dispatch({
          type: NOTICE_LIST_REQUEST,
          data: {
            type: "커뮤니티",
            page: changePage,
            content: searchInput.value,
          },
        });
      }
    },
    [currentPage, searchValue]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>iCAST | 커뮤니티</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`calc(100vh - 137px)`} ju={`flex-start`}>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />

              {viewType === "list" && (
                <>
                  <Wrapper
                    wrap={`nowrap`}
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={width < 900 ? `17px` : `20px`}
                    fontWeight={`700`}
                  >
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png`}
                      width={`14px`}
                      margin={`0 6px 0 0`}
                    />
                    기관형 과학기술인 협동조합 커뮤니티 자유게시판
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 20px`}>
                    <CustomSelect width={`90px`}>
                      <Select
                        defaultValue={0}
                        onChange={searchValueToggle}
                        value={searchValue}
                      >
                        <Select.Option value={0}>제목</Select.Option>
                        <Select.Option value={1}>내용</Select.Option>
                      </Select>
                    </CustomSelect>
                    <TextInput
                      type="text"
                      placeholder="검색어를 입력해주세요."
                      width={width < 900 ? `150px` : `230px`}
                      height={`40px`}
                      margin={`0 10px`}
                      {...searchInput}
                      onKeyDown={(e) => e.keyCode === 13 && searchHandler()}
                    />
                    <CommonButton
                      width={`90px`}
                      height={`40px`}
                      fontSize={`16px`}
                      onClick={searchHandler}
                    >
                      검색하기
                    </CommonButton>
                  </Wrapper>
                  <OpBoard
                    data={notices.notices}
                    maxPage={maxPage}
                    currentPage={currentPage}
                    otherPageCall={otherPageCall}
                    boardType="커뮤니티"
                  />
                </>
              )}
              {viewType === "write" && <OpWrite />}
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
        type: "커뮤니티",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Community;

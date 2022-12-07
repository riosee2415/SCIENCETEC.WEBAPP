import React, { useCallback, useEffect, useState } from "react";
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
import { Form, Select } from "antd";
import OpBoard from "../../components/OpBoard";
import OpWrite from "../../components/OpWrite";
import OpDetail from "../../components/OpDetail";
import {
  NOTICE_DETAIL_REQUEST,
  NOTICE_LIST_REQUEST,
  SET_TEMP_TYPE,
} from "../../reducers/notice";
import { useRouter } from "next/router";

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: row;

  & .ant-form-item {
    margin: 0;
  }
`;

const Reference = () => {
  ////// GLOBAL STATE //////
  const { viewType, notices, maxPage } = useSelector((state) => state.notice);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [searchForm] = Form.useForm();

  const [searchType, setSearchType] = useState("전체");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
              boardType: "자료실",
              viewType: "detail",
            },
          });
        }, 500);
      } else {
        dispatch({
          type: NOTICE_LIST_REQUEST,
          data: {
            type: "자료실",
            title: searchType === "제목" ? searchTitle : null,
            content: searchType === "내용" ? searchTitle : null,
            page: currentPage,
          },
        });
      }
    }
  }, [router.query, searchType, searchTitle, currentPage]);
  ////// TOGGLE //////
  ////// HANDLER //////

  const searchTypeHandler = useCallback(
    (type) => {
      setSearchType(type);
      setCurrentPage(1);
    },
    [searchType, currentPage]
  );

  const searchTitleFinish = useCallback(
    (data) => {
      if (searchType === "전체") {
        return;
      }
      setSearchTitle(data.searchTitle);
      setCurrentPage(1);
    },
    [searchType, searchTitle, currentPage]
  );

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
        <title>iCAST | 자료실</title>
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
                    기관형 과학기술인 협동조합 자료실
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 20px`}>
                    <CustomSelect width={`90px`}>
                      <Select
                        placeholder="전체"
                        value={searchType}
                        onChange={searchTypeHandler}
                      >
                        <Select.Option value="전체">전체</Select.Option>
                        <Select.Option value="제목">제목</Select.Option>
                        <Select.Option value="내용">내용</Select.Option>
                      </Select>
                    </CustomSelect>
                    <CustomForm form={searchForm} onFinish={searchTitleFinish}>
                      <Form.Item name="searchTitle">
                        <TextInput
                          type="text"
                          placeholder="검색어를 입력해주세요."
                          width={width < 900 ? `150px` : `230px`}
                          height={`40px`}
                          margin={`0 10px`}
                          readOnly={searchType === "전체"}
                        />
                      </Form.Item>
                      <CommonButton
                        width={`90px`}
                        height={`40px`}
                        fontSize={`16px`}
                        htmlType="submit"
                      >
                        검색하기
                      </CommonButton>
                    </CustomForm>
                  </Wrapper>
                  <OpBoard
                    data={notices.notices}
                    maxPage={maxPage}
                    currentPage={currentPage}
                    otherPageCall={otherPageCall}
                    boardType="자료실"
                  />
                </>
              )}
              {/* {viewType === "write" && <OpWrite />} */}
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

export default Reference;

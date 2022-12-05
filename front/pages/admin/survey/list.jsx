import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { Tabs, Popover, message, Table, Button, Popconfirm, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT_LOG_REQUEST } from "../../../reducers/accept";
import {
  LOAD_MY_INFO_REQUEST,
  USER_MAIN_REQUEST,
} from "../../../reducers/user";
import { items } from "../../../components/AdminLayout";

import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  HomeText,
  Text,
  GuideUl,
  OtherMenu,
  GuideLi,
  Wrapper,
  PopWrapper,
  ATag,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import useWidth from "../../../hooks/useWidth";
import {
  SURVEY_USER_DETAIL_REQUEST,
  SURVEY_USER_LIST_REQUEST,
} from "../../../reducers/survey";

import { CSVLink } from "react-csv";

const DownloadBtn = styled(CSVLink)`
  width: 200px;
  height: 25px;
  margin: 0 0 0 10px;
  border-radius: 3px;

  background: ${(props) => props.theme.subTheme3_C};
  color: ${(props) => props.theme.white_C};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: 0.4s;
`;

const AcceptLogs = () => {
  ////// HOOKS //////

  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);
  const { surveyUserList, surveyUserDetail } = useSelector(
    (state) => state.survey
  );

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [level1, setLevel1] = useState("설문조사관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  // 상세보기 모달
  const [dModal, setDModal] = useState(false);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  ////// USEEFFECT //////

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight7)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  ////// TOGGLE //////
  const dModalToggle = useCallback(
    (data) => {
      if (data) {
        dispatch({
          type: SURVEY_USER_DETAIL_REQUEST,
          data: {
            id: data.id,
          },
        });
      }

      setDModal((prev) => !prev);
    },
    [dModal]
  );

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형",
      dataIndex: "viewSurveyType",
    },
    {
      title: "제출자",
      dataIndex: "username",
    },
    {
      title: "상세보기",
      render: (data) => (
        <Button size="small" type="primary" onClick={() => dModalToggle(data)}>
          상세보기
        </Button>
      ),
    },
    {
      title: "처리완료",
      render: (data) => (
        <Popconfirm
          title="처리완료 하시겠습니까?"
          okText="처리"
          cancelText="취소"
        >
          <Button size="small" type="primary">
            처리완료
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "제출일",
      dataIndex: "viewCreatedAt",
    },
  ];

  const headers = [
    { label: "제출자", key: "username" },
    { label: "제출일", key: "viewCreatedAt" },
    { label: "유형", key: "viewSurveyType" },
    { label: "질문", key: "questionName" },
    { label: "답변", key: "content" },
  ];

  return (
    <>
      <AdminLayout>
        {/* MENU TAB */}
        <Wrapper
          height={`30px`}
          bgColor={Theme.lightGrey_C}
          dr={`row`}
          ju={`flex-start`}
          al={`center`}
          padding={`0px 15px`}
          color={Theme.grey_C}
        >
          <HomeText
            margin={`3px 20px 0px 20px`}
            onClick={() => moveLinkHandler("/admin")}
          >
            <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
            메인
          </HomeText>
          <RightOutlined />
          <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
          <RightOutlined />
          <Popover content={content}>
            <HomeText cur={true} margin={`3px 20px 0px 20px`}>
              {level2}
            </HomeText>
          </Popover>
        </Wrapper>

        {/* GUIDE */}
        <Wrapper margin={`10px 0px 0px 10px`}>
          <GuideUl>
            <GuideLi isImpo={true}>
              해당 메뉴에서 홈페이지에 접속하 회원의 통계를 확인 할 수 있습니다.
            </GuideLi>
            <GuideLi isImpo={true}>
              30일 이전의 통계를 원하실 시 개발사에 문의해주세요.
            </GuideLi>
          </GuideUl>
        </Wrapper>

        <Wrapper padding={`0px 50px`}>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={columns}
            dataSource={surveyUserList ? surveyUserList : []}
            size="small"
          />
        </Wrapper>

        <Modal
          title="상세보기"
          visible={dModal}
          footer={null}
          width="700px"
          onCancel={() => dModalToggle(null)}
        >
          {surveyUserDetail && (
            <Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                <Text fontSize={`16px`} fontWeight={`600`}>
                  제출자
                </Text>
              </Wrapper>

              {/* 유형 */}
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                margin={`0 0 5px`}
              >
                <Text
                  width="120px"
                  bgColor={Theme.lightGrey2_C}
                  textAlign="center"
                >
                  유형
                </Text>
                <Text width="calc(100% - 120px)" padding={`0 0 0 5px`}>
                  {surveyUserDetail.detailData.viewSurveyType}
                </Text>
              </Wrapper>

              {/* 제출자 */}
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                margin={`0 0 5px`}
              >
                <Text
                  width="120px"
                  bgColor={Theme.lightGrey2_C}
                  textAlign="center"
                >
                  제출자
                </Text>
                <Text width="calc(100% - 120px)" padding={`0 0 0 5px`}>
                  {surveyUserDetail.detailData.username}
                </Text>
              </Wrapper>

              {/* 제출일 */}
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                margin={`0 0 5px`}
              >
                <Text
                  width="120px"
                  bgColor={Theme.lightGrey2_C}
                  textAlign="center"
                >
                  제출일
                </Text>
                <Text width="calc(100% - 120px)" padding={`0 0 0 5px`}>
                  {surveyUserDetail.detailData.viewCreatedAt}
                </Text>
              </Wrapper>

              <Wrapper al={`flex-start`} margin={`20px 0 10px`}>
                <Text fontSize={`16px`} fontWeight={`600`}>
                  제출내용
                </Text>
              </Wrapper>

              {surveyUserDetail.questionList.map((data) => {
                return (
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    margin={`0 0 5px`}
                  >
                    <Text
                      width="120px"
                      height={`100%`}
                      bgColor={Theme.lightGrey2_C}
                      textAlign="center"
                      margin={`0 5px 0 0`}
                    >
                      {data.questionName}
                    </Text>
                    {data.content.trim().length === 0 ? (
                      data.file ? (
                        <ATag width={`auto`} type="download" href={data.file}>
                          <Button size="small" type="primary">
                            다운로드
                          </Button>
                        </ATag>
                      ) : (
                        "첨부파일이 없습니다."
                      )
                    ) : (
                      data.content
                    )}
                  </Wrapper>
                );
              })}
            </Wrapper>
          )}

          {surveyUserDetail && (
            <Wrapper al={`flex-end`} margin={`20px 0 0`}>
              <DownloadBtn
                filename={`${surveyUserDetail.detailData.viewSurveyType}-${surveyUserDetail.detailData.username}.csv`}
                headers={headers}
                data={surveyUserDetail.questionList.map((data) => ({
                  username: surveyUserDetail.detailData.username,
                  viewCreatedAt: surveyUserDetail.detailData.viewCreatedAt,
                  viewSurveyType: surveyUserDetail.detailData.viewSurveyType,
                  questionName: data.questionName,
                  content:
                    data.content.trim().length === 0
                      ? data.file
                        ? data.file
                        : ""
                      : data.content,
                }))}
              >
                엑셀 출력
              </DownloadBtn>
            </Wrapper>
          )}
        </Modal>
      </AdminLayout>
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
      type: SURVEY_USER_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default AcceptLogs;

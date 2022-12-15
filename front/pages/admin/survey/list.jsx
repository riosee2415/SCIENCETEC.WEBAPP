import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import {
  Tabs,
  Popover,
  message,
  Table,
  Button,
  Popconfirm,
  Modal,
  Select,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT_LOG_REQUEST } from "../../../reducers/accept";
import {
  LOAD_MY_INFO_REQUEST,
  USERLIST_REQUEST,
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
  SURVEY_USER_UPDATE_REQUEST,
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

  const { me, users, st_loadMyInfoDone } = useSelector((state) => state.user);
  const {
    surveyUserList,
    surveyUserDetail,
    //
    st_surveyUserUpdateLoading,
    st_surveyUserUpdateDone,
    st_surveyUserUpdateError,
  } = useSelector((state) => state.survey);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [level1, setLevel1] = useState("설문조사관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  // 검색
  const [userIdValue, setUserIdValue] = useState(null);
  const [typeValue, setTypeValue] = useState(0);
  const [completeValue, setCompleteValue] = useState(0);

  // 상세보기 모달
  const [dModal, setDModal] = useState(false);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          data.useYn && (
            <OtherMenu
              key={data.link}
              onClick={() => moveLinkHandler(data.link)}
            >
              {data.name}
            </OtherMenu>
          )
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

  // 리스트

  useEffect(() => {
    dispatch({
      type: SURVEY_USER_LIST_REQUEST,
      data: {
        userId: userIdValue,
        type: typeValue,
        isCompleted: completeValue,
      },
    });
  }, [userIdValue, typeValue, completeValue]);

  // 처리완료

  useEffect(() => {
    if (st_surveyUserUpdateDone) {
      dispatch({
        type: SURVEY_USER_LIST_REQUEST,
      });

      return message.success("처리완료 되었습니다.");
    }

    if (st_surveyUserUpdateError) {
      return message.error(st_surveyUserUpdateError);
    }
  }, [st_surveyUserUpdateDone, st_surveyUserUpdateError]);

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
  // 검색
  const userIdValueHandler = useCallback(
    (data) => {
      setUserIdValue(data);
    },
    [userIdValue]
  );

  const typeValueHandler = useCallback(
    (data) => {
      setTypeValue(data);
    },
    [typeValue]
  );

  const completeValueHandler = useCallback(
    (data) => {
      setCompleteValue(data);
    },
    [completeValue]
  );

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 처리완료
  const surveyCompleteHandler = useCallback((data) => {
    dispatch({
      type: SURVEY_USER_UPDATE_REQUEST,
      data: {
        id: data.id,
        username: data.username,
      },
    });
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
      title: "상세보기",
      render: (data) => (
        <Button size="small" type="primary" onClick={() => dModalToggle(data)}>
          상세보기
        </Button>
      ),
    },
    {
      title: "처리완료",
      render: (data) =>
        data.isCompleted ? (
          "처리완료"
        ) : (
          <Popconfirm
            title="처리완료 하시겠습니까?"
            okText="처리"
            cancelText="취소"
            onConfirm={() => surveyCompleteHandler(data)}
          >
            <Button
              size="small"
              type="primary"
              loading={st_surveyUserUpdateLoading}
            >
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
              해당 메뉴에서 회원이 제출한 설문조사를 확인할 수 있습니다.
            </GuideLi>
            <GuideLi isImpo={true}>
              회원, 유형, 처리여부를 통해 검색할 수 있습니다.
            </GuideLi>
            <GuideLi isImpo={true}>
              처리 확인시 변경이 불가하니 유의해 주시기 바랍니다.
            </GuideLi>
          </GuideUl>
        </Wrapper>

        {/* TAB */}
        <Wrapper padding={`10px`} dr={`row`} ju="flex-start">
          <Wrapper dr={`row`} ju={`flex-start`}>
            <Select
              size="small"
              placeholder="회원을 선택해주세요."
              style={{ width: "200px", margin: "0 5px 0 0" }}
              onChange={userIdValueHandler}
            >
              {users &&
                users.map((data) => {
                  return (
                    <Select.Option value={data.id}>
                      {data.username}
                    </Select.Option>
                  );
                })}
            </Select>
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0`}>
            <Button
              type={typeValue === 0 ? "primary" : "default"}
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => typeValueHandler(0)}
            >
              전체
            </Button>

            <Button
              type={typeValue === 1 ? "primary" : "default"}
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => typeValueHandler(1)}
            >
              사업수행 현황조사
            </Button>
            <Button
              type={typeValue === 2 ? "primary" : "default"}
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => typeValueHandler(2)}
            >
              사업 수요조사
            </Button>
            <Button
              type={typeValue === 3 ? "primary" : "default"}
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => typeValueHandler(3)}
            >
              기술매칭서비스 신청
            </Button>
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`}>
            <Button
              type={completeValue === 0 ? "primary" : "default"}
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => completeValueHandler(0)}
            >
              전체
            </Button>

            <Button
              type={completeValue === 1 ? "primary" : "default"}
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => completeValueHandler(1)}
            >
              확인 처리
            </Button>

            <Button
              type={completeValue === 2 ? "primary" : "default"}
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => completeValueHandler(2)}
            >
              확인 미처리
            </Button>
          </Wrapper>
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

    context.store.dispatch({
      type: USERLIST_REQUEST,
    });

    context.store.dispatch({
      type: USER_MAIN_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default AcceptLogs;

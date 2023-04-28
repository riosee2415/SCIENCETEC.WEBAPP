import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Popover,
  Switch,
  Table,
  message,
} from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
  ModalBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  PlusOutlined,
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  FESTIVAL_ADMIN_LIST_REQUEST,
  FESTIVAL_CREATE_REQUEST,
  FESTIVAL_DELETE_REQUEST,
  FESTIVAL_STATE_RESET,
  FESTIVAL_UPDATE_REQUEST,
} from "../../../reducers/festival";
import moment from "moment";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.basicTheme_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.basicTheme_C : props.theme.lightGrey2_C};
`;

const Festival = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    festivalAdminList,
    //
    st_festivalAdminListLoading,
    st_festivalAdminListError,
    //
    st_festivalCreateLoading,
    st_festivalCreateDone,
    st_festivalCreateError,
    //
    st_festivalUpdateLoading,
    st_festivalUpdateDone,
    st_festivalUpdateError,
    //
    st_festivalDeleteLoading,
    st_festivalDeleteDone,
    st_festivalDeleteError,
  } = useSelector((state) => state.festival);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("설문조사관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

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

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  const [infoForm] = Form.useForm();

  const [currentData, setCurrentData] = useState(null);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

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
    // 리스트 후처리
    if (st_festivalAdminListError) {
      message.error(st_festivalAdminListError);
      dispatch({
        type: FESTIVAL_STATE_RESET,
      });
      return;
    }

    // 생성 후처리
    if (st_festivalCreateDone) {
      dispatch({
        type: FESTIVAL_ADMIN_LIST_REQUEST,
      });

      message.success("정상적으로 생성되었습니다.");

      dispatch({
        type: FESTIVAL_STATE_RESET,
      });
      return;
    }

    if (st_festivalCreateError) {
      message.error(st_festivalCreateError);
      dispatch({
        type: FESTIVAL_STATE_RESET,
      });
      return;
    }

    // 수정 후처리
    if (st_festivalUpdateDone) {
      dispatch({
        type: FESTIVAL_ADMIN_LIST_REQUEST,
      });
      message.success("정상적으로 수정되었습니다.");

      dispatch({
        type: FESTIVAL_STATE_RESET,
      });
      return;
    }

    // 삭제 후처리
    if (st_festivalUpdateError) {
      dispatch({
        type: FESTIVAL_STATE_RESET,
      });
      message.error(st_festivalUpdateError);
      return;
    }

    if (st_festivalDeleteDone) {
      dispatch({
        type: FESTIVAL_ADMIN_LIST_REQUEST,
      });
      message.success("정상적으로 삭제되었습니다.");

      dispatch({
        type: FESTIVAL_STATE_RESET,
      });
      return;
    }
    if (st_festivalDeleteError) {
      dispatch({
        type: FESTIVAL_STATE_RESET,
      });
      message.error(st_festivalDeleteError);
      return;
    }
  }, [
    st_festivalAdminListError,
    st_festivalCreateDone,
    st_festivalCreateError,
    st_festivalUpdateDone,
    st_festivalUpdateError,
    st_festivalDeleteDone,
    st_festivalDeleteError,
  ]);

  ////// HANDLER //////

  ////// DATAVIEW //////

  // 선택
  const beforeSetDataHandler = useCallback(
    (data) => {
      setCurrentData(data);

      infoForm.setFieldsValue({
        festivalName: data.festivalName,
        festivalStartDate: moment(data.festivalStartDate),
        festivalEndDate: moment(data.festivalEndDate),
        festivalLocation: data.festivalLocation,
        schedule: data.schedule,
        onOff: data.onOff,
        createdAt: data.viewCreatedAt,
        updatedAt: data.viewUpdatedAt,
      });
    },
    [currentData]
  );

  // 생성
  const createFestivalHandler = useCallback(() => {
    dispatch({
      type: FESTIVAL_CREATE_REQUEST,
    });
  }, []);

  // 수정
  const updateFestivalHandler = useCallback(
    (data) => {
      if (!currentData) {
        return message.error("잠시 후 다시 시도해주세요.");
      }

      dispatch({
        type: FESTIVAL_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          festivalName: data.festivalName,
          festivalStartDate: data.festivalStartDate.format("YYYY-MM-DD"),
          festivalEndDate: data.festivalEndDate.format("YYYY-MM-DD"),
          festivalLocation: data.festivalLocation,
          schedule: data.schedule,
          onOff: data.onOff,
        },
      });
    },
    [currentData]
  );

  // 삭제
  const deleteFestivalHandler = useCallback(() => {
    if (!currentData) {
      return message.error("잠시 후 다시 시도해주세요.");
    }

    dispatch({
      type: FESTIVAL_DELETE_REQUEST,
      data: {
        id: currentData.id,
      },
    });
  }, [currentData]);

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "행사명",
      dataIndex: "festivalName",
    },
    {
      title: "행사 시작일",
      dataIndex: "viewFestivalStartDate",
    },
    {
      title: "행사 마감일",
      dataIndex: "viewFestivalEndDate",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
      ),
    },
  ];

  return (
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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>수요조사 행사에 대해 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            사용여부를 ON 하실시 바로 적용되시 주의하여주시기 바랍니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey2_C}`}
        >
          <Wrapper al={`flex-end`}>
            <Button
              size="small"
              type="primary"
              onClick={createFestivalHandler}
              loading={st_festivalCreateLoading}
            >
              <PlusOutlined />
              생성
            </Button>

            <Table
              style={{ width: "100%" }}
              rowKey="num"
              loading={st_festivalAdminListLoading}
              size="small"
              columns={columns}
              dataSource={festivalAdminList}
              onRow={(record, index) => {
                return {
                  onClick: (e) => beforeSetDataHandler(record),
                };
              }}
            />
          </Wrapper>
        </Wrapper>

        <Wrapper
          width={`calc(50% - 10px)`}
          padding="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey2_C}`}
        >
          {currentData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  수요조사설문 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: `100%` }}
                onFinish={updateFestivalHandler}
              >
                <Form.Item
                  name="festivalName"
                  label="행사명"
                  rules={[
                    { required: true, message: "행사명을 입력해주세요." },
                  ]}
                >
                  <Input size="small" placeholder="행사명을 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="festivalStartDate"
                  label="행사 시작일"
                  rules={[
                    { required: true, message: "행사 시작일을 선택해주세요." },
                  ]}
                >
                  <DatePicker
                    style={{ width: `100%` }}
                    size="small"
                    placeholder="행사 시작일을 선택해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="festivalEndDate"
                  label="행사 마감일"
                  rules={[
                    { required: true, message: "행사 마감일을 입력해주세요." },
                  ]}
                >
                  <DatePicker
                    style={{ width: `100%` }}
                    size="small"
                    placeholder="행사 마감일을 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="festivalLocation"
                  label="장소"
                  rules={[{ required: true, message: "장소를 입력해주세요." }]}
                >
                  <Input size="small" placeholder="장소를 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="schedule"
                  label="참가 일정"
                  rules={[
                    { required: true, message: "참가일정을 입력해주세요." },
                  ]}
                >
                  <Input size="small" placeholder="참가일정을 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="onOff"
                  label="사용여부"
                  valuePropName="checked"
                >
                  <Switch size="small" />
                </Form.Item>

                <Form.Item name="createdAt" label="생성일">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item name="updatedAt" label="최근수정일">
                  <Input size="small" readOnly />
                </Form.Item>

                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    okText="삭제"
                    cancelText="취소"
                    onConfirm={deleteFestivalHandler}
                  >
                    <ModalBtn
                      size="small"
                      type="danger"
                      loading={
                        st_festivalUpdateLoading || st_festivalDeleteLoading
                      }
                    >
                      삭제
                    </ModalBtn>
                  </Popconfirm>

                  <ModalBtn
                    size="small"
                    type="primary"
                    loading={
                      st_festivalUpdateLoading || st_festivalDeleteLoading
                    }
                    htmlType="submit"
                  >
                    수정
                  </ModalBtn>
                </Wrapper>
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey2_C}
                margin={`30px 0px`}
              ></Wrapper>
            </Wrapper>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 답변 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>
    </AdminLayout>
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
      type: FESTIVAL_ADMIN_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Festival);

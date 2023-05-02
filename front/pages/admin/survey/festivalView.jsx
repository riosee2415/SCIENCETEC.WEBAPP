import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Popover, Select, Table } from "antd";
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
  FESTIVAL_TICKET_LIST_REQUEST,
} from "../../../reducers/festival";

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

const FestivalView = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

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

  ////// GOLBAL STATE //////

  const { festivalTicketList, festivalAdminList } = useSelector(
    (state) => state.festival
  );

  ////// HOOKS //////

  const [currentData, setCurrentData] = useState(null);
  const [infoForm] = Form.useForm();

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

  ////// HANDLER //////

  const beforeSetDataHandler = useCallback(
    (data) => {
      setCurrentData(data);
      infoForm.setFieldsValue({
        festivalName: data.festivalName,
        festivalLocation: data.festivalLocation,
        schedule: data.schedule,
        viewConcatDate: data.viewConcatDate,
        participantName: data.participantName,
        belong: data.belong,
        jobPosition: data.jobPosition,
        mobile: data.mobile,
        viewCreatedAt: data.viewCreatedAt,
      });
    },
    [currentData]
  );

  const festivalSelectHandler = useCallback((data) => {
    dispatch({
      type: FESTIVAL_TICKET_LIST_REQUEST,
      data: {
        FestivalId: data,
      },
    });
  }, []);

  ////// DATAVIEW //////

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
      title: "참가자",
      dataIndex: "participantName",
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
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
          <GuideLi>행사를 선택시 신청 리스트가 나옵니다.</GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey2_C}`}
        >
          <Wrapper al={`flex-start`}>
            <Select
              size="small"
              placeholder="행사를 선택해주세요."
              style={{ width: "200px", margin: "0 5px 0 0" }}
              onChange={festivalSelectHandler}
            >
              {festivalAdminList &&
                festivalAdminList.map((data, idx) => {
                  return (
                    <Select.Option value={data.id} key={idx}>
                      {data.festivalName}
                    </Select.Option>
                  );
                })}
            </Select>
            <Table
              style={{ width: "100%" }}
              rowKey="num"
              size="small"
              columns={columns}
              dataSource={festivalTicketList ? festivalTicketList : []}
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
                onFinish={festivalTicketList}
              >
                <Form.Item name="festivalName" label="행사명">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="festivalLocation" label="장소">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="schedule" label="참가 일정">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="viewConcatDate" label="행사 일시">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="participantName" label="참가자">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="belong" label="소속">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="jobPosition" label="직위">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="mobile" label="연락처">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="viewCreatedAt" label="신청일">
                  <Input size="small" readOnly />
                </Form.Item>
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

export default withRouter(FestivalView);

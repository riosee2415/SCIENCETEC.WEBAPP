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
import { TABLE_SURVEY_LIST_REQUEST } from "../../../reducers/tableSurvey";

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

const TableSurvey = ({}) => {
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

  const {
    tableSurveyList,
    st_tableSurveyListLoading,
    st_tableSurveyListError,
  } = useSelector((state) => state.tableSurvey);

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

  const rangeChangeFun = (data) => {
    if (data === 1) {
      return "전혀 그렇지 않다";
    } else if (data === 2) {
      return "그렇지 않다";
    } else if (data === 3) {
      return "보통이다";
    } else if (data === 4) {
      return "그렇다";
    } else if (data === 5) {
      return "매우 그렇다";
    }
  };

  const beforeSetDataHandler = useCallback(
    (data) => {
      setCurrentData(data);
      infoForm.setFieldsValue({
        combiName: data.combiName,
        businessType: data.businessType,
        subjectName: data.subjectName,
        businessRepName: data.businessRepName,
        estimateDate: data.estimateDate,
        workRepName: data.workRepName,
        corporationCnt: data.corporationCnt,
        personalCnt: data.personalCnt,
        businessPriceLastYear: data.businessPriceLastYear,
        businessPriceThisYear: data.businessPriceThisYear,
        plan: data.plan,
        completePercentage: data.completePercentage,
        pExpense1: data.pExpense1,
        pExpense2: data.pExpense2,
        pFacility1: data.pFacility1,
        pFacility2: data.pFacility2,
        pMaterial1: data.pMaterial1,
        pMaterial2: data.pMaterial2,
        pResearch1: data.pResearch1,
        pResearch2: data.pResearch2,
        pIndirect1: data.pIndirect1,
        pIndirect2: data.pIndirect2,
        range1: rangeChangeFun(data.range1),
        range2: rangeChangeFun(data.range2),
        range3: rangeChangeFun(data.range3),
        range4: rangeChangeFun(data.range4),
        range5: rangeChangeFun(data.range5),
        range6: rangeChangeFun(data.range6),
        range7: rangeChangeFun(data.range7),
        range8: rangeChangeFun(data.range8),
        range9: rangeChangeFun(data.range9),
        range10: rangeChangeFun(data.range10),
        range11: rangeChangeFun(data.range11),
        viewCreatedAt: data.viewCreatedAt,
      });
    },
    [currentData]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "조합명",
      dataIndex: "combiName",
    },
    {
      title: "사업구분",
      dataIndex: "businessType",
    },
    {
      title: "과제명",
      dataIndex: "subjectName",
    },
    {
      title: "참여일",
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
          <GuideLi>(현) 수요조사설문리스트를 확인할 수 있습니다.</GuideLi>
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
            <Table
              style={{ width: "100%" }}
              rowKey="num"
              size="small"
              columns={columns}
              dataSource={tableSurveyList ? tableSurveyList : []}
              loading={st_tableSurveyListLoading}
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

              <Form form={infoForm} style={{ width: `100%` }} layout="vertical">
                <Form.Item name="combiName" label="조합명">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="businessType" label="사업구분">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="subjectName" label="과제명">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="businessRepName" label="사업책임자">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="estimateDate" label="설립년도">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="workRepName" label="실무책임자">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="corporationCnt" label="법인 조합원수">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="personalCnt" label="개인 조합원수">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="businessPriceLastYear" label="매출액 (전년)">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="businessPriceThisYear"
                  label="매출액 (금년(추정))"
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="plan" label="계획">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="completePercentage" label="달성률">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pExpense1" label="인건비 1">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pExpense2" label="인건비 2">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pFacility1" label="시설장비비 1">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pFacility2" label="시설장비비 2">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pMaterial1" label="재료비 1">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pMaterial2" label="재료비 2">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pResearch1" label="연구활동비 1">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pResearch2" label="연구활동비 2">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pIndirect1" label="간접비 1">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="pIndirect2" label="간접비 2">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range1"
                  label="1. 본 지원사업이 귀 협동조합의 기술사업화 추진 등에 도움이 되었다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range2"
                  label="2. 본 지원사업이 귀 협동조합의 참여 전 요구 및 기대 등에 부합하였다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range3"
                  label="3. 본 지원사업의 지원내역(신규, 성장/ 시제품 개발 지원, 기술 사업화 등)에 만족한다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range4"
                  label="4. 본 지원사업은 과학기술 분야 발전 및 협동조합 육성 등에 있어 기여하는 바가 있다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range5"
                  label="5. 본 지원사업은 지속적으로 추진될 필요가 있다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range6"
                  label="6. 추후에도 지원사업에 참여 기회가 주어진다면 재참여할 의향이 있다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range7"
                  label=" 7. 본 지원사업을 타 협동조합 등에게 추천할 의향이 있다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range8"
                  label="8. 본 지원사업 관련 전문기관(한국연구재단)의 지원에 만족한다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range9"
                  label="9. 본 지원사업 원영주관기관의 지원에 만족한다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range10"
                  label="10. 본 지원 사업 운영주관기관의 워크숍 및 지원 프로그램에 만족한다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="range11"
                  label="11. 상기 요건들을 모두 고려할 때, 사업 성과 등에 전반적으로 만족한다."
                  colon={false}
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="viewCreatedAt" label="참여일">
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
      type: TABLE_SURVEY_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(TableSurvey);

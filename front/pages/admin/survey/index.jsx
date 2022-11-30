import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Popover,
  Radio,
  Select,
  Table,
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
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  INNER_RESET,
  SURVEY_INNER_CREATE_REQUEST,
  SURVEY_INNER_DELETE_REQUEST,
  SURVEY_INNER_LIST_REQUEST,
  SURVEY_INNER_UPDATE_REQUEST,
  SURVEY_QUES_CREATE_REQUEST,
  SURVEY_QUES_DELETE_REQUEST,
  SURVEY_QUES_LIST_REQUEST,
  SURVEY_QUES_UPDATE_REQUEST,
} from "../../../reducers/survey";

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

const Question = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const {
    surveyQuesList,
    surveyInnerList,

    st_surveyQuesCreateDone,
    st_surveyQuesCreateError,

    st_surveyQuesUpdateDone,
    st_surveyQuesUpdateError,

    st_surveyQuesDeleteDone,
    st_surveyQuesDeleteError,

    st_surveyInnerCreateDone,
    st_surveyInnerCreateError,

    st_surveyInnerUpdateDone,
    st_surveyInnerUpdateError,

    st_surveyInnerDeleteDone,
    st_surveyInnerDeleteError,
  } = useSelector((state) => state.survey);

  const router = useRouter();

  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("서버관리");
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

  const [quesCreateForm] = Form.useForm();
  const [quesUpdateForm] = Form.useForm();

  const [innerCreateForm] = Form.useForm();
  const [innerUpdateForm] = Form.useForm();

  const [currentData, setCurrentData] = useState(null); // 질문 데이터
  const [innerData, setInnerData] = useState(null); // 답변 데이터

  const [qcModal, setQCModal] = useState(false); // 질문 등록 모달
  const [icModal, setICModal] = useState(false); // 답변 등록 모달

  const [typeValue, setTypeValue] = useState(0);

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
    dispatch({
      type: SURVEY_QUES_LIST_REQUEST,
      data: {
        surveyId: typeValue,
      },
    });
  }, [typeValue]);

  // ********************** 질문 생성 후처리 *************************
  useEffect(() => {
    if (st_surveyQuesCreateDone) {
      message.success("질문이 생성되었습니다.");

      quesCreateForm.resetFields();
      quesCreateModalToggle();

      dispatch({
        type: SURVEY_QUES_LIST_REQUEST,
        data: {
          surveyId: typeValue,
        },
      });
    }

    if (st_surveyQuesCreateError) {
      return message.error(st_surveyQuesCreateError);
    }
  }, [st_surveyQuesCreateDone, st_surveyQuesCreateError]);

  // ********************** 질문 수정 후처리 *************************
  useEffect(() => {
    if (st_surveyQuesUpdateDone) {
      message.success("질문이 수정되었습니다.");

      dispatch({
        type: SURVEY_QUES_LIST_REQUEST,
        data: {
          surveyId: typeValue,
        },
      });
    }

    if (st_surveyQuesUpdateError) {
      return message.error(st_surveyQuesUpdateError);
    }
  }, [st_surveyQuesUpdateDone, st_surveyQuesUpdateError]);

  // ********************** 질문 삭제 후처리 *************************
  useEffect(() => {
    if (st_surveyQuesDeleteDone) {
      message.success("질문이 삭제되었습니다.");

      setCurrentData(null);

      dispatch({
        type: SURVEY_QUES_LIST_REQUEST,
        data: {
          surveyId: typeValue,
        },
      });
    }

    if (st_surveyQuesDeleteError) {
      return message.error(st_surveyQuesDeleteError);
    }
  }, [st_surveyQuesDeleteDone, st_surveyQuesDeleteError]);

  // ********************** 답변 생성 후처리 *************************
  useEffect(() => {
    if (st_surveyInnerCreateDone) {
      message.success("답변이 생성되었습니다.");

      innerCreateForm.resetFields();
      innerCreateModalToggle();

      dispatch({
        type: SURVEY_INNER_LIST_REQUEST,
        data: {
          surveyQuestionId: currentData.id,
        },
      });
    }

    if (st_surveyInnerCreateError) {
      return message.error(st_surveyInnerCreateError);
    }
  }, [st_surveyInnerCreateDone, st_surveyInnerCreateError]);

  // ********************** 답변 수정 후처리 *************************
  useEffect(() => {
    if (st_surveyInnerUpdateDone) {
      message.success("답변이 수정되었습니다.");

      dispatch({
        type: SURVEY_INNER_LIST_REQUEST,
        data: {
          surveyQuestionId: currentData.id,
        },
      });
    }

    if (st_surveyInnerUpdateError) {
      return message.error(st_surveyInnerUpdateError);
    }
  }, [st_surveyInnerUpdateDone, st_surveyInnerUpdateError]);

  // ********************** 답변 삭제 후처리 *************************
  useEffect(() => {
    if (st_surveyInnerDeleteDone) {
      message.success("답변이 삭제되었습니다.");

      setInnerData(null);

      dispatch({
        type: SURVEY_INNER_LIST_REQUEST,
        data: {
          surveyQuestionId: currentData.id,
        },
      });
    }

    if (st_surveyInnerDeleteError) {
      return message.error(st_surveyInnerDeleteError);
    }
  }, [st_surveyInnerDeleteDone, st_surveyInnerDeleteError]);

  ////// TOGGLE //////

  const quesCreateModalToggle = useCallback(() => {
    setQCModal((prev) => !prev);
  }, [qcModal]);

  const innerCreateModalToggle = useCallback(() => {
    setICModal((prev) => !prev);
  }, [icModal]);

  ////// HANDLER //////

  const typeValueHandler = useCallback(
    (data) => {
      setTypeValue(data);
      setCurrentData(null);

      dispatch({
        type: INNER_RESET,
      });
    },
    [typeValue]
  );

  // 질문
  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);
      setInnerData(null);

      quesUpdateForm.setFieldsValue({
        surveyId: record.SurveyId,
        sort: record.sort,
        ques: record.value,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });

      dispatch({
        type: SURVEY_INNER_LIST_REQUEST,
        data: {
          surveyQuestionId: record.id,
        },
      });
    },
    [currentData, quesUpdateForm]
  );

  const quesCreateHandler = useCallback((data) => {
    dispatch({
      type: SURVEY_QUES_CREATE_REQUEST,
      data: {
        value: data.ques,
        sort: data.sort,
        surveyId: data.surveyId,
      },
    });
  }, []);

  const quesUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: SURVEY_QUES_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          value: data.ques,
          sort: data.sort,
        },
      });
    },
    [currentData]
  );

  const quesDeleteHandler = useCallback((data) => {
    dispatch({
      type: SURVEY_QUES_DELETE_REQUEST,
      data: {
        id: data.id,
        value: data.value,
      },
    });
  }, []);

  // 답변
  const innerSetDataHandler = useCallback(
    (record) => {
      setInnerData(record);

      innerUpdateForm.setFieldsValue({
        surveyQuestionId: record.SurveyQuestionId,
        innerType: record.innerType,
        sort: record.sort,
        questionValue: record.questionValue,
        placeholderValue: record.placeholderValue,

        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [innerData, innerUpdateForm]
  );

  const innerCreateHandler = useCallback((data) => {
    dispatch({
      type: SURVEY_INNER_CREATE_REQUEST,
      data: {
        surveyQuestionId: data.surveyQuestionId,
        innerType: data.innerType,
        sort: data.sort,
        questionValue: data.questionValue,
        placeholderValue: data.placeholderValue,
      },
    });
  }, []);

  const innerUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: SURVEY_INNER_UPDATE_REQUEST,
        data: {
          id: innerData.id,
          innerType: data.innerType,
          sort: data.sort,
          questionValue: data.questionValue,
          placeholderValue: data.placeholderValue,
        },
      });
    },
    [innerData]
  );

  const innerDeleteHandler = useCallback((data) => {
    dispatch({
      type: SURVEY_INNER_DELETE_REQUEST,
      data: {
        id: data.id,
        questionValue: data.questionValue,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "질문",
      dataIndex: "value",
    },
    {
      title: "순서",
      dataIndex: "sort",
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

    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title="정말 삭제하시겠습니까?"
          onConfirm={() => quesDeleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
  ];

  const innerCol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "답변유형",
      render: (data) => (
        <Text>
          {data.innerType === 1
            ? "주관식"
            : data.innerType === 2
            ? "장문"
            : "선택형"}
        </Text>
      ),
    },
    {
      title: "답변",
      dataIndex: "questionValue",
    },
    {
      title: "순서",
      dataIndex: "sort",
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
            active={parseInt(data.id) === (innerData && parseInt(innerData.id))}
          />
        </>
      ),
    },

    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title="정말 삭제하시겠습니까?"
          onConfirm={() => innerDeleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey2_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
          <GuideLi>
            로고 이미지는 [해더]로고와 [푸터]로고를 관리할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 3:2비율로 업로드해주세요. 이미지비율이 상이할 경우 화면에
            비정상적으로 보일 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* TAB */}
      <Wrapper padding={`10px`} dr={`row`} ju="flex-start">
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

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey2_C}`}
        >
          <Wrapper al="flex-end" margin={`0px 0px 5px 0px`}>
            <Button size="small" type="primary" onClick={quesCreateModalToggle}>
              질문 생성
            </Button>
          </Wrapper>

          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={surveyQuesList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />

          <Wrapper
            width="100%"
            height="1px"
            bgColor={Theme.lightGrey2_C}
            margin={`30px 0px`}
          ></Wrapper>

          {surveyInnerList ? (
            <>
              <Wrapper al="flex-end" margin={`0px 0px 5px 0px`}>
                <Button
                  size="small"
                  type="primary"
                  onClick={innerCreateModalToggle}
                >
                  답변 생성
                </Button>
              </Wrapper>
              <Table
                style={{ width: "100%" }}
                rowKey="num"
                columns={innerCol}
                dataSource={surveyInnerList}
                size="small"
                onRow={(record, index) => {
                  return {
                    onClick: (e) => innerSetDataHandler(record),
                  };
                }}
              />
            </>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              위의 질문 데이터를 선택하여 답변 데이터를 확인하세요.
            </Wrapper>
          )}
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
                  질문 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={quesUpdateForm}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                style={{ width: `100%` }}
                onFinish={quesUpdateHandler}
              >
                <Form.Item
                  label="질문 유형"
                  name="surveyId"
                  rules={[
                    {
                      required: true,
                      message: "질문 유형은 필수 선택사항 입니다.",
                    },
                  ]}
                >
                  <Select
                    size="small"
                    placeholder={"질문 유형을 선택해주세요."}
                  >
                    <Select.Option value={1}>사업수행 현황조사</Select.Option>
                    <Select.Option value={2}>사업 수요조사</Select.Option>
                    <Select.Option value={3}>기술매칭서비스 신청</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="질문"
                  name="ques"
                  rules={[
                    { required: true, message: "질문은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input
                    size="small"
                    allowClear
                    placeholder="질문을 입력해주세요."
                  />
                </Form.Item>

                <Form.Item
                  label="순서"
                  name="sort"
                  rules={[
                    { required: true, message: "순서은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input
                    size="small"
                    type={"number"}
                    allowClear
                    placeholder="순서를 입력해주세요."
                  />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey2_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey2_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근작업자" name="updator">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey2_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
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
              좌측 질문 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}

          {innerData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  답변 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={innerUpdateForm}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                style={{ width: `100%` }}
                onFinish={innerUpdateHandler}
              >
                <Form.Item
                  label="질문"
                  name="surveyQuestionId"
                  rules={[
                    {
                      required: true,
                      message: "질문은 필수 선택사항 입니다.",
                    },
                  ]}
                >
                  <Select
                    disabled
                    size="small"
                    placeholder={"질문을 선택해주세요."}
                  >
                    {surveyQuesList &&
                      surveyQuesList.map((data) => {
                        return (
                          <Select.Option key={data.id} value={data.id}>
                            {data.value}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="답변 유형"
                  name="innerType"
                  rules={[
                    {
                      required: true,
                      message: "답변 유형은 필수 선택사항 입니다.",
                    },
                  ]}
                >
                  <Radio.Group size="small">
                    <Radio value={1}>주관식</Radio>
                    <Radio value={2}>장문</Radio>
                    <Radio value={3}>선택형</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="답변" name="questionValue">
                  <Input
                    size="small"
                    allowClear
                    placeholder="답변을 입력해주세요."
                  />
                </Form.Item>

                <Form.Item label="안내문구" name="placeholderValue">
                  <Input
                    size="small"
                    allowClear
                    placeholder="안내문구을 입력해주세요."
                  />
                </Form.Item>

                <Form.Item
                  label="순서"
                  name="sort"
                  rules={[
                    { required: true, message: "순서은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input
                    size="small"
                    type={"number"}
                    allowClear
                    placeholder="순서를 입력해주세요."
                  />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey2_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey2_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근작업자" name="updator">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey2_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
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

      <Modal
        title="질문 생성"
        footer={null}
        visible={qcModal}
        width={`500px`}
        onCancel={quesCreateModalToggle}
      >
        <Form
          form={quesCreateForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={quesCreateHandler}
        >
          <Form.Item
            label="질문 유형"
            name="surveyId"
            rules={[
              { required: true, message: "질문 유형은 필수 선택사항 입니다." },
            ]}
          >
            <Select size="small" placeholder={"질문 유형을 선택해주세요."}>
              <Select.Option value={1}>사업수행 현황조사</Select.Option>
              <Select.Option value={2}>사업 수요조사</Select.Option>
              <Select.Option value={3}>기술매칭서비스 신청</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="질문"
            name="ques"
            rules={[
              { required: true, message: "질문은 필수 입력사항 입니다." },
            ]}
          >
            <Input size="small" allowClear placeholder="질문을 입력해주세요." />
          </Form.Item>

          <Form.Item
            label="순서"
            name="sort"
            rules={[
              { required: true, message: "순서은 필수 입력사항 입니다." },
            ]}
          >
            <Input
              size="small"
              type={"number"}
              allowClear
              placeholder="순서를 입력해주세요."
            />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              질문 생성
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      <Modal
        title="답변 생성"
        footer={null}
        visible={icModal}
        width={`500px`}
        onCancel={innerCreateModalToggle}
      >
        <Form
          form={innerCreateForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={innerCreateHandler}
        >
          <Form.Item
            label="질문"
            name="surveyQuestionId"
            rules={[
              {
                required: true,
                message: "질문은 필수 선택사항 입니다.",
              },
            ]}
          >
            <Select size="small" placeholder={"질문을 선택해주세요."}>
              {surveyQuesList &&
                surveyQuesList.map((data) => {
                  return (
                    <Select.Option key={data.id} value={data.id}>
                      {data.value}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            label="답변 유형"
            name="innerType"
            rules={[
              {
                required: true,
                message: "답변 유형은 필수 선택사항 입니다.",
              },
            ]}
          >
            <Radio.Group size="small">
              <Radio value={1}>주관식</Radio>
              <Radio value={2}>장문</Radio>
              <Radio value={3}>선택형</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="답변" name="questionValue">
            <Input size="small" allowClear placeholder="답변을 입력해주세요." />
          </Form.Item>

          <Form.Item label="안내문구" name="placeholderValue">
            <Input
              size="small"
              allowClear
              placeholder="안내문구을 입력해주세요."
            />
          </Form.Item>

          <Form.Item
            label="순서"
            name="sort"
            rules={[
              { required: true, message: "순서은 필수 입력사항 입니다." },
            ]}
          >
            <Input
              size="small"
              type={"number"}
              allowClear
              placeholder="순서를 입력해주세요."
            />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              질문 생성
            </Button>
          </Wrapper>
        </Form>
      </Modal>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Question);

import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, Popover, Select, message } from "antd";
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
import { LOAD_MY_INFO_REQUEST, USERLIST_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  MAIL_FILE_RESET,
  MAIL_FILE_UPLOAD_REQUEST,
  MAIL_SEND_REQUEST,
} from "../../../reducers/mailSend";

const Send = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    mailFilePath,
    //
    st_mailSendLoading,
    st_mailSendDone,
    st_mailSendError,
    //
    st_mailFileUploadLoading,
    st_mailFileUploadDone,
    st_mailFileUploadError,
  } = useSelector((state) => state.mailSend);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [filename, setFilename] = useState(null);

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

  const { users } = useSelector((state) => state.user);

  const fileRef = useRef();

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

  // 메일 발송
  useEffect(() => {
    if (st_mailSendDone) {
      infoForm.resetFields();

      setFilename(null);

      dispatch({
        type: MAIL_FILE_RESET,
        data: {
          mailFilePath: null,
        },
      });

      return message.success("메일이 발송되었습니다.");
    }

    if (st_mailSendError) {
      return message.error(st_mailSendError);
    }
  }, [st_mailSendDone, st_mailSendError]);

  // 파일 업로드
  useEffect(() => {
    if (st_mailFileUploadDone) {
      return message.success("파일이 업로드되었습니다.");
    }

    if (st_mailFileUploadError) {
      return message.error(st_mailFileUploadError);
    }
  }, [st_mailFileUploadDone, st_mailFileUploadError]);

  ////// HANDLER //////

  // 파일 업로드
  const fileRefClickHandler = useCallback((data) => {
    fileRef.current.click();
  }, []);

  const fileUploadHandler = useCallback(
    (e) => {
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        formData.append("file", file);
      });

      if (e.target.files[0]) {
        setFilename(e.target.files[0].name);
      }

      dispatch({
        type: MAIL_FILE_UPLOAD_REQUEST,
        data: formData,
      });
    },
    [filename]
  );

  // 파일 삭제
  const fileDelHandler = useCallback(() => {
    setFilename(null);

    dispatch({
      type: MAIL_FILE_RESET,
      data: {
        mailFilePath: null,
      },
    });
  }, [filename]);

  // 전송하기
  const sendHandler = useCallback(
    (data) => {
      console.log(data);

      dispatch({
        type: MAIL_SEND_REQUEST,
        data: {
          emails: data.sendType.find((value) => value === "email")
            ? data.users.map((data) => JSON.parse(data).email)
            : [],
          mobiles: data.sendType.find((value) => value === "sms")
            ? data.users.map((data) => ({
                mobile: JSON.parse(data).mobile.replace(/\-/gi, ""),
                name: JSON.parse(data).userId,
              }))
            : [],
          title: data.title,
          content: data.content,
          file: mailFilePath,
          filename: filename,
        },
      });
    },
    [mailFilePath, filename]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

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
          <GuideLi>화면 가이드안내 문구를 입력하세요.</GuideLi>
          <GuideLi isImpo={true}>
            화면 가이드안내 문구를 입력하세요. (RED COLOR)
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Form
        form={infoForm}
        style={{ width: `100%`, padding: `5px 20px` }}
        onFinish={sendHandler}
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 23 }}
      >
        <Form.Item
          name={`sendType`}
          label="전송방식"
          rules={[{ required: true, message: "전송방식을 선택해주세요." }]}
        >
          <Checkbox.Group>
            <Checkbox value={"email"}>이메일</Checkbox>
            <Checkbox value={"sms"}>문자</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name={`users`}
          label="회원"
          rules={[{ required: true, message: "회원을 선택해주세요." }]}
        >
          <Select
            size="small"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="회원을 선택해주세요."
          >
            {users &&
              users.map((data, idx) => {
                return (
                  <Select.Option value={JSON.stringify(data)} key={idx}>
                    {data.userId}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="제목"
          rules={[{ required: true, message: "제목을 입력해주세요." }]}
        >
          <Input size="small" placeholder="제목을 입력해주세요." />
        </Form.Item>

        <Form.Item
          name="content"
          label="내용"
          rules={[{ required: true, message: "내용을 입력해주세요." }]}
        >
          <Input.TextArea
            size="small"
            autoSize={{ minRows: 10, maxRows: 20 }}
            placeholder="내용을 입력해주세요."
          />
        </Form.Item>

        <Form.Item label="파일">
          <Wrapper dr={`row`} ju={`flex-start`}>
            <input
              ref={fileRef}
              type="file"
              hidden
              accept=".png, .jpg, .pdf, .xlsx, .csv, .ppt"
              onChange={fileUploadHandler}
            />
            <Button
              size="small"
              type="dashed"
              loading={st_mailFileUploadLoading}
              onClick={fileRefClickHandler}
            >
              파일업로드
            </Button>

            {mailFilePath && filename ? (
              <Button size="small" type="danger" onClick={fileDelHandler}>
                삭제
              </Button>
            ) : (
              ""
            )}

            {filename ? <Text margin={`0 0 0 10px`}>{filename}</Text> : ""}
          </Wrapper>
        </Form.Item>

        <Wrapper al={`flex-end`}>
          <Button size="small" type="primary" htmlType="submit">
            전송
          </Button>
        </Wrapper>
      </Form>
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
      type: USERLIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Send);

import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Form, Image, Input, message, Popover } from "antd";
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
import {
  LOAD_MY_INFO_REQUEST,
  USER_MAIN_REQUEST,
} from "../../../reducers/user";
import {
  SHARE_PROJECT_REQUEST,
  SHAREPROJECT_IMAGE1_REQUEST,
  SHAREPROJECT_IMAGE2_REQUEST,
  SHAREPROJECT_UPDATE_REQUEST,
} from "../../../reducers/shareProject";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";

const Association = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    shareProjects,
    previewImagePath1,
    previewImagePath2,
    st_shareProjectDone,
    st_shareProjecthImage1Loading,
    st_shareProjecthImage2Loading,
    st_shareProjecthUpdateDone,
    st_shareProjecthUpdateError,
  } = useSelector((state) => state.shareProject);

  const router = useRouter();
  const dispatch = useDispatch();

  const logoImageRef1 = useRef();
  const logoImageRef2 = useRef();

  const [infoForm1] = Form.useForm();
  const [infoForm2] = Form.useForm();

  useEffect(() => {
    if (st_shareProjectDone) {
      infoForm1.setFieldsValue({
        id: shareProjects[0].id,
        repreName: shareProjects[0].repreName,
        estimateDate: moment(shareProjects[0].estimateDate),
        empCnt: shareProjects[0].empCnt,
        jobType: shareProjects[0].jobType,
        importantWork: shareProjects[0].importantWork,
        link: shareProjects[0].link,
      });

      infoForm2.setFieldsValue({
        id: shareProjects[1].id,
        repreName: shareProjects[1].repreName,
        estimateDate: moment(shareProjects[1].estimateDate),
        empCnt: shareProjects[1].empCnt,
        jobType: shareProjects[1].jobType,
        importantWork: shareProjects[1].importantWork,
        link: shareProjects[1].link,
      });
    }
  }, [st_shareProjectDone]);

  useEffect(() => {
    if (st_shareProjecthUpdateDone) {
      message.success(
        "기술융합협동조합 정보가 수정되었습니다. 데이터를 재조회 합니다."
      );
    }
    dispatch({
      type: SHARE_PROJECT_REQUEST,
    });
  }, [st_shareProjecthUpdateDone]);

  useEffect(() => {
    if (st_shareProjecthUpdateError) {
      return message.error(st_shareProjecthUpdateError);
    }
  }, [st_shareProjecthUpdateError]);

  const clickImageUpload1 = useCallback(() => {
    logoImageRef1.current.click();
  }, [logoImageRef1.current]);

  const onChangeImages1 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: SHAREPROJECT_IMAGE1_REQUEST,
      data: formData,
    });
  });

  const clickImageUpload2 = useCallback(() => {
    logoImageRef2.current.click();
  }, [logoImageRef2.current]);

  const onChangeImages2 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: SHAREPROJECT_IMAGE2_REQUEST,
      data: formData,
    });
  });

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("기초정보관리");
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

  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: SHAREPROJECT_UPDATE_REQUEST,
        data: {
          id: data.id,
          repreName: data.repreName,
          estimateDate: data.estimateDate.format("YYYY-MM-DD"),
          empCnt: data.empCnt,
          jobType: data.jobType,
          importantWork: data.importantWork,
          link: data.link,
          imagePath: previewImagePath1 ? previewImagePath1 : data.imagePath,
        },
      });
    },
    [previewImagePath1]
  );

  const update2Handler = useCallback(
    (data) => {
      dispatch({
        type: SHAREPROJECT_UPDATE_REQUEST,
        data: {
          id: data.id,
          repreName: data.repreName,
          estimateDate: data.estimateDate.format("YYYY-MM-DD"),
          empCnt: data.empCnt,
          jobType: data.jobType,
          importantWork: data.importantWork,
          link: data.link,
          imagePath: previewImagePath2 ? previewImagePath2 : data.imagePath,
        },
      });
    },
    [previewImagePath2]
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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            회원조합메뉴에 보여지는 기술융합협동조합과 회원법인조합의 내용을
            수정할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지 사이즈는 가로 575px으로 올려주세요. 575px이하일 경우 해상도가
            깨져보일 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            수정하는 즉시 화면에 반영되니 신중한 처리바랍니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper
        dr={`row`}
        ju={`space-between`}
        al={`flex-start`}
        padding={`20px 20px 50px`}
      >
        <Wrapper width={`49%`}>
          <Wrapper
            borderBottom={`2px solid ${Theme.basicTheme_C}`}
            padding={`0 0 15px`}
            al={`flex-start`}
            fontSize={`18px`}
            fontWeight={`700`}
          >
            기술융합협동조합
          </Wrapper>
          <Image
            alt="image"
            src={
              previewImagePath1
                ? previewImagePath1
                : shareProjects[0] && shareProjects[0].imagePath
            }
          />

          {/* IMAGE AREA */}
          <input
            type="file"
            name="image"
            accept=".png, .jpg"
            // multiple
            hidden
            ref={logoImageRef1}
            onChange={onChangeImages1}
          />
          <Button
            type="primary"
            size="small"
            onClick={clickImageUpload1}
            loading={
              st_shareProjecthImage1Loading || st_shareProjecthImage2Loading
            }
          >
            이미지 업로드
          </Button>
          {/* IMAGE AREA */}

          <Wrapper
            dr={`row`}
            height={`55px`}
            fontSize={`16px`}
            padding={`20px 0 0`}
            borderTop={`1px solid ${Theme.lightGrey2_C}`}
          >
            <Form
              form={infoForm1}
              style={{ width: "100%" }}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={updateHandler}
            >
              <Form.Item name="id" hidden>
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="대표자명" name="repreName">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="설립연도" name="estimateDate">
                <DatePicker style={{ width: `100%` }} />
              </Form.Item>

              <Form.Item label="직원수" name="empCnt">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="업종" name="jobType">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="주업무" name="importantWork">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="링크" name="link">
                <Input size="small" allowClear />
              </Form.Item>

              <Wrapper al="flex-end" margin="0px 0px 20px 0px">
                <Button type="primary" size="small" htmlType="submit">
                  데이터 수정
                </Button>
              </Wrapper>
            </Form>
          </Wrapper>
        </Wrapper>
        <Wrapper width={`49%`}>
          <Wrapper
            borderBottom={`2px solid ${Theme.basicTheme_C}`}
            padding={`0 0 15px`}
            al={`flex-start`}
            fontSize={`18px`}
            fontWeight={`700`}
          >
            회원법인조합
          </Wrapper>
          <Image
            alt="image"
            src={
              previewImagePath2
                ? previewImagePath2
                : shareProjects[1] && shareProjects[1].imagePath
            }
          />

          {/* IMAGE AREA */}
          <input
            type="file"
            name="image"
            accept=".png, .jpg"
            // multiple
            hidden
            ref={logoImageRef2}
            onChange={onChangeImages2}
          />
          <Button
            type="primary"
            size="small"
            onClick={clickImageUpload2}
            loading={
              st_shareProjecthImage1Loading || st_shareProjecthImage2Loading
            }
          >
            이미지 업로드
          </Button>
          {/* IMAGE AREA */}

          <Wrapper
            dr={`row`}
            height={`55px`}
            fontSize={`16px`}
            padding={`20px 0 0`}
            borderTop={`1px solid ${Theme.lightGrey2_C}`}
          >
            <Form
              form={infoForm2}
              style={{ width: "100%" }}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={update2Handler}
            >
              <Form.Item name="id" hidden>
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="대표자명" name="repreName">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="설립연도" name="estimateDate">
                <DatePicker style={{ width: `100%` }} />
              </Form.Item>

              <Form.Item label="직원수" name="empCnt">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="업종" name="jobType">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="주업무" name="importantWork">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="링크" name="link">
                <Input size="small" allowClear />
              </Form.Item>

              <Wrapper al="flex-end" margin="0px 0px 20px 0px">
                <Button type="primary" size="small" htmlType="submit">
                  데이터 수정
                </Button>
              </Wrapper>
            </Form>
          </Wrapper>
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
      type: SHARE_PROJECT_REQUEST,
      data: {
        type: 3,
      },
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

export default withRouter(Association);

import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Image, Input, Popover } from "antd";
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
import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const Association = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

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
          <GuideLi>화면 가이드안내 문구를 입력하세요.</GuideLi>
          <GuideLi isImpo={true}>
            화면 가이드안내 문구를 입력하세요. (RED COLOR)
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
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/usercoop-page/img.png`}
          />
          <Wrapper
            dr={`row`}
            height={`55px`}
            fontSize={`16px`}
            padding={`20px 0 0`}
            borderTop={`1px solid ${Theme.lightGrey2_C}`}
          >
            <Form
              style={{ width: "100%" }}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Form.Item label="대표자명" name="title">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="설립연도" name="content">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="직원수" name="link">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="업종" name="updator">
                <Input size="small" allowClear readOnly />
              </Form.Item>

              <Form.Item label="주업무" name="updatedAt">
                <Input size="small" allowClear readOnly />
              </Form.Item>

              <Form.Item label="링크" name="createdAt">
                <Input size="small" allowClear readOnly />
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
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/usercoop-page/img.png`}
          />
          <Wrapper
            dr={`row`}
            height={`55px`}
            fontSize={`16px`}
            padding={`20px 0 0`}
            borderTop={`1px solid ${Theme.lightGrey2_C}`}
          >
            <Form
              style={{ width: "100%" }}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Form.Item label="대표자명" name="title">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="설립연도" name="content">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="직원수" name="link">
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item label="업종" name="updator">
                <Input size="small" allowClear readOnly />
              </Form.Item>

              <Form.Item label="주업무" name="updatedAt">
                <Input size="small" allowClear readOnly />
              </Form.Item>

              <Form.Item label="링크" name="createdAt">
                <Input size="small" allowClear readOnly />
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Association);

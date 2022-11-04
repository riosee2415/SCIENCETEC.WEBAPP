import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, Popover, Table } from "antd";
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
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { QUESTION_GET_REQUEST } from "../../../reducers/question";

const Question = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { questions } = useSelector((state) => state.question);
  console.log(questions);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("고객지원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

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

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "이미지 명칭",
      dataIndex: "title",
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
          title="정말 삭제하시겠습니까?"
          onConfirm={() => {}}
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
        bgColor={Theme.lightGrey_C}
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
      <Wrapper dr="row" padding="0px 50px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper margin={`10px 0px`} al={`flex-end`}>
            <Button size="small" type="primary" onClick={() => {}}>
              문의생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={[]}
            size="small"
          />
        </Wrapper>
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        ></Wrapper>
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
      type: QUESTION_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Question);

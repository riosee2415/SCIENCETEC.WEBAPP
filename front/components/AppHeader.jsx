import React, { useState, useEffect, useCallback } from "react";
import {
  ColWrapper,
  Image,
  ATag,
  RsWrapper,
  Wrapper,
  Text,
  WholeWrapper,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "@redux-saga/core";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import useWidth from "../hooks/useWidth";
import { LOGO_GET_REQUEST } from "../reducers/logo";

const HoverWrapper = styled(Wrapper)`
  position: absolute;
  top: 136px;
  left: 0;
  background: ${Theme.white_C};
  padding: 30px 0;
  transition: 0.2s;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.102);
  opacity: 0;
  visibility: hidden;
`;

const WebRow = styled(WholeWrapper)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: 0.5s;
  border-bottom: 1px solid ${Theme.lightGrey2_C};

  &:hover {
    ${HoverWrapper} {
      opacity: 1;
      visibility: visible;
    }
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileRow = styled(WholeWrapper)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: 0.5s;

  .ant-drawer-content-wrapper {
    width: 100% !important;
  }
  .ant-drawer-header-no-title .ant-drawer-close {
    display: none;
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;

const Menu = styled.h2`
  margin: ${(props) => props.margin || `0 97px 0 0`};
  color: ${(props) => props.color || props.theme.grey2_C};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  font-family: "NanumSquare Neo", sans-serif;

  &:hover {
    color: ${Theme.basicTheme_C};
  }

  @media (max-width: 1350px) {
    margin: ${(props) => props.margin || `0 30px 0 0`};
  }
`;

const SubMenu = styled.h2`
  width: 20%;

  font-family: "NanumSquare Neo", sans-serif;

  & .menu {
    position: relative;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    height: 70px;
    border-bottom: 1px solid ${Theme.lightGrey2_C};
    margin: 0 0 22px;
  }

  & ${Wrapper} ${Text}:hover {
    color: ${Theme.subTheme_C};
  }
  &:hover {
    cursor: pointer;
    & .menu {
      color: ${Theme.basicTheme_C};
      border-bottom: 2px solid ${Theme.basicTheme_C};
    }
  }
`;

const AppHeader = () => {
  const width = useWidth();
  const dispatch = useDispatch();

  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const { logos } = useSelector((state) => state.logo);
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  ///////////// - EVENT HANDLER- ////////////

  const drawarToggle = useCallback(() => {
    setDrawar((prev) => !prev);
  }, [drawar]);

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  return (
    <>
      <WebRow bgColor={Theme.white_C}>
        <Wrapper
          bgColor={Theme.lightGrey_C}
          borderBottom={`1px solid ${Theme.lightGrey2_C}`}
          padding={`8px 0`}
        >
          <RsWrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`auto`} dr={`row`}>
              <Image
                alt="faceicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_face-book.png`}
                width={`38px`}
                margin={`0 8px 0 0`}
              />
              <Image
                alt="youtubeicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_youtube.png`}
                width={`38px`}
                margin={`0 8px 0 0`}
              />
              <Image
                alt="instaicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_insta.png`}
                width={`38px`}
                margin={`0 8px 0 0`}
              />
              <Image
                alt="blogicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_blog.png`}
                width={`38px`}
              />
            </Wrapper>
            <Wrapper
              width={`auto`}
              dr={`row`}
              color={Theme.darkGrey_C}
              fontSize={`15px`}
            >
              <Link href={`/login`}>
                <a>
                  <Text isHover margin={`0 22px 0 0`}>
                    로그인
                  </Text>
                </a>
              </Link>
              <Link href={`/join`}>
                <a>
                  <Text isHover>회원가입</Text>
                </a>
              </Link>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        <RsWrapper dr={`row`} ju={`space-between`} padding={`15px 0`}>
          {/* web */}
          <ATag href="/" width={`205px`} ju={`flex-start`}>
            {logos && logos.find((data) => data.typeOf === "H") && (
              <Image
                src={logos.find((data) => data.typeOf === "H").imageURL}
                alt="logo"
              />
            )}
          </ATag>
          <Wrapper dr={`row`} width={`auto`}>
            <Link href={``}>
              <a>
                <Menu
                  color={
                    router.pathname.includes(`/company`) && Theme.subTheme_C
                  }
                >
                  교류회
                </Menu>
              </a>
            </Link>
            <Link href={``}>
              <a>
                <Menu
                  color={
                    router.pathname.includes(`/service`) && Theme.subTheme_C
                  }
                >
                  설립안내
                </Menu>
              </a>
            </Link>
            <Link href={``}>
              <a>
                <Menu
                  color={
                    router.pathname.includes(`/service`) && Theme.subTheme_C
                  }
                >
                  운영안내
                </Menu>
              </a>
            </Link>
            <Link href={`/activity/forum`}>
              <a>
                <Menu
                  color={
                    router.pathname.includes(`/activity`) && Theme.subTheme_C
                  }
                >
                  주요활동
                </Menu>
              </a>
            </Link>
            <Link href={`/`}>
              <a>
                <Menu
                  margin={`0`}
                  color={
                    router.pathname.includes(`/happiness`) && Theme.subTheme_C
                  }
                >
                  회원조합소개
                </Menu>
              </a>
            </Link>
          </Wrapper>
          <Wrapper width={width < 1100 ? `0` : `205px`}></Wrapper>
        </RsWrapper>

        <HoverWrapper>
          <RsWrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
            <SubMenu>
              <Text className="menu">교류회</Text>
              <Wrapper fontSize={`17px`}>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>인사말</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>교류회란</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>현황</a>
                  </Link>
                </Text>
                <Link href={`/`}>
                  <a>
                    <Text margin={`0 0 14px`}>조직</Text>
                  </a>
                </Link>
                <Text>
                  <Link href={`/`}>
                    <a>오시는 길</a>
                  </Link>
                </Text>
              </Wrapper>
            </SubMenu>
            <SubMenu>
              <Text className="menu">설립안내</Text>
              <Wrapper fontSize={`17px`}>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>설립절차</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>서류</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>관련법령</a>
                  </Link>
                </Text>
                <Link href={`/`}>
                  <a>
                    <Text>자료실</Text>
                  </a>
                </Link>
              </Wrapper>
            </SubMenu>
            <SubMenu>
              <Text className="menu">운영안내</Text>
              <Wrapper fontSize={`17px`}>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>사업수행</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>운영 노하우</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/`}>
                    <a>커뮤니티</a>
                  </Link>
                </Text>
                <Link href={`/`}>
                  <a>
                    <Text margin={`0 0 14px`}>자료실</Text>
                  </a>
                </Link>
                <Link href={`/`}>
                  <a>
                    <Text>공지사항</Text>
                  </a>
                </Link>
              </Wrapper>
            </SubMenu>
            <SubMenu>
              <Text className="menu">주요활동</Text>
              <Wrapper fontSize={`17px`}>
                <Text margin={`0 0 14px`}>
                  <Link href={`/activity/forum`}>
                    <a>포럼</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/activity/project`}>
                    <a>공동 프로젝트</a>
                  </Link>
                </Text>
                <Text margin={`0 0 14px`}>
                  <Link href={`/activity/business`}>
                    <a>공동 비즈니스</a>
                  </Link>
                </Text>
                <Link href={`/`}>
                  <a>
                    <Text>기술매칭사업</Text>
                  </a>
                </Link>
              </Wrapper>
            </SubMenu>
            <SubMenu>
              <Text className="menu">회원조합소개</Text>
              <Wrapper fontSize={`17px`}>
                <Text>
                  <Link href={`/`}>
                    <a>회원조합소개</a>
                  </Link>
                </Text>
              </Wrapper>
            </SubMenu>
          </RsWrapper>
        </HoverWrapper>
      </WebRow>
      {/* mobile */}
      <MobileRow justify={`center`} bgColor={Theme.white_C}>
        <Wrapper
          bgColor={Theme.lightGrey_C}
          borderBottom={`1px solid ${Theme.lightGrey2_C}`}
          padding={`8px 0`}
        >
          <RsWrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`auto`} dr={`row`}>
              <Image
                alt="faceicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_face-book.png`}
                width={`30px`}
                margin={`0 8px 0 0`}
              />
              <Image
                alt="youtubeicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_youtube.png`}
                width={`30px`}
                margin={`0 8px 0 0`}
              />
              <Image
                alt="instaicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_insta.png`}
                width={`30px`}
                margin={`0 8px 0 0`}
              />
              <Image
                alt="blogicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_blog.png`}
                width={`30px`}
              />
            </Wrapper>
            <Wrapper
              width={`auto`}
              dr={`row`}
              color={Theme.darkGrey_C}
              fontSize={`15px`}
            >
              <Link href={`/login`}>
                <a>
                  <Text isHover margin={`0 22px 0 0`}>
                    로그인
                  </Text>
                </a>
              </Link>
              <Link href={`/join`}>
                <a>
                  <Text isHover>회원가입</Text>
                </a>
              </Link>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        <Wrapper position={`relative`}>
          <RsWrapper dr={`row`} padding={`10px 0`} ju={`space-between`}>
            <ATag width={`auto`} href="/">
              {logos && logos.find((data) => data.typeOf === "H") && (
                <Image
                  width={`170px`}
                  src={logos.find((data) => data.typeOf === "H").imageURL}
                  alt="logo"
                />
              )}
            </ATag>
            <Wrapper width={`20px`} al={`flex-end`} fontSize={`1.3rem`}>
              <MenuOutlined onClick={drawarToggle} />
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          >
            <Wrapper
              position={`relative`}
              color={Theme.black2_C}
              fontSize={`17px`}
            >
              <Wrapper
                position={`absolute`}
                top={`0`}
                right={`0px`}
                width={`40px`}
                height={`40px`}
                radius={`8px`}
                fontSize={`1.2rem`}
                zIndex={`1`}
              >
                <CloseOutlined onClick={drawarToggle} />
              </Wrapper>

              <ColWrapper width={`100%`} al={`flex-start`} padding={`60px 0 0`}>
                <ColWrapper
                  margin={`0 0 10px`}
                  width={`100%`}
                  al={`flex-start`}
                >
                  <Wrapper
                    ju={`space-between`}
                    dr={`row`}
                    color={Theme.grey2_C}
                    fontSize={`14px`}
                  >
                    교류회
                  </Wrapper>
                </ColWrapper>
                <Wrapper
                  al={`flex-start`}
                  padding={`0 0 20px`}
                  margin={`0 0 20px`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/`}>
                      <a>인사말</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/`}>
                      <a>교류회란</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/`}>
                      <a>현황</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/`}>
                      <a>조직</a>
                    </Link>
                  </Wrapper>
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/`}>
                      <a>오시는 길</a>
                    </Link>
                  </Wrapper>
                </Wrapper>
                <ColWrapper
                  margin={`0 0 10px`}
                  width={`100%`}
                  al={`flex-start`}
                >
                  <Wrapper
                    ju={`space-between`}
                    dr={`row`}
                    color={Theme.grey2_C}
                    fontSize={`14px`}
                  >
                    설립안내
                  </Wrapper>
                </ColWrapper>
                <Wrapper
                  al={`flex-start`}
                  padding={`0 0 20px`}
                  margin={`0 0 20px`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/service/nursing?type=1`}>
                      <a>설립절차</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/service/protection?type=1`}>
                      <a>서류</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/service/visit`}>
                      <a>관련법령</a>
                    </Link>
                  </Wrapper>
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/service/visit`}>
                      <a>자료실</a>
                    </Link>
                  </Wrapper>
                </Wrapper>
                <ColWrapper
                  margin={`0 0 10px`}
                  width={`100%`}
                  al={`flex-start`}
                >
                  <Wrapper
                    ju={`space-between`}
                    dr={`row`}
                    color={Theme.grey2_C}
                    fontSize={`14px`}
                  >
                    운영안내
                  </Wrapper>
                </ColWrapper>
                <Wrapper
                  al={`flex-start`}
                  padding={`0 0 20px`}
                  margin={`0 0 20px`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/use`}>
                      <a>사업수행</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    margin={`0 0 10px`}
                    al={`flex-start`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/use/design`}>
                      <a>운영 노하우</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/use/admission`}>
                      <a>커뮤니티</a>
                    </Link>
                  </Wrapper>

                  <Wrapper
                    margin={`0 0 10px`}
                    al={`flex-start`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/use/list`}>
                      <a>자료실</a>
                    </Link>
                  </Wrapper>
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/use/wait`}>
                      <a>공지사항</a>
                    </Link>
                  </Wrapper>
                </Wrapper>
                <ColWrapper
                  margin={`0 0 10px`}
                  width={`100%`}
                  al={`flex-start`}
                >
                  <Wrapper
                    ju={`space-between`}
                    dr={`row`}
                    color={Theme.grey2_C}
                    fontSize={`14px`}
                  >
                    주요활동
                  </Wrapper>
                </ColWrapper>
                <Wrapper
                  al={`flex-start`}
                  padding={`0 0 20px`}
                  margin={`0 0 20px`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                >
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/happiness/info`}>
                      <a>포럼</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/happiness/info`}>
                      <a>공동 프로젝트</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/happiness/support`}>
                      <a>공동 비즈니스</a>
                    </Link>
                  </Wrapper>
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/happiness/support`}>
                      <a>기술매칭사업</a>
                    </Link>
                  </Wrapper>
                </Wrapper>
                <ColWrapper
                  margin={`0 0 10px`}
                  width={`100%`}
                  al={`flex-start`}
                >
                  <Wrapper
                    ju={`space-between`}
                    dr={`row`}
                    color={Theme.grey2_C}
                    fontSize={`14px`}
                  >
                    회원조합소개
                  </Wrapper>
                </ColWrapper>
                <Wrapper
                  al={`flex-start`}
                  padding={`0 0 20px`}
                  margin={`0 0 20px`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                >
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/garden/notice`}>
                      <a>회원조합소개</a>
                    </Link>
                  </Wrapper>
                </Wrapper>
              </ColWrapper>
            </Wrapper>
          </Drawer>
        )}
      </MobileRow>
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

    // context.store.dispatch({
    //   type: ACCEPT_LOG_REQUEST,
    //   data: { typeId: "1" },
    // });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default AppHeader;

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
import { Drawer, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "@redux-saga/core";
import { LOAD_MY_INFO_REQUEST, LOGOUT_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import useWidth from "../hooks/useWidth";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useSession, signOut } from "next-auth/react";

const WebRow = styled(WholeWrapper)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: 0.5s;
  height: 100px;
  padding: 0 50px;
  color: ${Theme.white_C};

  @media (max-width: 1005px) {
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
  @media (max-width: 1005px) {
    display: flex;
  }
`;

const SubMenu = styled(Wrapper)`
  position: absolute;
  top: 100px;
  left: 50%;
  margin: 0 0 0 -81px;
  width: 162px;
  padding: 26px 0;
  background: ${Theme.white_C};
  color: ${Theme.darkGrey_C};
  font-size: 17px;
  font-weight: 500;
  line-height: 1;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  opacity: 0;
  visibility: hidden;
`;

const Menu = styled.h2`
  margin: ${(props) => props.margin || `0 65px 0 0`};
  color: ${(props) => props.color || props.theme.white_C};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: 0.6s;
  cursor: pointer;
  position: relative;
  height: 100px;
  line-height: 100px;

  &:hover {
    color: ${Theme.subTheme2_C};

    ${SubMenu} {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 1430px) {
    margin: ${(props) => props.margin || `0 30px 0 0`};
  }
`;

const AppHeader = () => {
  const width = useWidth();
  const dispatch = useDispatch();

  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const { logos } = useSelector((state) => state.logo);
  const { me, st_logoutDone, st_logoutError } = useSelector(
    (state) => state.user
  );
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  const { data: session } = useSession();

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

  const logoutHandler = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);

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

  useEffect(() => {
    if (st_logoutDone) {
      if (session) {
        signOut();
      }
      router.push("/login");
      return message.success("로그아웃 되었습니다.");
    }

    if (st_logoutError) {
      return message.error(st_logoutError);
    }
  }, [st_logoutDone, st_logoutError]);

  return (
    <>
      <WebRow
        bgColor={
          (router.pathname === `/login` ||
            router.pathname.includes(`/join`) ||
            router.pathname.includes(`/find`) ||
            headerScroll === true) &&
          `rgba(0, 0, 0, 0.5)`
        }
      >
        <Wrapper dr={`row`} ju={`space-between`}>
          <ATag
            width={width < 1250 ? (1165 ? `auto` : `230px`) : `320px`}
            ju={`flex-start`}
            href="/"
          >
            {logos && logos.find((data) => data.typeOf === "H") && (
              <Image
                width={width < 1165 ? `120px` : `206px`}
                src={logos.find((data) => data.typeOf === "H").imageURL}
                alt="logo"
              />
            )}
          </ATag>
          <Wrapper width={`auto`} dr={`row`}>
            <Menu>
              <Link href={`/meeting`}>
                <a>교류회 </a>
              </Link>
              <SubMenu>
                <Link href={`/meeting`}>
                  <a>
                    <Text isHover margin={`0 0 14px`}>
                      교류회란
                    </Text>
                  </a>
                </Link>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/meeting/status`}>
                    <a>현황</a>
                  </Link>
                </Text>
                <Link href={`/meeting/group`}>
                  <a>
                    <Text isHover margin={`0 0 14px`}>
                      조직
                    </Text>
                  </a>
                </Link>

                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/meeting/greetings`}>
                    <a>인사말</a>
                  </Link>
                </Text>
                <Text isHover>
                  <Link href={`/meeting/location`}>
                    <a>오시는 길</a>
                  </Link>
                </Text>
              </SubMenu>
            </Menu>
            <Menu>
              <Link href={`/guide`}>
                <a>설립안내</a>
              </Link>
              <SubMenu>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/guide`}>
                    <a>설립절차</a>
                  </Link>
                </Text>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/guide/document`}>
                    <a>서류</a>
                  </Link>
                </Text>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/guide/statute`}>
                    <a>관련법령</a>
                  </Link>
                </Text>
                <Link href={`/guide/reference`}>
                  <a>
                    <Text isHover>자료실</Text>
                  </a>
                </Link>
              </SubMenu>
            </Menu>
            <Menu>
              <Link href={`/operate/perform`}>
                <a>운영안내</a>
              </Link>
              <SubMenu>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/operate/perform`}>
                    <a>사업수행</a>
                  </Link>
                </Text>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/operate/knowHow`}>
                    <a>운영 노하우</a>
                  </Link>
                </Text>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/operate/demand`}>
                    <a>수요조사</a>
                  </Link>
                </Text>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/operate/community`}>
                    <a>커뮤니티</a>
                  </Link>
                </Text>
                <Link href={`/operate/reference`}>
                  <a>
                    <Text isHover margin={`0 0 14px`}>
                      자료실
                    </Text>
                  </a>
                </Link>
                <Link href={`/operate/notice`}>
                  <a>
                    <Text isHover>공지사항</Text>
                  </a>
                </Link>
              </SubMenu>
            </Menu>
            <Menu>
              <Link href={`/activity/forum`}>
                <a>주요활동</a>
              </Link>
              <SubMenu>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/activity/forum`}>
                    <a>포럼</a>
                  </Link>
                </Text>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/activity/project`}>
                    <a>공동 프로젝트</a>
                  </Link>
                </Text>
                <Text isHover margin={`0 0 14px`}>
                  <Link href={`/activity/business`}>
                    <a>공동 비즈니스</a>
                  </Link>
                </Text>
                <Link href={`/activity/matching`}>
                  <a>
                    <Text isHover>기술매칭사업</Text>
                  </a>
                </Link>
              </SubMenu>
            </Menu>
            <Menu>
              <Link href={`/association`}>
                <a>회원조합소개</a>
              </Link>
            </Menu>
          </Wrapper>
          <Wrapper dr={`row`} width={width < 1165 ? `auto` : `320px`}>
            <Image
              alt="faceicon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_face.png`}
              width={`20px`}
              margin={`0 20px 0 0`}
            />
            <Image
              alt="youtubeicon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_youtube.png`}
              width={`20px`}
              margin={`0 20px 0 0`}
            />
            <Image
              alt="instaicon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_icon.png`}
              width={`20px`}
              margin={`0 20px 0 0`}
            />
            <Image
              alt="blogicon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_blog.png`}
              width={`20px`}
              margin={width < 1165 ? `0 20px 0 0` : `0 54px 0 0`}
            />
            {me ? (
              <Text onClick={logoutHandler} fontSize={`16px`} isHover>
                로그아웃
              </Text>
            ) : (
              <>
                <Link href={`/login`}>
                  <a>
                    <Text
                      fontSize={`16px`}
                      isHover
                      margin={width < 1165 ? `0 15px 0 0` : `0 28px 0 0`}
                    >
                      로그인
                    </Text>
                  </a>
                </Link>
                <Link href={`/join`}>
                  <a>
                    <Text fontSize={`16px`} isHover>
                      회원가입
                    </Text>
                  </a>
                </Link>
              </>
            )}
          </Wrapper>
        </Wrapper>
      </WebRow>
      {/* mobile */}
      <MobileRow
        justify={`center`}
        bgColor={
          (router.pathname === `/login` ||
            router.pathname.includes(`/join`) ||
            router.pathname.includes(`/find`) ||
            headerScroll === true) &&
          `rgba(0, 0, 0, 0.5)`
        }
      >
        <Wrapper
          padding={`5px 0`}
          borderBottom={`1px solid ${Theme.subTheme_C}`}
        >
          <RsWrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`auto`} dr={`row`}>
              <Image
                alt="faceicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_face.png`}
                width={`20px`}
                margin={`0 20px 0 0`}
              />
              <Image
                alt="youtubeicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_youtube.png`}
                width={`20px`}
                margin={`0 20px 0 0`}
              />
              <Image
                alt="instaicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_icon.png`}
                width={`20px`}
                margin={`0 20px 0 0`}
              />
              <Image
                alt="blogicon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/header/icon_blog.png`}
                width={`20px`}
              />
            </Wrapper>
            <Wrapper
              width={`auto`}
              dr={`row`}
              color={Theme.white_C}
              fontSize={`15px`}
            >
              {me ? (
                <Text onClick={logoutHandler} isHover>
                  로그아웃
                </Text>
              ) : (
                <>
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
                </>
              )}
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        <Wrapper position={`relative`}>
          <RsWrapper dr={`row`} padding={`10px 0`} ju={`space-between`}>
            <ATag width={`auto`} href="/">
              {logos && logos.find((data) => data.typeOf === "H") && (
                <Image
                  width={`140px`}
                  src={logos.find((data) => data.typeOf === "H").imageURL}
                  alt="logo"
                />
              )}
            </ATag>
            <Wrapper
              width={`20px`}
              al={`flex-end`}
              fontSize={`1.3rem`}
              color={Theme.white_C}
            >
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
                    <Link href={`/meeting`}>
                      <a>교류회란</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/meeting/status`}>
                      <a>현황</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/meeting/group`}>
                      <a>조직</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/meeting/greetings`}>
                      <a>인사말</a>
                    </Link>
                  </Wrapper>

                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/meeting/location`}>
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
                    <Link href={`/guide`}>
                      <a>설립절차</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/guide/document`}>
                      <a>서류</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/guide/statute`}>
                      <a>관련법령</a>
                    </Link>
                  </Wrapper>
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/guide/reference`}>
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
                    <Link href={`/operate/perform`}>
                      <a>사업수행</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    margin={`0 0 10px`}
                    al={`flex-start`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/operate/knowHow`}>
                      <a>운영 노하우</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    margin={`0 0 10px`}
                    al={`flex-start`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/operate/demand`}>
                      <a>수요조사</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/operate/community`}>
                      <a>커뮤니티</a>
                    </Link>
                  </Wrapper>

                  <Wrapper
                    margin={`0 0 10px`}
                    al={`flex-start`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/operate/reference`}>
                      <a>자료실</a>
                    </Link>
                  </Wrapper>
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/operate/notice`}>
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
                    <Link href={`/activity/forum`}>
                      <a>포럼</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/activity/project`}>
                      <a>공동 프로젝트</a>
                    </Link>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    onClick={drawarToggle}
                  >
                    <Link href={`/activity/business`}>
                      <a>공동 비즈니스</a>
                    </Link>
                  </Wrapper>
                  <Wrapper al={`flex-start`} onClick={drawarToggle}>
                    <Link href={`/activity/matching`}>
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
                    <Link href={`/association`}>
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

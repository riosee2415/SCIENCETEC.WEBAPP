import React, { useCallback, useEffect } from "react";
import {
  Wrapper,
  Text,
  Image,
  WholeWrapper,
  RsWrapper,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useSelector, useDispatch } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { message } from "antd";
import styled from "styled-components";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { ArrowUpOutlined } from "@ant-design/icons";
import { LOGO_GET_REQUEST } from "../reducers/logo";

const CompanyWrapper = styled(Wrapper)`
  color: ${Theme.grey_C};
`;

const AppFooter = () => {
  const width = useWidth();

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    companys,
    //
    st_companyError,
  } = useSelector((state) => state.company);
  const { logos } = useSelector((state) => state.logo);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  const moveScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <WholeWrapper
      padding={`50px 0`}
      bgColor={router.pathname === `/` ? Theme.subTheme5_C : Theme.white_C}
      borderTop={
        router.pathname === `/` ? `none` : `1px solid ${Theme.lightGrey2_C}`
      }
    >
      <RsWrapper>
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 50px`}>
          <Wrapper width={`auto`} al={`flex-start`} margin={`0 100px 0 0`}>
            <Wrapper margin={`0 0 20px`} al={`flex-start`}>
              {router.pathname === `/`
                ? logos &&
                  logos.find((data) => data.typeOf === "H") && (
                    <Image
                      width={`205px`}
                      src={logos.find((data) => data.typeOf === "H").imageURL}
                      alt="logo"
                    />
                  )
                : logos &&
                  logos.find((data) => data.typeOf === "F") && (
                    <Image
                      width={`205px`}
                      src={logos.find((data) => data.typeOf === "F").imageURL}
                      alt="logo"
                    />
                  )}
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 20px`}>
              <Text
                fontSize={`17px`}
                color={router.pathname === `/` ? Theme.white_C : Theme.black_C}
                isHover={true}
                margin={`0 25px 0 0`}
              >
                이용약관
              </Text>
              <Text
                fontSize={`17px`}
                color={
                  router.pathname === `/` ? Theme.white_C : Theme.darkGrey_C
                }
                isHover={true}
              >
                개인정보처리방침
              </Text>
            </Wrapper>

            <Text
              color={router.pathname === `/` ? Theme.subTheme6_C : Theme.grey_C}
              fontSize={`14px`}
              margin={`0 0 10px`}
            >
              {companys && companys[0].value}
            </Text>
            <Text
              color={router.pathname === `/` ? Theme.subTheme6_C : Theme.grey_C}
              fontSize={`14px`}
              margin={`0 0 10px`}
            >
              {companys && companys[1].value}
            </Text>
            <Text
              color={router.pathname === `/` ? Theme.subTheme6_C : Theme.grey_C}
              fontSize={`14px`}
            >
              {companys && companys[2].value}
            </Text>
          </Wrapper>

          <Wrapper
            width={width < 1100 ? `100%` : `auto`}
            margin={width < 1100 ? `30px 0 0` : `0`}
          >
            <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
              <Wrapper
                margin={width < 700 ? `0 20px 0 0` : `0 50px 0 0`}
                width={`auto`}
              >
                <Text
                  fontSize={`14px`}
                  fontWeight={`600`}
                  color={
                    router.pathname === `/` ? Theme.white_C : Theme.darkGrey_C
                  }
                  margin={`0 0 15px`}
                >
                  교류회
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/meeting">
                    <a>교류회란</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/meeting/status">
                    <a>현황</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/meeting/group">
                    <a>조직</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/meeting/greetings">
                    <a>인사말</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                >
                  <Link href="/meeting/location">
                    <a>오시는 길</a>
                  </Link>
                </Text>
              </Wrapper>
              <Wrapper
                margin={width < 700 ? `0 20px 0 0` : `0 50px 0 0`}
                width={`auto`}
              >
                <Text
                  fontSize={`14px`}
                  fontWeight={`600`}
                  color={
                    router.pathname === `/` ? Theme.white_C : Theme.darkGrey_C
                  }
                  margin={`0 0 15px`}
                >
                  설립안내
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/guide">
                    <a>설립절차</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/guide/document">
                    <a>서류</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/guide/statute">
                    <a>관련법령</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                >
                  <Link href="/guide/reference">
                    <a>자료실</a>
                  </Link>
                </Text>
              </Wrapper>
              <Wrapper
                margin={width < 700 ? `0 20px 0 0` : `0 50px 0 0`}
                width={`auto`}
              >
                <Text
                  fontSize={`14px`}
                  fontWeight={`600`}
                  color={
                    router.pathname === `/` ? Theme.white_C : Theme.darkGrey_C
                  }
                  margin={`0 0 15px`}
                >
                  운영안내
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/operate/perform">
                    <a>사업수행</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/operate/knowHow">
                    <a>운영 노하우</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/operate/demand">
                    <a>수요조사</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/operate/community">
                    <a>커뮤니티</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/operate/reference">
                    <a>자료실</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                >
                  <Link href="/operate/notice">
                    <a>공지사항</a>
                  </Link>
                </Text>
              </Wrapper>
              <Wrapper
                margin={width < 700 ? `0 20px 0 0` : `0 50px 0 0`}
                width={`auto`}
              >
                <Text
                  fontSize={`14px`}
                  fontWeight={`600`}
                  color={
                    router.pathname === `/` ? Theme.white_C : Theme.darkGrey_C
                  }
                  margin={`0 0 15px`}
                >
                  주요활동
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/activity/forum">
                    <a>포럼</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/activity/project">
                    <a>공동 프로젝트</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/activity/business">
                    <a>공동 비즈니스</a>
                  </Link>
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                >
                  <Link href="/activity/matching">
                    <a>기술매칭사업</a>
                  </Link>
                </Text>
              </Wrapper>
              <Wrapper width={`auto`}>
                <Text
                  fontSize={`14px`}
                  fontWeight={`600`}
                  color={
                    router.pathname === `/` ? Theme.white_C : Theme.darkGrey_C
                  }
                  margin={`0 0 15px`}
                >
                  회원조합소개
                </Text>
                <Text
                  fontSize={width < 700 ? `11px` : `14px`}
                  color={
                    router.pathname === `/` ? Theme.subTheme6_C : Theme.grey2_C
                  }
                  isHover={true}
                  hoverColor={
                    router.pathname === `/` ? Theme.white_C : Theme.basicTheme_C
                  }
                  margin={`0 0 5px`}
                >
                  <Link href="/association">
                    <a>회원조합소개</a>
                  </Link>
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-between`}>
          <Text
            fontSize={`14px`}
            color={
              router.pathname === `/` ? Theme.subTheme7_C : Theme.lightGrey2_C
            }
            margin={width < 700 ? `0 0 10px` : `0`}
          >
            Copyright 2023 iCAST. all rights reserved.
          </Text>

          <Wrapper dr={`row`} width={`auto`}>
            <Image
              cursor={`pointer`}
              src={
                router.pathname === `/`
                  ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_face.png"
                  : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_face_g.png"
              }
              alt="icon"
              width={`20px`}
              margin={`0 15px 0 0`}
            />
            <Image
              cursor={`pointer`}
              src={
                router.pathname === `/`
                  ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_youtube.png"
                  : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_youtube_g.png"
              }
              alt="icon"
              width={`20px`}
              margin={`0 15px 0 0`}
            />
            <Image
              cursor={`pointer`}
              src={
                router.pathname === `/`
                  ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_insta.png"
                  : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_insta_g.png"
              }
              alt="icon"
              width={`20px`}
              margin={`0 15px 0 0`}
            />
            <Image
              cursor={`pointer`}
              src={
                router.pathname === `/`
                  ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_blog.png"
                  : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/footer/icon_blog_g.png"
              }
              alt="icon"
              width={`20px`}
            />
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;

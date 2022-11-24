import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  CommonButton,
  Image,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const Btn = styled(Wrapper)`
  width: 135px;
  height: 50px;
  border-radius: 50px;
  font-size: 18px;
  font-family: "NanumSquare Neo", sans-serif;
  background: ${(props) =>
    props.isActive ? props.theme.basicTheme_C : props.theme.lightGrey_C};
  color: ${(props) =>
    props.isActive ? props.theme.white_C : props.theme.grey2_C};

  &:hover {
    cursor: pointer;
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }
`;

const Circle = styled(Wrapper)`
  width: 66px;
  height: 66px;
  border-radius: 100%;
  background: ${Theme.lightGrey_C};

  & img {
    width: 30px;
  }

  &:hover {
    cursor: pointer;
    background: ${Theme.subTheme2_C};
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const [currentTab, setCurrentTab] = useState(0);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>iCAST</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper padding={`100px 0`}>
            <Wrapper
              width={width < 800 ? `100%` : `600px`}
              padding={width < 900 ? `80px 15px` : `100px 80px`}
              border={`6px solid ${Theme.subTheme2_C}`}
              radius={`15px`}
            >
              <Text
                fontSize={width < 800 ? `25px` : `32px`}
                fontWeight={`800`}
                isNeo
                color={Theme.basicTheme_C}
              >
                로그인
              </Text>
              <Wrapper dr={`row`} margin={`26px 0 35px`}>
                <Btn
                  isActive={currentTab === 0}
                  onClick={() => setCurrentTab(0)}
                  margin={`0 6px 0 0`}
                >
                  개인회원
                </Btn>
                <Btn
                  isActive={currentTab === 1}
                  onClick={() => setCurrentTab(1)}
                >
                  조합회원
                </Btn>
              </Wrapper>

              <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                <Text
                  fontWeight={`bold`}
                  margin={`0 0 14px`}
                  color={Theme.grey2_C}
                >
                  아이디
                </Text>
                <TextInput
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="아이디를 입력해주세요."
                  radius={`5px`}
                />
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text
                  fontWeight={`bold`}
                  margin={`0 0 14px`}
                  color={Theme.grey2_C}
                >
                  비밀번호
                </Text>
                <TextInput
                  type="password"
                  width={`100%`}
                  height={`55px`}
                  placeholder="비밀번호를 입력해주세요."
                  radius={`5px`}
                />
              </Wrapper>
              <CommonButton
                kindOf={`subTheme`}
                width={`100%`}
                height={`55px`}
                radius={`5px`}
                fontSize={`18px`}
                fontWeight={`bold`}
                margin={`22px 0 12px`}
              >
                로그인
              </CommonButton>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  fontSize={`16px`}
                  color={Theme.grey2_C}
                >
                  <Text isHover margin={`0 14px 0 0`}>
                    ID찾기
                  </Text>
                  <Text isHover>PW재설정</Text>
                </Wrapper>
                <Link href={`/join`}>
                  <a>
                    <Text fontSize={`16px`} isHover>
                      회원가입
                    </Text>
                  </a>
                </Link>
              </Wrapper>

              {currentTab === 0 ? (
                <>
                  <Text
                    fontSize={`16px`}
                    color={Theme.grey_C}
                    margin={`38px 0 20px`}
                  >
                    SNS 로그인
                  </Text>
                  <Wrapper dr={`row`}>
                    <Circle>
                      <Image
                        alt="google"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/login/icon_google.png`}
                      />
                    </Circle>
                    <Circle margin={`0 20px`}>
                      <Image
                        alt="kakao"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/login/icon_kakao.png`}
                      />
                    </Circle>
                    <Circle>
                      <Image
                        alt="naver"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/login/icon_naver.png`}
                      />
                    </Circle>
                  </Wrapper>
                </>
              ) : null}
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>
      </ClientLayout>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;

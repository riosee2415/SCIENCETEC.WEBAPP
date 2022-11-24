import React, { useCallback, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Head from "next/head";
import {
  CommonButton,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import { useRouter } from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////
  const [currentTab, setCurrentTab] = useState(0);

  ////// HOOKS //////
  const router = useRouter();
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback(
    (link) => {
      router.push(link);
    },
    [router]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ALAL</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`100px 0`}>
          <RsWrapper>
            <Wrapper
              width={width < 700 ? `100%` : `600px`}
              padding={width < 900 ? `80px 15px` : `100px 80px`}
              radius={`15px`}
              bgColor={Theme.lightGrey_C}
            >
              <Text
                fontSize={width < 800 ? `25px` : `32px`}
                fontWeight={`800`}
                margin={`0 0 45px`}
                isNeo
                color={Theme.basicTheme_C}
              >
                PW재설정
              </Text>
              {currentTab === 0 && (
                <>
                  <TextInput
                    width={`100%`}
                    height={`55px`}
                    placeholder="이름을 입력해주세요."
                  />
                  <TextInput
                    width={`100%`}
                    height={`55px`}
                    margin={`10px 0`}
                    placeholder="연락처를 입력해주세요."
                  />

                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    kindOf={`subTheme`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    onClick={() => setCurrentTab(1)}
                  >
                    코드 전송하기
                  </CommonButton>

                  <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 0`}>
                    <Text
                      isHover={true}
                      color={Theme.grey2_C}
                      onClick={() => moveLinkHandler(`/find/id`)}
                    >
                      아이디 찾기
                    </Text>
                    <Text
                      isHover={true}
                      onClick={() => moveLinkHandler(`/login`)}
                    >
                      로그인
                    </Text>
                  </Wrapper>
                </>
              )}

              {currentTab === 1 && (
                <>
                  <TextInput
                    width={`100%`}
                    height={`55px`}
                    placeholder="이메일로 전송된 코드를 입력해주세요."
                  />

                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    margin={`10px 0 0`}
                    onClick={() => setCurrentTab(2)}
                  >
                    코드 입력하기
                  </CommonButton>
                </>
              )}

              {currentTab === 2 && (
                <>
                  <TextInput
                    width={`100%`}
                    height={`55px`}
                    placeholder="비밀번호를 입력해주세요."
                  />

                  <TextInput
                    width={`100%`}
                    height={`55px`}
                    margin={`10px 0`}
                    placeholder="비밀번호를 재 입력해주세요."
                  />

                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    onClick={() => moveLinkHandler(`/login`)}
                  >
                    비밀번호 변경하기
                  </CommonButton>
                </>
              )}
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

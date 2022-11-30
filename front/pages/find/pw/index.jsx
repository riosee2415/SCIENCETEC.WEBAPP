import React, { useCallback, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import axios from "axios";
import {
  CHECK_CODE_REQUEST,
  FIND_PW_REQUEST,
  LOAD_MY_INFO_REQUEST,
  PW_UPDATE_REQUEST,
} from "../../../reducers/user";
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
import useInput from "../../../hooks/useInput";
import { message } from "antd";
import { useEffect } from "react";

const Index = () => {
  ////// GLOBAL STATE //////
  const { st_findPwDone, st_checkCodeDone, st_pwUpdateDone } = useSelector(
    (state) => state.user
  );

  const [currentTab, setCurrentTab] = useState(0);

  ////// HOOKS //////
  const dispatch = useDispatch();
  const router = useRouter();
  const width = useWidth();

  const nameInput = useInput(``);
  const idInput = useInput(``);
  const codeInput = useInput(``);
  const pwInput = useInput(``);
  const pwCheckInput = useInput(``);
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (st_pwUpdateDone) {
      router.push(`/login`);

      return message.success("비밀번호가 변경되었습니다.");
    }
  }, [st_pwUpdateDone]);

  useEffect(() => {
    if (st_checkCodeDone) {
      setCurrentTab(2);

      return message.success("인증이 완료되었습니다.");
    }
  }, [st_checkCodeDone]);

  useEffect(() => {
    if (st_findPwDone) {
      setCurrentTab(1);

      return message.success("인증코드가 발송되었습니다.");
    }
  }, [st_findPwDone]);
  ////// TOGGLE //////
  ////// HANDLER //////
  const pwCheckHdnaler = useCallback(() => {
    if (!pwInput.value) {
      return message.error("비밀번호를 재 입력해주세요.");
    }
    if (!pwCheckInput.value) {
      return message.error("비밀번호를 재 입력해주세요.");
    }
    if (pwCheckInput.value !== pwInput.value) {
      return message.error("비밀번호가 일치하지 않습니다.");
    }

    if (!idInput.value) {
      location.reload();
      return message.error("일시적인 오류가 발생했습니다. 다시 시도해주세요.");
    }

    dispatch({
      type: PW_UPDATE_REQUEST,
      data: {
        userId: idInput.value,
        password: pwInput.value,
      },
    });
  }, [pwCheckInput, pwInput, idInput]);

  const checkCodeHandler = useCallback(() => {
    if (!codeInput.value) {
      return message.error("인증코드를 입력해주세요.");
    }

    dispatch({
      type: CHECK_CODE_REQUEST,
      data: {
        secret: codeInput.value,
      },
    });
  }, [codeInput]);

  const findPwHandler = useCallback(() => {
    if (!nameInput.value) {
      return message.error("이름을 입력해주세요.");
    }
    if (!idInput.value) {
      return message.error("아아디를 입력해주세요.");
    }

    dispatch({
      type: FIND_PW_REQUEST,
      data: {
        userId: idInput.value,
        username: nameInput.value,
      },
    });
  }, [idInput, nameInput]);

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
        <title>ICAST | 비밀번호찾기</title>
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
                    {...nameInput}
                    onKeyDown={(e) => e.keyCode === 13 && findPwHandler()}
                  />
                  <TextInput
                    width={`100%`}
                    height={`55px`}
                    margin={`10px 0`}
                    placeholder="아이디를 입력해주세요."
                    {...idInput}
                    onKeyDown={(e) => e.keyCode === 13 && findPwHandler()}
                  />

                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    kindOf={`subTheme`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    onClick={findPwHandler}
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
                    {...codeInput}
                  />

                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    margin={`10px 0 0`}
                    onClick={checkCodeHandler}
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
                    type="password"
                    {...pwInput}
                  />

                  <TextInput
                    width={`100%`}
                    height={`55px`}
                    margin={`10px 0`}
                    placeholder="비밀번호를 재 입력해주세요."
                    type="password"
                    {...pwCheckInput}
                  />

                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    onClick={pwCheckHdnaler}
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

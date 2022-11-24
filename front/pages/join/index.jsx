import React, { useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import Theme from "../../components/Theme";
import Link from "next/link";
import { Checkbox } from "antd";

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
  width: 44px;
  height: 44px;
  border-radius: 100%;
  background: ${Theme.lightGrey_C};
  position: absolute;
  left: 20px;

  & img {
    width: 24px;
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
            <Wrapper width={width < 800 ? `100%` : `500px`}>
              <Text
                fontSize={width < 800 ? `25px` : `32px`}
                fontWeight={`800`}
                isNeo
                color={Theme.basicTheme_C}
              >
                회원가입
              </Text>
              <Wrapper dr={`row`} margin={`26px 0 35px`}>
                <Btn isActive margin={`0 6px 0 0`}>
                  개인회원
                </Btn>
                <Link href={`/join/business`}>
                  <a>
                    <Btn>조합회원</Btn>
                  </a>
                </Link>
              </Wrapper>

              {currentTab === 0 ? (
                <>
                  <CommonButton width={`100%`} height={`70px`} kindOf={`grey`}>
                    <Wrapper position={`relative`} fontSize={`18px`}>
                      <Circle>
                        <Image
                          alt="google"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/login/icon_google.png`}
                        />
                      </Circle>
                      구글로 시작하기
                    </Wrapper>
                  </CommonButton>
                  <CommonButton
                    width={`100%`}
                    height={`70px`}
                    kindOf={`grey`}
                    margin={`10px 0`}
                  >
                    <Wrapper position={`relative`} fontSize={`18px`}>
                      <Circle>
                        <Image
                          alt="kakao"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/login/icon_kakao.png`}
                        />
                      </Circle>
                      카카오로 시작하기
                    </Wrapper>
                  </CommonButton>
                  <CommonButton width={`100%`} height={`70px`} kindOf={`grey`}>
                    <Wrapper position={`relative`} fontSize={`18px`}>
                      <Circle>
                        <Image
                          alt="naver"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/login/icon_naver.png`}
                        />
                      </Circle>
                      네이버로 시작하기
                    </Wrapper>
                  </CommonButton>
                  <Text
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    margin={`40px 0 16px`}
                  >
                    일발 회원가입
                  </Text>
                  <CommonButton
                    width={`100%`}
                    height={`70px`}
                    fontSize={`18px`}
                    kindOf={`grey2`}
                    onClick={() => setCurrentTab(1)}
                  >
                    ID / PW로 회원가입
                  </CommonButton>
                </>
              ) : (
                <>
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
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
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
                      margin={`0 0 8px`}
                    />
                    <TextInput
                      type="password"
                      width={`100%`}
                      height={`55px`}
                      placeholder="비밀번호를 재입력해주세요."
                      radius={`5px`}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      조합명
                    </Text>
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="조합명을 입력해주세요."
                      radius={`5px`}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      주소
                    </Text>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <TextInput
                        readOnly
                        type="text"
                        width={`calc(100% - 150px)`}
                        height={`55px`}
                        placeholder="우편주소를 입력해주세요."
                        radius={`5px`}
                      />
                      <CommonButton
                        width={`146px`}
                        height={`55px`}
                        kindOf={`subTheme`}
                        radius={`5px`}
                      >
                        우편주소 검색
                      </CommonButton>
                    </Wrapper>
                    <TextInput
                      type="text"
                      readOnly
                      width={`100%`}
                      height={`55px`}
                      placeholder="주소를 입력해주세요."
                      radius={`5px`}
                      margin={`8px 0`}
                    />
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="상세주소를 입력해주세요."
                      radius={`5px`}
                    />
                  </Wrapper>

                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      전화
                    </Text>
                    <TextInput
                      type="number"
                      width={`100%`}
                      height={`55px`}
                      placeholder="전화번호를 입력해주세요."
                      radius={`5px`}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      이메일
                    </Text>
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="이메일을 입력해주세요."
                      radius={`5px`}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      관심분야
                      <SpanText fontWeight={`500`}>(복수선택가능)</SpanText>
                    </Text>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>ICT</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>화학</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>기계</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>로보틱스</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>환경</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>에너지</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>교육</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>국방</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>우주항공</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>기초과학</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>의약과</Checkbox>
                      </Wrapper>
                      <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                        <Checkbox>기타</Checkbox>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper margin={`35px 0 14px`} al={`flex-start`}>
                    <Checkbox>(필수)개인정보처리방침에 동의합니다.</Checkbox>
                  </Wrapper>
                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    kindOf={`subTheme`}
                    radius={`5px`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                  >
                    회원가입
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

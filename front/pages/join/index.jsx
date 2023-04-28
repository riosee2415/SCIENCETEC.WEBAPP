import React, { useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  SIGNUP_REQUEST,
  USER_GOOGLE_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
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
import { Button, Checkbox, message, Modal } from "antd";
import useInput from "../../hooks/useInput";
import { useCallback } from "react";
import DaumPostCode from "react-daum-postcode";
import { useEffect } from "react";
import { useRouter } from "next/router";
import KakaoLogin from "react-kakao-login";
import naver from "naver-id-login";
import { useSession, signIn, signOut } from "next-auth/react";

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
  const {
    userCheck,
    //
    st_signUpDone,
    st_signUpError,
    //
    st_userGoogleDone,
    st_userGoogleError,
  } = useSelector((state) => state.user);
  ////// HOOKS //////

  // 구글 로그인
  const { data: session } = useSession();

  // 회원가입
  const idInput = useInput(``);
  const pwInput = useInput(``);
  const pwCheckInput = useInput(``);
  const combiNameInput = useInput(``);
  const postCodeInput = useInput(``);
  const addressInput = useInput(``);
  const detailAddressInput = useInput(``);
  const mobileInput = useInput(``);
  const emailInput = useInput(``);
  const [typeArr, setTypeArr] = useState([]);
  const [isCheck, setIsCheck] = useState(false);

  // SNS 회원가입 정보
  const [snsData, setSnsData] = useState(null);

  // current
  const [currentTab, setCurrentTab] = useState(0);

  // modal
  const [pModal, setPModal] = useState(false);

  const width = useWidth();
  ////// REDUX //////
  const router = useRouter();
  const dispatch = useDispatch();
  ////// USEEFFECT //////
  // 구글 로그인
  useEffect(() => {
    if (session) {
      dispatch({
        type: USER_GOOGLE_REQUEST,
        data: {
          email: session.user.email,
        },
      });
    }
  }, [session]);

  useEffect(() => {
    if (st_userGoogleDone) {
      if (userCheck.result) {
        setSnsData(session.user);
      } else {
        router.push("/login");
        message.error("이미 계정이 있습니다.");
        // signOut();
      }

      return;
    }
    if (st_userGoogleError) {
      return message.error(st_userGoogleError);
    }
  }, [st_userGoogleDone, st_userGoogleError]);

  // 기본
  useEffect(() => {
    if (snsData) {
      setCurrentTab(1);
      idInput.setValue(snsData.email);
      emailInput.setValue(snsData.email);

      pwInput.setValue(snsData.email);
      pwCheckInput.setValue(snsData.email);

      mobileInput.setValue(snsData.mobile_e164 ? snsData.mobile_e164 : ``);
      return;
    }
  }, [snsData]);

  useEffect(() => {
    if (st_signUpError) {
      return message.error(st_signUpError);
    }
  }, [st_signUpError]);

  useEffect(() => {
    if (st_signUpDone) {
      router.push(`/login`);
      setSnsData(null);

      if (session) {
        signOut();
      }

      return message.success("회원가입이 되었습니다.");
    }
  }, [st_signUpDone]);

  useEffect(() => {
    const query = router.query;

    if (query.naver) {
      naver.handleTokenResponse();
    }
  }, [router.query]);
  ////// TOGGLE //////
  ////// HANDLER //////

  // 네이버
  const naverLoginHandler = useCallback(async () => {
    const clientId = "kuOuSirjF7Z6X0ioR48B";
    const callbackUrl = "https://icast.or.kr/join?naver=true";
    const auth = await naver.login(clientId, callbackUrl);
    const accessToken = auth.access_token;

    const profile = await naver.getProfile(accessToken);
    const userId = "Naver_" + profile.response.id;

    setSnsData(profile.response);
  }, []);

  // 주소검색
  const completeHandler = useCallback((data) => {
    addressInput.setValue(data.address);
    postCodeInput.setValue(data.zonecode);
    setPModal(false);
  }, []);

  // 일반회원 create
  const createHandler = useCallback(() => {
    const userReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

    const passwordReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$/;

    if (!idInput.value) {
      return message.error("아이디를 입력해주세요.");
    }

    if (!userReg.test(idInput.value)) {
      return message.error(
        "아이디는 영문, 숫자를 혼합하여 5자 이상으로 입력해주세요."
      );
    }

    if (!pwInput.value) {
      return message.error("비밀번호를 입력해주세요.");
    }

    if (!pwCheckInput.value) {
      return message.error("비밀번호를 재입력해주세요.");
    }

    if (pwInput.value !== pwCheckInput.value) {
      return message.error("비밀번호가 일치하지 않습니다.");
    }

    if (!passwordReg.test(pwInput.value)) {
      return message.error(
        "비밀번호는 영문, 숫자, 특수문자를를 혼합하여 5자 이상으로 입력해주세요."
      );
    }

    if (!combiNameInput.value) {
      return message.error("비밀번호를 재입력해주세요.");
    }

    if (!postCodeInput.value) {
      return message.error("주소를 검색해주세요.");
    }

    if (!detailAddressInput.value) {
      return message.error("상세주소를 입력해주세요.");
    }

    if (!mobileInput.value) {
      return message.error("'-'를 빼고 입력해주세요.");
    }

    if (!emailInput.value) {
      return message.error("이메일을 입력해주세요.");
    }

    if (typeArr.length === 0) {
      return message.error("관심분야는 필수 선택사항입니다.");
    }

    if (!isCheck) {
      return message.error("개인정보처리방침에 동의해주세요.");
    }

    if (snsData) {
      // 개인회원
      dispatch({
        type: SIGNUP_REQUEST,
        data: {
          type: 1,
          userId: idInput.value,
          password: pwCheckInput.value,
          combiName: combiNameInput.value,
          postCode: postCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          mobile: mobileInput.value,
          email: emailInput.value,
          terms: isCheck,
          kakaoId: snsData.email,
          isKakao: true,
          isPremium: false,
          businessType: [],
          combiType: [],
          sector: typeArr,
        },
      });
    } else {
      // 개인회원
      dispatch({
        type: SIGNUP_REQUEST,
        data: {
          type: 1,
          userId: idInput.value,
          password: pwCheckInput.value,
          combiName: combiNameInput.value,
          postCode: postCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          mobile: mobileInput.value,
          email: emailInput.value,
          terms: isCheck,
          isKakao: false,
          isPremium: false,
          businessType: [],
          combiType: [],
          sector: typeArr,
        },
      });
    }
  }, [
    snsData,
    idInput,
    pwInput,
    pwCheckInput,
    combiNameInput,
    postCodeInput,
    detailAddressInput,
    mobileInput,
    emailInput,
    typeArr,
    isCheck,
  ]);

  // 사업분야
  const checkArrHandler = useCallback(
    (e) => {
      let arr = typeArr ? typeArr.map((data) => data) : [];
      const currentId = typeArr.findIndex((value) => value === e.target.value);

      if (currentId === -1) {
        arr.push(e.target.value);
      } else {
        arr.splice(currentId, 1);
      }

      setTypeArr(arr);
    },
    [typeArr]
  );

  ////// DATAVIEW //////

  const arr = [
    "ICT",
    "화학",
    "기계",
    "로보틱스",
    "환경",
    "에너지",
    "교육",
    "국방",
    "우주항공",
    "기초과학",
    "의약과",
    "바이오",
    "기타",
  ];

  if (typeof window === "undefined") {
    return null;
  }

  const clientId =
    "409877389928-29aakfjb2haapulsqvtif7jrfmokdht0.apps.googleusercontent.com";

  return (
    <>
      <Head>
        <title>iCAST | 회원가입</title>
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
              <Wrapper margin={`26px 0 35px`}>
                <Wrapper dr={`row`}>
                  <Btn isActive margin={`0 6px 0 0`}>
                    개인회원
                  </Btn>
                  <Link href={`/join/expert`}>
                    <a>
                      <Btn margin={`0 6px 0 0`}>전문가</Btn>
                    </a>
                  </Link>
                </Wrapper>
                <Wrapper dr={`row`} margin={`10px 0 0`}>
                  <Link href={`/join/business`}>
                    <a>
                      <Btn margin={`0 6px 0 0`}>조합회원</Btn>
                    </a>
                  </Link>
                  <Link href={`/join/business`}>
                    <a>
                      <Btn>기업회원</Btn>
                    </a>
                  </Link>
                </Wrapper>
              </Wrapper>
              {currentTab === 0 ? (
                <>
                  <CommonButton
                    width={`100%`}
                    height={`70px`}
                    kindOf={`grey`}
                    onClick={() => signIn("google")}
                  >
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

                  {/* <CommonButton
                    width={`100%`}
                    height={`70px`}
                    kindOf={`grey`}
                    onClick={initHandler}
                    id="GgCustomLogin"
                  >
                    <Wrapper position={`relative`} fontSize={`18px`}>
                      <Circle>
                        <Image
                          alt="google"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/login/icon_google.png`}
                        />
                      </Circle>
                      구글로 시작하기
                    </Wrapper>
                  </CommonButton> */}

                  {/* <GoogleOAuthProvider
                    clientId={
                      "409877389928-29aakfjb2haapulsqvtif7jrfmokdht0.apps.googleusercontent.com"
                    }
                  >
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </GoogleOAuthProvider> */}

                  <KakaoLogin
                    jsKey={process.env.NEXT_PUBLIC_KAKAO_LOGIN_KEY}
                    onSuccess={(data) => {
                      setSnsData(data.profile.kakao_account);
                    }}
                    onFailure={(data) => {
                      console.log(data);
                    }}
                    className="KakaoLogin"
                    getProfile="true"
                    render={({ onClick }) => {
                      return (
                        <CommonButton
                          width={`100%`}
                          height={`70px`}
                          kindOf={`grey`}
                          margin={`10px 0`}
                          onClick={(e) => {
                            e.preventDefault();
                            onClick();
                          }}
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
                      );
                    }}
                  ></KakaoLogin>
                  <CommonButton
                    width={`100%`}
                    height={`70px`}
                    kindOf={`grey`}
                    onClick={naverLoginHandler}
                  >
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
                    일반 회원가입
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
                      readOnly={snsData ? true : false}
                      {...idInput}
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
                      {...pwInput}
                      readOnly={snsData}
                    />
                    <TextInput
                      type="password"
                      width={`100%`}
                      height={`55px`}
                      placeholder="비밀번호를 재입력해주세요."
                      radius={`5px`}
                      {...pwCheckInput}
                      readOnly={snsData}
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
                      {...combiNameInput}
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
                        readOnly={true}
                        type="text"
                        width={`calc(100% - 150px)`}
                        height={`55px`}
                        placeholder="우편주소를 입력해주세요."
                        radius={`5px`}
                        {...postCodeInput}
                      />
                      <CommonButton
                        width={`146px`}
                        height={`55px`}
                        kindOf={`subTheme`}
                        radius={`5px`}
                        onClick={() => setPModal(!pModal)}
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
                      {...addressInput}
                    />
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="상세주소를 입력해주세요."
                      radius={`5px`}
                      {...detailAddressInput}
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
                      placeholder="'-'를 빼고 입력해주세요."
                      radius={`5px`}
                      {...mobileInput}
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
                      {...emailInput}
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
                      {arr.map((data) => {
                        return (
                          <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                            <Checkbox
                              onChange={checkArrHandler}
                              checked={typeArr.find((value) => value === data)}
                              value={data}
                            >
                              {data}
                            </Checkbox>
                          </Wrapper>
                        );
                      })}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper margin={`35px 0 14px`} al={`flex-start`}>
                    <Checkbox
                      onChange={() => setIsCheck(!isCheck)}
                      checked={isCheck}
                    >
                      (필수)개인정보처리방침에 동의합니다.
                    </Checkbox>
                  </Wrapper>
                  <CommonButton
                    width={`100%`}
                    height={`55px`}
                    kindOf={`subTheme`}
                    radius={`5px`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    onClick={createHandler}
                  >
                    회원가입
                  </CommonButton>
                </>
              )}
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>

        <Modal
          visible={pModal}
          onCancel={() => setPModal(!pModal)}
          title="주소 검색"
          footer={null}
        >
          <DaumPostCode
            onComplete={completeHandler}
            width={`100%`}
            height={`450px`}
            autoClose={false}
            animation
          />
        </Modal>
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

import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST, SIGNUP_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  CustomSelect,
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
import { Checkbox, DatePicker, message, Modal, Select } from "antd";
import { useRouter } from "next/router";
import useInput from "../../hooks/useInput";
import DaumPostcode from "react-daum-postcode";
import { useEffect } from "react";
import KakaoLogin from "react-kakao-login";
import naver from "naver-id-login";

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

const Index = () => {
  ////// GLOBAL STATE //////
  const { st_signUpDone, st_signUpError } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();

  // 회원가입
  const idInput = useInput(``); // 아이디
  const pwInput = useInput(``); // 비밀번호
  const pwCheckInput = useInput(``); // 비밀번호 체크
  const combiNameInput = useInput(``); // 조합명
  const postCodeInput = useInput(``); // 우편번호
  const addressInput = useInput(``); // 주소
  const detailAddressInput = useInput(``); // 상세주소
  const mobileInput = useInput(``); // 전화번호
  const emailInput = useInput(``); // 이메일
  const [typeArr, setTypeArr] = useState([]); // 사업분야
  const [combiTypeArr, setCombiTypeArr] = useState([]); // 조합사업유형
  const [combiArr, setCombiArr] = useState([]); // 조합유형
  const [isCheck, setIsCheck] = useState(false); // 개인정보
  const combiHomepageInput = useInput(``); // 조합 홈페이지
  const [combiEstimateDate, setCombiEstimateDate] = useState(null); // 설립년도
  const [combiArea, setCombiArea] = useState(null); // 지역
  const corporationCntInput = useInput(``); // 법인조합원수
  const personalCntInput = useInput(``); // 개인조홥원수
  const repreNameInput = useInput(``); // 이사장명
  const importantBusinessCapitalInput = useInput(``); // 자본금
  const importantBusinessPriceInput = useInput(``); // 매출액
  const importantBusiness1Input = useInput(``); // 주요사업1
  const importantBusiness2Input = useInput(``); // 주요사업2
  const importantBusiness3Input = useInput(``); // 주요사업3

  // SNS 회원가입 정보
  const [snsData, setSnsData] = useState(null);

  // current
  const [currentTab, setCurrentTab] = useState(0);

  // modal
  const [pModal, setPModal] = useState(false);
  ////// REDUX //////
  const router = useRouter();
  const dispatch = useDispatch();
  ////// USEEFFECT //////

  useEffect(() => {
    if (snsData) {
      setCurrentTab(1);

      idInput.setValue(snsData.email);
      emailInput.setValue(snsData.email);

      mobileInput.setValue(snsData.mobile_e164 ? snsData.mobile_e164 : ``);
      return;
    }
  }, [snsData]);

  useEffect(() => {
    const query = router.query;

    if (query.naver) {
      naver.handleTokenResponse();
    }
  }, [router.query]);

  useEffect(() => {
    if (st_signUpError) {
      return message.error(st_signUpError);
    }
  }, [st_signUpError]);

  useEffect(() => {
    if (st_signUpDone) {
      router.push(`/login`);

      return message.success("회원가입이 되었습니다.");
    }
  }, [st_signUpDone]);
  ////// TOGGLE //////
  ////// HANDLER //////

  // 네이버
  const naverLoginHandler = useCallback(async () => {
    const clientId = "kuOuSirjF7Z6X0ioR48B";
    const callbackUrl = "http://localhost:3000/join?naver=true";
    const auth = await naver.login(clientId, callbackUrl);
    const accessToken = auth.access_token;

    const profile = await naver.getProfile(accessToken);
    const userId = "Naver_" + profile.response.id;

    setSnsData(profile.response);
  }, []);

  // 조합회원 create
  const createHandler = useCallback(() => {
    if (!idInput.value) {
      return message.error("아이디를 입력해주세요.");
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

    if (!combiHomepageInput.value) {
      return message.error("조합 홈페이지를 입력해주세요.");
    }

    if (!combiEstimateDate) {
      return message.error("설립년도를 선택해주세요.");
    }

    if (!combiArea) {
      return message.error("조합 활동지역을 검색해주세요.");
    }

    if (!corporationCntInput.value) {
      return message.error("법인조합원수를 입력해주세요.");
    }

    if (!personalCntInput.value) {
      return message.error("개인조합원수를 입력해주세요.");
    }

    if (!repreNameInput.value) {
      return message.error("이사장명을 입력해주세요.");
    }

    if (!addressInput.value) {
      return message.error("주소를 검색해주세요.");
    }

    if (!detailAddressInput.value) {
      return message.error("상세주소를 입력해주세요.");
    }

    if (!mobileInput.value) {
      return message.error("전화번호를 입력해주세요.");
    }

    if (!emailInput.value) {
      return message.error("이메일을 입력해주세요.");
    }

    if (combiTypeArr.length === 0) {
      return message.error("조합유형은 필수 선택사항입니다.");
    }

    if (combiArr.length === 0) {
      return message.error("조합사업유형은 필수 선택사항입니다.");
    }

    if (typeArr.length === 0) {
      return message.error("사업분야는 필수 선택사항입니다.");
    }

    if (!importantBusiness1Input.value) {
      return message.error("주요사항을 입력해주세요.");
    }

    if (!importantBusinessCapitalInput.value) {
      return message.error("자본금을 입력해주세요.");
    }

    if (!importantBusinessPriceInput.value) {
      return message.error("매출액을 입력해주세요.");
    }

    if (!isCheck) {
      return message.error("개인정보처리방침에 동의해주세요.");
    }

    if (snsData) {
      dispatch({
        type: SIGNUP_REQUEST,
        data: {
          type: 2,
          userId: idInput.value,
          password: pwCheckInput.value,
          combiName: combiNameInput.value,
          combiHomepage: combiHomepageInput.value,
          combiEstimateDate: combiEstimateDate.format("YYYY-MM-DD"),
          combiArea: combiArea,
          corporationCnt: corporationCntInput.value,
          personalCnt: personalCntInput.value,
          repreName: repreNameInput.value,
          postCode: postCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          mobile: mobileInput.value,
          email: emailInput.value,
          importantBusiness1: importantBusiness1Input.value,
          importantBusiness2: importantBusiness2Input.value,
          importantBusiness3: importantBusiness3Input.value,
          importantBusinessCapital: importantBusinessCapitalInput.value,
          importantBusinessPrice: importantBusinessPriceInput.value,
          terms: isCheck,
          kakaoId: idInput.value,
          isKakao: true,
          isPremium: false,
          businessType: combiTypeArr,
          combiType: combiArr,
          sector: typeArr,
        },
      });
    } else {
      // 조합회원
      dispatch({
        type: SIGNUP_REQUEST,
        data: {
          type: 2,
          userId: idInput.value,
          password: pwCheckInput.value,
          combiName: combiNameInput.value,
          combiHomepage: combiHomepageInput.value,
          combiEstimateDate: combiEstimateDate.format("YYYY-MM-DD"),
          combiArea: combiArea,
          corporationCnt: corporationCntInput.value,
          personalCnt: personalCntInput.value,
          repreName: repreNameInput.value,
          postCode: postCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          mobile: mobileInput.value,
          email: emailInput.value,
          importantBusiness1: importantBusiness1Input.value,
          importantBusiness2: importantBusiness2Input.value,
          importantBusiness3: importantBusiness3Input.value,
          importantBusinessCapital: importantBusinessCapitalInput.value,
          importantBusinessPrice: importantBusinessPriceInput.value,
          terms: isCheck,
          isKakao: false,
          isPremium: false,
          businessType: combiTypeArr,
          combiType: combiArr,
          sector: typeArr,
        },
      });
    }
  }, [
    idInput,
    pwCheckInput,
    combiNameInput,
    combiHomepageInput,
    combiEstimateDate,
    combiArea,
    corporationCntInput,
    personalCntInput,
    repreNameInput,
    postCodeInput,
    addressInput,
    detailAddressInput,
    mobileInput,
    emailInput,
    importantBusiness1Input,
    importantBusiness2Input,
    importantBusiness3Input,
    importantBusinessCapitalInput,
    importantBusinessPriceInput,
    isCheck,
    combiTypeArr,
    combiArr,
    typeArr,
    snsData,
  ]);

  // 설립년도
  const combiEstimateDateHandler = useCallback((data) => {
    setCombiEstimateDate(data);
  }, []);

  // 지역
  const combiAreaHandler = useCallback((data) => {
    setCombiArea(data);
  }, []);

  // 조합유형
  const combiArrHandler = useCallback(
    (e) => {
      let arr = combiArr ? combiArr.map((data) => data) : [];
      const currentId = combiArr.findIndex((value) => value === e.target.value);

      if (currentId === -1) {
        arr.push(e.target.value);
      } else {
        arr.splice(currentId, 1);
      }

      setCombiArr(arr);
    },
    [combiArr]
  );

  // 조합사업
  const combiTypeHandler = useCallback(
    (e) => {
      let arr = combiTypeArr ? combiTypeArr.map((data) => data) : [];
      const currentId = combiTypeArr.findIndex(
        (value) => value === e.target.value
      );

      if (currentId === -1) {
        arr.push(e.target.value);
      } else {
        arr.splice(currentId, 1);
      }

      setCombiTypeArr(arr);
    },
    [combiTypeArr]
  );

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

  // 주소검색
  const completeHandler = useCallback((data) => {
    addressInput.setValue(data.address);
    postCodeInput.setValue(data.zonecode);
    setPModal(false);
  }, []);
  ////// DATAVIEW //////

  const combiData = [
    "다중이해",
    "생산자",
    "소비자",
    "사업자",
    "직원",
    "개발자",
    "기타",
  ];

  const combiTypeData = [
    "R&D형",
    "비즈니스형",
    "교육훈련 및 문화활동형",
    "지역사회문제해결형",
    "경력연계형",
    "기타",
  ];

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
    "기타",
  ];

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
                <Btn margin={`0 6px 0 0`} onClick={() => router.push(`/join`)}>
                  개인회원
                </Btn>
                <Btn isActive>조합회원</Btn>
              </Wrapper>

              {currentTab === 0 ? (
                <>
                  <KakaoLogin
                    jsKey={process.env.KAKAO_LOGIN_KEY}
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
                    />
                    <TextInput
                      type="password"
                      width={`100%`}
                      height={`55px`}
                      placeholder="비밀번호를 재입력해주세요."
                      radius={`5px`}
                      {...pwCheckInput}
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
                      조합 홈페이지
                    </Text>
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="조합 홈페이지 주소를 입력해주세요."
                      radius={`5px`}
                      {...combiHomepageInput}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      설립년도
                    </Text>

                    <DatePicker
                      style={{
                        width: `100%`,
                        height: `55px`,
                        borderRadius: `5px`,
                      }}
                      placeholder="조합 설립년도를 선택해주세요."
                      onChange={combiEstimateDateHandler}
                      value={combiEstimateDate}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      지역
                    </Text>
                    <CustomSelect radius={`5px`} width={`100%`} height={`55px`}>
                      <Select
                        placeholder="조합 활동 지역을 입력해주세요."
                        onChange={combiAreaHandler}
                        value={combiArea}
                      >
                        <Select.Option value={"서울특별시"}>
                          서울특별시
                        </Select.Option>
                        <Select.Option value={"대전광역시"}>
                          대전광역시
                        </Select.Option>
                        <Select.Option value={"인천광역시"}>
                          인천광역시
                        </Select.Option>
                        <Select.Option value={"대구광역시"}>
                          대구광역시
                        </Select.Option>
                        <Select.Option value={"울산광역시"}>
                          울산광역시
                        </Select.Option>
                        <Select.Option value={"부산광역시"}>
                          부산광역시
                        </Select.Option>
                        <Select.Option value={"광주광역시"}>
                          광주광역시
                        </Select.Option>
                        <Select.Option value={"세종특별자치시"}>
                          세종특별자치시
                        </Select.Option>
                        <Select.Option value={"제주특별자치도"}>
                          제주특별자치도
                        </Select.Option>
                        <Select.Option value={"경기도"}>경기도</Select.Option>
                        <Select.Option value={"강원도"}>강원도</Select.Option>
                        <Select.Option value={"충청남도"}>
                          충청남도
                        </Select.Option>
                        <Select.Option value={"충청북도"}>
                          충청북도
                        </Select.Option>
                        <Select.Option value={"전라북도"}>
                          전라북도
                        </Select.Option>
                        <Select.Option value={"전라남도"}>
                          전라남도
                        </Select.Option>
                        <Select.Option value={"경상남도"}>
                          경상남도
                        </Select.Option>
                        <Select.Option value={"경상북도"}>
                          경상북도
                        </Select.Option>
                      </Select>
                    </CustomSelect>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      법인조합원수
                    </Text>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <TextInput
                        width={`96%`}
                        height={`55px`}
                        placeholder="법인조합원수를 입력해주세요."
                        radius={`5px`}
                        type="number"
                        {...corporationCntInput}
                      />
                      인
                    </Wrapper>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      개인조합원수
                    </Text>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <TextInput
                        width={`96%`}
                        height={`55px`}
                        placeholder="개인조합원수를 입력해주세요."
                        radius={`5px`}
                        type="number"
                        {...personalCntInput}
                      />
                      인
                    </Wrapper>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      이사장명
                    </Text>
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="이사장명을 입력해주세요."
                      radius={`5px`}
                      {...repreNameInput}
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
                      placeholder="전화번호를 입력해주세요."
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
                      조합유형
                      <SpanText fontWeight={`500`}>(복수선택가능)</SpanText>
                    </Text>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      {combiData.map((data) => {
                        return (
                          <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                            <Checkbox
                              onChange={combiArrHandler}
                              checked={combiArr.find((value) => value === data)}
                              value={data}
                            >
                              {data}
                            </Checkbox>
                          </Wrapper>
                        );
                      })}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      조합사업유형
                      <SpanText fontWeight={`500`}>(복수선택가능)</SpanText>
                    </Text>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      {combiTypeData.map((data) => {
                        return (
                          <Wrapper width={`auto`} margin={`0 20px 10px 0`}>
                            <Checkbox
                              onChange={combiTypeHandler}
                              checked={combiTypeArr.find(
                                (value) => value === data
                              )}
                              value={data}
                            >
                              {data}
                            </Checkbox>
                          </Wrapper>
                        );
                      })}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      사업분야
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

                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      주요사업
                    </Text>

                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="1. 주요사업을 입력해주세요."
                      radius={`5px`}
                      {...importantBusiness1Input}
                    />
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="2. 주요사업을 입력해주세요."
                      radius={`5px`}
                      margin={`8px 0`}
                      {...importantBusiness2Input}
                    />
                    <TextInput
                      type="text"
                      width={`100%`}
                      height={`55px`}
                      placeholder="3. 주요사업을 입력해주세요."
                      radius={`5px`}
                      {...importantBusiness3Input}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      자본금
                    </Text>

                    <TextInput
                      type="number"
                      width={`100%`}
                      height={`55px`}
                      placeholder="자본금을 입력해주세요."
                      radius={`5px`}
                      {...importantBusinessCapitalInput}
                    />
                  </Wrapper>

                  <Wrapper al={`flex-start`}>
                    <Text
                      fontWeight={`bold`}
                      margin={`0 0 14px`}
                      color={Theme.grey2_C}
                    >
                      매출액
                    </Text>

                    <TextInput
                      type="number"
                      width={`100%`}
                      height={`55px`}
                      placeholder="매출액을 입력해주세요."
                      radius={`5px`}
                      {...importantBusinessPriceInput}
                    />
                  </Wrapper>

                  <Wrapper margin={`30px 0 14px`} al={`flex-start`}>
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
          <DaumPostcode
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

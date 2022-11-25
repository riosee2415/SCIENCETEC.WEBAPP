import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
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
import { Checkbox } from "antd";
import { useRouter } from "next/router";
import useInput from "../../hooks/useInput";

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
  ////// HOOKS //////
  const width = useWidth();

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
  const [typeArr, setTypeArr] = useState([]); // 사업분야
  const [combiTypeArr, setCombiTypeArr] = useState([]); // 조합사업유형
  const [combiArr, setCombiArr] = useState([]); // 조합유형
  const [isCheck, setIsCheck] = useState(false);

  // modal
  const [pModal, setPModal] = useState(false);
  ////// REDUX //////
  const router = useRouter();
  const dispatch = useDispatch();
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////

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
                <Btn margin={`0 6px 0 0`}>개인회원</Btn>
                <Btn isActive>조합회원</Btn>
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
                  조합 홈페이지
                </Text>
                <TextInput
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="조합 홈페이지 주소를 입력해주세요."
                  radius={`5px`}
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
                <TextInput
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="조합 설립년도를 입력해주세요."
                  radius={`5px`}
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
                <TextInput
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="조합 활동 지역을 입력해주세요."
                  radius={`5px`}
                />
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
                    type="text"
                    width={`96%`}
                    height={`55px`}
                    placeholder="법인조합원수를 입력해주세요."
                    radius={`5px`}
                  />
                  인
                </Wrapper>
                <Text fontWeight={`bold`} color={Theme.basicTheme_C} isHover>
                  + 추가
                </Text>
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
                    type="text"
                    width={`96%`}
                    height={`55px`}
                    placeholder="개인조합원수를 입력해주세요."
                    radius={`5px`}
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
                  조합유형
                  <SpanText fontWeight={`500`}>(복수선택가능)</SpanText>
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  {combiData.map((data) => {
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
                  조합사업유형
                  <SpanText fontWeight={`500`}>(복수선택가능)</SpanText>
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  {combiTypeData.map((data) => {
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
                />
                <TextInput
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="2. 주요사업을 입력해주세요."
                  radius={`5px`}
                  margin={`8px 0`}
                />
                <TextInput
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="3. 주요사업을 입력해주세요."
                  radius={`5px`}
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
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="자본금을 입력해주세요."
                  radius={`5px`}
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
                  type="text"
                  width={`100%`}
                  height={`55px`}
                  placeholder="매출액을 입력해주세요."
                  radius={`5px`}
                />
              </Wrapper>

              <Wrapper margin={`30px 0 14px`} al={`flex-start`}>
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

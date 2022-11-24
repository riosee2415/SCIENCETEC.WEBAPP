import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  CommonButton,
  CustomPage,
  Image,
  RsWrapper,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { Checkbox } from "antd";
import { CloseOutlined, FileOutlined } from "@ant-design/icons";

const Project = () => {
  ////// GLOBAL STATE //////
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
        <title>iCAST | 기술매칭사업</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />
              <Wrapper
                wrap={`nowrap`}
                dr={`row`}
                ju={`flex-start`}
                fontSize={width < 900 ? `18px` : `20px`}
                fontWeight={`700`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png`}
                  width={`14px`}
                  margin={`0 6px 0 0`}
                />
                기관형 과학기술인 협동조합 교류회 기술매칭사업
              </Wrapper>
              <Wrapper
                wrap={`nowrap`}
                dr={`row`}
                ju={`flex-start`}
                fontSize={width < 900 ? `18px` : `20px`}
                margin={`35px 0 16px`}
                fontWeight={`700`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle-small.png`}
                  width={`8px`}
                  margin={`0 6px 0 0`}
                />
                기술매칭서비스 신청
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `16px` : `18px`}
              >
                • 기술매칭서비스를 신청하시면 확인 후 담당자가 별도로
                연락드립니다.
              </Wrapper>

              <Wrapper al={`flex-start`}>
                <Wrapper
                  width={`155px`}
                  height={`50px`}
                  bgColor={Theme.subTheme4_C}
                  radius={`50px`}
                  color={Theme.basicTheme_C}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`50px 0 20px`}
                >
                  <Text isNeo>신청자 정보</Text>
                </Wrapper>

                <Wrapper
                  width={width < 900 ? `100%` : `470px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    신청자명
                  </Text>
                  <TextInput
                    type="text"
                    width={`100%`}
                    height={`55px`}
                    placeholder="이름을 입력해주세요."
                    radius={`5px`}
                  />
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `470px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    소속기관
                  </Text>
                  <TextInput
                    type="text"
                    width={`100%`}
                    height={`55px`}
                    placeholder="소속기관을 입력해주세요."
                    radius={`5px`}
                  />
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `470px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    직위
                  </Text>
                  <TextInput
                    type="text"
                    width={`100%`}
                    height={`55px`}
                    placeholder="직위를 입력해주세요."
                    radius={`5px`}
                  />
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `470px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    휴대전화번호
                  </Text>
                  <TextInput
                    type="number"
                    width={`100%`}
                    height={`55px`}
                    placeholder="연락처를 입력해주세요."
                    radius={`5px`}
                  />
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `470px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    이메일
                  </Text>
                  <TextInput
                    type="number"
                    width={`100%`}
                    height={`55px`}
                    placeholder="이메일 주소를 입력해주세요."
                    radius={`5px`}
                  />
                </Wrapper>

                <Wrapper
                  width={`155px`}
                  height={`50px`}
                  bgColor={Theme.subTheme4_C}
                  radius={`50px`}
                  color={Theme.basicTheme_C}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`50px 0 20px`}
                >
                  <Text isNeo>신청내용</Text>
                </Wrapper>

                <Wrapper
                  width={width < 900 ? `100%` : `470px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    서비스유형
                  </Text>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>컨설팅 및 자문</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>공동프로젝트</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>과학기술 개발 및 비즈니스 협업</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>과학기술 교육 및 강연</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Checkbox>기타</Checkbox>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    서비스유형
                  </Text>
                  <TextArea
                    placeholder="기타사항을 입력해주세요."
                    height={`120px`}
                    width={`100%`}
                  />
                </Wrapper>

                <Wrapper
                  width={`155px`}
                  height={`50px`}
                  bgColor={Theme.subTheme4_C}
                  radius={`50px`}
                  color={Theme.basicTheme_C}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`50px 0 20px`}
                >
                  <Text isNeo>신청분야</Text>
                </Wrapper>

                <Wrapper
                  width={width < 900 ? `100%` : `470px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    신청기술분야
                  </Text>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>ICT</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>바이오</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>화학</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>기계</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Checkbox>로보틱스</Checkbox>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Checkbox>에너지</Checkbox>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    세부내역
                  </Text>
                  <TextArea
                    placeholder="세부내역을 입력해주세요."
                    height={`120px`}
                    width={`100%`}
                  />
                </Wrapper>
                <Wrapper
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    신청기술분야 기타사항
                  </Text>
                  <TextArea
                    placeholder="기타사항을 입력해주세요."
                    height={`120px`}
                    width={`100%`}
                  />
                </Wrapper>

                <Wrapper
                  width={`240px`}
                  height={`50px`}
                  bgColor={Theme.subTheme4_C}
                  radius={`50px`}
                  color={Theme.basicTheme_C}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`50px 0 20px`}
                >
                  <Text isNeo>개인정보 수집 및 활용</Text>
                </Wrapper>

                <Wrapper
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                  padding={`15px`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.grey2_C}
                  >
                    개인정보 수집 및 활용
                  </Text>
                  <Checkbox>
                    (필수)본인은 icast측의 원활한 기술매칭서비스 상담을 위해
                    개인정보 수집 및 활용에 동의합니다.
                  </Checkbox>
                </Wrapper>

                <Wrapper
                  width={`155px`}
                  height={`50px`}
                  bgColor={Theme.subTheme4_C}
                  radius={`50px`}
                  color={Theme.basicTheme_C}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`50px 0 20px`}
                >
                  <Text isNeo>파일 첨부</Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <CommonButton
                    width={`90px`}
                    height={`40px`}
                    fontSize={`16px`}
                  >
                    첨부하기
                  </CommonButton>
                  <Wrapper
                    width={width < 900 ? `100%` : `380px`}
                    dr={`row`}
                    ju={`space-between`}
                    height={`40px`}
                    bgColor={Theme.lightGrey_C}
                    fontSize={`16px`}
                    padding={`0 16px`}
                    color={Theme.grey_C}
                  >
                    <Text>
                      <FileOutlined />
                      &nbsp; Example.png
                    </Text>
                    <CloseOutlined />
                  </Wrapper>

                  <Wrapper>
                    <CommonButton
                      kindOf={`subTheme`}
                      width={`150px`}
                      height={`55px`}
                      fontSize={`18px`}
                      margin={`50px 0 160px`}
                      fontWeight={`bold`}
                    >
                      신청하기
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
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

export default Project;

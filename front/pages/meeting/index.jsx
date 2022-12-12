import React, { useEffect } from "react";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  Text,
  CommonButton,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import Head from "next/head";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCallback } from "react";
import { Modal } from "antd";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";

const Home = ({}) => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const [isDown, setIsDown] = useState(false);
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  const downToggle = useCallback(() => {
    setIsDown(!isDown);
  }, [isDown]);
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ICAST | 교류회</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`calc(100vh - 137px)`} ju={`flex-start`}>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />

            <Wrapper
              width={width < 1100 ? `100%` : `calc(100% - 280px)`}
              ju={`flex-start`}
              al={`flex-start`}
              margin={`0 0 100px`}
            >
              <BreadCrumb />

              <Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={`0 0 30px`}
                  al={width < 700 ? `flex-start` : `center`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png"
                    alt="icon"
                    width={`14px`}
                    margin={width < 700 ? `6px 10px 0 0` : `0 10px 0 0`}
                  />
                  <Wrapper
                    width={`calc(100% - 14px - 10px)`}
                    al={`flex-start`}
                    fontSize={width < 700 ? `18px` : `20px`}
                    fontWeight={`600`}
                  >
                    기관형 과학기술인 협동조합 교류회(Institutional Cooperative
                    Association of Scientists and Technologists)
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 25px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper fontSize={`18px`} width={`calc(100% -  15px)`}>
                    기관형 과학기술인 협동조합(기과협)이란 「협동조합기본법」에
                    따라 설립된 협동조합 중 조합원이 과학기술인이 중심이 되어
                    과학기술 관련 서비스 등을 주된 사업으로 활동하는
                    협동조합으로서 이공계(과학기술인) 개인조합원이 5명 이상 또는
                    50%, 법인 조합원이 최소 5개 이상 또는 50% 이상인 협동조합을
                    말한다.
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 25px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper fontSize={`18px`} width={`calc(100% -  15px)`}>
                    과학기술정보통신부가 2019년부터 지원해 오고 있는
                    [지역혁신공동체 혁신지원 사업]의 일환으로 기관형 과학기술인
                    협동조합 성장지원 사업을 지원해 오고 있다. 이 사업의 수행
                    주관기관 협동조합과, 동 부처가 지원해 오고 있는 [과학기술인
                    협동조합 육성지원사업] 중 기과협 조건에 해당하는 협동조합 및
                    예비 기관협 협동조합들간의 협의체가 기관형 과학기술인
                    협동조합 교류회다.
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-start`}
                  margin={`0 0 30px`}
                >
                  <Text color={Theme.basicTheme_C} fontSize={`18px`}>
                    •
                  </Text>
                  <Wrapper
                    fontSize={`18px`}
                    width={`calc(100% -  15px)`}
                    fontWeight={`600`}
                    al={`flex-start`}
                  >
                    위에 해당하는 모든 협동조합은 교류회 회원조합이 될 자격이
                    있다.
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png"
                    alt="icon"
                    width={`14px`}
                    margin={`0 10px 0 0`}
                  />
                  <Text fontSize={`20px`} fontWeight={`600`}>
                    정관 미리보기
                  </Text>

                  <CommonButton
                    kindOf={`grey3`}
                    fontSize={`12px`}
                    padding={`0`}
                    width={`80px`}
                    height={`20px`}
                    margin={`0 0 0 10px`}
                    onClick={downToggle}
                  >
                    다운로드
                    <DownloadOutlined />
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <Modal visible={isDown} footer={null} closable={false}>
            <Wrapper padding={`50px 0`}>
              <Text fontSize={`24px`} isNeo={true}>
                자료 준비 중
              </Text>

              <Text fontSize={`16px`} margin={`15px 0 0`}>
                해당 자료는 협회에서 준비 중입니다.
              </Text>
              <Text fontSize={`16px`} margin={`0 0 30px`}>
                빠른 시일내로 자료를 제공해드리도록 하겠습니다.
              </Text>

              <CommonButton
                kindOf={`subTheme`}
                width={`130px`}
                height={`45px`}
                fontSize={`18px`}
                fontWeight={`600`}
                onClick={downToggle}
              >
                확인
              </CommonButton>
            </Wrapper>
          </Modal>
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
export default Home;

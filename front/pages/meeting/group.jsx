import React from "react";
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
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Head from "next/head";
import SubBanner from "../../components/subBanner";

const Group = ({}) => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ICAST | 조직</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <SubBanner />

          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <Wrapper
              ju={`flex-start`}
              al={`flex-start`}
              margin={width < 900 ? `50px 0 100px` : `100px 0 100px`}
            >
              <Text
                fontSize={`32px`}
                fontWeight={`600`}
                margin={width < 900 ? `0 0 15px` : `0 0 36px`}
              >
                조직
              </Text>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={width < 900 ? `0 0 15px` : `0 0 30px`}
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
                  기관형 과학기술인 협동조합 교류회 조직(안)
                </Wrapper>
              </Wrapper>

              <Image
                src={
                  width < 700
                    ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/about-page/img_group_m.png"
                    : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/about-page/img_group.png"
                }
                alt="img"
                margin={`30px 0 0`}
              />
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
export default Group;

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
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import Head from "next/head";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";

const Location = ({}) => {
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
        <title>ICAST | 교류회</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />

            <Wrapper
              width={width < 1100 ? `100%` : `calc(100% - 280px)`}
              ju={`flex-start`}
              al={`flex-start`}
              margin={`0 0 100px`}
            >
              <BreadCrumb />

              <Text fontSize={`24px`} isNeo={true} margin={`25px 0`}>
                오시는 길
              </Text>

              <Wrapper
                borderTop={`1px solid ${Theme.lightGrey2_C}`}
                padding={`25px 0 0`}
              >
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
                    교류회 오시는 길
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  height={`400px`}
                  bgColor={Theme.basicTheme_C}
                ></Wrapper>
                <Wrapper
                  bgColor={Theme.lightGrey_C}
                  padding={`30px 0`}
                  fontSize={width < 700 ? `16px` : `20px`}
                  fontWeight={`700`}
                  margin={`0 0 40px`}
                  textAlign={`center`}
                >
                  운영주관기관 과학기술연결플랫폼사회적 협동조합(PoSEP) 사무소
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
                  <Wrapper
                    dr={`row`}
                    width={`auto`}
                    margin={width < 700 ? `0 0 10px` : `0`}
                  >
                    <Text
                      fontSize={width < 700 ? `16px` : `20px`}
                      color={Theme.basicTheme_C}
                      margin={`0 10px 0 0`}
                    >
                      •
                    </Text>
                    <Text
                      fontSize={width < 700 ? `14px` : `18px`}
                      textAlign={`center`}
                    >
                      (34027) 대전광역시 유성구 테크노9로 35 대전테크노파크
                      어울림플라자 204-1호
                    </Text>
                  </Wrapper>

                  <Wrapper
                    width={width < 700 ? `100%` : `auto`}
                    al={width < 700 ? `center` : `flex-start`}
                  >
                    <Wrapper width={`auto`} dr={`row`} margin={`0 0 5px`}>
                      <Image
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/web.png"
                        alt="icon"
                        width={`16px`}
                        margin={`0 5px 0 0`}
                      />
                      <Text fontSize={width < 700 ? `14px` : `18px`}>
                        http://www.icast.or.kr
                      </Text>
                    </Wrapper>

                    <Wrapper width={`auto`} dr={`row`} margin={`0 0 5px`}>
                      <Image
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/mail.png"
                        alt="icon"
                        width={`16px`}
                        margin={`0 5px 0 0`}
                      />
                      <Text fontSize={width < 700 ? `14px` : `18px`}>
                        email: support@icast.or.kr
                      </Text>
                    </Wrapper>

                    <Wrapper width={`auto`} dr={`row`} margin={`0 0 5px`}>
                      <Image
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/call.png"
                        alt="icon"
                        width={`16px`}
                        margin={`0 5px 0 0`}
                      />
                      <Text fontSize={width < 700 ? `14px` : `18px`}>
                        tel: 042-863-4319
                      </Text>
                    </Wrapper>
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
export default Location;

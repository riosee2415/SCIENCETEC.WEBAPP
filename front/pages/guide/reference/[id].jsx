import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../../../reducers/user";
import useInput from "../../../hooks/useInput";
import ClientLayout from "../../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import {
  ColWrapper,
  RowWrapper,
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  SpanText,
  Text,
  CommonButton,
  CustomSelect,
  TextInput,
} from "../../../components/commonComponents";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import styled, { ThemeContext } from "styled-components";
import Head from "next/head";
import Popup from "../../../components/popup/popup";
import Mainslider from "../../../components/slide/MainSlider";
import ToastEditorComponent from "../../../components/editor/ToastEditorComponent";
import CC01 from "../../../components/common/CC01";
import { DownloadOutlined, FileFilled } from "@ant-design/icons";
import { useState } from "react";
import { useCallback } from "react";
import { Modal, Select } from "antd";
import LeftMenu from "../../../components/LeftMenu";
import BreadCrumb from "../../../components/BreadCrumb";

const Box = styled(Wrapper)`
  flex-direction: row;
  height: 48px;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  cursor: pointer;

  &:hover {
    background: ${Theme.lightGrey_C};
  }
`;

const Id = ({}) => {
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
        <title>ICAST | 설립안내</title>
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
                자료실
              </Text>

              <Wrapper borderTop={`2px solid ${Theme.basicTheme_C}`}>
                <Wrapper
                  dr={`row`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    width={width < 700 ? `25%` : `20%`}
                    bgColor={Theme.subTheme4_C}
                    al={`flex-start`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                  >
                    <Text isNeo={true} fontSize={`16px`} fontWeight={`700`}>
                      제목
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `75%` : `80%`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    al={`flex-start`}
                    fontSize={`16px`}
                  >
                    제목이 들어갈 곳 입니다.
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    width={width < 700 ? `25%` : `20%`}
                    bgColor={Theme.subTheme4_C}
                    al={`flex-start`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                  >
                    <Text isNeo={true} fontSize={`16px`} fontWeight={`700`}>
                      게시자
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `75%` : `80%`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    al={`flex-start`}
                    fontSize={`16px`}
                  >
                    ICAST
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    width={width < 700 ? `25%` : `20%`}
                    bgColor={Theme.subTheme4_C}
                    al={`flex-start`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                  >
                    <Text isNeo={true} fontSize={`16px`} fontWeight={`700`}>
                      작성일
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `75%` : `80%`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    al={`flex-start`}
                    fontSize={`16px`}
                  >
                    2022.10.13
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                  position={`relative`}
                >
                  <Wrapper
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    height={`100%`}
                    bgColor={Theme.subTheme4_C}
                    zIndex={`-1`}
                    width={width < 700 ? `100%` : `20%`}
                    display={width < 700 ? `none` : `flex`}
                  ></Wrapper>
                  <Wrapper
                    width={width < 700 ? `100%` : `20%`}
                    bgColor={Theme.subTheme4_C}
                    al={width < 700 ? `center` : `flex-start`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    height={`100%`}
                  >
                    <Text isNeo={true} fontSize={`16px`} fontWeight={`700`}>
                      내용
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `100%` : `80%`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    al={`flex-start`}
                    fontSize={`16px`}
                  >
                    모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며,
                    국가와 국민은 환경보전을 위하여 노력하여야 한다. 정부는
                    회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지
                    국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를
                    의결하여야 한다. 지방자치단체는 주민의 복리에 관한 사무를
                    처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한
                    규정을 제정할 수 있다. 행정각부의 장은 국무위원 중에서
                    국무총리의 제청으로 대통령이 임명한다. 거에 있어서
                    최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가
                    출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다.
                    언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는
                    인정되지 아니한다. 국회나 그 위원회의 요구가 있을 때에는
                    국무총리·국무위원 또는 정부위원은 출석·답변하여야 하며,
                    국무총리 또는 국무위원이 출석요구를 받은 때에는 국무위원
                    또는 정부위원으로 하여금 출석·답변하게 할 수 있다.
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Wrapper
                    width={width < 700 ? `25%` : `20%`}
                    bgColor={Theme.subTheme4_C}
                    al={`flex-start`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                  >
                    <Text isNeo={true} fontSize={`16px`} fontWeight={`700`}>
                      첨부파일
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `75%` : `80%`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={`16px`}
                  >
                    <Text color={Theme.basicTheme_C} margin={`0 5px 0 0`}>
                      <FileFilled />
                    </Text>
                    2022년 협동조합 교류회.hwp
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                borderTop={`1px solid ${Theme.subTheme2_C}`}
                borderBottom={`1px solid ${Theme.subTheme2_C}`}
                margin={`50px 0 0`}
              >
                <Wrapper
                  dr={`row`}
                  borderBottom={`1px dashed ${Theme.subTheme2_C}`}
                >
                  <Wrapper
                    width={width < 700 ? `25%` : `20%`}
                    bgColor={Theme.lightGrey_C}
                    al={`flex-start`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                  >
                    <Text isNeo={true} fontSize={`16px`} fontWeight={`700`}>
                      이전글
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `75%` : `80%`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    al={`flex-start`}
                    fontSize={`16px`}
                  >
                    <Text isEllipsis={true} width={`100%`}>
                      2023년 기관형 과학기술인 협동조합 성장지원 사업 공고
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Wrapper
                    width={width < 700 ? `25%` : `20%`}
                    bgColor={Theme.lightGrey_C}
                    al={`flex-start`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                  >
                    <Text isNeo={true} fontSize={`16px`} fontWeight={`700`}>
                      다음글
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `75%` : `80%`}
                    padding={width < 700 ? `20px 10px` : `20px`}
                    al={`flex-start`}
                    fontSize={`16px`}
                  >
                    <Text isEllipsis={true} width={`100%`}>
                      2023년 기관형 과학기술인 협동조합 성장지원 사업 공고
                    </Text>
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
export default Id;

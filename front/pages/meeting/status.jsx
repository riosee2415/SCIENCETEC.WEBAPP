import React, { useEffect } from "react";
import { LOAD_MY_INFO_REQUEST, STATUS_LIST_REQUEST } from "../../reducers/user";
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
  CustomSelect,
  TextInput,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import Head from "next/head";
import { Empty, Select } from "antd";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import { useSelector } from "react-redux";

const Status = ({}) => {
  ////// GLOBAL STATE //////
  const { statusList } = useSelector((state) => state.user);
  console.log(statusList);
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
        <title>ICAST | 현황</title>
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
                    기관형 과학기술인 협동조합 교류회 현황
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={width < 700 ? `space-between` : `flex-start`}
                  margin={`0 0 20px`}
                >
                  <CustomSelect>
                    <Select defaultValue={"전체"}>
                      <Select.Option>1</Select.Option>
                      <Select.Option>1</Select.Option>
                      <Select.Option>1</Select.Option>
                    </Select>
                  </CustomSelect>

                  <TextInput
                    width={width < 700 ? `160px` : `230px`}
                    height={`40px`}
                    margin={`0 10px`}
                    placeholder="검색어를 입력해주세요."
                  />

                  <CommonButton height={`40px`} fontSize={`16px`}>
                    검색하기
                  </CommonButton>
                </Wrapper>

                <Wrapper overflow={`auto`} wrap={`nowrap`} al={`flex-start`}>
                  <Wrapper minWidth={`1100px`}>
                    <Wrapper
                      borderTop={`2px solid ${Theme.basicTheme_C}`}
                      dr={`row`}
                      height={`48px`}
                    >
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`5%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          번호
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`21%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          조합명
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`7%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          지역
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`7%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          설립 년도
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`12%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          법인 조합원
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`12%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          개인 조합원
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`12%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          조합유형
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        width={`12%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          사업유형
                        </Text>
                      </Wrapper>
                      <Wrapper
                        height={`100%`}
                        bgColor={Theme.lightGrey_C}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        borderTop={`none`}
                        borderLeft={`none`}
                        borderRight={`none`}
                        width={`12%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          주요사업
                        </Text>
                      </Wrapper>
                    </Wrapper>

                    {statusList &&
                    statusList.userList &&
                    statusList.userList.length === 0 ? (
                      <Wrapper padding={`150px 0`}>
                        <Empty description="조회된 내역이 없습니다." />
                      </Wrapper>
                    ) : (
                      statusList.userList &&
                      statusList.userList.map((data) => {
                        return (
                          <Wrapper dr={`row`} height={`48px`} key={data.id}>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`5%`}
                            >
                              <Text fontSize={`16px`}>{data.num}</Text>
                            </Wrapper>

                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`21%`}
                            >
                              <Text fontSize={`16px`}>{data.combiName}</Text>
                            </Wrapper>

                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`7%`}
                            >
                              <Text fontSize={`16px`}>{data.combiArea}</Text>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`7%`}
                            >
                              <Text fontSize={`16px`}>
                                {data.viewEstimateDate}
                              </Text>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`12%`}
                            >
                              <Text fontSize={`16px`}>
                                {data.corporationCnt}인
                              </Text>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`12%`}
                            >
                              <Text fontSize={`16px`}>
                                {data.personalCnt}인
                              </Text>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`12%`}
                            >
                              <Text fontSize={`16px`}>
                                {statusList &&
                                  statusList.combiTypeList.map((v, idx) => {
                                    if (v.UserId === data.id) {
                                      return v.value + " ";
                                    } else {
                                      return null;
                                    }
                                  })}
                              </Text>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`12%`}
                            >
                              <Text fontSize={`16px`}>사업유형</Text>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              borderRight={`none`}
                              width={`12%`}
                            >
                              <Text fontSize={`16px`}>주요사업</Text>
                            </Wrapper>
                          </Wrapper>
                        );
                      })
                    )}
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

    context.store.dispatch({
      type: STATUS_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Status;

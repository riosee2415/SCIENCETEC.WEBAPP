import React, { useCallback, useEffect } from "react";
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
import { Empty, Popover, Select } from "antd";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import SubBanner from "../../components/subBanner";

const Find = styled(Text)`
  &:nth-child(n + 2):nth-child(-n + 14) {
    display: none;
  }
`;

const Status = () => {
  ////// GLOBAL STATE //////
  const { statusList } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();
  const searchInput = useInput(``);
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  // 검색기능
  const searchHandler = useCallback(() => {
    dispatch({
      type: STATUS_LIST_REQUEST,
      data: {
        searchCombiName: searchInput.value,
      },
    });
  }, [searchInput]);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ICAST | 현황</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`calc(100vh - 137px)`} ju={`flex-start`}>
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
                현황
              </Text>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`auto`}
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
                    기관형 과학기술인 협동조합 교류회 현황
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  ju={width < 700 ? `space-between` : `flex-start`}
                  margin={`0 0 20px`}
                >
                  {/* <CustomSelect>
                    <Select defaultValue={"전체"}>
                      <Select.Option>1</Select.Option>
                      <Select.Option>1</Select.Option>
                      <Select.Option>1</Select.Option>
                    </Select>
                  </CustomSelect> */}

                  <TextInput
                    width={`230px`}
                    height={`40px`}
                    margin={`0 10px 0 0`}
                    {...searchInput}
                    onKeyDown={(e) => e.keyCode === 13 && searchHandler()}
                    placeholder="조합명을 입력해주세요."
                  />

                  <CommonButton
                    height={`40px`}
                    fontSize={`16px`}
                    onClick={searchHandler}
                  >
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
                        width={`10%`}
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
                        width={`10%`}
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
                        width={`16%`}
                      >
                        <Text fontSize={`14px`} isNeo={true} fontWeight={`700`}>
                          주요사업
                        </Text>
                      </Wrapper>
                    </Wrapper>

                    {statusList && statusList.length === 0 ? (
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
                                {data.viewEstimateYear}
                              </Text>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`10%`}
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
                              width={`10%`}
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
                              dr={`row`}
                            >
                              {statusList &&
                                statusList.combiTypeList.map((v) => {
                                  if (v.UserId === data.id) {
                                    return <Find>{v.value + " "}</Find>;
                                  } else {
                                    return null;
                                  }
                                })}
                              <Popover
                                placement="bottom"
                                content={
                                  statusList &&
                                  statusList.combiTypeList.map((v, idx) => {
                                    if (v.UserId === data.id) {
                                      return v.value + " ";
                                    } else {
                                      return null;
                                    }
                                  })
                                }
                              >
                                <Image
                                  width={`16px`}
                                  margin={`0 0 0 4px`}
                                  alt="icon"
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/about-page/icon_more.png`}
                                />
                              </Popover>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              width={`12%`}
                              dr={`row`}
                            >
                              {statusList &&
                                statusList.businessTypeList.map((v) => {
                                  if (v.UserId === data.id) {
                                    return <Find>{v.value + " "}</Find>;
                                  } else {
                                    return null;
                                  }
                                })}
                              <Popover
                                placement="bottom"
                                content={
                                  statusList &&
                                  statusList.businessTypeList.map((v, idx) => {
                                    if (v.UserId === data.id) {
                                      return v.value + " ";
                                    } else {
                                      return null;
                                    }
                                  })
                                }
                              >
                                <Image
                                  width={`16px`}
                                  margin={`0 0 0 4px`}
                                  alt="icon"
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/about-page/icon_more.png`}
                                />
                              </Popover>
                            </Wrapper>
                            <Wrapper
                              height={`100%`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              borderTop={`none`}
                              borderLeft={`none`}
                              borderRight={`none`}
                              width={`16%`}
                              dr={`row`}
                            >
                              {data.importantBusiness1 ? (
                                <>
                                  <Text
                                    fontSize={`16px`}
                                    width={`50%`}
                                    isEllipsis
                                    textAlign={`center`}
                                  >
                                    {data.importantBusiness1}
                                  </Text>
                                  <Popover
                                    placement="bottom"
                                    content={
                                      <Wrapper>
                                        <Text>{data.importantBusiness1}</Text>
                                        <Text>{data.importantBusiness2}</Text>
                                        <Text>{data.importantBusiness3}</Text>
                                      </Wrapper>
                                    }
                                  >
                                    <Image
                                      width={`16px`}
                                      margin={`0 0 0 4px`}
                                      alt="icon"
                                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/about-page/icon_more.png`}
                                    />
                                  </Popover>
                                </>
                              ) : (
                                "주요사업이 없습니다."
                              )}
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

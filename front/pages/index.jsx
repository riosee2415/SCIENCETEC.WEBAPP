import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../reducers/user";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  Text,
  ATag,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled, { ThemeContext } from "styled-components";
import Head from "next/head";
import Mainslider from "../components/slide/MainSlider";
import { MAIN_REQUEST } from "../reducers/main";
import { Empty, Popover } from "antd";
import { MAIN_BOARD_REQUEST } from "../reducers/notice";
import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Fade from "react-reveal/Fade";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BoardTypeButton = styled(Wrapper)`
  width: auto;
  height: 45px;
  padding: 0 25px;
  border-radius: 45px;
  background-color: ${(props) => props.isCheck && props.theme.basicTheme_C};
  color: ${(props) => props.isCheck && props.theme.white_C};
  border: ${(props) => props.isCheck && `1px solid ${props.theme.white_C}`};

  &:hover {
    cursor: pointer;
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }
`;

const BoardWrapper = styled(Wrapper)`
  width: calc(100% / 4 - 23px);
  margin: 0 30px 20px 0;
  padding: 40px 30px;
  border: 1px solid ${Theme.lightGrey2_C};
  min-height: 250px;
  background: ${Theme.white_C};
  justify-content: space-between;

  &:nth-child(4n) {
    margin: 0 0 20px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.subTheme4_C};
  }

  @media (max-width: 900px) {
    width: 49%;
    margin: 0 0 15px;
    min-height: auto;
    padding: 15px;

    &:nth-child(4n) {
      margin: 0 0 15px;
    }
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { banner, business, year, city } = useSelector((state) => state.main);
  const { mainBoard } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [boardType, setBoardType] = useState("전체");
  const [chartConfig, setChartConfig] = useState(null);
  const [chartConfig2, setChartConfig2] = useState(null);

  const [type, setType] = useState(0);
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: MAIN_BOARD_REQUEST,
      data: {
        type: boardType === "전체" ? null : boardType,
      },
    });
  }, [boardType]);

  useEffect(() => {
    if (business) {
      setChartConfig({
        series: [
          {
            name: "",
            data: business.map((data) => data.cnt),
          },
        ],
        options: {
          chart: {
            type: "bar",
          },

          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return;
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },

          xaxis: {
            categories: business.map((data) => data.value),
            position: "bottom",

            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val;
              },
            },
          },
        },
      });
    }
  }, [business]);

  useEffect(() => {
    if (year) {
      setChartConfig2({
        series: [
          {
            name: "",
            data: year.map((data) => data.cnt),
            // data: [5, 6, 3, 7],
          },
        ],
        options: {
          chart: {
            type: "bar",
          },

          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return;
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },

          xaxis: {
            categories: year.map((data) => data.year),
            // categories: ["2019", "2020", "2021", "2022"],
            position: "bottom",

            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val;
              },
            },
          },
        },
      });
    }
  }, [year]);
  ////// TOGGLE //////

  const boardTypeToggle = useCallback(
    (type) => {
      setBoardType(type);
    },
    [boardType]
  );

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  const point = [
    {
      name: "서울특별시",
      top: "39%",
      right: "54.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "대전광역시",
      top: "57%",
      right: "53%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "인천광역시",
      top: "39%",
      right: "56%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "대구광역시",
      top: "66%",
      right: "46.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "울산광역시",
      top: "71%",
      right: "43%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "부산광역시",
      top: "76%",
      right: "44.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "광주광역시",
      top: "74%",
      right: "56.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "세종특별자치시",
      top: "53.5%",
      right: "53.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "제주특별자치도",
      top: "76.5%",
      right: "37%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "경기도",
      top: "43%",
      right: "53%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "강원도",
      top: "38%",
      right: "47%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "충청남도",
      top: "54%",
      right: "56%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "충청북도",
      top: "52%",
      right: "51%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "전라북도",
      top: "66%",
      right: "54%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "전라남도",
      top: "79%",
      right: "56%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "경상남도",
      top: "72%",
      right: "49%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
    {
      name: "경상북도",
      top: "57%",
      right: "46%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/icon_pin.png",
    },
  ];

  return (
    <>
      <Head>
        <title>기관형 과학기술인 협동조합 교류회</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            height={`100vh`}
            padding={`0 10px`}
            color={Theme.white_C}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/banner.png")`}
          >
            <Fade bottom delay={0}>
              <Text
                textAlign={`center`}
                fontSize={
                  width < 1100 ? (width < 900 ? `30px` : `40px`) : `54px`
                }
                lineHeight={width < 900 ? `1.2` : `70px`}
                fontWeight={`900`}
              >
                Institutional Cooperative Association
              </Text>
            </Fade>
            <Fade bottom delay={100}>
              <Text
                textAlign={`center`}
                fontSize={
                  width < 1100 ? (width < 900 ? `30px` : `40px`) : `54px`
                }
                lineHeight={width < 900 ? `1.2` : `70px`}
                fontWeight={`900`}
              >
                of Scientists and Technologists
              </Text>
            </Fade>
            <Fade bottom delay={200}>
              <Text textAlign={`center`} fontSize={`20px`} margin={`20px 0 0`}>
                과학 기술원을 중심으로 과학 기술을 주된 사업으로 활동하는
                협동조합입니다.
              </Text>
            </Fade>
          </Wrapper>

          <RsWrapper padding={width < 700 ? `80px 0` : `120px 0`}>
            <Wrapper dr={`row`}>
              <Wrapper
                width={width < 900 ? `100%` : `60%`}
                radius={`20px`}
                overflow={`hidden`}
              >
                <Mainslider banner={banner} />
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `40%`}
                padding={width < 900 ? `20px 0 0` : `0 0 0 40px`}
                al={`flex-start`}
              >
                <Fade bottom>
                  <Text
                    fontSize={
                      width < 1100 ? (width < 900 ? `25px` : `35px`) : `42px`
                    }
                    fontWeight={`900`}
                  >
                    기관형과학기술인
                  </Text>
                  <Text
                    fontSize={
                      width < 1100 ? (width < 900 ? `25px` : `35px`) : `42px`
                    }
                    fontWeight={`900`}
                  >
                    협동조합교류회 소개
                  </Text>
                  <Text fontSize={`16px`} margin={`20px 0 0`}>
                    기관형 과학기술인 협동조합 성장지원 사업을 지원해 오고
                    있습니다.
                  </Text>
                </Fade>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
          <Wrapper
            bgImg={
              width < 700
                ? `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/img_section2_m.png")`
                : `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/img_section2.png")`
            }
            padding={`80px 0`}
            position={`relative`}
          >
            <RsWrapper>
              <Fade bottom>
                <Text
                  fontSize={`18px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                >
                  Current situation
                </Text>
                <Text
                  fontSize={width < 900 ? `20px` : `34px`}
                  fontWeight={`600`}
                  margin={`12px 0 60px`}
                >
                  전국의 기과협 가입 현황을 안내해드립니다.
                </Text>
              </Fade>

              <Wrapper width={width < 900 ? `100%` : `60%`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/img_map.png`}
                />

                {point.map((data) => {
                  return (
                    <Wrapper>
                      {city &&
                        city.map((v) => {
                          if (data.name === v.combiArea) {
                            return (
                              <Popover
                                key={v.id}
                                placement="top"
                                content={
                                  <Wrapper>
                                    <Text>
                                      {v.combiArea} {v.cnt}개
                                    </Text>
                                  </Wrapper>
                                }
                              >
                                <Image
                                  position={`absolute`}
                                  src={data.src}
                                  width={`20px`}
                                  height={`20px`}
                                  top={data.top}
                                  right={data.right}
                                />
                              </Popover>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </Wrapper>
                  );
                })}
              </Wrapper>
            </RsWrapper>
          </Wrapper>
          <Wrapper padding={width < 700 ? `80px 0` : `120px 0`}>
            <RsWrapper>
              <Fade bottom>
                <Text
                  fontSize={`18px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                >
                  Current situation
                </Text>
                {width < 900 ? (
                  <>
                    <Text
                      fontSize={width < 900 ? `20px` : `34px`}
                      fontWeight={`600`}
                      margin={`12px 0 0`}
                    >
                      사업분류와 년도별 기과협
                    </Text>
                    <Text
                      fontSize={width < 900 ? `20px` : `34px`}
                      fontWeight={`600`}
                      margin={`0 0 60px`}
                    >
                      가입 현황을 확인해보세요.
                    </Text>
                  </>
                ) : (
                  <Text
                    fontSize={width < 900 ? `20px` : `34px`}
                    fontWeight={`600`}
                    margin={`12px 0 60px`}
                  >
                    사업분류와 년도별 기과협 가입 현황을 확인해보세요.
                  </Text>
                )}
              </Fade>

              <Wrapper dr={`row`} ju={`space-between`}>
                {/* <Wrapper
                    position={`absolute`}
                    width={`auto`}
                    top={`0`}
                    left={`0`}
                    padding={`10px`}
                  >
                    <Text fontSize={`20px`}>
                      <SpanText color={Theme.basicTheme_C}>기과협</SpanText>
                      <SpanText color={Theme.subTheme_C}>&nbsp;현황</SpanText>
                      <SpanText margin={`0 0 0 10px`}>① 120 개 조합</SpanText>
                      <SpanText fontSize={`12px`} margin={`0 0 0 10px`}>
                        (2022년 12월 31일 기준)
                      </SpanText>
                    </Text>
                  </Wrapper> */}

                <Wrapper
                  shadow={`3px 3px 20px rgba(0, 0, 0, 0.1)`}
                  padding={`20px`}
                  bgColor={Theme.white_C}
                  radius={`20px`}
                  width={width < 900 ? `100%` : `49%`}
                >
                  {chartConfig2 ? (
                    <Chart
                      options={{
                        ...chartConfig2.options,
                        plotOptions: {
                          width: "20px",
                          bar: {
                            borderRadius: 4,
                            horizontal: width < 700 ? false : true,
                          },
                        },
                      }}
                      series={chartConfig2.series}
                      type="line"
                      width={
                        width < 1280
                          ? width < 900
                            ? `300px`
                            : `350px`
                          : `600px`
                      }
                      height={width < 700 ? "400px" : "390px"}
                    />
                  ) : (
                    // <Text>test</Text>
                    <LoadingOutlined spin />
                  )}
                </Wrapper>

                <Wrapper
                  shadow={`3px 3px 20px rgba(0, 0, 0, 0.1)`}
                  padding={`20px`}
                  bgColor={Theme.white_C}
                  radius={`20px`}
                  width={width < 900 ? `100%` : `49%`}
                  margin={width < 900 && `20px 0 0`}
                >
                  {chartConfig ? (
                    <Chart
                      options={{
                        ...chartConfig.options,
                        plotOptions: {
                          width: "20px",
                          bar: {
                            borderRadius: 4,
                            horizontal: width < 700 ? false : true,
                          },
                        },
                      }}
                      series={chartConfig.series}
                      type="bar"
                      width={
                        width < 1280
                          ? width < 900
                            ? `300px`
                            : `350px`
                          : `600px`
                      }
                      height={width < 700 ? "400px" : "390px"}
                    />
                  ) : (
                    <LoadingOutlined spin />
                  )}
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>

          <Wrapper
            bgColor={Theme.lightGrey_C}
            padding={width < 700 ? `80px 0` : `100px 0`}
          >
            <RsWrapper>
              <Fade bottom>
                <Text
                  fontSize={`18px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                >
                  News
                </Text>
                <Text
                  fontSize={width < 900 ? `20px` : `34px`}
                  fontWeight={`600`}
                  margin={`12px 0 34px`}
                >
                  교류회의 최근 소식을 만나보세요.
                </Text>
              </Fade>
              <Wrapper dr={`row`} margin={`0 0 60px`}>
                <BoardTypeButton
                  onClick={() => boardTypeToggle("전체")}
                  isCheck={boardType === "전체"}
                >
                  <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                    전체
                  </Text>
                </BoardTypeButton>
                {boardType === "공지사항" || boardType === "전체" ? null : (
                  <Wrapper
                    width={`5px`}
                    height={`5px`}
                    radius={`100%`}
                    bgColor={Theme.basicTheme_C}
                  ></Wrapper>
                )}
                <BoardTypeButton
                  onClick={() => boardTypeToggle("공지사항")}
                  isCheck={boardType === "공지사항"}
                >
                  <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                    공지사항
                  </Text>
                </BoardTypeButton>
                {boardType === "공지사항" || boardType === "커뮤니티" ? null : (
                  <Wrapper
                    width={`5px`}
                    height={`5px`}
                    radius={`100%`}
                    bgColor={Theme.basicTheme_C}
                  ></Wrapper>
                )}

                <BoardTypeButton
                  onClick={() => boardTypeToggle("커뮤니티")}
                  isCheck={boardType === "커뮤니티"}
                >
                  <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                    커뮤니티
                  </Text>
                </BoardTypeButton>
                {boardType === "자료실" || boardType === "커뮤니티" ? null : (
                  <Wrapper
                    width={`5px`}
                    height={`5px`}
                    radius={`100%`}
                    bgColor={Theme.basicTheme_C}
                  ></Wrapper>
                )}
                <BoardTypeButton
                  onClick={() => boardTypeToggle("자료실")}
                  isCheck={boardType === "자료실"}
                >
                  <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                    자료실
                  </Text>
                </BoardTypeButton>
                {boardType === "자료실" || boardType === "FAQ" ? null : (
                  <Wrapper
                    width={`5px`}
                    height={`5px`}
                    radius={`100%`}
                    bgColor={Theme.basicTheme_C}
                  ></Wrapper>
                )}
                <BoardTypeButton
                  onClick={() => boardTypeToggle("FAQ")}
                  isCheck={boardType === "FAQ"}
                >
                  <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                    FAQ
                  </Text>
                </BoardTypeButton>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={width < 900 ? `space-between` : `flex-start`}
                al={`flex-start`}
              >
                {mainBoard &&
                  (mainBoard.length === 0 ? (
                    <Wrapper margin={`50px 0`}>
                      <Empty description="게시글이 없습니다." />
                    </Wrapper>
                  ) : (
                    mainBoard.map((data, idx) => {
                      return (
                        <BoardWrapper
                          key={idx}
                          onClick={() =>
                            moveLinkHandler(
                              data.type === "공지사항"
                                ? `/operate/notice?type=detail&id=${data.id}`
                                : data.type === "커뮤니티"
                                ? `/operate/community?type=detail&id=${data.id}`
                                : data.type === "자료실"
                                ? `/operate/reference?type=detail&id=${data.id}`
                                : data.type === "FAQ" &&
                                  `/operate/notice?type=detail&id=${data.id}`
                            )
                          }
                        >
                          <Wrapper>
                            <Wrapper
                              al={`flex-start`}
                              fontSize={width < 700 ? `13px` : `16px`}
                              fontWeight={`700`}
                              color={Theme.subTheme_C}
                            >
                              {data.type}
                            </Wrapper>
                            <Wrapper
                              al={`flex-start`}
                              fontWeight={`600`}
                              fontSize={width < 700 ? `13px` : `22px`}
                            >
                              <Text>{data.title}</Text>
                            </Wrapper>
                          </Wrapper>
                          <Wrapper
                            al={`flex-end`}
                            margin={width < 700 && `10px 0 0`}
                            fontSize={width < 700 ? `13px` : `16px`}
                            color={Theme.grey_C}
                          >
                            {data.viewFrontCreatedAt}
                          </Wrapper>
                        </BoardWrapper>
                      );
                    })
                  ))}
              </Wrapper>
            </RsWrapper>
          </Wrapper>
          <Wrapper padding={width < 700 ? `80px 0` : `120px 0`}>
            <RsWrapper>
              <Fade bottom>
                <Text
                  fontSize={`18px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                >
                  With ICAST
                </Text>
                <Text
                  fontSize={width < 900 ? `20px` : `34px`}
                  fontWeight={`600`}
                  margin={`12px 0 60px`}
                >
                  함께 한 파트너사를 소개합니다.
                </Text>
              </Fade>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                wrap={`nowrap`}
                overflow={`auto`}
              >
                <ATag
                  href={`https://www.msit.go.kr/index.do`}
                  width={`15%`}
                  target={`_blank`}
                  minWidth={`120px`}
                  margin={width < 900 ? `0 10px` : `0`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_gover.png"
                    alt="logo"
                  />
                </ATag>
                <ATag
                  href={`https://www.nrf.re.kr/index`}
                  width={`10%`}
                  target={`_blank`}
                  minWidth={`120px`}
                  margin={width < 900 ? `0 10px` : `0`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_nrf.png"
                    alt="logo"
                  />
                </ATag>
                <ATag
                  href={`https://www.coop.go.kr/home/index.do`}
                  width={`10%`}
                  target={`_blank`}
                  minWidth={`120px`}
                  margin={width < 900 ? `0 10px` : `0`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_coop.png"
                    alt="logo"
                  />
                </ATag>
                <ATag
                  href={`https://www.setcoop.net/`}
                  width={`18%`}
                  target={`_blank`}
                  minWidth={`120px`}
                  margin={width < 900 ? `0 10px` : `0`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_setcoop.png"
                    alt="logo"
                  />
                </ATag>
                <ATag
                  href={`http://www.djse.org/app/main/index`}
                  width={`10%`}
                  target={`_blank`}
                  minWidth={`120px`}
                  margin={width < 900 ? `0 10px` : `0`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_social.png"
                    alt="logo"
                  />
                </ATag>
                <ATag
                  href={`https://posep.org/`}
                  width={`20%`}
                  target={`_blank`}
                  minWidth={`120px`}
                  margin={width < 900 ? `0 10px` : `0`}
                >
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/logo_posep.png"
                    alt="logo"
                  />
                </ATag>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
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
      type: MAIN_REQUEST,
    });

    context.store.dispatch({
      type: MAIN_BOARD_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;

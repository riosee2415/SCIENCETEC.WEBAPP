import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  SpanText,
  Text,
  CommonButton,
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
import {
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BoardTypeButton = styled(CommonButton)`
  background-color: ${(props) => props.isCheck && props.theme.basicTheme_C};
  color: ${(props) => props.isCheck && props.theme.white_C};
  border: ${(props) => props.isCheck && `1px solid ${props.theme.white_C}`};
`;

const BoardWrapper = styled(Wrapper)`
  flex-direction: row;
  height: 60px;
  border-bottom: 1px dashed ${(props) => props.theme.lightGrey2_C};

  &:hover {
    background-color: ${(props) => props.theme.subTheme4_C};
  }
`;

const MainBtn = styled(CommonButton)`
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
  margin-right: 8px;
  color: ${Theme.basicTheme_C};
  padding: 0px;
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

  const boardImage = [
    {
      type: "전체",
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/img_board1.png",
    },
    {
      type: "공지사항",
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/img_board2.png",
    },
    {
      type: "커뮤니티",
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/img_board3.png",
    },
    {
      type: "자료실",
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/img_board4.png",
    },
    {
      type: "FAQ",
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/img_board5.png",
    },
  ];

  const point = [
    {
      name: "서울특별시",
      top: "19%",
      right: "59%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "대전광역시",
      top: "47%",
      right: "55.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "인천광역시",
      top: "19%",
      right: "62.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "대구광역시",
      top: "60%",
      right: "43%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "울산광역시",
      top: "67%",
      right: "36%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "부산광역시",
      top: "75%",
      right: "38%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "광주광역시",
      top: "73%",
      right: "63.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "세종특별자치시",
      top: "42%",
      right: "56.5%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "제주특별자치도",
      top: "76%",
      right: "23%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "경기도",
      top: "25%",
      right: "56%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "강원도",
      top: "18%",
      right: "45%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "충청남도",
      top: "40%",
      right: "62%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "충청북도",
      top: "37%",
      right: "52%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "전라북도",
      top: "60%",
      right: "59%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "전라남도",
      top: "79%",
      right: "61%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "경상남도",
      top: "70%",
      right: "47%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
    },
    {
      name: "경상북도",
      top: "47%",
      right: "41%",
      src: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/icon_pin.png",
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
            color={Theme.white_C}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main2/banner.png")`}
          >
            <Text fontSize={`54px`} lineHeight={`70px`} fontWeight={`900`}>
              Institutional Cooperative Association
            </Text>
            <Text fontSize={`54px`} lineHeight={`70px`} fontWeight={`900`}>
              of Scientists and Technologists
            </Text>
            <Text fontSize={`20px`} margin={`20px 0 0`}>
              과학 기술원을 중심으로 과학 기술을 주된 사업으로 활동하는
              협동조합입니다.
            </Text>
          </Wrapper>

          <RsWrapper padding={width < 700 ? `80px 0` : `120px 0`}>
            <Wrapper dr={`row`}>
              <Wrapper
                width={width < 700 ? `100%` : `60%`}
                radius={`20px`}
                overflow={`hidden`}
              >
                <Mainslider banner={banner} />
              </Wrapper>
              <Wrapper width={`40%`} padding={`0 0 0 40px`} al={`flex-start`}>
                <Text fontSize={`42px`} fontWeight={`900`}>
                  기관형과학기술인
                </Text>
                <Text fontSize={`42px`} fontWeight={`900`}>
                  협동조합교류회 소개
                </Text>
                <Text fontSize={`16px`} margin={`20px 0 0`}>
                  기관형 과학기술인 협동조합 성장지원 사업을 지원해 오고
                  있습니다.
                </Text>
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
              <Text
                fontSize={`18px`}
                fontWeight={`600`}
                color={Theme.basicTheme_C}
              >
                Current situation
              </Text>
              <Text fontSize={`34px`} fontWeigt={`600`} margin={`12px 0 60px`}>
                전국의 기과협 가입 현황을 안내해드립니다.
              </Text>

              <Wrapper width={`547px`}>
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
          <Wrapper bgColor={Theme.lightGrey_C} padding={`50px 0`}>
            <RsWrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 100px`}>
                <Wrapper
                  width={width < 700 ? `100%` : `49%`}
                  margin={width < 700 ? `20px 0 0` : `0`}
                  height={width < 700 ? `520px` : `440px`}
                  bgColor={Theme.white_C}
                  radius={`20px`}
                  position={`relative`}
                >
                  <Wrapper
                    position={`absolute`}
                    width={`auto`}
                    top={`0`}
                    left={`0`}
                    padding={`10px`}
                  >
                    <Text fontSize={`24px`}>
                      <SpanText color={Theme.basicTheme_C}>기과협</SpanText>
                      <SpanText color={Theme.subTheme_C}>&nbsp;현황</SpanText>
                      <SpanText margin={`0 0 0 10px`}>① 120 개 조합</SpanText>
                      <SpanText fontSize={`12px`} margin={`0 0 0 10px`}>
                        (2022년 12월 31일 기준)
                      </SpanText>
                    </Text>
                  </Wrapper>

                  {type === 0 && (
                    <Wrapper overflow="hidden" overflowX={`auto`}>
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
                          width={width < 700 ? "350px" : "650px"}
                          height={width < 700 ? "450px" : "390px"}
                        />
                      ) : (
                        // <Text>test</Text>
                        <LoadingOutlined spin />
                      )}
                    </Wrapper>
                  )}

                  {type === 1 && (
                    <Wrapper overflow="hidden" overflowX={`auto`}>
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
                          width={width < 700 ? "350px" : "650px"}
                          height={width < 700 ? "450px" : "390px"}
                        />
                      ) : (
                        <LoadingOutlined spin />
                      )}
                    </Wrapper>
                  )}

                  {type === 2 && (
                    <Wrapper>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/main/img_map.png`}
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
                  )}

                  <Wrapper
                    position={`absolute`}
                    width={`auto`}
                    bottom={`0`}
                    right={`0`}
                    padding={`10px`}
                    dr={`row`}
                  >
                    <MainBtn
                      kindOf={`white`}
                      radius={`100%`}
                      width={`30px`}
                      height={`30px`}
                      onClick={() => setType(type - 1 >= 0 ? type - 1 : type)}
                    >
                      <LeftOutlined />
                    </MainBtn>
                    <MainBtn
                      kindOf={`white`}
                      radius={`100%`}
                      width={`30px`}
                      height={`30px`}
                      onClick={() => setType(type + 1 <= 2 ? type + 1 : type)}
                    >
                      <RightOutlined />
                    </MainBtn>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 25px`}>
                <Text fontSize={`24px`} isNeo={true} color={Theme.subTheme_C}>
                  <SpanText color={Theme.basicTheme_C}>공지</SpanText>
                  사항
                </Text>

                <Text fontSize={`16px`} margin={`0 0 0 20px`}>
                  기관형 과학기술인 협동조합 교류화의 소식
                </Text>
              </Wrapper>
            </RsWrapper>
          </Wrapper>

          <RsWrapper>
            <Wrapper
              padding={`40px`}
              border={`6px solid ${Theme.subTheme2_C}`}
              radius={`10px`}
              dr={`row`}
              margin={`0 0 100px`}
              al={`flex-start`}
            >
              <Wrapper
                width={width < 1280 ? `100%` : `calc(100% - 450px)`}
                padding={width < 1280 ? `0 0 30px` : `0 50px 0 0`}
              >
                <Wrapper
                  dr={`row`}
                  ju={width < 700 ? `space-around` : `flex-start`}
                  margin={`0 0 30px`}
                >
                  <BoardTypeButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                    onClick={() => boardTypeToggle("전체")}
                    isCheck={boardType === "전체"}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      전체
                    </Text>
                  </BoardTypeButton>

                  <BoardTypeButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                    onClick={() => boardTypeToggle("공지사항")}
                    isCheck={boardType === "공지사항"}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      공지사항
                    </Text>
                  </BoardTypeButton>
                  <BoardTypeButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                    onClick={() => boardTypeToggle("커뮤니티")}
                    isCheck={boardType === "커뮤니티"}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      커뮤니티
                    </Text>
                  </BoardTypeButton>
                  <BoardTypeButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                    onClick={() => boardTypeToggle("자료실")}
                    isCheck={boardType === "자료실"}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      자료실
                    </Text>
                  </BoardTypeButton>
                  <BoardTypeButton
                    kindOf={`white`}
                    width={`auto`}
                    height={width < 700 ? `30px` : `50px`}
                    padding={width < 700 ? `0 10px` : `0 30px`}
                    radius={`50px`}
                    margin={width < 700 ? `0 0 5px` : `0`}
                    onClick={() => boardTypeToggle("FAQ")}
                    isCheck={boardType === "FAQ"}
                  >
                    <Text fontSize={width < 700 ? `14px` : `18px`} isNeo={true}>
                      FAQ
                    </Text>
                  </BoardTypeButton>
                </Wrapper>
                {mainBoard &&
                  (mainBoard.length === 0 ? (
                    <Wrapper margin={`100px 0`}>
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
                          <Wrapper
                            al={`flex-start`}
                            width={width < 700 ? `25%` : `10%`}
                            fontSize={width < 700 ? `13px` : `16px`}
                            fontWeight={`700`}
                            color={Theme.subTheme_C}
                          >
                            {data.type}
                          </Wrapper>
                          <Wrapper
                            al={`flex-start`}
                            width={`75%`}
                            fontSize={width < 700 ? `13px` : `16px`}
                          >
                            <Text>{data.title}</Text>
                          </Wrapper>
                          <Wrapper
                            display={width < 700 ? `none` : `flex`}
                            al={`flex-end`}
                            width={`15%`}
                            fontSize={`16px`}
                            color={Theme.grey_C}
                          >
                            {data.viewFrontCreatedAt}
                          </Wrapper>
                        </BoardWrapper>
                      );
                    })
                  ))}
              </Wrapper>
              <Image
                src={boardImage.find((data) => data.type === boardType).url}
                alt="img"
                height={`380px`}
                width={width < 1280 ? `100%` : `450px`}
                display={width < 700 ? `none` : `flex`}
              />
            </Wrapper>
          </RsWrapper>
          <Wrapper
            bgColor={Theme.lightGrey_C}
            padding={`30px 0`}
            wrap={`nowrap`}
            overflow={`auto`}
          >
            <RsWrapper>
              <Wrapper dr={`row`} ju={`space-between`} minWidth={`900px`}>
                <ATag
                  href={`https://www.msit.go.kr/index.do`}
                  width={`15%`}
                  target={`_blank`}
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

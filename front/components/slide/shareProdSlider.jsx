import { Carousel, Empty } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Wrapper, Text, Image } from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const Custom = styled(Carousel)`
  .slick-list {
    padding: 0 !important;
  }
`;

const ArrowWrapper = styled(Wrapper)`
  width: 35px;
  height: 35px;
  margin: ${(props) => props.margin || `-15px 0 0 -35px`};
  transition: 0.5s;

  & svg {
    font-size: 30px;
    color: ${Theme.darkGrey_C};
    transition: 0.5s;
  }

  &:hover {
    & svg {
      color: ${Theme.basicTheme_C};
    }
  }
`;

const ShareProdSlider = ({
  datum,
  //
  dots = true,
  arrow = false,
  effect = `scrollx`, // scrollx or fade
  //
  autoplay = false,
  delay = 5000,
  //
  isMix = false, // Row 슬라이드 가로 (false) 세로 (true) 정렬
  //
  row = 1,
  line = 1, // Row 슬라이드 행 수
  //
}) => {
  const width = useWidth();

  const [slideDatum, setSlideDatum] = useState(null);

  const [currentTab, setCurrentTab] = useState(1);

  const slideRef = useRef();

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const moveSlideHandler = (isNext) => {
    if (isNext) {
      for (let i = 0; i < slideDatum.length; i++) {
        if (slideRef.current) {
          slideRef.current.next();
        }
      }
    } else {
      for (let i = 0; i < slideDatum.length; i++) {
        if (slideRef.current) {
          slideRef.current.prev();
        }
      }
    }
  };

  const movePageHandler = (idx) => {
    setCurrentTab(idx);
    for (let i = 0; i < slideDatum.length; i++) {
      slideRef.current.goTo(idx);
    }
  };

  useEffect(() => {
    if (datum) {
      let tempArr = [];
      let totalArr = [];

      for (let i = 0; i < datum.length; i++) {
        tempArr.push(datum[i]);
        if (tempArr.length === row * line) {
          totalArr.push(tempArr);
          tempArr = [];
        }
      }

      if (tempArr.length !== 0) {
        let index = tempArr.length;
        for (let i = 0; i < row * line - index; i++) {
          tempArr.push("");
        }
        totalArr.push(tempArr);
      }

      setSlideDatum(totalArr);
    }
  }, [datum]);

  useEffect(() => {
    if (slideDatum && arrow) {
      const beforeButton = document.querySelector(".before");
      const nextButton = document.querySelector(".next");

      beforeButton.addEventListener(`click`, () => moveSlideHandler(false));
      nextButton.addEventListener(`click`, () => moveSlideHandler(true));
    }
  }, [slideDatum, arrow, line, slideDatum]);

  if (!slideDatum) {
    return null;
  }

  return (
    <Wrapper display={`block`} position={`relative`}>
      {arrow && (
        <Wrapper
          position={`absolute`}
          top={`50%`}
          transform={`translateY(-50%)`}
          dr={`row`}
          ju={`space-between`}
          padding={`0 20px`}
          zIndex={`9999`}
          cursor={`pointer`}
        >
          <Wrapper width={`auto`}>
            <ArrowWrapper
              className={`before`}
              onClick={() => moveSlideHandler(false)}
            >
              <LeftOutlined />
            </ArrowWrapper>
          </Wrapper>

          <Wrapper width={`auto`}>
            <ArrowWrapper
              margin={`-15px -35px 0 0`}
              className={`next`}
              onClick={() => moveSlideHandler(true)}
            >
              <RightOutlined />
            </ArrowWrapper>
          </Wrapper>
        </Wrapper>
      )}

      <Custom
        className="one-slide"
        effect={effect}
        dots={false}
        slidesToShow={1} // 한 화면에 몇개의 슬라이드가 보여지는지 결정
        vertical={false}
        ref={slideRef}
        autoplay={autoplay}
        centerMode={false} // 양쪽에 겹쳐서 보이는 디자인
        centerPadding={width < 700 ? `10px` : `50px`} // 얼만큼 겹쳐 보일건지 결정
        fade={false} // fade or slide
        initialSlide={0} // 초기에 몇번째 슬라이드를 보여줄 것인지 결정
        variableWidth={false} // 각각 다른 크기를 지정할 수 있음
        verticalSwiping={false}
        draggable={true}
      >
        {slideDatum.map((slide, idx) => {
          return (
            <Wrapper display={`flex !important`} dr={`row`} key={idx}>
              <Wrapper
                wrap={`nowrap`}
                borderBottom={`2px solid ${Theme.basicTheme_C}`}
                dr={`row`}
                ju={`flex-start`}
              ></Wrapper>
              <Image
                alt="image"
                src={slide[0].imagePath}
                onClick={() => moveLinkHandler(slide[0].link)}
                cursor={`pointer`}
                height={`300px`}
              />
              <Wrapper
                dr={`row`}
                height={`55px`}
                fontSize={`16px`}
                borderTop={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Wrapper
                  fontWeight={`bold`}
                  color={Theme.grey2_C}
                  width={width < 900 ? `100px` : `180px`}
                >
                  조합명
                </Wrapper>
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 180px)`
                  }
                  al={`flex-start`}
                >
                  {slide[0].name}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                <Wrapper
                  fontWeight={`bold`}
                  color={Theme.grey2_C}
                  width={width < 900 ? `100px` : `180px`}
                >
                  대표자명
                </Wrapper>
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 180px)`
                  }
                  al={`flex-start`}
                >
                  {slide[0].repreName}
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                <Wrapper
                  fontWeight={`bold`}
                  color={Theme.grey2_C}
                  width={width < 900 ? `100px` : `180px`}
                >
                  설립연도
                </Wrapper>
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 180px)`
                  }
                  al={`flex-start`}
                >
                  {slide[0].viewEstimateDate}
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                <Wrapper
                  fontWeight={`bold`}
                  color={Theme.grey2_C}
                  width={width < 900 ? `100px` : `180px`}
                >
                  직원수
                </Wrapper>
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 180px)`
                  }
                  al={`flex-start`}
                >
                  {slide[0].viewEmpCnt}
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} height={`55px`} fontSize={`16px`}>
                <Wrapper
                  fontWeight={`bold`}
                  color={Theme.grey2_C}
                  width={width < 900 ? `100px` : `180px`}
                >
                  업종
                </Wrapper>
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 180px)`
                  }
                  al={`flex-start`}
                >
                  {slide[0].jobType}
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                height={`75px`}
                fontSize={`16px`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Wrapper
                  fontWeight={`bold`}
                  color={Theme.grey2_C}
                  width={width < 900 ? `100px` : `180px`}
                >
                  주업무
                </Wrapper>
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 180px)`
                  }
                  al={`flex-start`}
                  fontSize={`14px`}
                >
                  {slide[0].importantWork}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          );
        })}
      </Custom>

      {dots && (
        <Wrapper
          dr={`row`}
          position={`absolute`}
          bottom={`0`}
          className={`dots`}
        >
          {slideDatum.map((_, idx) => {
            return (
              <Wrapper
                key={idx}
                width={`auto`}
                margin={`0 10px`}
                cursor={`pointer`}
                color={currentTab === idx ? Theme.basicTheme_C : Theme.grey_C}
                onClick={() => {
                  movePageHandler(idx);
                }}
              >
                {idx + 1}
              </Wrapper>
            );
          })}
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default React.memo(ShareProdSlider);

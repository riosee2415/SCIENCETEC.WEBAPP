import React, { useEffect, useCallback } from "react";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
  CommonButton,
  RsWrapper,
  Text,
} from "../commonComponents";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MAIN_BANNER_REQUEST } from "../../reducers/banner";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";

const TextHover = styled(Text)`
  font-size: 16px;
  line-height: 1.1;
  color: ${Theme.grey_C};
  margin: 0 0 0 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: ${Theme.black_C};
  }
`;

const animation = keyframes`
    0% {
      width: 0%;
    } 100% {
      width: 100%;
    }
    `;

const Box = styled(Wrapper)`
  width: 15px;
  height: 15px;
  background: ${Theme.grey_C};
  cursor: pointer;
  margin: 0 0 0 10px;

  &:hover {
    background: ${Theme.black_C};
  }
`;

const Line = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  animation: ${animation} 5s;
  background: ${Theme.black_C};
`;

const MainSliderWrapper = styled(RowWrapper)`
  & .ant-carousel {
    width: 100%;
  }

  .ant-carousel .slick-dots li button,
  .ant-carousel .slick-dots li {
    width: 18px;
    height: 18px;
    border-radius: 100%;
  }

  .ant-carousel .slick-dots li {
    margin: 0 7px;
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: ${Theme.basicTheme_C};
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.4);
    z-index: 10;
    border-radius: 100%;
    transition: 0.3s;
  }
  .ant-carousel .slick-prev {
    left: 20px;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 20px;
      background-size: cover;
      transform: translate(-50%, -50%);
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/real-casting/assets/images/main-page/icon_ban-prev.png");
    }
    &:hover:before {
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/real-casting/assets/images/main-page/icon_ban-prev_h.png");
    }
    @media (max-width: 1280px) {
      left: 20px;
    }
  }
  .ant-carousel .slick-next {
    right: 20px;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 20px;
      background-size: cover;
      transform: translate(-50%, -50%);
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/real-casting/assets/images/main-page/icon_ban-next.png");
    }
    &:hover:before {
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/real-casting/assets/images/main-page/icon_ban-next_h.png");
    }
    @media (max-width: 1280px) {
      right: 20px;
    }
  }
`;

const MainSlider = ({ banner }) => {
  const width = useWidth();

  const dispatch = useDispatch();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isStop, setIsStop] = useState(false);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);

  const handler = useCallback(
    (data) => {
      if (data === 0) {
        setCurrentIdx(data + 1);
      } else {
        setCurrentIdx(data - 1);
      }
    },
    [currentIdx]
  );

  return (
    <MainSliderWrapper position={`relative`}>
      <Carousel
        autoplay={isStop ? false : true}
        speed={1000}
        beforeChange={handler}
        autoplaySpeed={5000}
        fade={true}
        initialSlide={0}
        dots={false}
        arrows={true}
      >
        {banner &&
          banner.map((data, idx) => {
            return (
              <ColWrapper
                key={idx}
                span={24}
                height={width < 700 ? `350px` : `440px`}
                bgImg={`url(${data.imageURL})`}
                position={`relative`}
                display={`flex !important`}
                onClick={() =>
                  data.linkUseYn === 1 && moveLinkHandler(data.link)
                }
                cursor={data.linkUseYn === 1 && `pointer`}
              >
                <Wrapper>
                  <Wrapper
                    color={Theme.white_C}
                    fontSize={width < 700 ? `22px` : `30px`}
                    lineHeight={`1.3`}
                  >
                    {data.titleUseYn === 1 && <Text>{data.title}</Text>}
                  </Wrapper>

                  <ColWrapper
                    color={Theme.white_C}
                    lineHeight={`1.5`}
                    margin={`20px 0`}
                  >
                    {data.contentUseYn === 1 && <Text>{data.content}</Text>}
                  </ColWrapper>
                </Wrapper>
              </ColWrapper>
            );
          })}
      </Carousel>

      <Wrapper
        position={`absolute`}
        bottom={`10px`}
        left={`10px`}
        zIndex={`10`}
        dr={`row`}
        ju={`flex-start`}
        width={`auto`}
      >
        {banner &&
          banner.map((data, idx) => {
            return (
              <>
                <Text
                  margin={`0 10px`}
                  color={currentIdx === idx ? Theme.black_C : Theme.grey_C}
                  cursor={`pointer`}
                >
                  0{idx + 1}
                </Text>

                {currentIdx === idx && (
                  <Wrapper
                    height={`2px`}
                    width={currentIdx === idx ? `50px` : `0`}
                    bgColor={Theme.grey_C}
                    position={`relative`}
                  >
                    <Wrapper
                      position={`absolute`}
                      top={`0`}
                      left={`0`}
                      height={`100%`}
                    >
                      <Line />
                    </Wrapper>
                  </Wrapper>
                )}
              </>
            );
          })}

        <Wrapper width={`auto`} onClick={() => setIsStop(!isStop)}>
          {isStop ? (
            <TextHover>
              <CaretRightOutlined />
            </TextHover>
          ) : (
            <Box />
          )}
        </Wrapper>
      </Wrapper>
    </MainSliderWrapper>
  );
};

export default MainSlider;

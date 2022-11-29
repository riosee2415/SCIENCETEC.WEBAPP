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
  animation: ${animation} 3s;
  background: ${Theme.black_C};
`;

const MainSliderWrapper = styled(RowWrapper)`
  & .ant-carousel {
    width: 100%;
  }
`;

const MainSlider = ({ banner }) => {
  const width = useWidth();

  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

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
        autoplaySpeed={3000}
        fade={true}
        initialSlide={0}
        dots={false}
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

                  {data.linkUseYn === 1 && (
                    <CommonButton onClick={() => moveLinkHandler(data.link)}>
                      링크이동
                    </CommonButton>
                  )}
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

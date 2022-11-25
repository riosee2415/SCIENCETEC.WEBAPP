import React from "react";
import { Wrapper, Text, CustomPage, CommonButton } from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TEMP_TYPE } from "../reducers/notice";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Box = styled(Wrapper)`
  height: 40px;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  flex-direction: row;

  &:hover {
    cursor: pointer;
    background: ${Theme.lightGrey_C};
  }

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

const OpBoard = ({ boardType }) => {
  const { boardType: bt } = useSelector((state) => state.notice);

  const width = useWidth();
  const dispatch = useDispatch();
  const router = useRouter();

  const goWritePage = useCallback(() => {
    dispatch({
      type: SET_TEMP_TYPE,
      data: {
        boardType,
        viewType: "write",
      },
    });
  }, [boardType]);

  return (
    <>
      <Wrapper
        borderTop={`2px solid ${Theme.basicTheme_C}`}
        height={`48px`}
        bgColor={Theme.subTheme4_C}
        borderBottom={`1px solid ${Theme.lightGrey2_C}`}
        dr={`row`}
      >
        <Wrapper width={`8%`} display={width < 900 ? `none` : `flex`}>
          번호
        </Wrapper>
        <Wrapper width={`62%`}>
          <Text isNeo>제목</Text>
        </Wrapper>
        <Wrapper width={width < 900 ? `19%` : `15%`}>
          <Text isNeo>일시</Text>
        </Wrapper>
        <Wrapper width={width < 900 ? `19%` : `15%`}>
          <Text isNeo>게시자</Text>
        </Wrapper>
      </Wrapper>

      <Box>
        <Wrapper width={`8%`} display={width < 900 ? `none` : `flex`}>
          10
        </Wrapper>
        <Wrapper width={`62%`}>
          <Text width={`90%`} isEllipsis>
            설립 어떻게 해요?
          </Text>
        </Wrapper>
        <Wrapper width={width < 900 ? `19%` : `15%`}>2022.10.13</Wrapper>
        <Wrapper width={width < 900 ? `19%` : `15%`}>Science</Wrapper>
      </Box>

      {boardType === "커뮤니티" && (
        <Wrapper al={`flex-end`} margin={`30px 0 20px`}>
          <CommonButton
            kindOf={`subTheme`}
            width={width < 900 ? `140px` : `160px`}
            height={width < 900 ? `45px` : `55px`}
            fontSize={width < 900 ? `16px` : `18px`}
            fontWeight={`bold`}
            onClick={() => goWritePage()}
          >
            작성하기
          </CommonButton>
        </Wrapper>
      )}

      <CustomPage />
    </>
  );
};

export default OpBoard;

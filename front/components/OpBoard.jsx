import React from "react";
import { Wrapper, Text, CustomPage, CommonButton } from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOTICE_DETAIL_REQUEST, SET_TEMP_TYPE } from "../reducers/notice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Empty } from "antd";

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

const OpBoard = ({ boardType, data, maxPage, currentPage, otherPageCall }) => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const goWritePage = useCallback(() => {
    dispatch({
      type: SET_TEMP_TYPE,
      data: {
        boardType,
        viewType: "write",
      },
    });
  }, [boardType]);

  const detailClickHandler = useCallback((id) => {
    dispatch({
      type: SET_TEMP_TYPE,
      data: {
        boardType,
        viewType: "detail",
      },
    });

    // 디테일 데이터 조회
    dispatch({
      type: NOTICE_DETAIL_REQUEST,
      data: { id },
    });
  }, []);

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
          <Text isNeo>
            {router.pathname === "/guide/reference" ? "비고" : "게시자"}
          </Text>
        </Wrapper>
      </Wrapper>

      {/* Loop */}
      {data && data.length === 0 ? (
        <Wrapper padding={`100px 0`}>
          <Empty description="조회된 게시글이 없습니다." />
        </Wrapper>
      ) : (
        data &&
        data.map((data) => {
          return (
            <Box onClick={() => detailClickHandler(data.id)} key={data.id}>
              <Wrapper width={`8%`} display={width < 900 ? `none` : `flex`}>
                {data.num}
              </Wrapper>
              <Wrapper width={`62%`}>
                <Text width={`90%`} isEllipsis>
                  {data.title}
                </Text>
              </Wrapper>
              <Wrapper width={width < 900 ? `19%` : `15%`}>
                {data.viewFrontCreatedAt}
              </Wrapper>
              <Wrapper width={width < 900 ? `19%` : `15%`}>
                {router.pathname === "/guide/reference" ? "" : data.author}
              </Wrapper>
            </Box>
          );
        })
      )}

      {/* Loop End */}

      <Wrapper al={`flex-end`} margin={`30px 0 20px`}>
        {boardType === "커뮤니티" && (
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
        )}
      </Wrapper>

      <CustomPage
        defaultCurrent={1}
        current={currentPage}
        total={maxPage * 10}
        onChange={otherPageCall}
      />
    </>
  );
};

export default OpBoard;

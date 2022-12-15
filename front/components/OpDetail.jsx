import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { useCallback } from "react";
import { NOTICE_DETAIL_REQUEST, SET_TEMP_TYPE } from "../reducers/notice";
import {
  Image,
  Wrapper,
  Text,
  TextInput,
  TextArea,
  CommonButton,
  SpanText,
  ATag,
} from "./commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "./Theme";
import { FileFilled } from "@ant-design/icons";
import styled from "styled-components";

const NextPrevWrapper = styled(Wrapper)`
  &:hover {
    background-color: ${(props) => props.theme.subTheme4_C};
  }
`;

const OpDetail = () => {
  const { tempType, noticeDetail, noticePrev, noticeNext } = useSelector(
    (state) => state.notice
  );
  const dispatch = useDispatch();
  const width = useWidth();

  useEffect(() => {
    if (!tempType || tempType === "") {
      alert("잘못된 접근입니다.");
      // 뒤로가기
    }
  }, []);

  const listHandler = useCallback(() => {
    dispatch({
      type: SET_TEMP_TYPE,
      data: {
        viewType: "list",
      },
    });
  }, []);

  const nextPrevHandler = useCallback(
    (id) => {
      dispatch({
        type: NOTICE_DETAIL_REQUEST,
        data: {
          id,
        },
      });
    },
    [noticePrev, noticeNext]
  );

  return (
    <Wrapper borderTop={`2px solid ${Theme.basicTheme_C}`} margin={`-24px 0 0`}>
      {noticeDetail ? (
        <>
          {" "}
          <Wrapper
            dr={`row`}
            fontSize={`16px`}
            borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            bgColor={Theme.subTheme4_C}
          >
            <Wrapper
              width={width < 900 ? `100%` : `180px`}
              padding={`18px 20px`}
              al={`flex-start`}
            >
              <Text isNeo>제목</Text>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% - 180px)`}
              padding={`18px 20px`}
              al={`flex-start`}
              bgColor={Theme.white_C}
            >
              {noticeDetail.title}
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            fontSize={`16px`}
            borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            bgColor={Theme.subTheme4_C}
          >
            <Wrapper
              width={width < 900 ? `100%` : `180px`}
              padding={`18px 20px`}
              al={`flex-start`}
            >
              <Text isNeo>게시자</Text>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% - 180px)`}
              padding={`18px 20px`}
              al={`flex-start`}
              bgColor={Theme.white_C}
            >
              {noticeDetail.author}
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            fontSize={`16px`}
            borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            bgColor={Theme.subTheme4_C}
          >
            <Wrapper
              width={width < 900 ? `100%` : `180px`}
              padding={`18px 20px`}
              al={`flex-start`}
            >
              <Text isNeo>작성일</Text>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% - 180px)`}
              padding={`18px 20px`}
              al={`flex-start`}
              bgColor={Theme.white_C}
            >
              {noticeDetail.viewCreatedAt}
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            fontSize={`16px`}
            borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            bgColor={Theme.subTheme4_C}
            al={`flex-start`}
          >
            <Wrapper
              width={width < 900 ? `100%` : `180px`}
              padding={`18px 20px`}
              al={`flex-start`}
            >
              <Text isNeo>내용</Text>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% - 180px)`}
              padding={`18px 20px`}
              al={`flex-start`}
              bgColor={Theme.white_C}
              minHeight={`200px`}
              ju={`flex-start`}
            >
              <Text>{noticeDetail.content}</Text>
            </Wrapper>
          </Wrapper>
          {noticeDetail && noticeDetail.answer && (
            <>
              <Wrapper
                dr={`row`}
                fontSize={`16px`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                bgColor={Theme.subTheme4_C}
              >
                <Wrapper
                  width={width < 900 ? `100%` : `180px`}
                  padding={`18px 20px`}
                  al={`flex-start`}
                >
                  <Text isNeo>답변 작성일</Text>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `calc(100% - 180px)`}
                  padding={`18px 20px`}
                  al={`flex-start`}
                  bgColor={Theme.white_C}
                >
                  {noticeDetail.viewAnsweredAt}
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                fontSize={`16px`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                bgColor={Theme.subTheme4_C}
                al={`flex-start`}
              >
                <Wrapper
                  width={width < 900 ? `100%` : `180px`}
                  padding={`18px 20px`}
                  al={`flex-start`}
                >
                  <Text isNeo>답변 </Text>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `calc(100% - 180px)`}
                  padding={`18px 20px`}
                  al={`flex-start`}
                  bgColor={Theme.white_C}
                  minHeight={`200px`}
                  ju={`flex-start`}
                >
                  <Text>{noticeDetail.answer}</Text>
                </Wrapper>
              </Wrapper>
            </>
          )}
          {noticeDetail.file && (
            <Wrapper
              dr={`row`}
              fontSize={`16px`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              bgColor={Theme.subTheme4_C}
            >
              <Wrapper
                width={width < 900 ? `100%` : `180px`}
                padding={`18px 20px`}
                al={`flex-start`}
              >
                <Text isNeo>첨부파일</Text>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `calc(100% - 180px)`}
                padding={`18px 20px`}
                al={`flex-start`}
                bgColor={Theme.white_C}
              >
                <ATag type="download" href={noticeDetail.file}>
                  <Text width={`100%`} fontSize={`16px`} isHover isEllipsis>
                    <SpanText color={Theme.basicTheme_C} margin={`0 5px 0 0`}>
                      <FileFilled />
                    </SpanText>
                    {noticeDetail.filename}
                  </Text>
                </ATag>
              </Wrapper>
            </Wrapper>
          )}
          {console.log(noticeDetail)}
          <Wrapper
            margin={`60px 0 30px`}
            borderTop={`1px solid ${Theme.lightGrey2_C}`}
          >
            <Wrapper
              dr={`row`}
              fontSize={`16px`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              bgColor={Theme.lightGrey_C}
            >
              <Wrapper
                width={width < 900 ? `100%` : `180px`}
                padding={`18px 20px`}
                al={`flex-start`}
              >
                <Text isNeo>이전글</Text>
              </Wrapper>
              <NextPrevWrapper
                width={width < 900 ? `100%` : `calc(100% - 180px)`}
                padding={`18px 20px`}
                al={`flex-start`}
                bgColor={Theme.white_C}
                cursor={`pointer`}
                onClick={() =>
                  noticePrev
                    ? nextPrevHandler(noticePrev.id)
                    : message.info("이전글이 존재하지 않습니다.")
                }
              >
                {noticePrev ? noticePrev.title : "이전글이 존재하지 않습니다."}
              </NextPrevWrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              fontSize={`16px`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              bgColor={Theme.lightGrey_C}
            >
              <Wrapper
                width={width < 900 ? `100%` : `180px`}
                padding={`18px 20px`}
                al={`flex-start`}
              >
                <Text isNeo>다음글</Text>
              </Wrapper>
              <NextPrevWrapper
                width={width < 900 ? `100%` : `calc(100% - 180px)`}
                padding={`18px 20px`}
                al={`flex-start`}
                bgColor={Theme.white_C}
                cursor={`pointer`}
                onClick={() =>
                  noticeNext
                    ? nextPrevHandler(noticeNext.id)
                    : message.info("다음글이 존재하지 않습니다.")
                }
              >
                {noticeNext ? noticeNext.title : "다음글이 존재하지 않습니다."}
              </NextPrevWrapper>
            </Wrapper>
          </Wrapper>
          <CommonButton
            width={`160px`}
            height={`55px`}
            kindOf={`subTheme`}
            fontSize={`18px`}
            fontWeight={`bold`}
            margin={`0 0 100px`}
            onClick={() => listHandler()}
          >
            목록으로
          </CommonButton>
        </>
      ) : (
        "존재하지 않는 게시글 입니다."
      )}
    </Wrapper>
  );
};

export default OpDetail;

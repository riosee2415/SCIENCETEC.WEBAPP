import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { useCallback } from "react";
import { SET_TEMP_TYPE } from "../reducers/notice";
import {
  Image,
  Wrapper,
  Text,
  TextInput,
  TextArea,
  CommonButton,
  SpanText,
} from "./commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "./Theme";
import { FileFilled } from "@ant-design/icons";

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
              2023년 기관형 과학기술인 협동조합 성장지원 사업 공고
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
              ICAST
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
              2022.10.13
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
            >
              모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와
              국민은 환경보전을 위하여 노력하여야 한다. 정부는 회계연도마다
              예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는
              회계연도 개시 30일전까지 이를 의결하여야 한다. 지방자치단체는
              주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의
              범위안에서 자치에 관한 규정을 제정할 수 있다. 행정각부의 장은
              국무위원 중에서 국무총리의 제청으로 대통령이 임명한다. 거에 있어서
              최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한
              공개회의에서 다수표를 얻은 자를 당선자로 한다. 언론·출판에 대한
              허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다. 국회나 그
              위원회의 요구가 있을 때에는 국무총리·국무위원 또는 정부위원은
              출석·답변하여야 하며, 국무총리 또는 국무위원이 출석요구를 받은
              때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수 있다.
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
              <Text isNeo>첨부파일</Text>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% - 180px)`}
              padding={`18px 20px`}
              al={`flex-start`}
              bgColor={Theme.white_C}
            >
              <Text fontSize={`16px`} isHover>
                <SpanText color={Theme.basicTheme_C} margin={`0 5px 0 0`}>
                  <FileFilled />
                </SpanText>
                2022년 협동조합 교류회.hwp
              </Text>
            </Wrapper>
          </Wrapper>
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
              <Wrapper
                width={width < 900 ? `100%` : `calc(100% - 180px)`}
                padding={`18px 20px`}
                al={`flex-start`}
                bgColor={Theme.white_C}
              >
                2023년 기관형 과학기술인 협동조합 성장지원 사업 공고
              </Wrapper>
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
              <Wrapper
                width={width < 900 ? `100%` : `calc(100% - 180px)`}
                padding={`18px 20px`}
                al={`flex-start`}
                bgColor={Theme.white_C}
              >
                2023년 기관형 과학기술인 협동조합 성장지원 사업 공고
              </Wrapper>
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

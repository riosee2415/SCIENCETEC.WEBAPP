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
} from "./commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "./Theme";

const OpWrite = () => {
  const { tempType } = useSelector((state) => state.notice);
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
    <Wrapper al={`flex-start`}>
      <Wrapper
        wrap={`nowrap`}
        dr={`row`}
        ju={`flex-start`}
        fontSize={width < 900 ? `17px` : `20px`}
        fontWeight={`700`}
      >
        <Image
          alt="icon"
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png`}
          width={`14px`}
          margin={`0 6px 0 0`}
        />
        글 작성하기
      </Wrapper>

      <Text fontWeight={`bold`} color={Theme.grey2_C} margin={`30px 0 0`}>
        제목
      </Text>
      <TextInput
        type="text"
        width={width < 800 ? `100%` : `440px`}
        height={`55px`}
        placeholder="제목을 입력해주세요."
        radius={`5px`}
        margin={`14px 0 0`}
      />
      <Text fontWeight={`bold`} color={Theme.grey2_C} margin={`30px 0 0`}>
        내용
      </Text>
      <TextArea
        type="text"
        width={`100%`}
        height={`160px`}
        placeholder="내용을 입력해주세요."
        radius={`5px`}
        margin={`14px 0 0`}
      />

      <Wrapper dr={`row`} margin={`50px 0 100px`}>
        <CommonButton
          width={`160px`}
          height={`55px`}
          kindOf={`grey`}
          fontSize={`18px`}
          margin={`0 10px 0 0`}
          fontWeight={`bold`}
          onClick={listHandler}
        >
          이전으로
        </CommonButton>
        <CommonButton
          width={`160px`}
          height={`55px`}
          kindOf={`subTheme`}
          fontSize={`18px`}
          fontWeight={`bold`}
        >
          작성하기
        </CommonButton>
      </Wrapper>
    </Wrapper>
  );
};

export default OpWrite;

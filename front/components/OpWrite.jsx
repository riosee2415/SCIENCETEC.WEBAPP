import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { useCallback } from "react";
import { NOTICE_CREATE_REQUEST, SET_TEMP_TYPE } from "../reducers/notice";
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
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";

const OpWrite = () => {
  const { tempType, boardType, st_noticeCreateDone } = useSelector(
    (state) => state.notice
  );
  console.log(tempType);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const width = useWidth();

  const titleInput = useInput(``);
  const contentInput = useInput(``);

  useEffect(() => {
    if (!tempType || tempType === "") {
      alert("잘못된 접근입니다.");
      dispatch({
        type: SET_TEMP_TYPE,
        data: {
          viewType: "list",
        },
      });
    }
  }, []);

  const createHandler = useCallback(() => {
    if (!titleInput.value) {
      return message.error("제목을 입력해주세요.");
    }

    if (!contentInput.value) {
      return message.error("내용을 입력해주세요.");
    }

    dispatch({
      type: NOTICE_CREATE_REQUEST,
      data: {
        title: titleInput.value,
        type: "커뮤니티",
        content: contentInput.value,
        author: me.userId,
      },
    });
  }, [titleInput, contentInput, me]);

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
        {...titleInput}
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
        {...contentInput}
      />

      <Wrapper dr={`row`} margin={`50px 0 100px`}>
        <CommonButton
          width={`160px`}
          height={`55px`}
          kindOf={`grey`}
          fontSize={`18px`}
          margin={`0 10px 0 0`}
          fontWeight={`bold`}
          onClick={() => listHandler()}
        >
          이전으로
        </CommonButton>
        <CommonButton
          width={`160px`}
          height={`55px`}
          kindOf={`subTheme`}
          fontSize={`18px`}
          fontWeight={`bold`}
          onClick={createHandler}
        >
          작성하기
        </CommonButton>
      </Wrapper>
    </Wrapper>
  );
};

export default OpWrite;

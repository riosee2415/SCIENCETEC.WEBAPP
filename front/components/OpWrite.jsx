import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { useCallback } from "react";
import { SET_TEMP_TYPE } from "../reducers/notice";

const OpWrite = () => {
  const { tempType } = useSelector((state) => state.notice);
  const dispatch = useDispatch();

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
    <div>
      {tempType} 글 작성하기
      <Button onClick={listHandler}>목록으로</Button>
    </div>
  );
};

export default OpWrite;

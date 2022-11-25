import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  Text,
  TextArea,
  TextInput,
  Wrapper,
} from "../commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../Theme";
import { Checkbox } from "antd";

const Status = () => {
  const dispatch = useDispatch();

  const width = useWidth();

  ///////////// - EVENT HANDLER- ////////////

  return (
    <Wrapper al={`flex-start`}>
      <Wrapper
        width={width < 900 ? `100%` : `470px`}
        bgColor={Theme.lightGrey_C}
        radius={`5px`}
        al={`flex-start`}
        padding={`15px`}
        margin={`0 0 20px`}
      >
        <Text fontWeight={`bold`} margin={`0 0 14px`} color={Theme.grey2_C}>
          1. 조합명
        </Text>
        <TextInput
          type="text"
          width={`100%`}
          height={`55px`}
          placeholder="조합명을 입력해주세요."
          radius={`5px`}
        />
      </Wrapper>
      <Wrapper
        width={width < 900 ? `100%` : `470px`}
        bgColor={Theme.lightGrey_C}
        radius={`5px`}
        al={`flex-start`}
        padding={`15px`}
        margin={`0 0 20px`}
      >
        <Text fontWeight={`bold`} margin={`0 0 14px`} color={Theme.grey2_C}>
          서비스유형
        </Text>
        <Wrapper al={`flex-start`} margin={`0 0 10px`}>
          <Checkbox>컨설팅 및 자문</Checkbox>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0 0 10px`}>
          <Checkbox>공동프로젝트</Checkbox>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0 0 10px`}>
          <Checkbox>과학기술 개발 및 비즈니스 협업</Checkbox>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0 0 10px`}>
          <Checkbox>과학기술 교육 및 강연</Checkbox>
        </Wrapper>
        <Wrapper al={`flex-start`}>
          <Checkbox>기타</Checkbox>
        </Wrapper>
      </Wrapper>
      <Wrapper
        width={width < 900 ? `100%` : `470px`}
        bgColor={Theme.lightGrey_C}
        radius={`5px`}
        al={`flex-start`}
        padding={`15px`}
        margin={`0 0 20px`}
      >
        <Text fontWeight={`bold`} margin={`0 0 14px`} color={Theme.grey2_C}>
          서비스유형
        </Text>
        <TextArea
          placeholder="기타사항을 입력해주세요."
          height={`120px`}
          width={`100%`}
        />
      </Wrapper>

      <CommonButton
        width={width < 900 ? `100%` : `470px`}
        height={`55px`}
        margin={`0 0 100px`}
        kindOf={`subTheme`}
        fontSize={`18px`}
        fontWeight={`bold`}
      >
        다음으로
      </CommonButton>
      {/* <Wrapper
        dr={`row`}
        ju={`space-between`}
        margin={`0 0 100px`}
        width={width < 900 ? `100%` : `470px`}
      >
        <CommonButton
          width={width < 900 ? `100%` : `49%`}
          height={`55px`}
          kindOf={`grey`}
          fontSize={`18px`}
          fontWeight={`bold`}
        >
          이전으로
        </CommonButton>{" "}
        <CommonButton
          width={width < 900 ? `100%` : `49%`}
          height={`55px`}
          kindOf={`subTheme`}
          fontSize={`18px`}
          fontWeight={`bold`}
        >
          다음으로
        </CommonButton>
      </Wrapper> */}
    </Wrapper>
  );
};

export default Status;

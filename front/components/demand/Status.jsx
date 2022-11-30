import React, { useEffect, useCallback, useState } from "react";
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
import { Checkbox, Empty, Form, message, Modal, Radio } from "antd";
import styled from "styled-components";
import { SURVEY_USER_CREATE_REQUEST } from "../../reducers/survey";
import { useRouter } from "next/router";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
    margin: 0;
  }
`;

const Status = ({ surveyList }) => {
  const { me } = useSelector((state) => state.user);

  const {
    st_surveyUserCreateLoading,
    st_surveyUserCreateDone,
    st_surveyUserCreateError,
  } = useSelector((state) => state.survey);

  const width = useWidth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [form] = Form.useForm();

  const [modalOpen, isModalOpen] = useState(false);

  const modalToggle = useCallback(() => {
    isModalOpen((prev) => !prev);
  }, [modalOpen]);

  useEffect(() => {
    if (!me) {
      router.push("/login");

      return message.error("로그인이 필요한 페이지입니다.");
    }
  }, [me]);

  useEffect(() => {
    if (surveyList) {
      let strJson = "{";
      const surveyList2 = surveyList.map((data) => data.ques);
      surveyList.map((data, idx) => {
        strJson += `"${data.ques.split("(")[0]}": null${
          surveyList2.length !== idx + 1 ? "," : ""
        }`;
      });
      strJson += "}";

      let objJson = JSON.parse(strJson);

      surveyList.map((data) => {
        let strJson2 = "{";
        data.inner.map((value, idx) => {
          strJson2 += `"${
            value.innerType === 1
              ? `textInput${idx}`
              : value.innerType === 2
              ? `textArea${idx}`
              : `checkBox${idx}`
          }":${
            value.innerType === 1 ? '""' : value.innerType === 2 ? '""' : `[]`
          }${data.inner.length !== idx + 1 ? "," : ""}`;
        });

        strJson2 += "}";

        objJson[data.ques.split("(")[0]] = JSON.parse(strJson2);
      });

      form.setFieldsValue({
        ...objJson,
      });
    }
  }, [surveyList]);

  useEffect(() => {
    if (st_surveyUserCreateDone) {
      modalToggle();

      return message.success("제출되었습니다.");
    }

    if (st_surveyUserCreateError) {
      return message.error(st_surveyUserCreateError);
    }
  }, [st_surveyUserCreateDone, st_surveyUserCreateError]);

  ///////////// - EVENT HANDLER- ////////////

  const submitHandler = useCallback(
    (data) => {
      let questionArr = [];

      const dataKey = Object.keys(data);
      const dataValue = Object.values(data);

      dataKey.map((value, idx) => {
        const a = surveyList.find((item) => item.ques.split("(")[0] === value);

        const b = Object.values(dataValue[idx]).map((ele) =>
          Array.isArray(ele) ? ele[0] : ele
        );

        let innerContent = "";

        b.filter((ele) => ele).map((ele, idx) => {
          innerContent += ele
            ? `${ele}${b.filter((ele) => ele).length !== idx + 1 ? " | " : ""}`
            : "";
        });

        questionArr.push({
          questionName: value,
          content: innerContent,
          sort: a.sort,
        });
      });

      // dispatch({
      //   type: SURVEY_USER_CREATE_REQUEST,
      //   data: {
      //     surveyId: 1,
      //     questionValues: questionArr,
      //   },
      // });
    },
    [surveyList]
  );

  return (
    <Wrapper al={`flex-start`}>
      <CustomForm onFinish={submitHandler} form={form}>
        {surveyList && surveyList.length === 0 ? (
          <Wrapper margin={`50px 0`}>
            <Empty description={"등록된 수요조사 설문이 없습니다."} />
          </Wrapper>
        ) : (
          surveyList &&
          surveyList.map((data) => {
            return (
              <Form.List
                key={data.id}
                name={data.ques.split("(")[0]}
                rules={[
                  {
                    validator: async (_, values) => {
                      let isError = false;
                      let errorType = 0;

                      data.inner.map((value) => {
                        // input, area
                        value.innerType === 1 || value.innerType === 2
                          ? Object.values(values)
                              .filter((item) => typeof item === "string")
                              .map(
                                (item) =>
                                  item.trim().length === 0 &&
                                  ((isError = true), (errorType = 0))
                              )
                          : // checkbox
                          data.isOverlap
                          ? // 선택 안했을때 않넣음
                            Object.values(values)
                              .filter((item) => typeof item === "object")
                              .filter((item) => item.length !== 0).length ===
                              0 && ((isError = true), (errorType = 1))
                          : Object.values(values)
                              .filter((item) => typeof item === "object")
                              .filter((item) => item.length !== 0).length > 1
                          ? ((isError = true), (errorType = 2))
                          : Object.values(values)
                              .filter((item) => typeof item === "object")
                              .filter((item) => item.length !== 0).length === 0
                          ? ((isError = true), (errorType = 1))
                          : ((isError = false), (errorType = 1));
                      });

                      if (isError) {
                        if (errorType === 0) {
                          return Promise.reject(
                            new Error(`${data.ques}를 입력해주세요.`)
                          );
                        } else if (errorType === 2) {
                          return Promise.reject(
                            new Error(`${data.ques}는 중복선택 불가능 입니다.`)
                          );
                        } else {
                          return Promise.reject(
                            new Error(`${data.ques}를 선택해주세요.`)
                          );
                        }
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => {
                  return (
                    <Wrapper
                      width={width < 900 ? `100%` : `470px`}
                      bgColor={Theme.lightGrey_C}
                      radius={`5px`}
                      al={`flex-start`}
                      padding={`15px`}
                      margin={`0 0 20px`}
                    >
                      <Text
                        fontWeight={`bold`}
                        margin={`0 0 14px`}
                        color={Theme.grey2_C}
                      >
                        {data.sort}. {data.ques}
                      </Text>

                      {data.inner &&
                        data.inner.map((v, idx) => {
                          return v.innerType === 2 ? (
                            <Wrapper key={v.id}>
                              {v.questionValue && (
                                <Text fontSize={`16px`} margin={`0 0 14px`}>
                                  {v.questionValue}
                                </Text>
                              )}
                              <Form.Item name={`textArea${idx}`}>
                                <TextArea
                                  placeholder={v.placeholderValue}
                                  height={`120px`}
                                  width={`100%`}
                                />
                              </Form.Item>
                            </Wrapper>
                          ) : v.innerType === 3 ? (
                            <Wrapper
                              key={v.id}
                              al={`flex-start`}
                              margin={`0 0 10px`}
                            >
                              <Form.Item name={`checkBox${idx}`}>
                                <Checkbox.Group>
                                  <Checkbox value={v.questionValue}>
                                    {v.questionValue}
                                  </Checkbox>
                                </Checkbox.Group>
                              </Form.Item>
                            </Wrapper>
                          ) : (
                            v.innerType === 1 && (
                              <Wrapper key={v.id}>
                                {v.questionValue && (
                                  <Text fontSize={`16px`} margin={`0 0 14px`}>
                                    {v.questionValue}
                                  </Text>
                                )}
                                <Form.Item name={`textInput${idx}`}>
                                  <TextInput
                                    type="text"
                                    width={`100%`}
                                    height={`55px`}
                                    placeholder={v.placeholderValue}
                                    radius={`5px`}
                                    margin={`0 0 8px 0`}
                                  />
                                </Form.Item>
                              </Wrapper>
                            )
                          );
                        })}
                      <Form.ErrorList errors={errors} />
                      {/* {data.inner &&
                data.inner.map((v) => {
                  return (
                    v.innerType === 3 && (
                      <Wrapper key={v.id} al={`flex-start`} margin={`0 0 10px`}>
                        <Checkbox>{v.questionValue}</Checkbox>
                      </Wrapper>
                    )
                  );
                })}

              {data.inner &&
                data.inner.map((v) => {
                  return (
                    v.innerType === 1 && (
                      <Wrapper key={v.id}>
                        {v.questionValue && (
                          <Text fontSize={`16px`} margin={`0 0 14px`}>
                            {v.questionValue}
                          </Text>
                        )}
                        <TextInput
                          type="text"
                          width={`100%`}
                          height={`55px`}
                          placeholder={v.placeholderValue}
                          radius={`5px`}
                          margin={`0 0 8px 0`}
                        />
                      </Wrapper>
                    )
                  );
                })} */}
                    </Wrapper>
                  );
                }}
              </Form.List>
            );
          })
        )}

        <CommonButton
          width={width < 900 ? `100%` : `470px`}
          height={`55px`}
          margin={`0 0 100px`}
          kindOf={`subTheme`}
          fontSize={`18px`}
          fontWeight={`bold`}
          htmlType="submit"
          loading={st_surveyUserCreateLoading}
        >
          제출하기
        </CommonButton>
      </CustomForm>
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
        </CommonButton>
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
        </CommonButton>
        <CommonButton
          width={width < 900 ? `100%` : `49%`}
          height={`55px`}
          kindOf={`subTheme`}
          fontSize={`18px`}
          fontWeight={`bold`}
          onClick={modalToggle}
        >
          제출하기
        </CommonButton>
      </Wrapper> */}

      <Modal
        title={null}
        footer={null}
        onCancel={modalToggle}
        visible={modalOpen}
      >
        <Wrapper padding={`50px 0`}>
          <Text isNeo fontSize={`24px`} fontWeight={`800`} margin={`0 0 15px`}>
            제출 완료
          </Text>
          <Text fontSize={`16px`}>조사에 응해 주셔서 감사합니다.</Text>
          <Text fontSize={`16px`}>
            여러분의 수요를 반영하여 협동조합을 통한
          </Text>
          <Text fontSize={`16px`}>
            과학기술과 지역 및 사회혁신에 기여할 수 있도록 노력하겠습니다.
          </Text>
          <CommonButton
            width={`130px`}
            height={`50px`}
            kindOf={`subTheme`}
            fontSize={`18px`}
            fontWeight={`bold`}
            onClick={() => router.push("/")}
            margin={`26px 0 0`}
          >
            확인
          </CommonButton>
        </Wrapper>
      </Modal>
    </Wrapper>
  );
};

export default Status;

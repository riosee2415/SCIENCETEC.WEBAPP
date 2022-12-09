import React, { useCallback, useEffect, useRef, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  CustomPage,
  Image,
  RsWrapper,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import LeftMenu from "../../components/LeftMenu";
import BreadCrumb from "../../components/BreadCrumb";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { Checkbox, Empty, Form, message, Modal } from "antd";
import { CloseOutlined, FileOutlined } from "@ant-design/icons";
import {
  FILE_RESET,
  FILE_UPLOAD_REQUEST,
  SURVEY_LIST_REQUEST,
  SURVEY_USER_CREATE_REQUEST,
} from "../../reducers/survey";
import { useRouter } from "next/router";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
    margin: 0;
  }
`;

const Project = () => {
  ////// GLOBAL STATE //////

  const { me } = useSelector((state) => state.user);

  const {
    quesList,
    innerList,
    surveyFilePath,
    //
    st_surveyUserCreateLoading,
    st_surveyUserCreateDone,
    st_surveyUserCreateError,
    //
    st_surveyFileUploadLoading,
    st_surveyFileUploadError,
  } = useSelector((state) => state.survey);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const fileRef = useRef();

  const [form] = Form.useForm();

  const [modalOpen, isModalOpen] = useState(false);
  const [surveyList, setSurveyList] = useState([]);
  const [isAgree, setIsAgree] = useState(false);
  const [fileData, setFileData] = useState(null);
  ////// REDUX //////
  ////// USEEFFECT //////
  // useEffect(() => {
  //   if (!me) {
  //     router.push("/login");

  //     return message.error("로그인이 필요한 페이지입니다.");
  //   }
  // }, [me]);

  useEffect(() => {
    if (quesList && innerList) {
      const quesArr = [];

      quesList.map((d) => {
        quesArr.push({
          id: d.id,
          ques: d.value,
          sort: d.sort,
          inner: innerList.filter((value) => value.SurveyQuestionId === d.id),
          isOverlap: d.isOverlap,
          isTitle: d.isTitle,
        });

        setSurveyList(quesArr);
      });
    }
  }, [quesList, innerList]);

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

  // 파일 업로드
  useEffect(() => {
    if (st_surveyFileUploadError) {
      return message.error(st_surveyFileUploadError);
    }
  }, [st_surveyFileUploadError]);

  ////// TOGGLE //////

  const modalToggle = useCallback(() => {
    isModalOpen((prev) => !prev);
  }, [modalOpen]);

  const isAgreeToggle = useCallback(() => {
    setIsAgree((prev) => !prev);
  }, [isAgree]);
  ////// HANDLER //////
  // 파일 첨부
  const fileClickHandler = useCallback(() => {
    fileRef.current.click();
  }, []);

  const fileUploadHandler = useCallback(
    (e) => {
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        formData.append("file", file);
      });

      if (e.target.files[0]) {
        setFileData(e.target.files[0]);

        dispatch({
          type: FILE_UPLOAD_REQUEST,
          data: formData,
        });
      }
    },
    [fileData]
  );

  // 파일 삭제
  const fileDelHandler = useCallback(() => {
    setFileData(null);
    dispatch({
      type: FILE_RESET,
      data: null,
    });
  }, [fileData, surveyFilePath]);

  // 신청하기
  const submitHandler = useCallback(
    (data) => {
      if (!isAgree) {
        return message.error("개인정보 수집에 동의 해주세요.");
      }

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
          file: null,
        });
      });

      questionArr.push({
        questionName: "개인정보 수집 동의",
        content: "동의",
        sort: Math.max(...questionArr.map((data) => data.sort)) + 1,
        file: null,
      });

      questionArr.push({
        questionName: "첨부파일",
        content: "",
        sort: Math.max(...questionArr.map((data) => data.sort)) + 1,
        file: surveyFilePath,
      });

      dispatch({
        type: SURVEY_USER_CREATE_REQUEST,
        data: {
          surveyId: 3,
          questionValues: questionArr,
        },
      });
    },
    [surveyList, surveyFilePath, isAgree]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>iCAST | 기술매칭사업</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <LeftMenu />
            <Wrapper width={width < 1100 ? `100%` : `calc(100% - 280px)`}>
              <BreadCrumb />
              <Wrapper
                wrap={`nowrap`}
                dr={`row`}
                ju={`flex-start`}
                fontSize={width < 900 ? `18px` : `20px`}
                fontWeight={`700`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle.png`}
                  width={`14px`}
                  margin={`0 6px 0 0`}
                />
                기관형 과학기술인 협동조합 교류회 기술매칭사업
              </Wrapper>
              <Wrapper
                wrap={`nowrap`}
                dr={`row`}
                ju={`flex-start`}
                fontSize={width < 900 ? `18px` : `20px`}
                margin={`35px 0 16px`}
                fontWeight={`700`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/title_circle-small.png`}
                  width={`8px`}
                  margin={`0 6px 0 0`}
                />
                기술매칭서비스 신청
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `16px` : `18px`}
              >
                • 기술매칭서비스를 신청하시면 확인 후 담당자가 별도로
                연락드립니다.
              </Wrapper>

              <Wrapper al={`flex-start`}>
                <CustomForm onFinish={submitHandler} form={form}>
                  {surveyList &&
                    (surveyList.length === 0 ? (
                      <Wrapper margin={`50px 0`}>
                        <Empty
                          description={"등록된 수요조사 설문이 없습니다."}
                        />
                      </Wrapper>
                    ) : (
                      surveyList.map((data) => {
                        return data.isTitle ? (
                          <Wrapper al={`flex-start`}>
                            <Wrapper
                              width={`auto`}
                              padding={`14px 36px`}
                              bgColor={Theme.subTheme4_C}
                              radius={`50px`}
                              color={Theme.basicTheme_C}
                              fontSize={`18px`}
                              fontWeight={`bold`}
                              margin={`50px 0 20px`}
                            >
                              <Text isNeo>{data.ques}</Text>
                            </Wrapper>
                          </Wrapper>
                        ) : (
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
                                    value.innerType === 1 ||
                                    value.innerType === 2
                                      ? Object.values(values)
                                          .filter(
                                            (item) => typeof item === "string"
                                          )
                                          .map(
                                            (item) =>
                                              item.trim().length === 0 &&
                                              ((isError = true),
                                              (errorType = 0))
                                          )
                                      : // checkbox
                                      data.isOverlap
                                      ? // 선택 안했을때 않넣음
                                        Object.values(values)
                                          .filter(
                                            (item) => typeof item === "object"
                                          )
                                          .filter((item) => item.length !== 0)
                                          .length === 0 &&
                                        ((isError = true), (errorType = 1))
                                      : Object.values(values)
                                          .filter(
                                            (item) => typeof item === "object"
                                          )
                                          .filter((item) => item.length !== 0)
                                          .length > 1
                                      ? ((isError = true), (errorType = 2))
                                      : Object.values(values)
                                          .filter(
                                            (item) => typeof item === "object"
                                          )
                                          .filter((item) => item.length !== 0)
                                          .length === 0
                                      ? ((isError = true), (errorType = 1))
                                      : ((isError = false), (errorType = 1));
                                  });

                                  if (isError) {
                                    if (errorType === 0) {
                                      return Promise.reject(
                                        new Error(
                                          `${data.ques}를 입력해주세요.`
                                        )
                                      );
                                    } else if (errorType === 2) {
                                      return Promise.reject(
                                        new Error(
                                          `${data.ques}는 중복선택 불가능 입니다.`
                                        )
                                      );
                                    } else {
                                      return Promise.reject(
                                        new Error(
                                          `${data.ques}를 선택해주세요.`
                                        )
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
                                    {data.ques}
                                    {data.isOverlap ? "(복수선택가능)" : ""}
                                  </Text>

                                  {data.inner &&
                                    data.inner.map((v, idx) => {
                                      return v.innerType === 2 ? (
                                        <Wrapper key={v.id}>
                                          {v.questionValue && (
                                            <Text
                                              fontSize={`16px`}
                                              margin={`0 0 14px`}
                                            >
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
                                              <Text
                                                fontSize={`16px`}
                                                margin={`0 0 14px`}
                                              >
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
                    ))}

                  <Wrapper
                    width={`240px`}
                    height={`50px`}
                    bgColor={Theme.subTheme4_C}
                    radius={`50px`}
                    color={Theme.basicTheme_C}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    margin={`50px 0 20px`}
                  >
                    <Text isNeo>개인정보 수집 및 활용</Text>
                  </Wrapper>

                  <Wrapper
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
                      개인정보 수집 및 활용
                    </Text>
                    <Checkbox checked={isAgree} onChange={isAgreeToggle}>
                      (필수)본인은 icast측의 원활한 기술매칭서비스 상담을 위해
                      개인정보 수집 및 활용에 동의합니다.
                    </Checkbox>
                  </Wrapper>

                  <Wrapper
                    width={`155px`}
                    height={`50px`}
                    bgColor={Theme.subTheme4_C}
                    radius={`50px`}
                    color={Theme.basicTheme_C}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    margin={`50px 0 20px`}
                  >
                    <Text isNeo>파일 첨부</Text>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={fileUploadHandler}
                    />
                    <CommonButton
                      onClick={fileClickHandler}
                      width={`90px`}
                      height={`40px`}
                      fontSize={`16px`}
                      loading={st_surveyFileUploadLoading}
                    >
                      첨부하기
                    </CommonButton>

                    {fileData && (
                      <Wrapper
                        width={width < 900 ? `100%` : `auto`}
                        dr={`row`}
                        ju={`space-between`}
                        height={`40px`}
                        bgColor={Theme.lightGrey_C}
                        fontSize={`16px`}
                        padding={`0 16px`}
                        color={Theme.grey_C}
                      >
                        <Text>
                          <FileOutlined />
                          &nbsp;&nbsp;{fileData.name}
                        </Text>
                        <Wrapper
                          width={`auto`}
                          margin={`0 0 0 10px`}
                          cursor={`pointer`}
                        >
                          <CloseOutlined onClick={fileDelHandler} />
                        </Wrapper>
                      </Wrapper>
                    )}

                    <Wrapper>
                      <CommonButton
                        kindOf={`subTheme`}
                        width={`150px`}
                        height={`55px`}
                        fontSize={`18px`}
                        margin={`50px 0 160px`}
                        fontWeight={`bold`}
                        htmlType="submit"
                        loading={
                          st_surveyFileUploadLoading ||
                          st_surveyUserCreateLoading
                        }
                      >
                        신청하기
                      </CommonButton>
                    </Wrapper>
                  </Wrapper>
                </CustomForm>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>

        <Modal
          title={null}
          footer={null}
          onCancel={modalToggle}
          visible={modalOpen}
        >
          <Wrapper padding={`50px 0`}>
            <Text
              isNeo
              fontSize={`24px`}
              fontWeight={`800`}
              margin={`0 0 15px`}
            >
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
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: SURVEY_LIST_REQUEST,
      data: {
        type: 3,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Project;

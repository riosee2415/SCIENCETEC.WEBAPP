import React, { useEffect, useCallback } from "react";
import { TextInput, Wrapper } from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import { Form, Button, Empty, message } from "antd";
import useWidth from "../../hooks/useWidth";
import { CommonButton } from "../commonComponents";
import { useDispatch, useSelector } from "react-redux";
import { FESTIVAL_TICKET_CREATE_REQUEST } from "../../reducers/festival";
import { useRouter } from "next/router";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
    margin: 0;
  }
`;

const Festival = ({ festivalList }) => {
  ////// GOLBAL STATE //////
  const {
    st_festivalTicketCreateLoading,
    st_festivalTicketCreateDone,
    st_festivalTicketCreateError,
  } = useSelector((state) => state.festival);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [fForm] = Form.useForm();

  ////// USEEFFECT //////

  // 신청하기 후처리
  useEffect(() => {
    if (st_festivalTicketCreateDone) {
      router.push("/");
      return message.success("신청되었습니다.");
    }
    if (st_festivalTicketCreateError) {
      return message.error(st_festivalTicketCreateError);
    }
  }, [st_festivalTicketCreateDone, st_festivalTicketCreateError]);

  ////// HANDLER //////
  const submitHandler = useCallback((data) => {
    const fFormData = fForm.getFieldsValue();
    const fData = fFormData[data.id];

    if (!fData.participantName || fData.participantName.trim().length === 0) {
      return message.error("참가자를 입력해주세요.");
    }

    if (!fData.belong || fData.belong.trim().length === 0) {
      return message.error("소속을 입력해주세요.");
    }

    if (!fData.jobPosition || fData.jobPosition.trim().length === 0) {
      return message.error("직위를 입력해주세요.");
    }

    if (!fData.mobile || fData.mobile.trim().length === 0) {
      return message.error("연락처를 입력해주세요.");
    }

    dispatch({
      type: FESTIVAL_TICKET_CREATE_REQUEST,
      data: {
        FestivalId: data.id,
        participantName: fData.participantName,
        belong: fData.belong,
        jobPosition: fData.jobPosition,
        mobile: fData.mobile,
      },
    });
  }, []);

  return (
    <Wrapper margin={`20px 0`}>
      <CustomForm form={fForm} onFinish={(e) => console.log(e)}>
        {festivalList &&
          (festivalList.length === 0 ? (
            <Wrapper>
              <Empty description="행사 참여 신청서가 없습니다." />
            </Wrapper>
          ) : (
            festivalList.map((data, idx) => {
              return (
                <>
                  {console.log(data.id)}
                  <Wrapper
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    margin={` 0 0 20px`}
                  >
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    >
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        행사명
                      </Wrapper>
                      <Wrapper width={`80%`}>
                        <TextInput
                          value={data.festivalName}
                          border={`none`}
                          width={`100%`}
                          readOnly
                        />
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    >
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        행사일시
                      </Wrapper>
                      <Wrapper width={`80%`}>
                        <TextInput
                          value={data.viewConcatDate}
                          border={`none`}
                          width={`100%`}
                          readOnly
                        />
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    >
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        장소
                      </Wrapper>
                      <Wrapper width={`80%`}>
                        <TextInput
                          value={data.festivalLocation}
                          border={`none`}
                          width={`100%`}
                          readOnly
                        />
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    >
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        참가자
                      </Wrapper>
                      <Wrapper width={`80%`}>
                        <Form.Item name={[data.id, "participantName"]}>
                          <TextInput border={`none`} width={`100%`} />
                        </Form.Item>
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    >
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        소속
                      </Wrapper>
                      <Wrapper width={`30%`}>
                        <Form.Item name={[data.id, "belong"]}>
                          <TextInput border={`none`} width={`100%`} />
                        </Form.Item>
                      </Wrapper>
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        직위
                      </Wrapper>
                      <Wrapper width={`30%`}>
                        <Form.Item name={[data.id, "jobPosition"]}>
                          <TextInput border={`none`} width={`100%`} />
                        </Form.Item>
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    >
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        연락처
                      </Wrapper>
                      <Wrapper width={`80%`}>
                        <Form.Item name={[data.id, "mobile"]}>
                          <TextInput
                            border={`none`}
                            width={`100%`}
                            type="number"
                          />
                        </Form.Item>
                      </Wrapper>
                    </Wrapper>
                    <Wrapper dr={`row`}>
                      <Wrapper
                        width={`20%`}
                        borderRight={`1px solid ${Theme.lightGrey2_C}`}
                        fontSize={width < 700 ? `16px` : `20px`}
                      >
                        참가일정
                      </Wrapper>
                      <Wrapper width={`80%`}>
                        <TextInput
                          value={data.schedule}
                          border={`none`}
                          width={`100%`}
                          readOnly
                        />
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper margin={`0 0 20px`}>
                    <CommonButton
                      width={`300px`}
                      height={`40px`}
                      fontSize={`16px`}
                      onClick={() => submitHandler(data)}
                      loading={st_festivalTicketCreateLoading}
                    >
                      신청하기
                    </CommonButton>
                  </Wrapper>
                </>
              );
            })
          ))}
      </CustomForm>
    </Wrapper>
  );
};

export default Festival;

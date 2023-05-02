import React, { useCallback, useEffect } from "react";
import { CommonButton, Text, TextInput, Wrapper } from "../commonComponents";
import { Checkbox, Form, Radio, message } from "antd";
import Theme from "../Theme";
import useWidth from "../../hooks/useWidth";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { TABLE_SURVEY_CREATE_REQUEST } from "../../reducers/tableSurvey";
import { useSelector } from "react-redux";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
    margin: 0;
  }
`;

const TableSurvey = () => {
  ////// GOLBAL STATE //////
  const {
    st_tableSurveyCreateLoading,
    st_tableSurveyCreateDone,
    st_tableSurveyCreateError,
  } = useSelector((state) => state.tableSurvey);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  const [fForm] = Form.useForm();

  ////// USE EFFECT //////
  useEffect(() => {
    if (st_tableSurveyCreateDone) {
      fForm.resetFields();

      return message.success("참여되었습니다.");
    }

    if (st_tableSurveyCreateError) {
      return message.error(st_tableSurveyCreateError);
    }
  }, [st_tableSurveyCreateDone, st_tableSurveyCreateError]);

  ////// HANDLER //////

  // 총계 합계
  const sumPriceHandler = useCallback(() => {
    const getFormData = fForm.getFieldsValue();
    const pExpense1 = getFormData.pExpense1
      ? parseInt(getFormData.pExpense1)
      : 0;
    const pFacility1 = getFormData.pFacility1
      ? parseInt(getFormData.pFacility1)
      : 0;
    const pMaterial1 = getFormData.pMaterial1
      ? parseInt(getFormData.pMaterial1)
      : 0;
    const pResearch1 = getFormData.pResearch1
      ? parseInt(getFormData.pResearch1)
      : 0;

    fForm.setFieldsValue({
      totalPrice: pExpense1 + pFacility1 + pMaterial1 + pResearch1,
    });
  }, []);

  // 집행 합계
  const sumExecutionHandler = useCallback(() => {
    const getFormData = fForm.getFieldsValue();
    const pExpense2 = getFormData.pExpense2
      ? parseInt(getFormData.pExpense2)
      : 0;
    const pFacility2 = getFormData.pFacility2
      ? parseInt(getFormData.pFacility2)
      : 0;
    const pMaterial2 = getFormData.pMaterial2
      ? parseInt(getFormData.pMaterial2)
      : 0;
    const pResearch2 = getFormData.pResearch2
      ? parseInt(getFormData.pResearch2)
      : 0;

    fForm.setFieldsValue({
      execution: pExpense2 + pFacility2 + pMaterial2 + pResearch2,
    });
  }, []);

  // 신청하기
  const tableSurveyCreateHandler = useCallback((data) => {
    if (!data.combiName || data.combiName.trim().length === 0) {
      return message.error("조합명을 입력해주세요.");
    }
    if (!data.businessType || data.businessType.trim().length === 0) {
      return message.error("사업을 선택해주세요.");
    }
    if (!data.subjectName || data.subjectName.trim().length === 0) {
      return message.error("과제명을 입력해주세요.");
    }
    if (!data.businessRepName || data.businessRepName.trim().length === 0) {
      return message.error("사업책임자를 입력해주세요.");
    }
    if (!data.estimateDate || data.estimateDate.trim().length === 0) {
      return message.error("설립년도를 입력해주세요.");
    }
    if (!data.workRepName || data.workRepName.trim().length === 0) {
      return message.error("실무책임자를 입력해주세요.");
    }
    if (!data.corporationCnt || data.corporationCnt.trim().length === 0) {
      return message.error("법인 조합원수를 입력해주세요.");
    }
    if (!data.personalCnt || data.personalCnt.trim().length === 0) {
      return message.error("개인 조합원수를 입력해주세요.");
    }
    if (
      !data.businessPriceLastYear ||
      data.businessPriceLastYear.trim().length === 0
    ) {
      return message.error("매출액(전년)을 입력해주세요.");
    }
    if (
      !data.businessPriceThisYear ||
      data.businessPriceThisYear.trim().length === 0
    ) {
      return message.error("매출액(금년(추청))을 입력해주세요.");
    }
    if (!data.plan || data.plan.trim().length === 0) {
      return message.error("계획을 입력해주세요.");
    }
    if (
      !data.completePercentage ||
      data.completePercentage.trim().length === 0
    ) {
      return message.error("달성률을 입력해주세요.");
    }
    if (!data.pExpense1 || data.pExpense1.trim().length === 0) {
      return message.error("인건비를 입력해주세요.");
    }
    if (!data.pExpense2 || data.pExpense2.trim().length === 0) {
      return message.error("인건비를 입력해주세요.");
    }
    if (!data.pFacility1 || data.pFacility1.trim().length === 0) {
      return message.error("시설장비비를 입력해주세요.");
    }
    if (!data.pFacility2 || data.pFacility2.trim().length === 0) {
      return message.error("시설장비비를 입력해주세요.");
    }
    if (!data.pIndirect1 || data.pIndirect1.trim().length === 0) {
      return message.error("간접비를 입력해주세요.");
    }
    if (!data.pIndirect2 || data.pIndirect2.trim().length === 0) {
      return message.error("간접비를 입력해주세요.");
    }
    if (!data.pMaterial1 || data.pMaterial1.trim().length === 0) {
      return message.error("재료비를 입력해주세요.");
    }
    if (!data.pMaterial2 || data.pMaterial2.trim().length === 0) {
      return message.error("재료비를 입력해주세요.");
    }
    if (!data.pResearch1 || data.pResearch1.trim().length === 0) {
      return message.error("연구활동비를 입력해주세요.");
    }
    if (!data.pResearch2 || data.pResearch2.trim().length === 0) {
      return message.error("연구활동비를 입력해주세요.");
    }

    if (!range1) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range2) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range3) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range4) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range5) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range6) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range7) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range8) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range9) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range10) {
      return message.error("만족도 조사를 참여해주세요.");
    }
    if (!range11) {
      return message.error("만족도 조사를 참여해주세요.");
    }

    dispatch({
      type: TABLE_SURVEY_CREATE_REQUEST,
      data,
    });
  }, []);

  ////// DATAVIEW //////

  const rangeArr = [
    "1. 본 지원사업이 귀 협동조합의 기술사업화 추진 등에 도움이 되었다.",
    "2. 본 지원사업이 귀 협동조합의 참여 전 요구 및 기대 등에 부합하였다.",
    "3. 본 지원사업의 지원내역(신규, 성장/ 시제품 개발 지원, 기술 사업화 등)에 만족한다.",
    "4. 본 지원사업은 과학기술 분야 발전 및 협동조합 육성 등에 있어 기여하는 바가 있다.",
    "5. 본 지원사업은 지속적으로 추진될 필요가 있다.",
    "6. 추후에도 지원사업에 참여 기회가 주어진다면 재참여할 의향이 있다.",
    "7. 본 지원사업을 타 협동조합 등에게 추천할 의향이 있다.",
    "8. 본 지원사업 관련 전문기관(한국연구재단)의 지원에 만족한다.",
    "9. 본 지원사업 원영주관기관의 지원에 만족한다.",
    "10. 본 지원 사업 운영주관기관의 워크숍 및 지원 프로그램에 만족한다.",
    "11. 상기 요건들을 모두 고려할 때, 사업 성과 등에 전반적으로 만족한다.",
  ];

  return (
    <>
      <Wrapper>
        <CustomForm form={fForm} onFinish={tableSurveyCreateHandler}>
          <Wrapper
            border={`1px solid ${Theme.lightGrey2_C}`}
            margin={` 0 0 20px`}
          >
            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                조합명
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="combiName">
                  <TextInput border={`none`} width={`100%`} />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                사업구분
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 0 10px`}
              >
                <Form.Item name="businessType">
                  <Radio.Group>
                    <Radio value={"신규형"}>신규형</Radio>
                    <Radio value={"성장형"}>성장형</Radio>
                  </Radio.Group>
                </Form.Item>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                과제명
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="subjectName">
                  <TextInput border={`none`} width={`100%`} />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                사업책임자
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="businessRepName">
                  <TextInput border={`none`} width={`100%`} />
                </Form.Item>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                설립년도
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="estimateDate">
                  <TextInput border={`none`} width={`100%`} />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                실무책임자
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="workRepName">
                  <TextInput border={`none`} width={`100%`} />
                </Form.Item>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                조합원
              </Wrapper>

              <Wrapper
                width={`30%`}
                dr={`row`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Wrapper
                  width={`50%`}
                  borderRight={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Form.Item name="corporationCnt">
                    <TextInput
                      type="number"
                      border={`none`}
                      width={`100%`}
                      placeholder="법인"
                    />
                  </Form.Item>
                </Wrapper>
                <Wrapper
                  width={`50%`}
                  borderRight={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Form.Item name="personalCnt">
                    <TextInput
                      type="number"
                      border={`none`}
                      width={`100%`}
                      placeholder="개인"
                    />
                  </Form.Item>
                </Wrapper>
              </Wrapper>
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                매출액
              </Wrapper>
              <Wrapper
                width={`30%`}
                dr={`row`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Wrapper
                  width={`50%`}
                  borderRight={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Form.Item name="businessPriceLastYear">
                    <TextInput
                      type="number"
                      border={`none`}
                      width={`100%`}
                      placeholder="전년"
                    />
                  </Form.Item>
                </Wrapper>
                <Wrapper width={`50%`}>
                  <Form.Item name="businessPriceThisYear">
                    <TextInput
                      type="number"
                      border={`none`}
                      width={`100%`}
                      placeholder="금년(추정)"
                    />
                  </Form.Item>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                계획
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="plan">
                  <TextInput border={`none`} width={`100%`} />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                달성률
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="completePercentage">
                  <TextInput border={`none`} width={`100%`} />
                </Form.Item>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={width < 700 ? `14px` : `20px`}
            >
              <Wrapper width={`20%`}>예산</Wrapper>
              <Wrapper
                width={`30%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                총계
              </Wrapper>
              <Wrapper width={`20%`}>집행</Wrapper>
              <Wrapper
                width={`15%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                총계
              </Wrapper>
              <Wrapper width={`15%`}>집행률</Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                직접비
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="totalPrice">
                  <TextInput border={`none`} width={`100%`} readOnly />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`}>
                <Form.Item name="execution">
                  <TextInput border={`none`} width={`100%`} readOnly />
                </Form.Item>
              </Wrapper>
              <Wrapper
                width={`15%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
              <Wrapper width={`15%`}>
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                - 인건비
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="pExpense1">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumPriceHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`}>
                <Form.Item name="pExpense2">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumExecutionHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper
                width={`15%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
              <Wrapper width={`15%`}>
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                - 시설장비비
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="pFacility1">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumPriceHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`}>
                <Form.Item name="pFacility2">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumExecutionHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper
                width={`15%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
              <Wrapper width={`15%`}>
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                - 재료비
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="pMaterial1">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumPriceHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`}>
                <Form.Item name="pMaterial2">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumExecutionHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper
                width={`15%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
              <Wrapper width={`15%`}>
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                - 연구활동비
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="pResearch1">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumPriceHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`}>
                <Form.Item name="pResearch2">
                  <TextInput
                    border={`none`}
                    width={`100%`}
                    type="number"
                    onChange={sumExecutionHandler}
                  />
                </Form.Item>
              </Wrapper>
              <Wrapper
                width={`15%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
              <Wrapper width={`15%`}>
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`}>
              <Wrapper width={`20%`} fontSize={width < 700 ? `14px` : `20px`}>
                간접비
              </Wrapper>
              <Wrapper
                width={`30%`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Form.Item name="pIndirect1">
                  <TextInput border={`none`} width={`100%`} type="number" />
                </Form.Item>
              </Wrapper>
              <Wrapper width={`20%`}>
                <Form.Item name="pIndirect2">
                  <TextInput border={`none`} width={`100%`} type="number" />
                </Form.Item>
              </Wrapper>
              <Wrapper
                width={`15%`}
                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
              <Wrapper width={`15%`}>
                <TextInput border={`none`} width={`100%`} readOnly />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper>
            {rangeArr &&
              rangeArr.map((data, idx) => {
                return (
                  <Wrapper
                    width={width < 700 ? `100%` : `700px`}
                    key={idx}
                    al={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    padding={`20px 0`}
                  >
                    <Text
                      fontSize={width < 700 ? `14px` : `20px`}
                      fontWeight={`600`}
                    >
                      {data}
                    </Text>
                    <Wrapper margin={`10px 0 0`}>
                      <Form.Item name={`range${idx + 1}`}>
                        <Radio.Group>
                          <Radio value={1}>1. 전혀 그렇지 않다</Radio>
                          <Radio value={2}>2. 그렇지 않다</Radio>
                          <Radio value={3}>3. 보통이다</Radio>
                          <Radio value={4}>4. 그렇다</Radio>
                          <Radio value={5}>5. 매우 그렇다</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Wrapper>
                  </Wrapper>
                );
              })}
          </Wrapper>

          <Wrapper margin={`30px 0`}>
            <CommonButton
              width={`300px`}
              height={`40px`}
              fontSize={`16px`}
              htmlType="submit"
              loading={st_tableSurveyCreateLoading}
            >
              참여하기
            </CommonButton>
          </Wrapper>
        </CustomForm>
      </Wrapper>
    </>
  );
};

export default TableSurvey;

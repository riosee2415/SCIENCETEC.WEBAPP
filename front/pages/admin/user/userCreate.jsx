import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Popover,
  Select,
  Table,
} from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
  DelBtn,
  SearchFormItem,
  SearchForm,
} from "../../../components/commonComponents";
import {
  LOAD_MY_INFO_REQUEST,
  SIGNUP_REQUEST,
  USERLIST_REQUEST,
  USER_DETAIL_REQUEST,
  USER_EXIT_REQUEST,
  USER_INFO_UPDATE_REQUEST,
} from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import DaumPostcode from "react-daum-postcode";
import moment from "moment";
import useInput from "../../../hooks/useInput";

const style = {
  overflow: "hidden",
};

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.subTheme5_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey2_C};
`;

const TypeButton = styled(Button)`
  margin-right: 5px;
`;

const UserCreate = ({}) => {
  const {
    st_loadMyInfoDone,
    me,
    users,

    userDetail,
    combiTypeList,
    businessTypeList,
    sectorList,

    st_signUpDone,
    st_signUpError,

    st_userInfoUpdateeDone,
    st_userInfoUpdateeError,

    st_userExitDone,
    st_userExitError,
  } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          data.useYn && (
            <OtherMenu
              key={data.link}
              onClick={() => moveLinkHandler(data.link)}
            >
              {data.name}
            </OtherMenu>
          )
        );
      })}
    </PopWrapper>
  );

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  const [createForm] = Form.useForm();
  const [sForm] = Form.useForm(); // 검색폼

  const [sData, setSData] = useState(""); // 검색데이터
  const [currentTab, setCurrentTab] = useState(0); // 유형

  const [cModal, setCModal] = useState(false); // 등록 모달
  const [pModal, setPModal] = useState(false); // 주소 모달

  const [createTab, setCreateTab] = useState(0); // 생성유형

  const delInput = useInput(); // 탈퇴사유

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        searchData: sData,
        searchUserType: currentTab,
      },
    });
  }, [currentTab, sData]);

  useEffect(() => {
    if (st_signUpDone) {
      createForm.resetFields();
      createModalToggle();
      setCreateTab(0);

      message.success("회원이 등록되었습니다.");

      dispatch({
        type: USERLIST_REQUEST,
        data: {
          searchData: sData,
          searchUserType: currentTab,
        },
      });
    }

    if (st_signUpError) {
      return message.error(st_signUpError);
    }
  }, [st_signUpDone, st_signUpError]);

  useEffect(() => {
    if (st_userInfoUpdateeDone) {
      message.success("회원이 수정되었습니다.");

      dispatch({
        type: USERLIST_REQUEST,
        data: {
          searchData: sData,
          searchUserType: currentTab,
        },
      });
    }

    if (st_userInfoUpdateeError) {
      return message.error(st_userInfoUpdateeError);
    }
  }, [st_userInfoUpdateeDone, st_userInfoUpdateeError]);

  // 회원 탈퇴

  useEffect(() => {
    if (st_userExitDone) {
      delInput.setValue("");
      setCurrentData(null);

      dispatch({
        type: USERLIST_REQUEST,
        data: {
          searchData: sData,
          searchUserType: currentTab,
        },
      });

      return message.success("해당 회원이 탈퇴되었습니다.");
    }

    if (st_userExitError) {
      return message.error(st_userExitError);
    }
  }, [st_userExitDone, st_userExitError]);

  useEffect(() => {
    if (userDetail && combiTypeList && businessTypeList && sectorList) {
      const tempArr2 = [];
      const tempArr3 = [];
      const tempArr4 = [];

      sectorList.map((sector) => {
        tempArr2.push(sector.value);
      });
      combiTypeList.map((combi) => {
        tempArr3.push(combi.value);
      });
      businessTypeList.map((busi) => {
        tempArr4.push(busi.value);
      });

      infoForm.setFieldsValue({
        userid: userDetail.userId,
        combiname: userDetail.combiName,
        postCode: userDetail.postCode,
        address: userDetail.address,
        detailAddress: userDetail.detailAddress,
        mobile: userDetail.mobile,
        email: userDetail.email,
        interfield: tempArr2,
        combihome: userDetail.combiHomepage,
        startDate: moment(userDetail.combiEstimateDate),
        region: userDetail.combiArea,
        corporcnt: userDetail.corporationCnt,
        personcnt: userDetail.personalCnt,
        reprename: userDetail.repreName,
        combitype: tempArr3,
        businesstype: tempArr4,
        sector: tempArr2,
        impobusi1: userDetail.importantBusiness1,
        impobusi2: userDetail.importantBusiness2,
        impobusi3: userDetail.importantBusiness3,
        capital: userDetail.importantBusinessCapital,
        busiprice: userDetail.importantBusinessPrice,
      });
    }
  }, [userDetail, combiTypeList, businessTypeList, sectorList]);

  ////// TOGGLE //////
  const createModalToggle = useCallback(() => {
    setCModal((prev) => !prev);
  }, [cModal]);

  const postCodeModalToggle = useCallback(() => {
    setPModal((prev) => !prev);
  }, [pModal]);

  ////// HANDLER //////

  const tabClickHandler = useCallback(
    (tab) => {
      setCurrentTab(tab);
    },
    [currentTab]
  );

  const searchHandler = useCallback(
    (data) => {
      setSData(data.sData);
    },
    [sForm, sData]
  );

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      dispatch({
        type: USER_DETAIL_REQUEST,
        data: {
          id: record.id,
        },
      });
    },
    [currentData]
  );

  // CREATE FUNCATION
  const createHandler = useCallback(
    (data) => {
      if (createTab === 1) {
        dispatch({
          type: SIGNUP_REQUEST,
          data: {
            type: 1,
            userId: data.userid,
            password: data.password,
            combiName: data.combiname,
            postCode: data.postCode,
            address: data.address,
            detailAddress: data.detailAddress,
            mobile: data.mobile,
            email: data.email,
            terms: true,
            isKakao: false,
            isPremium: false,
            businessType: [],
            combiType: [],
            sector: data.interfield,
          },
        });
      }

      if (createTab === 2) {
        dispatch({
          type: SIGNUP_REQUEST,
          data: {
            type: 2,
            userId: data.userid,
            password: data.password,
            combiName: data.combiname,
            combiHomepage: data.combihome,
            combiEstimateDate: moment(data.startDate).format("YYYY-MM-DD"),
            combiArea: data.region,
            corporationCnt: data.corporcnt,
            personalCnt: data.personcnt,
            repreName: data.reprename,
            postCode: data.postCode,
            address: data.address,
            detailAddress: data.detailAddress,
            mobile: data.mobile,
            email: data.email,
            importantBusiness1: data.impobusi1,
            importantBusiness2: data.impobusi2,
            importantBusiness3: data.impobusi3,
            importantBusinessCapital: data.capital,
            importantBusinessPrice: data.busiprice,
            terms: true,
            isKakao: false,
            isPremium: false,
            businessType: data.businesstype,
            combiType: data.combitype,
            sector: data.sector,
          },
        });
      }
    },
    [createTab]
  );

  const updateHandler = useCallback(
    (data) => {
      if (currentData.type === 1) {
        dispatch({
          type: USER_INFO_UPDATE_REQUEST,
          data: {
            id: currentData.id,
            type: currentData.type,
            combiName: data.combiname,
            combiHomepage: currentData.combiHomepage,
            combiEstimateDate: currentData.combiEstimateDate,
            combiArea: currentData.combiArea,
            corporationCnt: currentData.corporationCnt,
            personalCnt: currentData.personalCnt,
            repreName: currentData.repreName,
            postCode: data.postCode,
            address: data.address,
            detailAddress: data.detailAddress,
            mobile: data.mobile,
            email: data.email,
            importantBusiness1: currentData.importantBusiness1,
            importantBusiness2: currentData.importantBusiness2,
            importantBusiness3: currentData.importantBusiness3,
            importantBusinessCapital: currentData.importantBusinessCapital,
            importantBusinessPrice: currentData.importantBusinessPrice,
            businessType: [],
            combiType: [],
            sector: data.interfield,
          },
        });
      }

      if (currentData.type === 2) {
        dispatch({
          type: USER_INFO_UPDATE_REQUEST,
          data: {
            id: currentData.id,
            type: currentData.type,
            combiName: data.combiname,
            combiHomepage: data.combihome,
            combiEstimateDate: moment(data.startDate).format("YYYY-MM-DD"),
            combiArea: data.region,
            corporationCnt: data.corporcnt,
            personalCnt: data.personcnt,
            repreName: data.reprename,
            postCode: data.postCode,
            address: data.address,
            detailAddress: data.detailAddress,
            mobile: data.mobile,
            email: data.email,
            importantBusiness1: data.impobusi1,
            importantBusiness2: data.impobusi2,
            importantBusiness3: data.impobusi3,
            importantBusinessCapital: data.capital,
            importantBusinessPrice: data.busiprice,
            businessType: data.businesstype,
            combiType: data.combitype,
            sector: data.sector,
          },
        });
      }
    },
    [currentData]
  );

  const delUserHandler = useCallback(
    (data) => {
      if (!delInput.value || delInput.value.trim().length === 0) {
        return message.info("탈퇴 사유를 입력해주세요.");
      }

      dispatch({
        type: USER_EXIT_REQUEST,
        data: {
          id: data.id,
          exitReason: delInput.value,
        },
      });
    },
    [delInput.value]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형",
      dataIndex: "viewType",
    },
    {
      title: "조합명",
      dataIndex: "combiName",
    },

    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
      ),
    },

    {
      title: "회원탈퇴",
      render: (data) => (
        <Popconfirm
          title={() => (
            <Input
              size="small"
              placeholder="탈퇴사유를 작성해주세요."
              {...delInput}
            />
          )}
          okText="탈퇴"
          cancelText="취소"
          onConfirm={() => delUserHandler(data)}
          onCancel={() => delInput.setValue("")}
        >
          <DelBtn size="small" type="primary">
            탈퇴
          </DelBtn>
        </Popconfirm>
      ),
    },
  ];

  const combiData = [
    { label: "다중이해", value: "다중이해" },
    { label: "생산자", value: "생산자" },
    { label: "소비자", value: "소비자" },
    { label: "사업자", value: "사업자" },
    { label: "직원", value: "직원" },
    { label: "개발자", value: "개발자" },
    { label: "기타", value: "기타" },
  ];

  const combiTypeData = [
    { label: "R&D형", value: "R&D형" },
    { label: "비즈니스형", value: "비즈니스형" },
    { label: "교육훈련 및 문화활동형", value: "교육훈련 및 문화활동형" },
    { label: "지역사회문제해결형", value: "지역사회문제해결형" },
    { label: "경력연계형", value: "경력연계형" },
    { label: "기타", value: "기타" },
  ];

  const arr = [
    { label: "ICT", value: "ICT" },
    { label: "화학", value: "화학" },
    { label: "기계", value: "기계" },
    { label: "로보틱스", value: "로보틱스" },
    { label: "환경", value: "환경" },
    { label: "에너지", value: "에너지" },
    { label: "교육", value: "교육" },
    { label: "국방", value: "국방" },
    { label: "우주항공", value: "우주항공" },
    { label: "기초과학", value: "기초과학" },
    { label: "의약과", value: "의약과" },
    { label: "기타", value: "기타" },
  ];

  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
      >
        <HomeText
          margin={`3px 20px 0px 20px`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi isImpo={true}>
            해당 메뉴에서 홈페이지에 가입된 회원의 정보를 확인할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이름 및 이메일로 사용자를 검색할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            변경된 정보는 홈페이지에 즉시 적용되기 때문에, 신중한 처리를 필요로
            합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="0px 20px">
        {/* SEARCH FORM */}
        <SearchForm
          layout="inline"
          style={{ width: "100%" }}
          form={sForm}
          onFinish={searchHandler}
        >
          <SearchFormItem name="sData" style={{ margin: `0px 0px 0px 5px` }}>
            <Input
              size="small"
              style={{ width: "320px" }}
              placeholder={`회원을 검색할 정보를 입력해주세요.`}
            />
          </SearchFormItem>

          <SearchFormItem>
            <Button size="small" type="primary" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      {/* TAB */}
      <Wrapper padding={`10px`} dr={`row`} ju="flex-start">
        <TypeButton
          type={currentTab === 0 ? "primary" : "default"}
          size="small"
          onClick={() => tabClickHandler(0)}
        >
          전체
        </TypeButton>

        <TypeButton
          type={currentTab === 1 ? "primary" : "default"}
          size="small"
          onClick={() => tabClickHandler(1)}
        >
          개인
        </TypeButton>

        <TypeButton
          type={currentTab === 2 ? "primary" : "default"}
          size="small"
          onClick={() => tabClickHandler(2)}
        >
          조합
        </TypeButton>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al="flex-end" margin={`0px 0px 5px 0px`}>
            <Button size="small" type="primary" onClick={createModalToggle}>
              회원 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={users ? users : []}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          width={`calc(50% - 10px)`}
          padding="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  회원 기본정보
                </InfoTitle>
              </Wrapper>

              {currentData.type === 1 && (
                <Form
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                  form={infoForm}
                  style={{ width: `100%` }}
                  onFinish={updateHandler}
                >
                  <Form.Item label="아이디" name="userid">
                    <Input readOnly size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="조합명"
                    name="combiname"
                    rules={[
                      {
                        required: true,
                        message: "조합명은 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Wrapper dr={`row`} ju={`space-between`}>
                    <Form.Item
                      label="우편번호"
                      name="postCode"
                      rules={[
                        {
                          required: true,
                          message: "우편번호는 필수 입력사항 입니다.",
                        },
                      ]}
                      style={{
                        width: `80%`,
                        marginLeft: `22px`,
                      }}
                    >
                      <Input size="small" allowClear readOnly={true} />
                    </Form.Item>

                    <Button
                      style={{
                        width: `15%`,
                        marginBottom: `25px`,
                      }}
                      size="small"
                      type="primary"
                      onClick={postCodeModalToggle}
                    >
                      우편번호 검색
                    </Button>
                  </Wrapper>

                  <Form.Item
                    label="주소"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "주소는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear readOnly={true} />
                  </Form.Item>

                  <Form.Item
                    label="상세주소"
                    name="detailAddress"
                    rules={[
                      {
                        required: true,
                        message: "상세주소는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="전화번호"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "전화번호는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "이메일은 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="관심분야"
                    name="interfield"
                    rules={[
                      {
                        required: true,
                        message: "관심분야는 필수 선택사항 입니다.",
                      },
                    ]}
                  >
                    <Checkbox.Group options={arr} />
                  </Form.Item>

                  <Wrapper al="flex-end">
                    <Button type="primary" size="small" htmlType="submit">
                      정보 업데이트
                    </Button>
                  </Wrapper>
                </Form>
              )}

              {currentData.type === 2 && (
                <Form
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                  form={infoForm}
                  style={{ width: `100%` }}
                  onFinish={updateHandler}
                >
                  <Form.Item label="아이디" name="userid">
                    <Input readOnly size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="조합명"
                    name="combiname"
                    rules={[
                      {
                        required: true,
                        message: "조합명은 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="조합 홈페이지"
                    name="combihome"
                    rules={[
                      {
                        required: true,
                        message: "조합 홈페이지는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="설립년도"
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: "설립년도는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: `200px` }}
                      placeholder="날짜를 선택해주세요."
                      size="small"
                    />
                  </Form.Item>

                  <Form.Item
                    label="지역"
                    name="region"
                    rules={[
                      {
                        required: true,
                        message: "지역는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Select
                      size="small"
                      placeholder="조합 활동 지역을 입력해주세요."
                    >
                      <Select.Option value={"서울특별시"}>
                        서울특별시
                      </Select.Option>
                      <Select.Option value={"대전광역시"}>
                        대전광역시
                      </Select.Option>
                      <Select.Option value={"인천광역시"}>
                        인천광역시
                      </Select.Option>
                      <Select.Option value={"대구광역시"}>
                        대구광역시
                      </Select.Option>
                      <Select.Option value={"울산광역시"}>
                        울산광역시
                      </Select.Option>
                      <Select.Option value={"부산광역시"}>
                        부산광역시
                      </Select.Option>
                      <Select.Option value={"광주광역시"}>
                        광주광역시
                      </Select.Option>
                      <Select.Option value={"세종특별자치시"}>
                        세종특별자치시
                      </Select.Option>
                      <Select.Option value={"제주특별자치도"}>
                        제주특별자치도
                      </Select.Option>
                      <Select.Option value={"경기도"}>경기도</Select.Option>
                      <Select.Option value={"강원도"}>강원도</Select.Option>
                      <Select.Option value={"충청남도"}>충청남도</Select.Option>
                      <Select.Option value={"충청북도"}>충청북도</Select.Option>
                      <Select.Option value={"전라북도"}>전라북도</Select.Option>
                      <Select.Option value={"전라남도"}>전라남도</Select.Option>
                      <Select.Option value={"경상남도"}>경상남도</Select.Option>
                      <Select.Option value={"경상북도"}>경상북도</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="법인 조합원수"
                    name="corporcnt"
                    rules={[
                      {
                        required: true,
                        message: "법인 조합원수는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" type="number" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="개인 조합원수"
                    name="personcnt"
                    rules={[
                      {
                        required: true,
                        message: "개인 조합원수는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" type="number" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="이사장명"
                    name="reprename"
                    rules={[
                      {
                        required: true,
                        message: "이사장명는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Wrapper dr={`row`} ju={`space-between`}>
                    <Form.Item
                      label="우편번호"
                      name="postCode"
                      rules={[
                        {
                          required: true,
                          message: "우편번호는 필수 입력사항 입니다.",
                        },
                      ]}
                      style={{
                        width: `80%`,
                        marginLeft: `22px`,
                      }}
                    >
                      <Input size="small" allowClear readOnly={true} />
                    </Form.Item>

                    <Button
                      style={{
                        width: `15%`,
                        marginBottom: `25px`,
                      }}
                      size="small"
                      type="primary"
                      onClick={postCodeModalToggle}
                    >
                      우편번호 검색
                    </Button>
                  </Wrapper>

                  <Form.Item
                    label="주소"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "주소는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear readOnly={true} />
                  </Form.Item>

                  <Form.Item
                    label="상세주소"
                    name="detailAddress"
                    rules={[
                      {
                        required: true,
                        message: "상세주소는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="연락처"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "연락처은 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "이메일은 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="조합유형"
                    name="combitype"
                    rules={[
                      {
                        required: true,
                        message: "조합유형은 필수 선택사항 입니다.",
                      },
                    ]}
                  >
                    <Checkbox.Group options={combiData} />
                  </Form.Item>

                  <Form.Item
                    label="조합사업유형"
                    name="businesstype"
                    rules={[
                      {
                        required: true,
                        message: "조합사업유형은 필수 선택사항 입니다.",
                      },
                    ]}
                  >
                    <Checkbox.Group options={combiTypeData} />
                  </Form.Item>

                  <Form.Item
                    label="사업분야"
                    name="sector"
                    rules={[
                      {
                        required: true,
                        message: "사업분야는 필수 선택사항 입니다.",
                      },
                    ]}
                  >
                    <Checkbox.Group options={arr} />
                  </Form.Item>

                  <Form.Item
                    label="주요사업1"
                    name="impobusi1"
                    rules={[
                      {
                        required: true,
                        message: "주요사업1는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="주요사업2"
                    name="impobusi2"
                    rules={[
                      {
                        required: true,
                        message: "주요사업2는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="주요사업3"
                    name="impobusi3"
                    rules={[
                      {
                        required: true,
                        message: "주요사업3는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="자본금"
                    name="capital"
                    rules={[
                      {
                        required: true,
                        message: "자본금는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" type="number" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="매출액"
                    name="busiprice"
                    rules={[
                      {
                        required: true,
                        message: "매출액는 필수 입력사항 입니다.",
                      },
                    ]}
                  >
                    <Input size="small" type="number" allowClear />
                  </Form.Item>

                  <Wrapper al="flex-end">
                    <Button type="primary" size="small" htmlType="submit">
                      정보 업데이트
                    </Button>
                  </Wrapper>
                </Form>
              )}

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>
            </Wrapper>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>

      {/* CREATE MODAL */}
      <Modal
        title={"회원 등록하기"}
        width={`700px`}
        footer={null}
        visible={cModal}
        onCancel={createModalToggle}
      >
        <Wrapper dr={`row`} ju={`space-around`} margin={`20px 0`}>
          <Button
            type={createTab === 1 ? "primary" : "default"}
            onClick={() => setCreateTab(1)}
          >
            개인회원
          </Button>
          <Button
            type={createTab === 2 ? "primary" : "default"}
            onClick={() => setCreateTab(2)}
          >
            조합회원
          </Button>
        </Wrapper>

        {createTab === 1 && (
          <Wrapper>
            <Form
              style={{ width: "100%" }}
              form={createForm}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={createHandler}
            >
              <Form.Item
                label="아이디"
                name="userid"
                rules={[
                  {
                    required: true,
                    message: "아이디는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" type="password" allowClear />
              </Form.Item>

              <Form.Item
                label="조합명"
                name="combiname"
                rules={[
                  {
                    required: true,
                    message: "조합명은 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Wrapper dr={`row`} ju={`space-between`}>
                <Form.Item
                  label="우편번호"
                  name="postCode"
                  rules={[
                    {
                      required: true,
                      message: "우편번호는 필수 입력사항 입니다.",
                    },
                  ]}
                  style={{
                    width: `80%`,
                    marginLeft: `22px`,
                  }}
                >
                  <Input size="small" allowClear readOnly={true} />
                </Form.Item>

                <Button
                  style={{
                    width: `15%`,
                    marginBottom: `25px`,
                  }}
                  size="small"
                  type="primary"
                  onClick={postCodeModalToggle}
                >
                  우편번호 검색
                </Button>
              </Wrapper>

              <Form.Item
                label="주소"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "주소는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear readOnly={true} />
              </Form.Item>

              <Form.Item
                label="상세주소"
                name="detailAddress"
                rules={[
                  {
                    required: true,
                    message: "상세주소는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="전화번호"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "전화번호는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="이메일"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "이메일은 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="관심분야"
                name="interfield"
                rules={[
                  {
                    required: true,
                    message: "관심분야는 필수 선택사항 입니다.",
                  },
                ]}
              >
                <Checkbox.Group options={arr} />
              </Form.Item>

              <Wrapper al="flex-end">
                <Button size="small" type="primary" htmlType="submit">
                  개인회원등록
                </Button>
              </Wrapper>
            </Form>
          </Wrapper>
        )}

        {createTab === 2 && (
          <Wrapper>
            <Form
              style={{ width: "100%" }}
              form={createForm}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={createHandler}
            >
              <Form.Item
                label="아이디"
                name="userid"
                rules={[
                  {
                    required: true,
                    message: "아이디는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" type="password" allowClear />
              </Form.Item>

              <Form.Item
                label="조합명"
                name="combiname"
                rules={[
                  {
                    required: true,
                    message: "조합명은 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="조합 홈페이지"
                name="combihome"
                rules={[
                  {
                    required: true,
                    message: "조합 홈페이지는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="설립년도"
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "설립년도는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: `200px` }}
                  placeholder="날짜를 선택해주세요."
                  size="small"
                />
              </Form.Item>

              <Form.Item
                label="지역"
                name="region"
                rules={[
                  {
                    required: true,
                    message: "지역는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Select
                  size="small"
                  placeholder="조합 활동 지역을 입력해주세요."
                >
                  <Select.Option value={"서울특별시"}>서울특별시</Select.Option>
                  <Select.Option value={"대전광역시"}>대전광역시</Select.Option>
                  <Select.Option value={"인천광역시"}>인천광역시</Select.Option>
                  <Select.Option value={"대구광역시"}>대구광역시</Select.Option>
                  <Select.Option value={"울산광역시"}>울산광역시</Select.Option>
                  <Select.Option value={"부산광역시"}>부산광역시</Select.Option>
                  <Select.Option value={"광주광역시"}>광주광역시</Select.Option>
                  <Select.Option value={"세종특별자치시"}>
                    세종특별자치시
                  </Select.Option>
                  <Select.Option value={"제주특별자치도"}>
                    제주특별자치도
                  </Select.Option>
                  <Select.Option value={"경기도"}>경기도</Select.Option>
                  <Select.Option value={"강원도"}>강원도</Select.Option>
                  <Select.Option value={"충청남도"}>충청남도</Select.Option>
                  <Select.Option value={"충청북도"}>충청북도</Select.Option>
                  <Select.Option value={"전라북도"}>전라북도</Select.Option>
                  <Select.Option value={"전라남도"}>전라남도</Select.Option>
                  <Select.Option value={"경상남도"}>경상남도</Select.Option>
                  <Select.Option value={"경상북도"}>경상북도</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="법인 조합원수"
                name="corporcnt"
                rules={[
                  {
                    required: true,
                    message: "법인 조합원수는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" type="number" allowClear />
              </Form.Item>

              <Form.Item
                label="개인 조합원수"
                name="personcnt"
                rules={[
                  {
                    required: true,
                    message: "개인 조합원수는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" type="number" allowClear />
              </Form.Item>

              <Form.Item
                label="이사장명"
                name="reprename"
                rules={[
                  {
                    required: true,
                    message: "이사장명는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Wrapper dr={`row`} ju={`space-between`}>
                <Form.Item
                  label="우편번호"
                  name="postCode"
                  rules={[
                    {
                      required: true,
                      message: "우편번호는 필수 입력사항 입니다.",
                    },
                  ]}
                  style={{
                    width: `80%`,
                    marginLeft: `22px`,
                  }}
                >
                  <Input size="small" allowClear readOnly={true} />
                </Form.Item>

                <Button
                  style={{
                    width: `15%`,
                    marginBottom: `25px`,
                  }}
                  size="small"
                  type="primary"
                  onClick={postCodeModalToggle}
                >
                  우편번호 검색
                </Button>
              </Wrapper>

              <Form.Item
                label="주소"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "주소는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear readOnly={true} />
              </Form.Item>

              <Form.Item
                label="상세주소"
                name="detailAddress"
                rules={[
                  {
                    required: true,
                    message: "상세주소는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="연락처"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "연락처은 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="이메일"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "이메일은 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="조합유형"
                name="combitype"
                rules={[
                  {
                    required: true,
                    message: "조합유형은 필수 선택사항 입니다.",
                  },
                ]}
              >
                <Checkbox.Group options={combiData} />
              </Form.Item>

              <Form.Item
                label="조합사업유형"
                name="businesstype"
                rules={[
                  {
                    required: true,
                    message: "조합사업유형은 필수 선택사항 입니다.",
                  },
                ]}
              >
                <Checkbox.Group options={combiTypeData} />
              </Form.Item>

              <Form.Item
                label="사업분야"
                name="sector"
                rules={[
                  {
                    required: true,
                    message: "사업분야는 필수 선택사항 입니다.",
                  },
                ]}
              >
                <Checkbox.Group options={arr} />
              </Form.Item>

              <Form.Item
                label="주요사업1"
                name="impobusi1"
                rules={[
                  {
                    required: true,
                    message: "주요사업1는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="주요사업2"
                name="impobusi2"
                rules={[
                  {
                    required: true,
                    message: "주요사업2는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="주요사업3"
                name="impobusi3"
                rules={[
                  {
                    required: true,
                    message: "주요사업3는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" allowClear />
              </Form.Item>

              <Form.Item
                label="자본금"
                name="capital"
                rules={[
                  {
                    required: true,
                    message: "자본금는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" type="number" allowClear />
              </Form.Item>

              <Form.Item
                label="매출액"
                name="busiprice"
                rules={[
                  {
                    required: true,
                    message: "매출액는 필수 입력사항 입니다.",
                  },
                ]}
              >
                <Input size="small" type="number" allowClear />
              </Form.Item>

              <Wrapper al="flex-end">
                <Button size="small" type="primary" htmlType="submit">
                  조합회원 등록
                </Button>
              </Wrapper>
            </Form>
          </Wrapper>
        )}
      </Modal>

      {/* 주소 검색 */}
      {pModal && (
        <Modal
          width={`700px`}
          style={{ top: 200 }}
          footer={null}
          visible={pModal}
          onCancel={() => postCodeModalToggle()}
        >
          <DaumPostcode
            onComplete={(data) => {
              {
                currentData
                  ? infoForm.setFieldsValue({
                      postCode: data.zonecode,
                      address: data.address,
                    })
                  : createForm.setFieldsValue({
                      postCode: data.zonecode,
                      address: data.address,
                    });
              }

              setPModal(false);
            }}
            width={`600px`}
            height={`500px`}
            autoClose
            animation
            style={style}
          />
        </Modal>
      )}
    </AdminLayout>
  );
};

export default withRouter(UserCreate);

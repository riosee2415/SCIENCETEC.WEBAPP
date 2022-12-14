import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  STATUS_LIST_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  UPDATE_MODAL_OPEN_REQUEST,
  USERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
  USER_DETAIL_REQUEST,
  USER_EXIT_REQUEST,
  USER_MAIN_REQUEST,
} from "../../../reducers/user";
import {
  Table,
  Button,
  Popover,
  message,
  Modal,
  Select,
  notification,
  Input,
  Form,
  Empty,
  Popconfirm,
} from "antd";
import {
  HomeText,
  OtherMenu,
  GuideUl,
  GuideLi,
  SearchForm,
  SearchFormItem,
  SettingBtn,
  DetailBtn,
  Text,
  Wrapper,
  PopWrapper,
  DelBtn,
  CommonButton,
} from "../../../components/commonComponents";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import { items } from "../../../components/AdminLayout";
import axios from "axios";
import Theme from "../../../components/Theme";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import useInput from "../../../hooks/useInput";
import { CSVLink, CSVDownload } from "react-csv";

const TypeButton = styled(Button)`
  margin-right: 5px;

  /* <CopyOutlined /> */
`;

const GuideDiv = styled.div`
  width: 100%;
  color: ${(props) => (props.isImpo ? props.theme.red_C : "")};
  margin-left: 3px;
`;

const DetailWrapper = styled(Wrapper)`
  width: calc(100% / 2);
  flex-direction: row;
  justify-content: flex-start;
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const UserList = ({}) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const {
    users,
    updateModal,
    userDetail,
    combiTypeList,
    businessTypeList,
    sectorList,
    //
    st_userDetailError,
    //
    st_userListError,
    //
    st_userListUpdateDone,
    st_userListUpdateError,
    //
    st_userExitDone,
    st_userExitError,

    statusList,
  } = useSelector((state) => state.user);

  const [sameDepth, setSameDepth] = useState([]);

  const [updateData, setUpdateData] = useState(null);

  const [detailModal, setDetailModal] = useState(false);

  const [sData, setSData] = useState("");

  const [levelForm] = Form.useForm();
  const [sForm] = Form.useForm();

  const [currentTab, setCurrentTab] = useState(0); // 유형
  const [allExcelData, setAllExcelData] = useState([]); // 선택 조합장 엑셀 데이터 출력

  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");

  const delInput = useInput();

  ////// USEEFFECT //////

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  // 권한 수정 후처리
  useEffect(() => {
    if (st_userListUpdateDone) {
      dispatch({
        type: UPDATE_MODAL_CLOSE_REQUEST,
      });

      dispatch({
        type: USERLIST_REQUEST,
      });

      return message.success("유저정보가 수정되었습니다.");
    }
  }, [st_userListUpdateDone]);

  // 사용자 리스트 조회 에러처리
  useEffect(() => {
    if (st_userListError) {
      return message.error(st_userListError);
    }
  }, [st_userListError]);

  // 권한 수정 에러 메세지
  useEffect(() => {
    if (st_userListUpdateError) {
      return message.error(st_userListUpdateError);
    }
  }, [st_userListUpdateError]);

  // 회원 탈퇴

  useEffect(() => {
    if (st_userExitDone) {
      delInput.setValue("");

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
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        searchData: sData,
        searchUserType: currentTab,
      },
    });
  }, [currentTab, sData]);

  // 상세정보
  useEffect(() => {
    if (st_userDetailError) {
      return message.error(st_userDetailError);
    }
  }, [st_userDetailError]);

  // 엑셀데이터
  useEffect(() => {
    if (statusList) {
      const tempArr1 = [];

      statusList.userList &&
        statusList.userList.map((data) => {
          const tempArr2 = [];
          const tempArr3 = [];
          const tempArr4 = [];

          statusList.sectorList &&
            statusList.sectorList.map((sector) => {
              if (data.id === sector.UserId) {
                tempArr2.push(sector.value);
              }
            });
          statusList.combiTypeList &&
            statusList.combiTypeList.map((combi) => {
              if (data.id === combi.UserId) {
                tempArr3.push(combi.value);
              }
            });
          statusList.businessTypeList &&
            statusList.businessTypeList.map((business) => {
              if (data.id === business.UserId) {
                tempArr4.push(business.value);
              }
            });

          tempArr1.push({
            회원유형: data.viewType,
            회원조합: data.combiName,
            회원아이디: data.userId,
            회원이메일: data.email,
            회원전화번호: data.mobile,
            회원우편: data.postCode,
            회원주소: data.address,
            회원상세주소: data.detailAddress,
            회원이사장: data.repreName,
            회원지역: data.combiArea,
            회원법인수: data.corporationCnt,
            회원개인수: data.personalCnt,
            회원홈페이지: data.combiHomepage,
            회원설립날짜: data.viewEstimateDate,
            회원조합원수1: data.importantBusiness1,
            회원조합원수2: data.importantBusiness2,
            회원조합원수3: data.importantBusiness3,
            회원자본금: data.viewBusinessCapital,
            회원매출액: data.viewBusinessPrice,
            회원사업분야: tempArr2.toString(),
            회원조합유형: tempArr3.toString(),
            회원사업유형: tempArr4.toString(),
          });
        });

      setAllExcelData(tempArr1);
    }
  }, [statusList]);

  ////// TOGGLE //////
  const updateModalOpen = useCallback(
    (data) => {
      dispatch({
        type: UPDATE_MODAL_OPEN_REQUEST,
      });

      setUpdateData(data);
      levelForm.setFieldsValue({ level: data.level });
    },
    [updateModal]
  );

  const updateModalClose = useCallback(() => {
    dispatch({
      type: UPDATE_MODAL_CLOSE_REQUEST,
    });
  }, [updateModal]);

  // 상세정보
  const detailModalToggle = useCallback(
    (data) => {
      if (data) {
        dispatch({
          type: USER_DETAIL_REQUEST,
          data: {
            id: data.id,
          },
        });
      }
      setDetailModal((prev) => !prev);
    },
    [detailModal]
  );

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

  const levelFormClick = useCallback(() => {
    levelForm.submit();
  }, []);

  const onSubmitUpdate = useCallback(
    (data) => {
      if (updateData.level === data.level) {
        return LoadNotification(
          "ADMIN SYSTEM ERRLR",
          "현재 사용자와 같은 레벨로 수정할 수 없습니다."
        );
      }

      dispatch({
        type: USERLIST_UPDATE_REQUEST,
        data: {
          selectUserId: updateData.id,
          changeLevel: data.level,
        },
      });
    },
    [updateData]
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

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  ////// DATAVIEW //////

  const levelArr = [
    {
      id: 1,
      name: "일반회원",
      disabled: false,
    },
    // {
    //   id: 2,
    //   name: "비어있음",
    //   disabled: true,
    // },
    {
      id: 3,
      name: "운영자",
      disabled: false,
    },
    {
      id: 4,
      name: "최고관리자",
      disabled: false,
    },
    {
      id: 5,
      name: "개발사",
      disabled: true,
    },
  ];

  const columns = [
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
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
    // {
    //   title: "권한",
    //   dataIndex: "viewLevel",
    // },
    // {
    //   title: "권한수정",
    //   render: (data) => (
    //     <SettingBtn
    //       size="small"
    //       type="primary"
    //       onClick={() => updateModalOpen(data)}
    //     >
    //       수정
    //     </SettingBtn>
    //   ),
    // },
    {
      title: "상세정보",
      render: (data) => (
        <DetailBtn
          size="small"
          type="primary"
          onClick={() => detailModalToggle(data)}
        >
          상세
        </DetailBtn>
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

  const allHeaders = [
    { label: "유형", key: "회원유형" },
    { label: "조합명", key: "회원조합" },
    { label: "아이디", key: "회원아이디" },
    { label: "이메일", key: "회원이메일" },
    { label: "전화번호", key: "회원전화번호" },
    { label: "우편번호", key: "회원우편" },
    { label: "주소", key: "회원주소" },
    { label: "상세주소", key: "회원상세주소" },
    { label: "이사장명", key: "회원이사장" },
    { label: "지역", key: "회원지역" },
    { label: "법인 조합원수", key: "회원법인수" },
    { label: "개인 조합원수", key: "회원개인수" },
    { label: "홈페이지", key: "회원홈페이지" },
    { label: "설립날짜", key: "회원설립날짜" },
    { label: "조합원수1", key: "회원조합원수1" },
    { label: "조합원수2", key: "회원조합원수2" },
    { label: "조합원수3", key: "회원조합원수3" },
    { label: "주요사업 자본금", key: "회원자본금" },
    { label: "주요사업 매출액", key: "회원매출액" },
    { label: "사업분야", key: "회원사업분야" },
    { label: "조합유형", key: "회원조합유형" },
    { label: "사업유형", key: "회원사업유형" },
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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper padding={`10px 0px 0px 10px`}>
        <GuideUl>
          <GuideLi isImpo={true}>
            해당 메뉴에서 홈페이지에 가입된 회원의 정보를 확인할 수 있습니다.
            <GuideLi isImpo={true}>
              이름 및 이메일로 사용자를 검색할 수 있습니다.
            </GuideLi>
            <GuideLi isImpo={true}>
              변경된 정보는 홈페이지에 즉시 적용되기 때문에, 신중한 처리를
              필요로 합니다.
            </GuideLi>
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

      <Wrapper
        padding="0px 20px"
        dr="row"
        ju="flex-start"
        margin="0px 0px 5px 0px"
      >
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
          조합장
        </TypeButton>

        {currentTab === 2 && (
          <Wrapper dr={`row`} margin={`0 0 10px`} ju={`flex-end`}>
            <CommonButton size="small" radius={`2px`} kindOf={`subTheme`}>
              <CSVLink
                headers={allHeaders}
                data={allExcelData ? allExcelData : []}
                filename="조합장 회원목록.csv"
                target="_blank"
              >
                조합장 회원목록 파일 출력하기
              </CSVLink>
            </CommonButton>
          </Wrapper>
        )}

        {/* {levelArr.map((data) => (
          <TypeButton
            type={currentTab === data.id ? "primary" : "default"}
            size="small"
            onClick={() => tabClickHandler(data.id)}
          >
            {data.name}
          </TypeButton>
        ))} */}
      </Wrapper>

      <Wrapper padding={`0px 20px`}>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={users ? users : []}
          size="small"
        />
      </Wrapper>

      {/* MODAL AREA */}
      <Modal
        width={`600px`}
        title={`사용자 권한 수정`}
        //
        visible={updateModal}
        //
        cancelText="취소"
        onCancel={updateModalClose}
        cancelButtonProps={{ size: "small" }}
        //
        okText="수정"
        onOk={levelFormClick}
        okButtonProps={{ size: "small" }}
      >
        <Wrapper
          radius="5px"
          bgColor={Theme.lightGrey_C}
          padding="5px"
          fontSize="12px"
          al="flex-start"
        >
          <GuideDiv isImpo={true}>
            권한수정은 수정 시 사이트 및 어플리케이션에 즉시 적용되기 때문에
            신중한 처리를 필요로 합니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            개발사로는 권한을 수정하실수 없습니다.
          </GuideDiv>
        </Wrapper>
        <Form form={levelForm} onFinish={onSubmitUpdate}>
          <Form.Item label="권한" name="level">
            <Select size="small">
              {levelArr.map((data) => (
                <Select.Option value={data.id} disabled={data.disabled}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* DETAIL MODAL */}
      <Modal
        width="950px"
        title="상세정보"
        visible={detailModal}
        footer={null}
        onCancel={() => detailModalToggle(null)}
      >
        {userDetail && (
          <Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              borderTop={`1px solid ${Theme.subTheme2_C}`}
            >
              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  유형
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.viewType}
                </Text>
              </DetailWrapper>

              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  조합명
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.combiName}
                </Text>
              </DetailWrapper>

              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  아이디
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.userId}
                </Text>
              </DetailWrapper>

              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  이메일
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.email ? userDetail.email : "이메일이 없습니다."}
                </Text>
              </DetailWrapper>

              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  전화번호
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.mobile
                    ? userDetail.mobile
                    : "전화번호가 없습니다."}
                </Text>
              </DetailWrapper>

              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  우편번호
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.postCode
                    ? userDetail.postCode
                    : "우편번호가 없습니다."}
                </Text>
              </DetailWrapper>

              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  주소
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.address ? userDetail.address : "주소가 없습니다."}
                </Text>
              </DetailWrapper>

              <DetailWrapper>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  상세주소
                </Text>
                <Text
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                >
                  {userDetail.detailAddress
                    ? userDetail.detailAddress
                    : "상세주소가 없습니다."}
                </Text>
              </DetailWrapper>

              {userDetail.type === 2 && (
                // 조합장
                <>
                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      이사장명
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.repreName}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      지역
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.combiArea}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      법인 조합원수
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.corporationCnt}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      개인 조합원수
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.personalCnt}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      홈페이지
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.combiHomepage}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      설립날짜
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.viewEstimateDate}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      조합원수 1
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.importantBusiness1}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      조합원수 2
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.importantBusiness2}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      조합원수 3
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.importantBusiness3}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      주요사업 자본금
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.viewBusinessCapital}
                    </Text>
                  </DetailWrapper>

                  <DetailWrapper>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      주요사업 매출액
                    </Text>
                    <Text
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                    >
                      {userDetail.viewBusinessPrice}
                    </Text>
                  </DetailWrapper>
                </>
              )}

              <Wrapper dr={`row`}>
                <Text
                  width={`110px`}
                  bgColor={Theme.subTheme2_C}
                  textAlign="center"
                  padding={`10px`}
                >
                  {userDetail && userDetail.type === 1
                    ? "관심분야"
                    : "사업분야"}
                </Text>

                <Wrapper
                  width={`calc(100% - 110px)`}
                  padding={`10px`}
                  margin={`10px 0`}
                  borderTop={`1px solid ${Theme.subTheme2_C}`}
                  borderBottom={`1px solid ${Theme.subTheme2_C}`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  {sectorList &&
                    (sectorList.length === 0 ? (
                      <Text>
                        {userDetail.type === 1 ? "관심분야" : "사업분야"}가
                        없습니다.
                      </Text>
                    ) : (
                      sectorList.map((data, idx) => {
                        return (
                          <Text>
                            {data.value}
                            {sectorList.length !== idx + 1 && ", "}
                          </Text>
                        );
                      })
                    ))}
                </Wrapper>
              </Wrapper>

              {userDetail && userDetail.type === 2 && (
                <>
                  <Wrapper dr={`row`}>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      조합유형
                    </Text>

                    <Wrapper
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      margin={`10px 0`}
                      borderTop={`1px solid ${Theme.subTheme2_C}`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                      dr={`row`}
                      ju={`flex-start`}
                    >
                      {combiTypeList &&
                        (combiTypeList.length === 0 ? (
                          <Text>조합유형이 없습니다.</Text>
                        ) : (
                          combiTypeList.map((data, idx) => {
                            return (
                              <Text>
                                {data.value}
                                {combiTypeList.length !== idx + 1 && ", "}
                              </Text>
                            );
                          })
                        ))}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`}>
                    <Text
                      width={`110px`}
                      bgColor={Theme.subTheme2_C}
                      textAlign="center"
                      padding={`10px`}
                    >
                      사업유형
                    </Text>

                    <Wrapper
                      width={`calc(100% - 110px)`}
                      padding={`10px`}
                      margin={`10px 0`}
                      borderTop={`1px solid ${Theme.subTheme2_C}`}
                      borderBottom={`1px solid ${Theme.subTheme2_C}`}
                      dr={`row`}
                      ju={`flex-start`}
                    >
                      {businessTypeList &&
                        (businessTypeList.length === 0 ? (
                          <Text>사업유형이 없습니다.</Text>
                        ) : (
                          businessTypeList.map((data, idx) => {
                            return (
                              <Text>
                                {data.value}
                                {businessTypeList.length !== idx + 1 && ", "}
                              </Text>
                            );
                          })
                        ))}
                    </Wrapper>
                  </Wrapper>
                </>
              )}
            </Wrapper>
          </Wrapper>
        )}
      </Modal>
    </AdminLayout>
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
      type: USERLIST_REQUEST,
    });

    context.store.dispatch({
      type: USER_MAIN_REQUEST,
    });

    context.store.dispatch({
      type: STATUS_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserList);

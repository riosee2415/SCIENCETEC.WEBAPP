import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Form,
  Image,
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
  DetailBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  SHAREPROJECT_CREATE_REQUEST,
  SHAREPROJECT_DELETE_REQUEST,
  SHAREPROJECT_IMAGE1_REQUEST,
  SHAREPROJECT_IMAGE2_REQUEST,
  SHAREPROJECT_IMAGE_RESET,
  SHAREPROJECT_UPDATE_REQUEST,
  SHARE_PROJECT_REQUEST,
  UNDER_CREATE_REQUEST,
  UNDER_DELETE_REQUEST,
  UNDER_LIST_REQUEST,
  UNDER_UPDATE_REQUEST,
} from "../../../reducers/shareProject";
import moment from "moment";

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
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const Association = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    shareProjects,
    previewImagePath1,
    previewImagePath2,
    underList,
    //
    st_shareProjecthCreateDone,
    //
    st_shareProjecthImage1Loading,
    st_shareProjecthImage2Loading,
    //
    st_shareProjecthUpdateDone,
    //
    st_shareProjecthDeleteDone,
    //
    st_underCreateDone,
    //
    st_underUpdateDone,
    //
    st_underDeleteDone,
  } = useSelector((state) => state.shareProject);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("고객지원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentUnderData, setCurrentUnderData] = useState(null); // 산하 수정 데이터

  const [infoForm] = Form.useForm();
  const [underForm] = Form.useForm();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

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

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  const [cModal, setCModal] = useState(false); // create모달
  const [underUModal, setUnderUModal] = useState(false); // 산하 수정 모달

  const imgRef = useRef();
  const img2Ref = useRef();

  ////// USEEFFECT //////

  // --------- 산하 삭제 후 처리 ----------- //
  useEffect(() => {
    if (st_underDeleteDone) {
      dispatch({
        type: UNDER_LIST_REQUEST,
        data: {
          shareProjectId: currentData && currentData.id,
        },
      });

      dispatch({
        type: SHARE_PROJECT_REQUEST,
      });

      return message.success("산하가 삭제되었습니다.");
    }
  }, [st_underDeleteDone]);
  // --------- 산하 수정 후 처리 ----------- //
  useEffect(() => {
    if (st_underUpdateDone) {
      dispatch({
        type: UNDER_LIST_REQUEST,
        data: {
          shareProjectId: currentData && currentData.id,
        },
      });

      dispatch({
        type: SHAREPROJECT_IMAGE_RESET,
      });

      dispatch({
        type: SHARE_PROJECT_REQUEST,
      });
      setUnderUModal(false);

      return message.success("산하를 수정했습니다.");
    }
  }, [st_underUpdateDone]);
  // --------- 산하 생성 후 처리 ----------- //
  useEffect(() => {
    if (st_underCreateDone) {
      dispatch({
        type: UNDER_LIST_REQUEST,
        data: {
          shareProjectId: currentData && currentData.id,
        },
      });

      return message.success("산하를 생성했습니다.");
    }
  }, [st_underCreateDone]);

  useEffect(() => {
    if (st_shareProjecthDeleteDone) {
      dispatch({
        type: SHARE_PROJECT_REQUEST,
      });
      setCurrentData(null);

      return message.success("회원조합이 삭제되었습니다.");
    }
  }, [st_shareProjecthDeleteDone]);

  useEffect(() => {
    if (st_shareProjecthUpdateDone) {
      dispatch({
        type: SHARE_PROJECT_REQUEST,
      });
      dispatch({
        type: SHAREPROJECT_IMAGE_RESET,
      });

      return message.success("회원조합을 수정하였습니다.");
    }
  }, [st_shareProjecthUpdateDone]);

  useEffect(() => {
    if (st_shareProjecthCreateDone) {
      dispatch({
        type: SHARE_PROJECT_REQUEST,
      });

      setCModal(false);

      return message.success("회원조합을 생성했습니다.");
    }
  }, [st_shareProjecthCreateDone]);

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

  ////// TOGGLE //////

  const underUpdateToggle = useCallback(
    (record) => {
      if (record) {
        setCurrentUnderData(record);
        underForm.setFieldsValue({
          type: record.type,
          repreName: record.repreName,
          jobType: record.jobType,
          importantWork: record.importantWork,
          empCnt: record.empCnt,
          link: record.link,
          estimateDate: moment(record.estimateDate),
          createdAt: record.viewCreatedAt,
          updatedAt: record.viewUpdatedAt,
          updator: record.updator,
        });
      }

      dispatch({
        type: SHAREPROJECT_IMAGE_RESET,
      });
      setUnderUModal(!underUModal);
    },
    [underUModal]
  );

  const createUnderClickToggle = useCallback(() => {
    img2Ref.current.click();
  }, [img2Ref]);

  const createClickToggle = useCallback(() => {
    imgRef.current.click();
  }, [imgRef]);

  const cModalToggle = useCallback(() => {
    setCModal(!cModal);
  }, [cModal]);

  ////// HANDLER //////

  // 산하 삭제하기
  const underDeleteHandler = useCallback((data) => {
    dispatch({
      type: UNDER_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  // 산하 이미지 수정하기
  const imageUnderUpdateHandler = useCallback(() => {
    dispatch({
      type: UNDER_UPDATE_REQUEST,
      data: {
        shareProjectId: currentData.id,
        id: currentUnderData.id,
        imagePath: previewImagePath2,
        link: currentUnderData.link,
        repreName: currentUnderData.repreName,
        estimateDate: moment(currentUnderData.estimateDate).format(
          "YYYY-MM-DD"
        ),
        empCnt: currentUnderData.empCnt,
        jobType: currentUnderData.jobType,
        importantWork: currentUnderData.importantWork,
      },
    });
  }, [currentData, previewImagePath2]);

  //  산하 이미지 업로드
  const onChangeUnderImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: SHAREPROJECT_IMAGE2_REQUEST,
      data: formData,
    });
  });

  // 산하 수정하기
  const underUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: UNDER_UPDATE_REQUEST,
        data: {
          shareProjectId: currentData.id,
          id: currentUnderData.id,
          imagePath: currentUnderData.imagePath,
          link: data.link,
          repreName: data.repreName,
          estimateDate: data.estimateDate.format("YYYY-MM-DD"),
          empCnt: data.empCnt,
          jobType: data.jobType,
          importantWork: data.importantWork,
        },
      });
    },
    [currentData, currentUnderData]
  );

  // 산하 생성하기
  const underCreateHandler = useCallback(() => {
    dispatch({
      type: UNDER_CREATE_REQUEST,
      data: {
        shareProjectId: currentData.id,
      },
    });
  }, [currentData]);

  // delete
  const deleteHandler = useCallback((data) => {
    dispatch({
      type: SHAREPROJECT_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  // update
  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: SHAREPROJECT_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          imagePath: currentData.imagePath,
          link: data.link,
          repreName: data.repreName,
          estimateDate: data.estimateDate.format("YYYY-MM-DD"),
          empCnt: data.empCnt,
          jobType: data.jobType,
          importantWork: data.importantWork,
        },
      });
    },
    [currentData]
  );

  // image update
  const imageUpdateHandler = useCallback(() => {
    dispatch({
      type: SHAREPROJECT_UPDATE_REQUEST,
      data: {
        id: currentData.id,
        imagePath: previewImagePath1,
        link: currentData.link,
        repreName: currentData.repreName,
        estimateDate: moment(currentData.estimateDate).format("YYYY-MM-DD"),
        empCnt: currentData.empCnt,
        jobType: currentData.jobType,
        importantWork: currentData.importantWork,
      },
    });
  }, [currentData, previewImagePath1]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: SHAREPROJECT_IMAGE1_REQUEST,
      data: formData,
    });
  });

  // create
  const createHandler = useCallback((data) => {
    dispatch({
      type: SHAREPROJECT_CREATE_REQUEST,
      data: {
        type: data,
      },
    });
  }, []);

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);
      dispatch({
        type: SHAREPROJECT_IMAGE_RESET,
      });

      dispatch({
        type: UNDER_LIST_REQUEST,
        data: {
          shareProjectId: record.id,
        },
      });

      infoForm.setFieldsValue({
        type: record.type,
        repreName: record.repreName,
        jobType: record.jobType,
        importantWork: record.importantWork,
        empCnt: record.empCnt,
        link: record.link,
        estimateDate: moment(record.estimateDate),
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [currentData, infoForm]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const underCol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "대표자명",
      dataIndex: "repreName",
    },

    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "수정",
      render: (data) => <DetailBtn onClick={() => underUpdateToggle(data)} />,
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={() => {
            underDeleteHandler(data);
          }}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
  ];

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "대표자명",
      dataIndex: "repreName",
    },

    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
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
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={() => {
            deleteHandler(data);
          }}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
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
          <GuideLi>
            회원조합메뉴에 보여지는 기술융합협동조합과 회원법인조합의 내용을
            수정할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지 사이즈는 가로 500px으로 올려주세요. 500px 이하일 경우
            해상도가 깨져보일 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            수정하는 즉시 화면에 반영되니 신중한 처리바랍니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 50px" al="flex-start" ju="space-between">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al="flex-end" margin={`0 0 5px`}>
            <Button size="small" type="primary" onClick={cModalToggle}>
              회원조합 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={shareProjects}
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
                  이미지 정보
                </InfoTitle>
              </Wrapper>

              <Image
                src={
                  previewImagePath1 ? previewImagePath1 : currentData.imagePath
                }
              />

              <Wrapper dr={`row`} ju={`flex-end`} margin={`5px 0 0`}>
                <input
                  type="file"
                  name="image"
                  accept=".png, .jpg"
                  // multiple
                  hidden
                  ref={imgRef}
                  onChange={onChangeImages}
                />

                <Button
                  size="small"
                  type="primary"
                  onClick={createClickToggle}
                  loading={st_shareProjecthImage1Loading}
                  style={{ margin: `0 5px 0 0` }}
                >
                  이미지 업로드
                </Button>

                {previewImagePath1 && (
                  <Button
                    type="danger"
                    size="small"
                    onClick={imageUpdateHandler}
                  >
                    적용하기
                  </Button>
                )}
              </Wrapper>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  회원조합 정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                size="small"
                onFinish={updateHandler}
              >
                <Form.Item
                  label="회원조합타입"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "회원조합 타입은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Select disabled={true}>
                    <Select.Option value={1}>기술융합조합</Select.Option>
                    <Select.Option value={2}>회원법인조합</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="대표자명"
                  name="repreName"
                  rules={[
                    {
                      required: true,
                      message: "대표자명은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="업종내용"
                  name="jobType"
                  rules={[
                    {
                      required: true,
                      message: "업종내용은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>
                <Form.Item
                  label="주 업종 내용"
                  name="importantWork"
                  rules={[
                    {
                      required: true,
                      message: "주 업종 내용은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>
                <Form.Item
                  label="직원수"
                  name="empCnt"
                  rules={[
                    {
                      required: true,
                      message: "직원수는 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" type="number" />
                </Form.Item>
                <Form.Item
                  label="링크"
                  name="link"
                  rules={[
                    {
                      required: true,
                      message: "링크는 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="설립연도"
                  name="estimateDate"
                  rules={[
                    {
                      required: true,
                      message: "설립연도는 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <DatePicker style={{ width: `100%` }} />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근작업자" name="updator">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>
                <Wrapper al="flex-end" margin={`0 0 10px`}>
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
                </Wrapper>
              </Form>

              <Table
                columns={underCol}
                style={{ width: "100%" }}
                rowKey="id"
                dataSource={underList}
                size="small"
              />

              <Wrapper al={`flex-end`} margin={`10px 0 0`}>
                <Button
                  type="primary"
                  size="small"
                  onClick={underCreateHandler}
                >
                  산하 생성하기
                </Button>
              </Wrapper>

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

      <Modal
        visible={cModal}
        onCancel={cModalToggle}
        title="회원조합 생성"
        footer={null}
      >
        <GuideUl>
          <GuideLi isImpo={true}>
            회원조합 생성 시 기술융합협동조합 / 회원법인조합 중 하나 선택하여
            주시기 바랍니다.
          </GuideLi>
        </GuideUl>
        <Wrapper dr={`row`} ju={`space-around`} height={`150px`}>
          <Button onClick={() => createHandler(1)} type="primary">
            기술융합협동조합
          </Button>
          <Button onClick={() => createHandler(2)} type="primary">
            회원법인조합
          </Button>
        </Wrapper>
      </Modal>

      <Modal
        visible={underUModal}
        onCancel={() => underUpdateToggle(null)}
        footer={null}
        title="산하 수정하기"
        width="900px"
      >
        <Wrapper>
          <Image
            style={{ width: `100%` }}
            src={
              previewImagePath2
                ? previewImagePath2
                : currentUnderData && currentUnderData.imagePath
            }
          />
        </Wrapper>

        <Wrapper dr={`row`} ju={`flex-end`} margin={`10px 0`}>
          <input
            type="file"
            name="image"
            accept=".png, .jpg"
            // multiple
            hidden
            ref={img2Ref}
            onChange={onChangeUnderImages}
          />

          <Button
            size="small"
            type="primary"
            onClick={createUnderClickToggle}
            loading={st_shareProjecthImage2Loading}
            style={{ margin: `0 5px 0 0` }}
          >
            이미지 업로드
          </Button>

          {previewImagePath2 && (
            <Button
              type="danger"
              size="small"
              onClick={imageUnderUpdateHandler}
            >
              적용하기
            </Button>
          )}
        </Wrapper>

        <Form
          size="small"
          labelCol={{ span: 4 }}
          labelAlign={`left`}
          form={underForm}
          onFinish={underUpdateHandler}
        >
          <Form.Item
            label="대표자명"
            name="repreName"
            rules={[
              {
                required: true,
                message: "대표자명은 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label="업종내용"
            name="jobType"
            rules={[
              {
                required: true,
                message: "업종내용은 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>
          <Form.Item
            label="주 업종 내용"
            name="importantWork"
            rules={[
              {
                required: true,
                message: "주 업종 내용은 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>
          <Form.Item
            label="직원수"
            name="empCnt"
            rules={[
              {
                required: true,
                message: "직원수는 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input size="small" type="number" />
          </Form.Item>
          <Form.Item
            label="링크"
            name="link"
            rules={[
              {
                required: true,
                message: "링크는 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label="설립연도"
            name="estimateDate"
            rules={[
              {
                required: true,
                message: "설립연도는 필수 입력사항 입니다.",
              },
            ]}
          >
            <DatePicker style={{ width: `100%` }} />
          </Form.Item>

          <Form.Item label="작성일" name="createdAt">
            <Input
              size="small"
              style={{ background: Theme.lightGrey_C, border: "none" }}
              readOnly
            />
          </Form.Item>

          <Form.Item label="수정일" name="updatedAt">
            <Input
              size="small"
              style={{ background: Theme.lightGrey_C, border: "none" }}
              readOnly
            />
          </Form.Item>

          <Form.Item label="최근작업자" name="updator">
            <Input
              size="small"
              style={{ background: Theme.lightGrey_C, border: "none" }}
              readOnly
            />
          </Form.Item>
          <Wrapper al="flex-end" margin={`0 0 10px`}>
            <Button type="primary" size="small" htmlType="submit">
              정보 업데이트
            </Button>
          </Wrapper>
        </Form>
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
      type: SHARE_PROJECT_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Association);

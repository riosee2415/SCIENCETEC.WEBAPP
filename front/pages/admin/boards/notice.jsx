import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Button,
  Table,
  Form,
  Input,
  Select,
  message,
  Switch,
  Modal,
  Popconfirm,
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
  ModalBtn,
} from "../../../components/commonComponents";
import {
  LOAD_MY_INFO_REQUEST,
  USER_MAIN_REQUEST,
} from "../../../reducers/user";
import {
  NOTICE_ADMIN_LIST_REQUEST,
  NOTICE_UPDATE_REQUEST,
  NOTICE_UPDATE_TOP_REQUEST,
  NOTICE_FILE_REQUEST,
  NOTICE_FILE_INFO_REQUEST,
  UPLOAD_PATH_INIT,
  NOTICE_CREATE_REQUEST,
  NOTICE_DELETE_REQUEST,
} from "../../../reducers/notice";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  EyeOutlined,
  AlertOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { saveAs } from "file-saver";

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

const Notice = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    adminNotices,
    uploadFilePath,
    //
    st_noticeAdminListError,
    //
    st_noticeUpdateDone,
    st_noticeUpdateError,
    //
    st_noticeUpdateTopDone,
    st_noticeUpdateTopError,
    //
    st_noticeFileLoading,
    st_noticeFileDone,
    //
    st_noticeFileInfoDone,
    st_noticeFileInfoError,
    //
    st_noticeCreateDone,
    st_noticeCreateError,
    //
    st_noticeDeleteLoading,
    st_noticeDeleteDone,
    st_noticeDeleteError,
  } = useSelector((state) => state.notice);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("게시판관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [currentData, setCurrentData] = useState(null);
  const [currentTop, setCurrentTop] = useState(false);
  const [tab, setTab] = useState(1);
  const [createModal, setCreateModal] = useState(false);
  const [fileType, setFileType] = useState(null);

  const [infoForm] = Form.useForm();

  const [filename, setFilename] = useState(null);

  const fileRef = useRef();
  const fileRef2 = useRef();
  const fileRef3 = useRef();
  const fileRef4 = useRef();
  const fileRef5 = useRef();

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

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_noticeFileDone) {
      if (currentData) {
        setCurrentData((prev) => {
          return {
            ...prev,
            file: fileType === 1 ? uploadFilePath : prev.file,
            file2: fileType === 2 ? uploadFilePath : prev.file2,
            file3: fileType === 3 ? uploadFilePath : prev.file3,
            file4: fileType === 4 ? uploadFilePath : prev.file4,
            file5: fileType === 5 ? uploadFilePath : prev.file5,
          };
        });
      }

      return message.success(
        "파일이 업로드되었습니다. 적용하기 버튼을 눌러주세요."
      );
    }
  }, [st_noticeFileDone]);

  // ********************** 공지사항 리스트 후처리 *************************

  useEffect(() => {
    if (st_noticeAdminListError) {
      return message.error(st_noticeAdminListError);
    }
  }, [st_noticeAdminListError]);

  // ********************** 공지사항 생성 후처리 *************************
  useEffect(() => {
    if (st_noticeCreateDone) {
      message.success("정보가 업데이트 되었습니다.");

      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "자료실";
          break;

        case 3:
          sendType = "커뮤니티";
          break;

        case 4:
          sendType = "FAQ";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_ADMIN_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });
    }
  }, [st_noticeCreateDone]);

  useEffect(() => {
    if (st_noticeCreateError) {
      return message.error(st_noticeCreateError);
    }
  }, [st_noticeCreateError]);

  // ********************** 공지사항 삭제 *************************

  useEffect(() => {
    if (st_noticeDeleteDone) {
      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "자료실";
          break;

        case 3:
          sendType = "커뮤니티";
          break;

        case 4:
          sendType = "FAQ";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_ADMIN_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });

      setCurrentData(null);

      return message.success("해당 게시글이 삭제되었습니다.");
    }

    if (st_noticeDeleteError) {
      return message.error(st_noticeDeleteError);
    }
  }, [st_noticeDeleteDone, st_noticeDeleteError]);

  // ********************** 공지사항 수정 *************************
  useEffect(() => {
    if (st_noticeUpdateDone) {
      message.success("정보가 업데이트 되었습니다.");

      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "자료실";
          break;

        case 3:
          sendType = "커뮤니티";
          break;

        case 4:
          sendType = "FAQ";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_ADMIN_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });
    }
  }, [st_noticeUpdateDone]);

  useEffect(() => {
    if (st_noticeUpdateError) {
      return message.error(st_noticeUpdateError);
    }
  }, [st_noticeUpdateError]);

  // ********************** 공지사항 상단고정 수정 *************************
  useEffect(() => {
    if (st_noticeUpdateTopDone) {
      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "자료실";
          break;

        case 3:
          sendType = "커뮤니티";
          break;

        case 4:
          sendType = "FAQ";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_ADMIN_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });

      return message.success("정보가 업데이트 되었습니다.");
    }
  }, [st_noticeUpdateTopDone]);

  useEffect(() => {
    if (st_noticeFileInfoError) {
      return message.error(st_noticeFileInfoError);
    }
  }, [st_noticeFileInfoError]);

  useEffect(() => {
    if (adminNotices && currentData) {
      setCurrentData(adminNotices.find((data) => data.id === currentData.id));
    }
  }, [adminNotices, currentData]);

  // ********************** 공지사항 파일정보 적용 *************************
  useEffect(() => {
    if (st_noticeFileInfoDone) {
      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "자료실";
          break;

        case 3:
          sendType = "커뮤니티";
          break;

        case 4:
          sendType = "FAQ";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_ADMIN_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });

      return message.success("정보가 업데이트 되었습니다.");
    }
  }, [st_noticeFileInfoDone]);

  useEffect(() => {
    if (st_noticeUpdateTopError) {
      return message.error(st_noticeUpdateError);
    }
  }, [st_noticeUpdateTopError]);

  useEffect(() => {
    setCurrentData(null);
    let sendType = "";

    switch (tab) {
      case 0:
        sendType = "";
        break;

      case 1:
        sendType = "공지사항";
        break;

      case 2:
        sendType = "자료실";
        break;

      case 3:
        sendType = "커뮤니티";
        break;

      case 4:
        sendType = "FAQ";
        break;

      default:
        break;
    }

    dispatch({
      type: NOTICE_ADMIN_LIST_REQUEST,
      data: {
        type: sendType,
      },
    });
  }, [tab]);

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

  ////// HANDLER //////

  const createWithTypeHandler = useCallback((typeValue) => {
    dispatch({
      type: NOTICE_CREATE_REQUEST,
      data: {
        type: typeValue,
        author: "관리자",
      },
    });

    createModalToggle();
  }, []);

  const createModalToggle = useCallback(() => {
    setCreateModal((prev) => !prev);
  }, [createModal]);

  const clickFileUpload = useCallback(
    (type) => {
      if (uploadFilePath && filename) {
        return message.error("적용하기 또는 취소 버튼을 누른후 이용해주세요.");
      }

      setFileType(type);
      setFilename(null);
      if (type === 1) {
        fileRef.current.click();
      } else if (type === 2) {
        fileRef2.current.click();
      } else if (type === 3) {
        fileRef3.current.click();
      } else if (type === 4) {
        fileRef4.current.click();
      } else if (type === 5) {
        fileRef5.current.click();
      }
    },
    [
      uploadFilePath,
      filename,
      fileRef.current,
      fileRef2.current,
      fileRef3.current,
      fileRef4.current,
      fileRef5.current,
    ]
  );

  const clickCancelHandler = useCallback(
    (data) => {
      dispatch({
        type: UPLOAD_PATH_INIT,
      });
      setFileType(null);
      setFilename(null);
    },
    [fileType, filename, uploadFilePath]
  );

  const onChangeFiles = useCallback(
    (e) => {
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        formData.append("file", file);
      });

      if (e.target.files[0]) {
        setFilename(e.target.files[0].name);
      }

      dispatch({
        type: NOTICE_FILE_REQUEST,
        data: formData,
      });
    },
    [filename]
  );

  const fileDownloadHandler = useCallback(async (filepath) => {
    if (!filepath) {
      return message.error("다운로드 할 수 있는 파일이 없습니다.");
    }

    const filename = "web_notice_file";
    const ext = filepath.split(".");
    const _ext = ext[ext.length - 1];

    const finalFilename = `${filename}.${_ext}`;

    let blob = await fetch(filepath).then((r) => r.blob());

    const element = document.createElement("a");
    const file = new Blob([blob]);

    saveAs(file, finalFilename);
  }, []);

  const onTypeChange = useCallback(
    (value) => {
      infoForm.setFieldsValue({
        type: value,
      });
    },
    [infoForm]
  );

  const beforeSetDataHandler = useCallback(
    (record) => {
      dispatch({
        type: UPLOAD_PATH_INIT,
      });

      setCurrentData(record);
      setCurrentTop(record.isTop);

      infoForm.setFieldsValue({
        title: record.title,
        type: record.type,
        content: record.content,
        hit: record.hit,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
        author: record.author,
      });
    },
    [currentData, infoForm, currentTop]
  );

  const infoFormFinish = useCallback(
    (data) => {
      dispatch({
        type: NOTICE_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          title: data.title,
          content: data.content,
          type: data.type,
        },
      });
    },
    [currentData]
  );

  const applyFileHandler = useCallback(
    (type) => {
      dispatch({
        type: NOTICE_FILE_INFO_REQUEST,
        data: {
          id: currentData.id,
          filename: type === 1 ? filename : currentData.filename,
          filepath: type === 1 ? uploadFilePath : currentData.file,
          filename2: type === 2 ? filename : currentData.filename2,
          file2: type === 2 ? uploadFilePath : currentData.file2,
          filename3: type === 3 ? filename : currentData.filename3,
          file3: type === 3 ? uploadFilePath : currentData.file3,
          filename4: type === 4 ? filename : currentData.filename4,
          file4: type === 4 ? uploadFilePath : currentData.file4,
          filename5: type === 5 ? filename : currentData.filename5,
          file5: type === 5 ? uploadFilePath : currentData.file5,
          title: currentData.title,
          type: currentData.type,
        },
      });
    },
    [uploadFilePath, currentData, filename]
  );

  const isTopChangeHandler = useCallback(
    (data) => {
      setCurrentTop((prev) => !prev);

      dispatch({
        type: NOTICE_UPDATE_TOP_REQUEST,
        data: {
          id: currentData.id,
          flag: data ? 1 : 0,
          title: currentData.title,
        },
      });
    },
    [currentData, currentTop]
  );

  const deleteNoticeHandler = useCallback(() => {
    dispatch({
      type: NOTICE_DELETE_REQUEST,
      data: {
        id: currentData.id,
      },
    });
  }, [currentData]);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const noticeCol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형",
      dataIndex: "type",
    },
    {
      title: "공지사항 제목",
      dataIndex: "title",
      width: "50%",
    },
    {
      title: "작성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <ViewStatusIcon
          active={
            parseInt(data.id) === (currentData && parseInt(currentData.id))
          }
        />
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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            공지사항을 추가 / 수정 / 삭제 등 관리를 할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 공지사항은 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* TAB */}
      <Wrapper padding={`10px`} dr={`row`} ju="flex-start">
        {/* <Button
          type={tab === 0 ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setTab(0)}
        >
          전체
        </Button> */}
        <Button
          type={tab === 1 ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setTab(1)}
        >
          공지사항
        </Button>
        <Button
          type={tab === 2 ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setTab(2)}
        >
          자료실
        </Button>
        {/* <Button
          type={tab === 3 ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setTab(3)}
        >
          커뮤니티
        </Button> */}
        <Button
          type={tab === 4 ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setTab(4)}
        >
          FAQ
        </Button>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {tab !== 3 && (
            <Wrapper al="flex-end">
              <Button size="small" type="primary" onClick={createModalToggle}>
                게시판 생성
              </Button>
            </Wrapper>
          )}
          <Table
            size="small"
            dataSource={adminNotices ? adminNotices : []}
            columns={noticeCol}
            rowKey="id"
            style={{ width: "100%" }}
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          ></Table>
        </Wrapper>
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  게시판 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
                onFinish={infoFormFinish}
              >
                <Form.Item
                  label="제목"
                  name="title"
                  rules={[
                    { required: true, message: "제목은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="유형"
                  name="type"
                  rules={[
                    { required: true, message: "유형은 필수 선택사항 입니다." },
                  ]}
                >
                  <Input size="small" disabled={true} />
                </Form.Item>

                <Form.Item
                  label="내용"
                  name="content"
                  rules={[
                    { required: true, message: "내용은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>

                <Form.Item label="조회수" name="hit">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
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

                <Form.Item label="작성자" name="author">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper dr={`row`} ju="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
                  <Popconfirm
                    title="삭제하시겠습니까?"
                    okText="삭제"
                    cancelText="취소"
                    onConfirm={deleteNoticeHandler}
                  >
                    <ModalBtn type="danger" size="small">
                      삭제
                    </ModalBtn>
                  </Popconfirm>
                </Wrapper>
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              {currentData.type !== "FAQ" && (
                <>
                  <Wrapper margin={`0px 0px 5px 0px`}>
                    <InfoTitle>
                      <CheckOutlined />
                      공지사항 파일정보
                    </InfoTitle>
                  </Wrapper>

                  <Wrapper padding="0px 20px">
                    <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                      <Text>
                        등록된 파일이&nbsp;
                        {
                          [
                            currentData.file,
                            currentData.file2,
                            currentData.file3,
                            currentData.file4,
                            currentData.file5,
                          ].filter((data) => data).length
                        }
                        개 입니다.
                      </Text>
                    </Wrapper>
                    {console.log(currentData)}
                    <Wrapper>
                      {currentData && (
                        <>
                          {/* 파일 업로드 1 */}
                          {/* 파일 업로드 1 */}
                          {/* 파일 업로드 1 */}
                          <Wrapper dr="row" ju="flex-start" margin={`0 0 20px`}>
                            <Wrapper al={`flex-start`}>
                              <Text>
                                {fileType
                                  ? fileType === 1
                                    ? filename
                                      ? filename
                                      : currentData.filename
                                    : currentData.filename
                                    ? currentData.filename
                                    : "파일이 없습니다."
                                  : currentData.filename
                                  ? currentData.filename
                                  : "파일이 없습니다."}
                              </Text>
                            </Wrapper>
                            <Button
                              type="defalut"
                              size="small"
                              onClick={() =>
                                fileDownloadHandler(currentData.file)
                              }
                            >
                              다운로드
                            </Button>

                            <input
                              type="file"
                              name="file"
                              // accept=".png, .jpg"
                              // multiple
                              hidden
                              ref={fileRef}
                              onChange={onChangeFiles}
                            />

                            <Button
                              type="danger"
                              size="small"
                              onClick={() => clickFileUpload(1)}
                              loading={st_noticeFileLoading}
                            >
                              업로드
                            </Button>

                            {uploadFilePath && fileType === 1 && (
                              <>
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginLeft: "10px" }}
                                  onClick={() => applyFileHandler(1)}
                                >
                                  적용하기
                                </Button>
                                <Button
                                  type="danger"
                                  size="small"
                                  onClick={() => clickCancelHandler(1)}
                                >
                                  취소하기
                                </Button>
                              </>
                            )}
                          </Wrapper>
                          {/* 파일 업로드 2 */}
                          {/* 파일 업로드 2 */}
                          {/* 파일 업로드 2 */}
                          <Wrapper dr="row" ju="flex-start" margin={`0 0 20px`}>
                            <Wrapper al={`flex-start`}>
                              <Text>
                                {fileType
                                  ? fileType === 2
                                    ? filename
                                      ? filename
                                      : currentData.filename2
                                    : currentData.filename2
                                    ? currentData.filename2
                                    : "파일이 없습니다."
                                  : currentData.filename2
                                  ? currentData.filename2
                                  : "파일이 없습니다."}
                              </Text>
                            </Wrapper>
                            <Button
                              type="defalut"
                              size="small"
                              onClick={() =>
                                fileDownloadHandler(currentData.file2)
                              }
                            >
                              다운로드
                            </Button>

                            <input
                              type="file"
                              name="file"
                              // accept=".png, .jpg"
                              // multiple
                              hidden
                              ref={fileRef2}
                              onChange={onChangeFiles}
                            />

                            <Button
                              type="danger"
                              size="small"
                              onClick={() => clickFileUpload(2)}
                              loading={st_noticeFileLoading}
                            >
                              업로드
                            </Button>

                            {uploadFilePath && fileType === 2 && (
                              <>
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginLeft: "10px" }}
                                  onClick={() => applyFileHandler(2)}
                                >
                                  적용하기
                                </Button>
                                <Button
                                  type="danger"
                                  size="small"
                                  onClick={() => clickCancelHandler(2)}
                                >
                                  취소하기
                                </Button>
                              </>
                            )}
                          </Wrapper>
                          {/* 파일 업로드 3 */}
                          {/* 파일 업로드 3 */}
                          {/* 파일 업로드 3 */}
                          <Wrapper dr="row" ju="flex-start" margin={`0 0 20px`}>
                            <Wrapper al={`flex-start`}>
                              <Text>
                                {fileType
                                  ? fileType === 3
                                    ? filename
                                      ? filename
                                      : currentData.filename3
                                    : currentData.filename3
                                    ? currentData.filename3
                                    : "파일이 없습니다."
                                  : currentData.filename3
                                  ? currentData.filename3
                                  : "파일이 없습니다."}
                              </Text>
                            </Wrapper>
                            <Button
                              type="defalut"
                              size="small"
                              onClick={() =>
                                fileDownloadHandler(currentData.file3)
                              }
                            >
                              다운로드
                            </Button>

                            <input
                              type="file"
                              name="file"
                              // accept=".png, .jpg"
                              // multiple
                              hidden
                              ref={fileRef3}
                              onChange={onChangeFiles}
                            />

                            <Button
                              type="danger"
                              size="small"
                              onClick={() => clickFileUpload(3)}
                              loading={st_noticeFileLoading}
                            >
                              업로드
                            </Button>

                            {uploadFilePath && fileType === 3 && (
                              <>
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginLeft: "10px" }}
                                  onClick={() => applyFileHandler(3)}
                                >
                                  적용하기
                                </Button>
                                <Button
                                  type="danger"
                                  size="small"
                                  onClick={() => clickCancelHandler(3)}
                                >
                                  취소하기
                                </Button>
                              </>
                            )}
                          </Wrapper>
                          {/* 파일 업로드 4 */}
                          {/* 파일 업로드 4 */}
                          {/* 파일 업로드 4 */}
                          <Wrapper dr="row" ju="flex-start" margin={`0 0 20px`}>
                            <Wrapper al={`flex-start`}>
                              <Text>
                                {fileType
                                  ? fileType === 4
                                    ? filename
                                      ? filename
                                      : currentData.filename4
                                    : currentData.filename4
                                    ? currentData.filename4
                                    : "파일이 없습니다."
                                  : currentData.filename4
                                  ? currentData.filename4
                                  : "파일이 없습니다."}
                              </Text>
                            </Wrapper>
                            <Button
                              type="defalut"
                              size="small"
                              onClick={() =>
                                fileDownloadHandler(currentData.file4)
                              }
                            >
                              다운로드
                            </Button>

                            <input
                              type="file"
                              name="file"
                              // accept=".png, .jpg"
                              // multiple
                              hidden
                              ref={fileRef4}
                              onChange={onChangeFiles}
                            />

                            <Button
                              type="danger"
                              size="small"
                              onClick={() => clickFileUpload(4)}
                              loading={st_noticeFileLoading}
                            >
                              업로드
                            </Button>

                            {uploadFilePath && fileType === 4 && (
                              <>
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginLeft: "10px" }}
                                  onClick={() => applyFileHandler(4)}
                                >
                                  적용하기
                                </Button>
                                <Button
                                  type="danger"
                                  size="small"
                                  onClick={() => clickCancelHandler(4)}
                                >
                                  취소하기
                                </Button>
                              </>
                            )}
                          </Wrapper>

                          {/* 파일 업로드 5 */}
                          {/* 파일 업로드 5 */}
                          {/* 파일 업로드 5 */}
                          <Wrapper dr="row" ju="flex-start" margin={`0 0 20px`}>
                            <Wrapper al={`flex-start`}>
                              <Text>
                                {fileType
                                  ? fileType === 5
                                    ? filename
                                      ? filename
                                      : currentData.filename5
                                    : currentData.filename5
                                    ? currentData.filename5
                                    : "파일이 없습니다."
                                  : currentData.filename5
                                  ? currentData.filename5
                                  : "파일이 없습니다."}
                              </Text>
                            </Wrapper>
                            <Button
                              type="defalut"
                              size="small"
                              onClick={() =>
                                fileDownloadHandler(currentData.file5)
                              }
                            >
                              다운로드
                            </Button>

                            <input
                              type="file"
                              name="file"
                              // accept=".png, .jpg"
                              // multiple
                              hidden
                              ref={fileRef5}
                              onChange={onChangeFiles}
                            />

                            <Button
                              type="danger"
                              size="small"
                              onClick={() => clickFileUpload(5)}
                              loading={st_noticeFileLoading}
                            >
                              업로드
                            </Button>

                            {uploadFilePath && fileType === 5 && (
                              <>
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginLeft: "10px" }}
                                  onClick={() => applyFileHandler(5)}
                                >
                                  적용하기
                                </Button>
                                <Button
                                  type="danger"
                                  size="small"
                                  onClick={() => clickCancelHandler(5)}
                                >
                                  취소하기
                                </Button>
                              </>
                            )}
                          </Wrapper>
                        </>
                      )}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    width="100%"
                    height="1px"
                    bgColor={Theme.lightGrey_C}
                    margin={`30px 0px`}
                  ></Wrapper>
                </>
              )}
            </>
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
        visible={createModal}
        title="새로운 공지사항 유형선택"
        footer={null}
        width="250px"
        onCancel={createModalToggle}
      >
        <Wrapper dr="row" ju="space-around">
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => createWithTypeHandler("공지사항")}
          >
            공지사항
          </Button>
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => createWithTypeHandler("자료실")}
          >
            자료실
          </Button>
          {/* <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => createWithTypeHandler("커뮤니티")}
          >
            커뮤니티
          </Button> */}
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => createWithTypeHandler("FAQ")}
          >
            FAQ
          </Button>
        </Wrapper>
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
      type: NOTICE_ADMIN_LIST_REQUEST,
      data: {
        title: "",
        type: "",
      },
    });

    context.store.dispatch({
      type: USER_MAIN_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Notice);

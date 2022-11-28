const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, "uploads");
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname); // 확장자 추출 (.png)
//       const basename = path.basename(file.originalname, ext);

//       done(null, basename + "_" + new Date().getTime() + ext);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 2024 }, // 20MB
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/file", upload.single("file"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

router.post("/list", async (req, res, next) => {
  const { title, content, page, type } = req.body;

  const _title = title ? title : ``;
  const _content = content ? content : ``;
  const _type = type ? type : ``;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt)		AS num, 
          A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          B.username 										              AS updator 
    FROM	notices		A
   INNER
    JOIN	users		  B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.title LIKE "%${_title}%"
     AND	A.content LIKE "%${_content}%"
          ${_type !== `` ? ` AND  A.type = "${_type}"` : ``}
  `;

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt)		AS num, 
          A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          B.username 										              AS updator 
    FROM	notices		A
   INNER
    JOIN	users		  B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.title LIKE "%${_title}%"
     AND	A.content LIKE "%${_content}%"
          ${_type !== `` ? ` AND  A.type = "${_type}"` : ``}
   ORDER	BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const notice = await models.sequelize.query(selectQuery);

    const noticeLen = lengths[0].length;

    const lastPage =
      noticeLen % LIMIT > 0 ? noticeLen / LIMIT + 1 : noticeLen / LIMIT;

    return res.status(200).json({
      notices: notice[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("공지사항 데이터를 불러올 수 없습니다.");
  }
});

router.post("/admin/list", async (req, res, next) => {
  const { title, content, type } = req.body;

  const _title = title ? title : "";
  const _content = content ? content : ``;
  const _type = type ? type : "";

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt)		AS num, 
          A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          B.username 										              AS updator 
    FROM	notices		A
   INNER
    JOIN	users		  B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.title LIKE "%${_title}%"
     AND	A.content LIKE "%${_content}%"
          ${_type !== `` ? ` AND  A.type = "${_type}"` : ``}
   ORDER	BY num DESC
  `;

  try {
    const notice = await models.sequelize.query(selectQuery);

    return res.status(200).json(notice[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("공지사항 데이터를 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { title, type, content, author } = req.body;

  const insertQuery1 = `
      INSERT INTO notices
      (
        title,
        content,
        author,
        type,
        file,
        updator,
        createdAt,
        updatedAt
      )
      VALUES
      (
        ${type !== "커뮤니티" ? `"임시 ${type} 게시글"` : `"${title}"`},
        ${type !== "커뮤니티" ? `"임시 내용"` : `"${content}"`},
        "${author}",
        "${type}",
        NULL,
        ${req.user.id},
        now(),
        now()
      )
    `;

  const insertQuery2 = `
  INSERT INTO noticeHistory
  (
    content,
    title,
    type,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 생성",
    "임시 ${type} 게시글",
    "${type}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQuery1);

    if (type !== "커뮤니티") {
      await models.sequelize.query(insertQuery2);

      return res.status(201).json({ result: true });
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글을 등록할 수 없습니다. [CODE 077]");
  }
});

router.post("/update", isLoggedIn, async (req, res, next) => {
  const { id, title, content } = req.body;

  const selectQuery = `
  SELECT  type
    FROM  notices
   WHERE  id = ${id}
     AND  isDelete = 0
  `;

  const updateQ = `
    UPDATE  notices
      SET   title = "${title}",
            content = "${content}",
            updatedAt = now(),
            updator = ${req.user.id}
     WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(selectQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 게시글입니다.");
    }

    await models.sequelize.query(updateQ);

    if (findResult[0][0].type !== "커뮤니티") {
      const insertQuery2 = `
      INSERT INTO noticeHistory
      (
        content,
        title,
        type,
        updator,
        createdAt,
        updatedAt
      )
      VALUES 
      (
        "데이터 수정",
        "${title}",
        "${findResult[0][0].type}",
        ${req.user.id},
        now(),
        now()
      )
      `;

      await models.sequelize.query(insertQuery2);

      return res.status(200).json({ result: true });
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공지사항을 수정할 수 없습니다. [CODE 087]");
  }
});

router.post("/update/file", isAdminCheck, async (req, res, next) => {
  const { id, filepath, title, type } = req.body;

  const updateQ = `
      UPDATE  notices
        SET   file = "${filepath}",
              updatedAt = now(),
              updator = ${req.user.id}
      WHERE  id = ${id}
    `;

  const insertQuery2 = `
  INSERT INTO noticeHistory
  (
    content,
    title,
    type,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "파일정보 수정",
    "${title}",
    "${type}",
    ${req.user.id},
    now(),
    now()
  )
    `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공지사항을 수정할 수 없습니다. [CODE 087]");
  }
});

router.post("/delete", isLoggedIn, async (req, res, next) => {
  const { id, title } = req.body;

  const selectQuery = `
  SELECT  type
    FROM  notices
   WHERE  id = ${id}
     AND  isDelete = 0
  `;

  const deleteQ = `
    UPDATE  notices
      SET   isDelete = 1,
            deletedAt = NOW()
     WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(selectQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 게시글입니다.");
    }

    await models.sequelize.query(deleteQ);

    if (findResult[0][0].type !== "커뮤니티") {
      const insertQuery2 = `
  INSERT INTO noticeHistory
  (
    content,
    title,
    type,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 삭제",
    "${title}",
    "${findResult[0][0].type}",
    ${req.user.id},
    now(),
    now()
  )
  `;

      await models.sequelize.query(insertQuery2);

      return res.status(200).json({ result: true });
    }
    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공지사항을 삭제할 수 없습니다. [CODE 087]");
  }
});

router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const detailQuery = `
  SELECT	A.id,
          A.title,
          A.type,
          A.content,
          A.author,
          A.hit,
          A.file,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		  AS viewUpdatedAt,
          B.username 										                AS updator 
    FROM	notices		A
   INNER
    JOIN	users		  B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.id = ${id}
  `;

  const selectQuery = `
  SELECT   ROW_NUMBER() OVER(ORDER  BY A.createdAt) AS num,
           A.id,
           A.content,
           B.username,
           A.createdAt,
           A.updatedAt,
           DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		  AS viewCreatedAt,
           DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		  AS viewUpdatedAt
    FROM   noticeComments   A
   INNER
    JOIN   users            B
      ON   A.UserId = B.id
   WHERE   A.isDelete = 0
     AND   A.NoticeId = ${id}
   ORDER   BY num DESC
  `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 게시글입니다.");
    }

    const updateQuery = `
    UPDATE  notices
       SET  hit = ${detailData[0][0].hit + 1}
     WHERE  id = ${id}
    `;

    await models.sequelize.query(updateQuery);

    const commentList = await models.sequelize.query(selectQuery);

    const nextDataQuery = `
  SELECT  id,
          title
    FROM  notices
   WHERE  id > ${id}
     AND  isDelete = 0
     AND  type = "${detailData[0][0].type}"
   LIMIT  1
  `;

    const prevDataQuery = `
  SELECT  id,
          title
    FROM  notices
   WHERE  id < ${id}
     AND  isDelete = 0
     AND  type = "${detailData[0][0].type}"
  `;

    const nextData = await models.sequelize.query(nextDataQuery);

    const prevData = await models.sequelize.query(prevDataQuery);

    return res.status(200).json({
      detailData: detailData[0][0],
      commentList: commentList[0],
      nextNotice: nextData[0].length !== 0 ? nextData[0][0] : null, // 다음 게시글
      prevNotice:
        prevData[0].length !== 0 ? prevData[0][prevData[0].length - 1] : null, // 이전 게시글
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick, type } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.title,
            A.type,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	noticeHistory		A
     INNER
      JOIN	users 			    B
        ON	A.updator = B.id
     WHERE  1=1
            ${
              _datePick
                ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
                : ""
            }
       AND  A.type = "${type}"
     ORDER  BY  A.createdAt  DESC
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// - COMMENT - //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/comment/list", isAdminCheck, async (req, res, next) => {
  const { noticeId } = req.body;

  const selectQuery = `
  SELECT   ROW_NUMBER() OVER(ORDER  BY A.createdAt) AS num,
           A.id,
           A.content,
           B.username,
           A.createdAt,
           A.updatedAt,
           DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		  AS viewCreatedAt,
           DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		  AS viewUpdatedAt
    FROM   noticeComments   A
   INNER
    JOIN   users            B
      ON   A.UserId = B.id
   WHERE   A.isDelete = 0
     AND   A.NoticeId = ${noticeId}
   ORDER   BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글 목록을 불러올 수 없습니다.");
  }
});

router.post("/comment/create", isLoggedIn, async (req, res, next) => {
  const { noticeId, content } = req.body;

  const insertQuery = `
  INSERT  INTO  noticeComments
  (
    content,
    NoticeId,
    UserId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${content}",
    ${noticeId},
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글을 작성할 수 없습니다.");
  }
});

router.post("/comment/update", isLoggedIn, async (req, res, next) => {
  const { id, content } = req.body;

  const selectQuery = `
  SELECT  UserId
    FROM  noticeComments
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  noticeComments
     SET  content = "${content}",
          updatedAt = NOW()
   WHERE  id = ${id}

  `;

  try {
    const selectResult = await models.sequelize.query(selectQuery);

    if (selectResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 댓글 정보입니다.");
    }

    if (selectResult[0][0].UserId !== req.user.id) {
      return res.status(401).send("자신의 댓글만 수정할 수 있습니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글을 수정할 수 없습니다.");
  }
});

router.post("/comment/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT  UserId
    FROM  noticeComments
   WHERE  id = ${id}
  `;

  const deleteQuery = `
  UPDATE  noticeComments
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}

  `;

  try {
    const selectResult = await models.sequelize.query(selectQuery);

    if (selectResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 댓글 정보입니다.");
    }

    if (selectResult[0][0].UserId !== req.user.id) {
      return res.status(401).send("자신의 댓글만 삭제할 수 있습니다.");
    }

    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글을 삭제할 수 없습니다.");
  }
});

router.post("/comment/admin/delete", isAdminCheck, async (req, res, next) => {
  const { id, content } = req.body;

  const findQuery = `
  SELECT  type
    FROM  notices
   WHERE  id = ${id}
     AND  isDelete = 0
  `;

  const deleteQuery = `
  UPDATE  noticeComments
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 댓글입니다.");
    }

    await models.sequelize.query(deleteQuery);

    const insertQuery2 = `
    INSERT INTO noticeHistory
    (
      content,
      title,
      type,
      updator,
      createdAt,
      updatedAt
    )
    VALUES 
    (
      "댓글 삭제",
      "${content}",
      "${findResult[0][0].type}",
      ${req.user.id},
      now(),
      now()
    )
    `;

    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("댓글을 삭제할 수 없습니다.");
  }
});

module.exports = router;

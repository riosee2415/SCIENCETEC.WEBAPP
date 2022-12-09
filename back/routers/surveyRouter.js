const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

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

router.post("/file", upload.single("file"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

router.post("/list", async (req, res, next) => {
  const { type } = req.body;

  const _type = parseInt(type) || false;

  const surveyQuery = `
    SELECT  id,
            type,
            CASE
                WHEN    type = 1 THEN "사업수행 현황조사"
                WHEN    type = 2 THEN "사업 수요조사"
                WHEN    type = 3 THEN "기술매칭서비스 신청"
            END                       AS viewType
      FROM  survey
     WHERE  1 = 1
            ${_type ? `AND type = ${_type}` : ``}
     ORDER  BY id ASC
    `;

  const questionQuery = `
    SELECT    ROW_NUMBER()    OVER(ORDER  BY A.sort)    AS num,
              A.id,
              A.value,
              A.sort,
              A.isTitle,
              A.isOverlap,
              A.SurveyId,
              B.username                                AS updator,
              A.createdAt,
              A.updatedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
              C.type
      FROM    surveyQuestion      A
     INNER
      JOIN    users               B
        ON    A.updator = B.id
     INNER
      JOIN    survey              C
        ON    A.SurveyId = C.id
     WHERE    A.isDelete = 0
              ${_type ? `AND C.type = ${_type}` : ``}
     ORDER    BY num ASC
    `;

  const innerQuestionQuery = `
    SELECT  ROW_NUMBER()    OVER(ORDER  BY A.sort)    AS num,
            A.id,
            A.innerType,
            A.sort,
            A.questionValue,
            A.placeholderValue,
            A.SurveyQuestionId,
            B.username                                AS updator,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
            C.SurveyId,
            D.type
      FROM  surveyInnerQuestion     A
     INNER
      JOIN  users                   B
        ON  A.updator = B.id
     INNER
      JOIN  surveyQuestion          C
        ON  A.SurveyQuestionId = C.id
     INNER
      JOIN  survey        D
        ON  C.SurveyId = D.id
     WHERE  A.isDelete = 0
            ${_type ? `AND D.type = ${_type}` : ``}
     ORDER  BY num ASC
    `;

  try {
    const survey = await models.sequelize.query(surveyQuery);
    const question = await models.sequelize.query(questionQuery);
    const innerQuestion = await models.sequelize.query(innerQuestionQuery);

    return res.status(200).json({
      survey: survey[0],
      question: question[0],
      innerQuestion: innerQuestion[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("질문을 불러올 수 없습니다.");
  }
});

router.post("/question/list", async (req, res, next) => {
  const { surveyId } = req.body;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.sort)    AS num,
            A.id,
            A.value,
            A.sort,
            A.isTitle,
            A.isOverlap,
            A.SurveyId,
            B.username                                AS updator,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM    surveyQuestion      A
   INNER
    JOIN    users               B
      ON    A.updator = B.id
   INNER
    JOIN    survey              C
      ON    A.SurveyId = C.id
   WHERE    A.SurveyId = ${surveyId}
     AND    A.isDelete = 0
   ORDER    BY num ASC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("질문 목록을 불러올 수 없습니다.");
  }
});

router.post("/question/create", isAdminCheck, async (req, res, next) => {
  const { value, sort, surveyId, isOverlap, isTitle } = req.body;

  const insertQuery = `
  INSERT    INTO    surveyQuestion
  (
    value,
    sort,
    SurveyId,
    isTitle,
    isOverlap,
    createdAt,
    updatedAt,
    updator
  )
  VALUES
  (
    "${value}",
    ${sort},
    ${surveyId},
    ${isTitle},
    ${isOverlap},
    NOW(),
    NOW(),
    ${req.user.id}
  )
  `;

  const historyInsertQuery = `
  INSERT    INTO    surveyHistory
  (
    content,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "질문 데이터 생성",
    "${value}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("질문을 생성할 수 없습니다.");
  }
});

router.post("/question/update", isAdminCheck, async (req, res, next) => {
  const { id, value, sort, isOverlap, isTitle } = req.body;

  const updateQuery = `
  UPDATE    surveyQuestion
     SET    value = "${value}",
            sort = ${sort},
            isOverlap = ${isOverlap},
            isTitle = ${isTitle},
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
  INSERT    INTO    surveyHistory
  (
    content,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "질문 데이터 수정",
    "${value}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("질문을 수정할 수 없습니다.");
  }
});

router.post("/question/delete", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const deleteQuery = `
  UPDATE    surveyQuestion
     SET    isDelete = 1,
            deletedAt = NOW()
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
  INSERT    INTO    surveyHistory
  (
    content,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "질문 데이터 삭제",
    "${value}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("질문을 삭제할 수 없습니다.");
  }
});

router.post("/inner/list", async (req, res, next) => {
  const { surveyQuestionId } = req.body;

  const selectQuery = `
  SELECT  ROW_NUMBER()    OVER(ORDER  BY A.sort)    AS num,
          A.id,
          A.innerType,
          A.sort,
          A.questionValue,
          A.placeholderValue,
          A.SurveyQuestionId,
          B.username                                AS updator,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM  surveyInnerQuestion     A
   INNER
    JOIN  users                   B
      ON  A.updator = B.id
   WHERE  A.SurveyQuestionId = ${surveyQuestionId}
     AND  A.isDelete = 0
   ORDER  BY num ASC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/inner/create", async (req, res, next) => {
  const { surveyQuestionId, innerType, sort, questionValue, placeholderValue } =
    req.body;

  const insertQuery = `
  INSERT    INTO    surveyInnerQuestion
  (
    innerType,
    sort,
    questionValue,
    placeholderValue,
    SurveyQuestionId,
    createdAt,
    updatedAt,
    updator
  )
  VALUES
  (
    ${innerType},
    ${sort},
    ${questionValue ? `"${questionValue}"` : null},
    ${placeholderValue ? `"${placeholderValue}"` : null},
    ${surveyQuestionId},
    NOW(),
    NOW(),
    ${req.user.id}
  )
  `;

  const historyInsertQuery = `
  INSERT    INTO    surveyHistory
  (
    content,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "질문 유형 데이터 생성",
    ${questionValue ? `"${questionValue}"` : `"입력폼"`},
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 생성 수 없습니다.");
  }
});

router.post("/inner/update", async (req, res, next) => {
  const { id, innerType, sort, questionValue, placeholderValue } = req.body;

  const updateQuery = `
  UPDATE  surveyInnerQuestion
     SET  innerType = ${innerType},
          sort = ${sort},
          questionValue = ${questionValue ? `"${questionValue}"` : null},
          placeholderValue = ${
            placeholderValue ? `"${placeholderValue}"` : null
          },
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT    INTO    surveyHistory
  (
    content,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "질문 유형 데이터 수정",
    ${questionValue ? `"${questionValue}"` : `"입력폼"`},
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 수정할 수 없습니다.");
  }
});

router.post("/inner/delete", async (req, res, next) => {
  const { id, questionValue } = req.body;

  const deleteQuery = `
  UPDATE  surveyInnerQuestion
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT    INTO    surveyHistory
  (
    content,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "질문 유형 데이터 삭제",
    "${questionValue}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 삭제할 수 없습니다.");
  }
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

router.post("/user/list", isAdminCheck, async (req, res, next) => {
  const { userId, type, isCompleted } = req.body;

  const _userId = parseInt(userId) || false;
  const _isCompleted = parseInt(isCompleted) || 3;
  const _type = parseInt(type) || 4;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
            A.id,
            A.isCompleted,
            A.completedAt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
            A.UserId,
            A.SurveyId,
            B.username,
            C.type,
            CASE
                WHEN  C.type = 1 THEN "사업수행 현황조사"
                WHEN  C.type = 2 THEN "사업 수요조사"
                WHEN  C.type = 3 THEN "기술매칭서비스 신청"
            END                                              AS viewSurveyType
    FROM    userSurvey      A
    LEFT
   OUTER
    JOIN    users           B
      ON    A.UserId = B.id
   INNER
    JOIN    survey          C
      ON    A.SurveyId = C.id
   WHERE    1 = 1
            ${_userId ? `AND A.UserId = ${_userId}` : ``}
            ${
              _isCompleted === 1
                ? `AND A.isCompleted = 0`
                : _isCompleted === 2
                ? `AND A.isCompleted = 1`
                : _isCompleted === 3
                ? ``
                : ``
            }
            ${
              _type === 1
                ? `AND C.type = 1`
                : _type === 2
                ? `AND C.type = 2`
                : _type === 3
                ? `AND C.type = 3`
                : _type === 4
                ? ``
                : ``
            }
   ORDER    BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/user/detail", async (req, res, next) => {
  const { id } = req.body;

  const detailQuery = `
  SELECT    A.id,
            A.isCompleted,
            A.completedAt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
            A.UserId,
            A.SurveyId,
            B.username,
            C.type,
            CASE
                WHEN  C.type = 1 THEN "사업수행 현황조사"
                WHEN  C.type = 2 THEN "사업 수요조사"
                WHEN  C.type = 3 THEN "기술매칭서비스 신청"
            END                                              AS viewSurveyType
    FROM    userSurvey      A
    LFET
   OUTER
    JOIN    users           B
      ON    A.UserId = B.id
   INNER
    JOIN    survey          C
      ON    A.SurveyId = C.id
   WHERE    1 = 1
     AND    A.id = ${id}
  `;

  const questionQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY sort) AS num,
          id,
          questionName,
          content,
          sort,
          file,
          createdAt,
          updatedAt,
          UserSurveyId
    FROM  userSurveyQuestion
   WHERE  UserSurveyId = ${id}
   ORDER  BY num ASC
  `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 데이터입니다.");
    }

    const questionList = await models.sequelize.query(questionQuery);

    return res
      .status(200)
      .json({ detailData: detailData[0][0], questionList: questionList[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/user/create", async (req, res, next) => {
  const { surveyId, questionValues } = req.body;

  if (!Array.isArray(questionValues)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const insertQuery = `
INSERT    INTO  userSurvey
(
    UserId,
    SurveyId,
    createdAt,
    updatedAt
)
VALUES
(
    ${req.user ? req.user.id : null},
    ${surveyId},
    NOW(),
    NOW()
)
  `;

  try {
    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      questionValues.map(async (data) => {
        const quetsionInsertQuery = `
            INSERT  INTO    userSurveyQuestion
            (
                questionName,
                content,
                sort,
                file,
                UserSurveyId,
                createdAt,
                updatedAt
            )
            VALUES
            (
                "${data.questionName}",
                "${data.content}",
                ${data.sort},     
                ${data.file ? `"${data.file}"` : null},     
                ${insertResult[0].insertId},
                NOW(),
                NOW()    
            )
            `;

        await models.sequelize.query(quetsionInsertQuery);
      })
    );

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("설문조사를 진행할 수 없습니다.");
  }
});

router.post("/user/update", isAdminCheck, async (req, res, next) => {
  const { id, username } = req.body;

  const updateQuery = `
  UPDATE  userSurvey
     SET  isCompleted = 1,
          completedAt = NOW()
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT    INTO    surveyHistory
  (
    content,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "설문조사 확인처리",
    "${username}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("설문조사를 확인처리할 수 없습니다.");
  }
});

//////////////////////////////////////////////////////////////////////////////////////÷
//////////////////////////////////////////////////////////////////////////////////////÷
//////////////////////////////////////////////////////////////////////////////////////÷

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
      SELECT 	A.id,
              A.content,
              A.title,
              B.username,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
        FROM 	surveyHistory	A
       INNER
        JOIN	users 			B
          ON	A.updator = B.id
       WHERE  1 = 1
              ${
                _datePick
                  ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
                  : ""
              }
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

module.exports = router;

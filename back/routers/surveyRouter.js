const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const surveyQuery = `
    SELECT  id,
            type,
            CASE
                WHEN    type = 1 THEN "사업수행 현황조사"
                WHEN    type = 2 THEN "사업 수요조사"
                WHEN    type = 3 THEN "기술매칭서비스 신청"
            END                       AS viewType
      FROM  survey
     ORDER  BY id ASC
    `;

  const questionQuery = `
    SELECT    ROW_NUMBER()    OVER(ORDER  BY A.sort)    AS num,
              A.id,
              A.value,
              A.sort,
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
     WHERE    A.isDelete = 0
     ORDER    BY num ASC
    `;

  const innerQuestionQuery = `
    SELECT  ROW_NUMBER()    OVER(ORDER  BY A.sort)    AS num,
            A.id,
            A.innerType,
            A.sort,
            A.questionValue,
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
     WHERE  A.isDelete = 0
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
  const { value, sort, surveyId } = req.body;

  const insertQuery = `
  INSERT    INTO    surveyQuestion
  (
    value,
    sort,
    SurveyId,
    createdAt,
    updatedAt,
    updator
  )
  VALUES
  (
    "${value}",
    ${sort},
    ${surveyId},
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
  const { id, value, sort } = req.body;

  const updateQuery = `
  UPDATE    surveyQuestion
     SET    value = "${value}",
            sort = ${sort},
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
  const { surveyQuestionId, innerType, sort, questionValue } = req.body;

  const insertQuery = `
  INSERT    INTO    surveyInnerQuestion
  (
    innerType,
    sort,
    questionValue,
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
  const { id, innerType, sort, questionValue } = req.body;

  const updateQuery = `
  UPDATE  surveyInnerQuestion
     SET  innerType = ${innerType},
          sort = ${sort},
          questionValue = ${questionValue ? `"${questionValue}"` : null},
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

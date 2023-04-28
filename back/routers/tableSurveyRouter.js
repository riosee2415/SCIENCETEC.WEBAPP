const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 테이블형 수요조사 설문 리스트
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/28
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)       AS num,
            A.id,
            A.combiName,
            A.businessType,
            A.subjectName,
            A.businessRepName,
            A.estimateDate,
            A.workRepName,
            A.corporationCnt,
            A.personalCnt,
            A.businessPriceLastYear,
            A.businessPriceThisYear,
            A.plan,
            A.completePercentage,
            A.pExpense1,
            A.pExpense2,
            A.pFacility1,
            A.pFacility2,
            A.pMaterial1,
            A.pMaterial2,
            A.pResearch1,
            A.pResearch2,
            A.pIndirect1,
            A.pIndirect2,
            A.range1,
            A.range2,
            A.range3,
            A.range4,
            A.range5,
            A.range6,
            A.range7,
            A.range8,
            A.range9,
            A.range10,
            A.range11,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt,
            A.UserId,
            B.username,
            B.userId                                            AS userLoginId
    FROM    tableSurvey         A
   INNER
    JOIN    users               B
      ON    A.UserId = B.id
   ORDER    BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("테이블형 사업수행 현황조사 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 테이블형 수요조사 설문 작성 (사업수헹 현황조사)
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/28
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    combiName,
    businessType,
    subjectName,
    businessRepName,
    estimateDate,
    workRepName,
    corporationCnt,
    personalCnt,
    businessPriceLastYear,
    businessPriceThisYear,
    plan,
    completePercentage,
    pExpense1,
    pExpense2,
    pFacility1,
    pFacility2,
    pMaterial1,
    pMaterial2,
    pResearch1,
    pResearch2,
    pIndirect1,
    pIndirect2,
    range1,
    range2,
    range3,
    range4,
    range5,
    range6,
    range7,
    range8,
    range9,
    range10,
    range11,
  } = req.body;

  const insertQuery = `
  INSERT    INTO    tableSurvey
  (
    combiName,
    businessType,
    subjectName,
    businessRepName,
    estimateDate,
    workRepName,
    corporationCnt,
    personalCnt,
    businessPriceLastYear,
    businessPriceThisYear,
    plan,
    completePercentage,
    pExpense1,
    pExpense2,
    pFacility1,
    pFacility2,
    pMaterial1,
    pMaterial2,
    pResearch1,
    pResearch2,
    pIndirect1,
    pIndirect2,
    range1,
    range2,
    range3,
    range4,
    range5,
    range6,
    range7,
    range8,
    range9,
    range10,
    range11,
    createdAt,
    updatedAt,
    UserId
  )
  VALUES
  (
    "${combiName}",
    "${businessType}",
    "${subjectName}",
    "${businessRepName}",
    "${estimateDate}",
    "${workRepName}",
    ${corporationCnt},
    ${personalCnt},
    ${businessPriceLastYear},
    ${businessPriceThisYear},
    "${plan}",
    "${completePercentage}",
    ${pExpense1},
    ${pExpense2},
    ${pFacility1},
    ${pFacility2},
    ${pMaterial1},
    ${pMaterial2},
    ${pResearch1},
    ${pResearch2},
    ${pIndirect1},
    ${pIndirect2},
    ${range1},
    ${range2},
    ${range3},
    ${range4},
    ${range5},
    ${range6},
    ${range7},
    ${range8},
    ${range9},
    ${range10},
    ${range11},
    NOW(),
    NOW(),
    ${req.user.id}
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("사업수행 현황조사를 작성할 수 없습니다. ");
  }
});

module.exports = router;

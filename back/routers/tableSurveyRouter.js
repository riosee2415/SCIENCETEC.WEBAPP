const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 테이블형 수요조사 설문 리스트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/28
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY createdAt)       AS num,
            id,
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
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt
    FROM    tableSurvey
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
router.post("/create", async (req, res, next) => {
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
    updatedAt
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
    ${plan},
    ${completePercentage},
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
    NOW()
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

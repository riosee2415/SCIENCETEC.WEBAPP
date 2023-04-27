const express = require("express");
const models = require("../models");
const sendSecretMail = require("../utils/mailSender");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 발송 이력 리스트
 * PARAMETERS : searchDate, searchTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/26
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchDate, searchTitle } = req.body;

  const _searchDate = searchDate ? searchDate : ``;
  const _searchTitle = searchTitle ? searchTitle : ``;

  const selectQuery = `
    SELECT  ROW_NUMBER()    OVER(ORDER  BY A.createdAt)          AS num,
            A.id,
            A.title,
            A.content,
            A.createdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H시 %i분")    AS sendTime,
            B.username                                           AS updator
      FROM  mailSendHistory         A
      LEFT
     OUTER
      JOIN  users                   B
        ON  A.updator = B.id
     WHERE  1 = 1
       AND  A.title LIKE "%${_searchTitle}%"
            ${
              _searchDate !== ``
                ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${_searchDate}", "%Y%m%d")`
                : ""
            }
     ORDER  BY num DESC
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("발송 이력 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 메일 발송하기
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/26
 */
router.post("/sendMail", isAdminCheck, async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(401).send("메일을 발송할 수 없습니다.");
  }
});

module.exports = router;

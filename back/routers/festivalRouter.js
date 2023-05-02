const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 행사 리스트 (사용자)
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/25
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
      SELECT  ROW_NUMBER()    OVER(ORDER  BY A.createdAt)             AS num,
              A.id,
              A.festivalName,
              A.festivalStartDate,
              A.festivalEndDate,
              DATE_FORMAT(A.festivalStartDate, "%Y년 %m월 %d일")        AS viewFestivalStartDate,
              DATE_FORMAT(A.festivalEndDate, "%Y년 %m월 %d일")          AS viewFestivalEndDate,
              CONCAT(DATE_FORMAT(A.festivalStartDate, "%Y.%m.%d"), " ~ ", DATE_FORMAT(A.festivalEndDate, "%Y.%m.%d"))     AS viewConcatDate,
              A.festivalLocation,
              A.schedule,
              A.onOff,
              A.updator,
              A.createdAt,
              A.updatedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")                AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")                AS viewUpdatedAt
        FROM  festival        A
        LEFT
       OUTER
        JOIN  users           B
          ON  A.updator = B.id
       WHERE  A.isDelete = 0
         AND  A.onOff = 1
       ORDER  BY num DESC
      `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 리스트 (관리자)
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/25
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
    SELECT  ROW_NUMBER()    OVER(ORDER  BY A.createdAt)             AS num,
            A.id,
            A.festivalName,
            A.festivalStartDate,
            A.festivalEndDate,
            DATE_FORMAT(A.festivalStartDate, "%Y년 %m월 %d일")        AS viewFestivalStartDate,
            DATE_FORMAT(A.festivalEndDate, "%Y년 %m월 %d일")          AS viewFestivalEndDate,
            CONCAT(DATE_FORMAT(A.festivalStartDate, "%Y.%m.%d"), " ~ ", DATE_FORMAT(A.festivalEndDate, "%Y.%m.%d"))     AS viewConcatDate,
            A.festivalLocation,
            A.schedule,
            A.onOff,
            A.updator,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")                AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")                AS viewUpdatedAt
      FROM  festival        A
      LEFT
     OUTER
      JOIN  users           B
        ON  A.updator = B.id
     WHERE  A.isDelete = 0
     ORDER  BY num DESC
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 생성
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/25
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO    festival
    (
        festivalName,
        festivalStartDate,
        festivalEndDate,
        festivalLocation,
        schedule,
        onOff,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "임시 행사",
        NOW(),
        DATE_ADD(NOW(), INTERVAL +1 MONTH),
        "임시 장소",
        "오전",
        0,
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  const insertHistoryQuery = `
    INSERT  INTO    festivalHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 생성",
        "임시 행사",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 일정을 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 수정
 * PARAMETERS : id,
                festivalName,
                festivalStartDate,
                festivalEndDate,
                festivalLocation,
                schedule,
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/25
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const {
    id,
    festivalName,
    festivalStartDate,
    festivalEndDate,
    festivalLocation,
    schedule,
    onOff,
  } = req.body;

  const updateQuery = `
    UPDATE  festival
       SET  festivalName = "${festivalName}",
            festivalStartDate = "${festivalStartDate}",
            festivalEndDate = "${festivalEndDate}",
            festivalLocation = "${festivalLocation}",
            onOff = ${onOff},
            schedule = "${schedule}",
            updator = ${req.user.id},
            updatedAt = NOW()
     WHERE  id = ${id}
    `;

  const insertHistoryQuery = `
    INSERT  INTO    festivalHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 수정",
        "${festivalName}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 일정을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 화면 노출 on/off
 * PARAMETERS : id,
                festivalName,
                onOff
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/26
 */
router.post("/onOff", isAdminCheck, async (req, res, next) => {
  const { id, festivalName, onOff } = req.body;

  const updateQuery = `
  UPDATE    festival
     SET    onOff = ${onOff},
            updator = ${req.user.id},
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
    INSERT  INTO    festivalHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "노출여부 수정",
        "${festivalName}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 노출 여부 on/off를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 삭제
 * PARAMETERS : id, festivalName
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/25
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, festivalName } = req.body;

  const deleteQuery = `
    UPDATE  festival
       SET  isDelete = 1,
            deletedAt = NOW(),
            updatedAt = NOW(),
            updator = ${req.user.id}
     WHERE  id = ${id}
    `;

  const insertHistoryQuery = `
    INSERT  INTO    festivalHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 삭제",
        "${festivalName}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 일정을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 참여 리스트
 * PARAMETERS : FestivalId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/26
 */
router.post("/ticket/list", isAdminCheck, async (req, res, next) => {
  const { FestivalId } = req.body;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)                                                                 AS num,
            B.id                                                                                                        AS festivalId,
            B.festivalName,
            B.festivalStartDate,
            B.festivalEndDate,
            B.festivalLocation,
            B.schedule,
            DATE_FORMAT(B.festivalStartDate, "%Y년 %m월 %d일")                                                            AS viewFestivalStartDate,
            DATE_FORMAT(B.festivalEndDate, "%Y년 %m월 %d일")                                                              AS viewFestivalEndDate,
            CONCAT(DATE_FORMAT(B.festivalStartDate, "%Y.%m.%d"), " ~ ", DATE_FORMAT(B.festivalEndDate, "%Y.%m.%d"))     AS viewConcatDate,
            A.participantName,
            A.belong,
            A.jobPosition,
            A.mobile,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")                                                                    AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")                                                                    AS viewUpdatedAt,
            C.type                                                                                                      AS userType,
            CASE
                WHEN	type = 1 THEN "개인"
                WHEN	type = 2 THEN "조합"
                WHEN	type = 3 THEN "전문가"
                WHEN	type = 4 THEN "기업"
            END									        		                                                        AS viewUserType,
            C.combiName,
            C.combiHomepage,
            C.combiEstimateDate,
            DATE_FORMAT(C.combiEstimateDate, "%Y년 %m월 %d일")		                                                      AS viewEstimateDate,
            C.combiArea,
            C.corporationCnt,
            C.personalCnt,
            C.repreName,
            C.postCode,
            C.address,
            C.detailAddress,
            C.mobile                                                                                                  AS userMobile,
            C.email,
            C.username,
            C.importantBusiness1,
            C.importantBusiness2,
            C.importantBusiness3,
            C.importantBusinessCapital,
            CONCAT(FORMAT(C.importantBusinessCapital, 0), "원")	                                                         AS viewBusinessCapital,
            C.importantBusinessPrice,
            CONCAT(FORMAT(C.importantBusinessPrice, 0), "원")		                                                     AS viewBusinessPrice
    FROM    festivalTicket              A
   INNER
    JOIN    festival                    B
      ON    A.FestivalId = B.id
   INNER
    JOIN    users                       C
      ON    A.UserId = C.id
   WHERE    A.FestivalId = ${FestivalId}
     AND    B.isDelete = 0
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 참여자 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 참여 테이블 작성
 * PARAMETERS : FestivalId, participantName, belong, jobPosition, mobile
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/26
 */
router.post("/ticket/create", isLoggedIn, async (req, res, next) => {
  const { FestivalId, participantName, belong, jobPosition, mobile } = req.body;

  const findFestivalQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY createdAt)                                                                 AS num,
            id                                                                                                        AS festivalId,
            festivalName,
            festivalStartDate,
            festivalEndDate,
            festivalLocation,
            schedule,
            DATE_FORMAT(festivalStartDate, "%Y년 %m월 %d일")                                                            AS viewFestivalStartDate,
            DATE_FORMAT(festivalEndDate, "%Y년 %m월 %d일")                                                              AS viewFestivalEndDate,
            CASE
                    WHEN    DATE_FORMAT(festivalEndDate, "%Y-%m-%d") >= DATE_FORMAT(NOW(), "%Y-%m-%d")        THEN  0
                    WHEN    DATE_FORMAT(festivalEndDate, "%Y-%m-%d") < DATE_FORMAT(NOW(), "%Y-%m-%d")         THEN  1
            END                                                                                                       AS isEnd 
    FROM    festival
   WHERE    id = ${FestivalId}
  `;

  const findQuery = `
  SELECT    id
    FROM    festivalTicket
   WHERE    FestivalId = ${FestivalId}
     AND    UserId = ${req.user.id}
  `;

  const insertQuery = `
  INSERT    INTO    festivalTicket
  (
    participantName,
    belong,
    jobPosition,
    mobile,
    createdAt,
    updatedAt,
    UserId,
    FestivalId
  )
  VALUES
  (
    "${participantName}",
    "${belong}",
    "${jobPosition}",
    "${mobile}",
    NOW(),
    NOW(),
    ${req.user.id},
    ${FestivalId}
  )
  `;

  try {
    const findFestival = await models.sequelize.query(findFestivalQuery);

    if (findFestival[0].length === 0) {
      return res.status(401).send("존재하지 않는 행사 정보입니다.");
    }

    if (findFestival[0][0].isEnd) {
      return res.status(401).send("기간이 지난 행사에 참여할 수 없습니다.");
    }

    const findTicketResult = await models.sequelize.query(findQuery);

    if (findTicketResult[0].length !== 0) {
      return res.status(401).send("이미 해당 행사에 참여한 이력이 존재합니다.");
    }

    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("행사 참여 테이블을 작성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 행사 관리 이력
 * PARAMETERS : datePick
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/25
 */
router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
        SELECT 	A.id,
                A.title,
                A.content,
                B.username,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
          FROM 	festivalHistory		    A
         INNER
          JOIN	users 			        B
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

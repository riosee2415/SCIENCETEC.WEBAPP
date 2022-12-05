const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");

const router = express.Router();

router.post("/admin/main", isAdminCheck, async (req, res, next) => {
  // 오늘 가입한 개인회원
  const findUserQuery1 = `
  SELECT  COUNT(id)         AS cnt
    FROM  users
   WHERE  DATE_FORMAT(createdAt, "%Y%m%d") = DATE_FORMAT(NOW(), "%Y%m%d")
     AND  type = 1
  `;

  // 오늘 가입한 조합장회원
  const findUserQuery2 = `
  SELECT  COUNT(id)         AS cnt
    FROM  users
   WHERE  DATE_FORMAT(createdAt, "%Y%m%d") = DATE_FORMAT(NOW(), "%Y%m%d")
     AND  type = 2
  `;

  // 오늘 접속한 사용자
  const findAcceptQuery = `
  SELECT  COUNT(id)         AS cnt
    FROM  acceptRecords
   WHERE  DATE_FORMAT(createdAt, "%Y%m%d") = DATE_FORMAT(NOW(), "%Y%m%d")
  `;

  // 오늘 등록된 현황조사
  const findSurveyQuery = `
  SELECT  COUNT(id)         AS cnt
    FROM  userSurvey
   WHERE  DATE_FORMAT(createdAt, "%Y%m%d") = DATE_FORMAT(NOW(), "%Y%m%d")
  `;

  try {
    const personalUserResult = await models.sequelize.query(findUserQuery1);
    const cooperUserResult = await models.sequelize.query(findUserQuery2);
    const acceptResult = await models.sequelize.query(findAcceptQuery);
    const surveyResult = await models.sequelize.query(findSurveyQuery);

    return res.status(200).json({
      personalUserResult: personalUserResult[0][0],
      cooperUserResult: cooperUserResult[0][0],
      acceptResult: acceptResult[0][0],
      surveyResult: surveyResult[0][0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchData, searchLevel, searchExit } = req.body;

  const _searchData = searchData ? searchData : ``;

  const _searchLevel = parseInt(searchLevel) === 0 ? 0 : parseInt(searchLevel);

  const _searchExit = searchExit ? searchExit : false;

  const selectQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)			AS num,
        id,
        type,
        CASE
            WHEN	type = 1 THEN "개인"
            WHEN	type = 2 THEN "조합장"
        END									        		AS viewType,
        userId,
        combiName,
        combiHomepage,
        combiEstimateDate,
        DATE_FORMAT(combiEstimateDate, "%Y년 %m월 %d일")		AS viewEstimateDate,
        combiArea,
        corporationCnt,
        personalCnt,
        repreName,
        postCode,
        address,
        detailAddress,
        mobile,
        email,
        username,
        importantBusiness1,
        importantBusiness2,
        importantBusiness3,
        importantBusinessCapital,
        CONCAT(FORMAT(importantBusinessCapital, 0), "원")	AS viewBusinessCapital,
        importantBusinessPrice,
        CONCAT(FORMAT(importantBusinessPrice, 0), "원")		AS viewBusinessPrice,
        level,
        CASE
              WHEN	level = 1	THEN "일반회원"
              WHEN	level = 2	THEN "비어있음"
              WHEN	level = 3	THEN "운영자"
              WHEN	level = 4	THEN "최고관리자"
              WHEN	level = 5	THEN "개발사"
          END											        AS viewLevel,
          kakaoId,
          isKakao,
          isPremium,
          terms,
          isExit,
          exitReason,
          exitedAt,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt
    FROM	users
   WHERE	CONCAT(username, email) LIKE '%${_searchData}%'
          ${
            _searchLevel === parseInt(0)
              ? ``
              : _searchLevel === 1
              ? `AND level = 1`
              : _searchLevel === 3
              ? `AND level = 3`
              : _searchLevel === 4
              ? `AND level = 4`
              : _searchLevel === 5
              ? `AND level = 5`
              : ``
          } 
          AND	isExit = ${_searchExit}
   ORDER	BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

router.post("/status/list", async (req, res, next) => {
  const { searchCombiName } = req.body;

  const _searchCombiName = searchCombiName ? searchCombiName : ``;

  const selectQuery = `
    SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt DESC)			AS num,
            id,
            type,
            CASE
                WHEN	type = 1 THEN "개인"
                WHEN	type = 2 THEN "조합장"
            END									        		AS viewType,
            userId,
            combiName,
            combiHomepage,
            combiEstimateDate,
            DATE_FORMAT(combiEstimateDate, "%Y년 %m월 %d일")		AS viewEstimateDate,
            DATE_FORMAT(combiEstimateDate, "%Y년")		AS viewEstimateYear,
            combiArea,
            corporationCnt,
            personalCnt,
            repreName,
            postCode,
            address,
            detailAddress,
            mobile,
            email,
            username,
            importantBusiness1,
            importantBusiness2,
            importantBusiness3,
            importantBusinessCapital,
            CONCAT(FORMAT(importantBusinessCapital, 0), "원")	AS viewBusinessCapital,
            importantBusinessPrice,
            CONCAT(FORMAT(importantBusinessPrice, 0), "원")		AS viewBusinessPrice,
            kakaoId,
            isKakao,
            isPremium,
            terms,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt
      FROM	users
     WHERE	type = 2
       AND  isExit = 0
       AND  combiName LIKE '%${_searchCombiName}%'
     ORDER	BY num ASC
    `;

  try {
    const userList = await models.sequelize.query(selectQuery);

    if (userList[0].length === 0) {
      return res.status(200).json([]);
    }

    let userIds = [];

    await Promise.all(
      userList[0].map((data) => {
        userIds.push(data.id);
      })
    );

    const combiTypeQuery = `
    SELECT  value,
            UserId
      FROM  userCombiTypes
     WHERE  UserId IN (${userIds})
    `;

    const businessTypeQuery = `
    SELECT  value,
            UserId
      FROM  userBusinessTypes
     WHERE  UserId IN (${userIds})
    `;

    const sectorQuery = `
    SELECT  value,
            UserId
      FROM  userSectors
     WHERE  UserId IN (${userIds})
    `;

    const combiTypeList = await models.sequelize.query(combiTypeQuery);
    const businessTypeList = await models.sequelize.query(businessTypeQuery);
    const sectorList = await models.sequelize.query(sectorQuery);

    return res.status(200).json({
      userList: userList[0], // 현황 리스트
      combiTypeList: combiTypeList[0].length !== 0 ? combiTypeList[0] : [], // 조합유형
      businessTypeList:
        businessTypeList[0].length !== 0 ? businessTypeList[0] : [], // 사업유형
      sectorList: sectorList[0].length !== 0 ? sectorList[0] : [], // 사업분야
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("현황 목록을 불러올 수 없습니다.");
  }
});

router.post("/detail", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const detailQuery = `
    SELECT	id,
            type,
            CASE
                WHEN	type = 1 THEN "개인"
                WHEN	type = 2 THEN "조합장"
            END									        		AS viewType,
            userId,
            combiName,
            combiHomepage,
            combiEstimateDate,
            DATE_FORMAT(combiEstimateDate, "%Y년 %m월 %d일")		AS viewEstimateDate,
            combiArea,
            corporationCnt,
            personalCnt,
            repreName,
            postCode,
            address,
            detailAddress,
            mobile,
            email,
            username,
            importantBusiness1,
            importantBusiness2,
            importantBusiness3,
            importantBusinessCapital,
            CONCAT(FORMAT(importantBusinessCapital, 0), "원")	AS viewBusinessCapital,
            importantBusinessPrice,
            CONCAT(FORMAT(importantBusinessPrice, 0), "원")		AS viewBusinessPrice,
            kakaoId,
            isKakao,
            isPremium,
            terms,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt
      FROM	users
     WHERE	isExit = 0
       AND  id = ${id}
    `;

  const combiTypeQuery = `
    SELECT  value,
            UserId
      FROM  userCombiTypes
     WHERE  UserId = ${id}
    `;

  const businessTypeQuery = `
    SELECT  value,
            UserId
      FROM  userBusinessTypes
     WHERE  UserId = ${id}
    `;

  const sectorQuery = `
    SELECT  value,
            UserId
      FROM  userSectors
     WHERE  UserId = ${id}
    `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const combiTypeList = await models.sequelize.query(combiTypeQuery);
    const businessTypeList = await models.sequelize.query(businessTypeQuery);
    const sectorList = await models.sequelize.query(sectorQuery);

    return res.status(200).json({
      detailData: detailData[0][0], // 사용자 정보
      combiTypeList: combiTypeList[0].length !== 0 ? combiTypeList[0] : [], // 조합유형
      businessTypeList:
        businessTypeList[0].length !== 0 ? businessTypeList[0] : [], // 사업유형
      sectorList: sectorList[0].length !== 0 ? sectorList[0] : [], // 사업분야
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("회원 정보를 조회할 수 없습니다.");
  }
});

// 권한메뉴 관리자 리스트
router.post("/adminList", async (req, res, next) => {
  const { username, type } = req.body;

  // Validate
  const _username = username ? username : "";

  const selectQuery = `
  SELECT	id,
          username,
          email,
          level,
          mobile,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일") AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") AS updatedAt,
          DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")  AS viewExitedAt,
          menuRight1,
          menuRight2,
          menuRight3,
          menuRight4,
          menuRight5,
          menuRight6,
          menuRight7,
          menuRight8,
          menuRight9,
          menuRight10,
          menuRight11,
          menuRight12
    FROM	users  
   WHERE	1 = 1
     AND  username LIKE "${_username}%"
     AND  level LIKE 5
   ORDER  BY createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    console.log(result[0]);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("관리자 정보를 불러올 수 없습니다.");
  }
});

// 관리자 메뉴 권한 제어
router.post("/update/menuRight", async (req, res, next) => {
  const { userId, type, status } = req.body;

  let inQuery = "";

  switch (parseInt(type)) {
    case 1:
      inQuery = `SET  menuRight1 =  ${status}`;
      break;

    case 2:
      inQuery = `SET  menuRight2 =  ${status}`;
      break;

    case 3:
      inQuery = `SET  menuRight3 =  ${status}`;
      break;

    case 4:
      inQuery = `SET  menuRight4 =  ${status}`;
      break;

    case 5:
      inQuery = `SET  menuRight5 =  ${status}`;
      break;

    case 6:
      inQuery = `SET  menuRight6 =  ${status}`;
      break;

    case 7:
      inQuery = `SET  menuRight7 =  ${status}`;
      break;

    case 8:
      inQuery = `SET  menuRight8 =  ${status}`;
      break;

    case 9:
      inQuery = `SET  menuRight9 =  ${status}`;
      break;

    case 10:
      inQuery = `SET  menuRight10 =  ${status}`;
      break;

    case 11:
      inQuery = `SET  menuRight11 =  ${status}`;
      break;

    case 12:
      inQuery = `SET  menuRight12 =  ${status}`;
      break;

    default:
      break;
  }

  const updateQuery = `
    UPDATE  users
       ${inQuery}
     WHERE  id = ${userId}
  `;

  const insertQuery2 = `
  INSERT INTO adminUserRightHistorys (returnId, memo, createdAt, updatedAt) VALUES 
  (
    "${userId}",
    "${
      type === 1
        ? `통계관리`
        : type === 2
        ? `기초정보관리`
        : type === 3
        ? `배너관리`
        : type === 4
        ? `게시판관리`
        : type === 5
        ? `회원관리`
        : type === 6
        ? `고객지원관리`
        : type === 7
        ? `기록관리`
        : type === 8
        ? `DIY관리`
        : type === 9
        ? `ERROR`
        : type === 10
        ? `ERROR`
        : type === 11
        ? `ERROR`
        : type === 12
        ? `ERROR`
        : `ERROR`
    } ${status === 1 ? `ON` : status === 0 ? `OFF` : `ERROR`}",
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("관리자 권한을 제어할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.value,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	userHistory		A
     INNER
      JOIN	users 			  B
        ON	A.updator = B.id
     WHERE  1=1
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

router.post(
  "/adminUserRight/history/list",
  isAdminCheck,
  async (req, res, next) => {
    const { datePick } = req.body;

    const _datePick = datePick ? datePick : null;

    const selectQuery = `
    SELECT 	A.id,
            A.returnId,
            A.memo,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	adminUserRightHistorys		A

     INNER
      JOIN	users 			B
        ON	A.returnId = B.id
     WHERE  1=1
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
  }
);

router.get("/signin", async (req, res, next) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password", "secret"],
        },
      });

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log(fullUserWithoutPassword);
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password", "secret"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password", "secret"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const {
    type,
    userId,
    password,
    combiName,
    combiHomepage,
    combiEstimateDate,
    combiArea,
    corporationCnt,
    personalCnt,
    repreName,
    postCode,
    address,
    detailAddress,
    mobile,
    email,
    username,
    importantBusiness1,
    importantBusiness2,
    importantBusiness3,
    importantBusinessCapital,
    importantBusinessPrice,
    kakaoId,
    isKakao,
    isPremium,
    terms,
    businessType,
    combiType,
    sector,
  } = req.body;

  if (!terms) {
    return res.status(401).send("이용약관에 동의해주세요.");
  }

  if (!Array.isArray(businessType)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(combiType)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(sector)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const findUserIdQuery = `
  SELECT  id
    FROM  users
   WHERE  userId = "${userId}"
  `;

  const findEmailQuery = `
  SELECT  id
    FROM  users
   WHERE  email = "${email}"
  `;

  try {
    const findUserId = await models.sequelize.query(findUserIdQuery);

    if (findUserId[0].length !== 0) {
      return res.status(401).send("이미 사용중인 아이디 입니다.");
    }

    const findEmail = await models.sequelize.query(findEmailQuery);

    if (findEmail[0].length !== 0) {
      return res.status(401).send("이미 사용중인 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const insertQuery = `
   INSERT INTO  users
   (
    type,
    userId,
    password,
    combiName,
    combiHomepage,
    combiEstimateDate,
    combiArea,
    corporationCnt,
    personalCnt,
    repreName,
    postCode,
    address,
    detailAddress,
    mobile,
    email,
    username,
    importantBusiness1,
    importantBusiness2,
    importantBusiness3,
    importantBusinessCapital,
    importantBusinessPrice,
    kakaoId,
    isKakao,
    isPremium,
    terms,
    createdAt,
    updatedAt
   )
   VALUES
   (
    ${type},
    "${userId}",
    "${hashedPassword}",
    ${combiName ? `"${combiName}"` : null},
    ${combiHomepage ? `"${combiHomepage}"` : null},
    ${combiEstimateDate ? `"${combiEstimateDate}"` : null},
    ${combiArea ? `"${combiArea}"` : null},
    ${corporationCnt ? `"${corporationCnt}"` : null},
    ${personalCnt ? `"${personalCnt}"` : null},
    ${repreName ? `"${repreName}"` : null},
    ${postCode ? `"${postCode}"` : null},
    ${address ? `"${address}"` : null},
    ${detailAddress ? `"${detailAddress}"` : null},
    "${mobile}",
    "${email}",
    ${username ? `"${username}"` : null},
    ${importantBusiness1 ? `"${importantBusiness1}"` : null},
    ${importantBusiness2 ? `"${importantBusiness2}"` : null},
    ${importantBusiness3 ? `"${importantBusiness3}"` : null},
    ${importantBusinessCapital ? `"${importantBusinessCapital}"` : null},
    ${importantBusinessPrice ? `"${importantBusinessPrice}"` : null},
    ${kakaoId ? `"${kakaoId}"` : null},
    ${isKakao},
    ${isPremium},
    ${terms},
    NOW(),
    NOW()
   )
   `;

    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      businessType.map(async (data) => {
        const insertQuery = `
        INSERT  INTO  userBusinessTypes
        (
          value,
          createdAt,
          updatedAt,
          UserId
        )
        VALUES
        (
          "${data}",
          NOW(),
          NOW(),
          ${insertResult[0]}
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    await Promise.all(
      combiType.map(async (data) => {
        const insertQuery = `
        INSERT  INTO  userCombiTypes
        (
          value,
          createdAt,
          updatedAt,
          UserId
        )
        VALUES
        (
          "${data}",
          NOW(),
          NOW(),
          ${insertResult[0]}
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    await Promise.all(
      sector.map(async (data) => {
        const insertQuery = `
        INSERT  INTO  userSectors
        (
          value,
          createdAt,
          updatedAt,
          UserId
        )
        VALUES
        (
          "${data}",
          NOW(),
          NOW(),
          ${insertResult[0]}
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/snsLogin", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (user) {
      if (err) {
        console.error(err);
        return next(err);
      }

      if (info) {
        console.log(`❌ LOGIN FAILED : ${info.reason}`);
        return res.status(401).send(info.reason);
      }

      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ["password", "secret"],
          },
        });

        return res.status(200).json(fullUserWithoutPassword);
      });
    } else {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }
  })(req, res, next);
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 불러올 수 없습니다.");
  }
});

router.post("/me/update", isLoggedIn, async (req, res, next) => {
  const { id, username, mobile } = req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    const updateUser = await User.update(
      { username, mobile },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

router.post("/findeUserId", async (req, res, next) => {
  const { username, email } = req.body;

  const findQuery = `
  SELECT  userId
    FROM  users
   WHERE  username = "${username}"
     AND  email = "${email}"
  `;

  try {
    const findUser = await models.sequelize.query(findQuery);

    if (findUser[0].length !== 0) {
      return res.status(200).json({ userId: findUser[0][0].userId });
    } else {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("이메일을 찾을 수 없습니다.");
  }
});

router.post("/modifypass", async (req, res, next) => {
  const { userId, username } = req.body;

  const findUserQuery = `
  SELECT  id,
          email
    FROM  users
   WHERE  userId = "${userId}"
     AND  username = "${username}"
  `;

  try {
    const findUserData = await models.sequelize.query(findUserQuery);

    if (findUserData[0].length === 0) {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }

    const UUID = generateUUID();

    const userUpdateQuery = `
    UPDATE  users
       SET  secret = "${UUID}"
     WHERE  userId = "${userId}"
    `;

    await models.sequelize.query(userUpdateQuery);

    await sendSecretMail(
      findUserData[0][0].email,
      `🔐 [보안 인증코드 입니다.] 과학기술연결 플랫폼 사회적 협동조합에서 비밀번호 변경을 위한 보안인증 코드를 발송했습니다.`,
      `
          <div>
            <h3>과학기술연결 플랫폼 사회적 협동조합/h3>
            <hr />
            <p>보안 인증코드를 발송해드립니다. 과학기술연결 플랫폼 사회적 협동조합홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
            <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

            <br /><hr />
            <article>
              발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
            </article>
          </div>
          `
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. [CODE097]");
  }
});

router.post("/checkSecret", async (req, res, next) => {
  const { secret } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  secret = "${secret}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("인증코드를 잘못 입력하셨습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/modifypass/update", async (req, res, next) => {
  const { userId, password } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  userId = "${userId}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("잠시 후 다시 시도하여 주십시오.");
    }

    const hashPassord = await bcrypt.hash(password, 12);

    const userUpdateQuery = `
    UPDATE  users
       SET  password = "${hashPassord}",
            updatedAt = now(),
            secret = NULL
     WHERE  userId = "${userId}"
    `;

    const updateResult = await models.sequelize.query(userUpdateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  const findUserQuery = `
  SELECT  level
    FROM  users
   WHERE  id = ${selectUserId}
  `;

  try {
    const userData = await models.sequelize.query(findUserQuery);

    if (userData[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const currentLevel = parseInt(userData[0][0].level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateQuery = `
    UPDATE  users
       SET  level = ${changeLevel},
            updatedAt = NOW()
     WHERE  id = ${selectUserId}
    `;

    const insertQuery = `
    INSERT  INTO  userHistory
    (
      value,
      content,
      updator,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "권한 수정",
      "${
        changeLevel === 1
          ? `일반회원`
          : changeLevel === 2
          ? `비어있음`
          : changeLevel === 3
          ? `운영자`
          : changeLevel === 4
          ? `최고관리자`
          : `일반회원`
      }",
      ${req.user.id},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.get(
  "/kakaoLogin",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/");
  }
);

router.get(
  "/kakao/oauth",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    return res.redirect("/");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  req.session.save(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.post("/exit", isLoggedIn, async (req, res, next) => {
  const { id, exitReason } = req.body;

  const updateQuery = `
      UPDATE users
         SET isExit = 1,
             exitReason = "${exitReason}",
             exitedAt = NOW()
       WHERE id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

module.exports = router;

const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
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

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/list", async (req, res, next) => {
  const { type, searchData } = req.body;

  const _type = parseInt(type) || 3;
  const _searchData = searchData ? searchData : ``;

  const selectQuery = `
SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt)		      AS	num,
        A.id,
        A.name,
        A.type,
        CASE
          WHEN	A.type = 1 THEN "기술융합협동조합"
          WHEN	A.type = 2 THEN "회원법인조합"
        END											                        AS viewType,
        A.imagePath,
        A.link,
        A.repreName,
        A.estimateDate,
        DATE_FORMAT(A.estimateDate, "%Y년 %m월 %d일")	    AS viewEstimateDate,
        A.empCnt,
        CONCAT(FORMAT(A.empCnt, 0), "명")			           AS viewEmpCnt,
        A.jobType,
        A.importantWork,
        B.username 									                    AS updator,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
  		  DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt
  FROM	shareProjects		A
 INNER
  JOIN	users				B
    ON	A.updator = B.id
 WHERE	A.isDelete = 0
        ${
          _searchData !== ``
            ? `
            AND (name RLIKE '^(ㄱ|ㄲ)' OR ( name >= '가' AND name < '나' ))
            AND (name RLIKE '^ㄴ' OR ( name >= '나' AND name < '다' ))
            AND (name RLIKE '^(ㄷ|ㄸ)' OR ( name >= '다' AND name < '라' ))
            AND (name RLIKE '^ㄹ' OR ( name >= '라' AND name < '마' ))
            AND (name RLIKE '^ㅁ' OR ( name >= '마' AND name < '바' ))
            AND (name RLIKE '^ㅂ' OR ( name >= '바' AND name < '사' ))
            AND (name RLIKE '^(ㅅ|ㅆ)' OR ( name >= '사' AND name < '아' ))
            AND (name RLIKE '^ㅇ' OR ( name >= '아' AND name < '자' ))
            AND (name RLIKE '^(ㅈ|ㅉ)' OR ( name >= '자' AND name < '차' ))
            AND (name RLIKE '^ㅊ' OR ( name >= '차' AND name < '카' ))
            AND (name RLIKE '^ㅋ' OR ( name >= '카' AND name < '타' ))
            AND (name RLIKE '^ㅌ' OR ( name >= '타' AND name < '파' ))
            AND (name RLIKE '^ㅍ' OR ( name >= '파' AND name < '하' ))
            AND (name RLIKE '^ㅎ' OR ( name >= '하'))
        `
            : ``
        }
        ${
          _type === 1
            ? `AND A.type = 1`
            : _type === 2
            ? `AND A.type = 2`
            : _type === 3
            ? ``
            : ``
        }
 ORDER	BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("공동 프로젝트 목록을 불러올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const { type } = req.body;

  const insertQuery = `
  INSERT    INTO    shareProjects
  (
    type,
    name,
    imagePath,
    link,
    repreName,
    estimateDate,
    empCnt,
    jobType,
    importantWork,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${type},
    "임시 조합명",
    "https://via.placeholder.com/500x300",
    "/",
    "임시 대표자명",
    NOW(),
    0,
    "임시 업종 내용",
    "임시 주업무 내용",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  const historyInsertQuery = `
  INSERT INTO shareProjectHistory
  (
    value,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 생성",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공동 프로젝트 정보를 생성할 수 없습니다.");
  }
});

router.post("/update", async (req, res, next) => {
  const {
    id,
    name,
    imagePath,
    link,
    repreName,
    estimateDate,
    empCnt,
    jobType,
    importantWork,
  } = req.body;

  const updateQuery = `
  UPDATE    shareProjects
     SET    imagePath = "${imagePath}",
            name = "${name}",
            link = "${link}",
            repreName = "${repreName}",
            estimateDate = "${estimateDate}",
            empCnt = ${empCnt},
            jobType = "${jobType}",
            importantWork = "${importantWork}",
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO shareProjectHistory
  (
    value,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 수정",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공동 프로젝트 정보를 수정할 수 없습니다.");
  }
});

router.post("/delete", async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
    UPDATE    shareProjects
       SET    isDelete = 1,
              deletedAt = NOW()
     WHERE    id = ${id}
    `;

  const historyInsertQuery = `
    INSERT INTO shareProjectHistory
    (
      value,
      updator,
      createdAt,
      updatedAt
    )
    VALUES 
    (
      "데이터 삭제",
      ${req.user.id},
      now(),
      now()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공동 프로젝트 정보를 삭제할 수 없습니다.");
  }
});

///////////////////////////////////////////////////////////////////////////
//////////////////////// - UNDER SHARE PROJECT - //////////////////////////
///////////////////////////////////////////////////////////////////////////

router.post("/under/list", async (req, res, next) => {
  const { shareProjectId } = req.body;

  const selectQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY A.createdAt)				AS num,
        A.id,
        A.name,
        A.imagePath,
        A.link,
        A.repreName,
        A.estimateDate,
        DATE_FORMAT(A.estimateDate, "%Y년 %m월 %d일")	    AS viewEstimateDate,
        A.empCnt,
        CONCAT(FORMAT(A.empCnt, 0), "명")			           AS viewEmpCnt,
        A.jobType,
        A.importantWork,
        B.username 									          	        AS updator,
        A.ShareProjectId,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
  		  DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt
  FROM	underShareProjects		A
 INNER
  JOIN	users					        B
    ON	A.updator = B.id
 WHERE	A.isDelete = 0
   AND  A.ShareProjectId = ${shareProjectId}
 ORDER	BY num DESC
`;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("해당 조합의 산하 조합 목록을 불러올 수 없습니다.");
  }
});

router.post("/under/create", isAdminCheck, async (req, res, next) => {
  const { shareProjectId } = req.body;

  const insertQuery = `
  INSERT    INTO    underShareProjects
  (
    name,
    imagePath,
    link,
    repreName,
    estimateDate,
    empCnt,
    jobType,
    importantWork,
    updator,
    createdAt,
    updatedAt,
    ShareProjectId
  )
  VALUES
  (
    "임시 조합명",
    "https://via.placeholder.com/500x300",
    "/",
    "임시 대표자명",
    NOW(),
    0,
    "임시 업종 내용",
    "임시 주업무 내용",
    ${req.user.id},
    NOW(),
    NOW(),
    ${shareProjectId}
  )
  `;

  const historyInsertQuery = `
  INSERT INTO shareProjectHistory
  (
    value,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "임시 산하조합 생성",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("산하 조합을 등록할 수 없습니다.");
  }
});

router.post("/under/update", isAdminCheck, async (req, res, next) => {
  const {
    id,
    name,
    shareProjectId,
    imagePath,
    link,
    repreName,
    estimateDate,
    empCnt,
    jobType,
    importantWork,
  } = req.body;

  const updateQuery = `
  UPDATE  underShareProjects
     SET  name = "${name}",
          imagePath = "${imagePath}",
          link = "${link}",
          repreName = "${repreName}",
          estimateDate = "${estimateDate}",
          empCnt = ${empCnt},
          jobType = "${jobType}",
          importantWork = "${importantWork}",
          ShareProjectId = ${shareProjectId},
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO shareProjectHistory
  (
    value,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "산하 조합 정보 수정",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("산하 조합 정보를 수정할 수 없습니다.");
  }
});

router.post("/under/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQuery = `
  UPDATE  underShareProjects
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO shareProjectHistory
  (
    value,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "산하 조합 정보 삭제",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("산하 조합을 삭제할 수 없습니다.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
      SELECT 	A.id,
                A.value,
                B.username,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
        FROM 	shareProjectHistory		A
       INNER
        JOIN	users 			        B
          ON	A.updator = B.id
       WHERE    1 = 1
                ${
                  _datePick
                    ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
                    : ""
                }
       ORDER    BY  A.createdAt  DESC
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

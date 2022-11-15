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

router.post("/list", isAdminCheck, async (req, res, next) => {
  const { name, isCompleted } = req.body;

  const _name = name ? name : ``;

  const _isCompleted = parseInt(isCompleted) || 3;

  const selectQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER BY A.createdAt)			AS num,
            A.id,
            A.name,
            A.company,
            A.job,
            A.mobile,
            A.email,
            A.serviceType,
            A.etc,
            A.sector,
            A.description,
            A.sectorEtc,
            A.terms,
            A.file,
            A.isCompleted,
            A.completedAt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt,
            A.UserId,
            B.type												AS userType,
            CASE
                WHEN	B.type = 1 THEN "개인"
                WHEN	B.type = 2 THEN "조합장"
            END									        		AS viewUserType
    FROM	businessQuestions		A
   INNER
    JOIN	users					B
      ON	A.UserId = B.id 
   WHERE    A.name LIKE '%${_name}%'
            ${
              _isCompleted === 1
                ? `AND A.isCompleted = 0`
                : _isCompleted === 2
                ? `AND A.isCompleted = 1`
                : _isCompleted === 3
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
    return res.status(401).send("목록을 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    name,
    company,
    job,
    mobile,
    email,
    serviceType,
    etc,
    sector,
    description,
    sectorEtc,
    terms,
    file,
  } = req.body;

  if (!terms) {
    return res
      .status(401)
      .send("개인정보 수집 및 활용에 동의 후 작성할 수 있습니다.");
  }

  const insertQuery = `
    INSERT  INTO    businessQuestions
    (
        name,
        company,
        job,
        mobile,
        email,
        serviceType,
        etc,
        sector,
        description,
        sectorEtc,
        terms,
        file,
        createdAt,
        updatedAt,
        UserId
    )
    VALUES
    (
        "${name}",
        ${company ? `"${company}"` : null},
        ${job ? `"${job}"` : null},
        ${mobile ? `"${mobile}"` : null},
        "${email}",
        "${serviceType}",
        ${etc ? `"${etc}"` : null},
        "${sector}",
        ${description ? `"${description}"` : null},
        ${sectorEtc ? `"${sectorEtc}"` : null},
        ${terms},
        ${file ? `"${file}"` : null},
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
    return res.status(401).send("공동 비즈니스를 작성할 수 없습니다.");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT    name
    FROM    businessQuestions
   WHERE    id = ${id}
  `;

  const updateQuery = `
  UPDATE    businessQuestions
     SET    isCompleted = 1,
            completedAt = NOW()
   WHERE    id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(selectQuery);

    if (findResult[0].length === 0) {
      return res
        .status(401)
        .send("존재하지 않는 공동 비즈니스 신청 내역입니다.");
    }

    await models.sequelize.query(updateQuery);

    const historyInsertQuery = `
    INSERT INTO businessQuestionHistory
    (
      content,
      name,
      updator,
      createdAt,
      updatedAt
    )
    VALUES 
    (
      "확인 처리",
      "${findResult[0][0].name}",
      ${req.user.id},
      now(),
      now()
    )
    `;

    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("확인 처리를 진행할 수 없습니다.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
      SELECT 	A.id,
                A.content,
                A.name,
                B.username,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
        FROM 	businessQuestionHistory		A
       INNER
        JOIN	users 			            B
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

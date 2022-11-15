const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 12;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 12;

  const lengthQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER BY A.createdAt)				AS num,
            A.id,
            A.title,
            A.youtubeLink,
            A.createdAt,
            A.updatedAt,
            B.username												AS updator,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt
    FROM	forum			A
   INNER
    JOIN	users 			B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
  `;

  const selectQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER BY A.createdAt)				AS num,
            A.id,
            A.title,
            A.youtubeLink,
            A.createdAt,
            A.updatedAt,
            B.username												AS updator,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")				AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")				AS viewUpdatedAt
    FROM	forum			A
   INNER
    JOIN	users 			B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
   ORDER	BY num DESC
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const forum = await models.sequelize.query(selectQuery);

    const forumLen = lengths[0].length;

    const lastPage =
      forumLen % LIMIT > 0 ? forumLen / LIMIT + 1 : forumLen / LIMIT;

    return res.status(200).json({
      forums: forum[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("포럼 영상목록을 불러올 수 없습니다.");
  }
});

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
    SELECT	ROW_NUMBER()	OVER(ORDER BY A.createdAt)				AS num,
            A.id,
            A.title,
            A.youtubeLink,
            A.createdAt,
            A.updatedAt,
            B.username												AS updator,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")				  AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")				  AS viewUpdatedAt
      FROM	forum			A
     INNER
      JOIN	users 			B
        ON	A.updator = B.id
     WHERE	A.isDelete = 0
     ORDER	BY num DESC
    `;
  try {
    const forum = await models.sequelize.query(selectQuery);

    return res.status(200).json(forum[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("포럼 영상목록을 불러올 수 없습니다.");
  }
});

router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const detailQuery = `
    SELECT	A.id,
            A.title,
            A.youtubeLink,
            A.createdAt,
            A.updatedAt,
            B.username												AS updator,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")				  AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")				  AS viewUpdatedAt
      FROM	forum			A
     INNER
      JOIN	users 			B
        ON	A.updator = B.id
     WHERE	A.isDelete = 0
       AND  A.id = ${id}
    `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 게시글입니다.");
    }

    return res.status(200).json(detailData[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { title, youtubeLink } = req.body;

  const insertQuery = `
  INSERT    INTO    forum
  (
    title,
    youtubeLink,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${title}",
    "${youtubeLink}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  const historyInsertQuery = `
  INSERT INTO forumHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
    VALUES 
  (
    "데이터 생성",
    "${title}",
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
    return res.status(401).send("포럼 영상을 등록할 수 없습니다.");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, title, youtubeLink } = req.body;

  const updateQuery = `
  UPDATE    forum
     SET    title = "${title}",
            youtubeLink = "${youtubeLink}",
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO forumHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
    VALUES 
  (
    "데이터 수정",
    "${title}",
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
    return res.status(401).send("포럼 영상을 수정할 수 없습니다.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, title } = req.body;

  const deleteQuery = `
  UPDATE    forum
     SET    isDelete = 1,
            deletedAt = NOW()
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
    INSERT INTO forumHistory
    (
      value,
      content,
      updator,
      createdAt,
      updatedAt
    )
      VALUES 
    (
      "데이터 삭제",
      "${title}",
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
    return res.status(401).send("포럼 영상을 삭제할 수 없습니다.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
      SELECT 	A.id,
                A.value,
                A.content,
                B.username,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
        FROM 	forumHistory	A
       INNER
        JOIN	users 			B
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

const express = require("express");
const models = require("../models");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  // 배너 리스트
  const bannerQuery = `
    SELECT	A.id,
            A.title,
            A.titleUseYn,
            A.content,
            A.contentUseYn,
            A.imageURL,
            A.sort,
            A.link,
            A.linkUseYn,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")	AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일")	AS updatedAt,
            B.username,
            ROW_NUMBER() OVER(ORDER BY A.sort) AS num
      FROM	mainBanners A 
     INNER
      JOIN	users		B
        ON	A.updator  = B.id
     ORDER  BY  sort  ASC
    `;

  // 사업 유형 별 그래프
  const businessQuery = `
  SELECT	value,
            COUNT(id)			AS cnt
    FROM	userBusinessTypes
   GROUP	BY value
    `;

  // 지역별 그래프
  const cityQuery = `
    SELECT  combiArea,
            COUNT(id)        AS cnt
      FROM  users
     WHERE  isExit = 0
     GROUP  BY combiArea
    `;

  // 공지사항 리스트
  const boardQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt)		  AS num, 
            A.id,
            A.title,
            A.type,
            A.content,
            A.author,
            A.hit,
            A.file,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
            B.username 									   AS updator 
    FROM	notices		A
   INNER
    JOIN	users		  B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
   ORDER	BY num DESC
   LIMIT    5
  `;

  try {
    const bannerData = await models.sequelize.query(bannerQuery);
    const businessData = await models.sequelize.query(businessQuery);
    const cityData = await models.sequelize.query(cityQuery);
    const boardData = await models.sequelize.query(boardQuery);

    return res.status(200).json({
      bannerData: bannerData[0].length !== 0 ? bannerData[0] : [],
      businessData: businessData[0].length !== 0 ? businessData[0] : [],
      cityData: cityData[0].length !== 0 ? cityData[0] : [],
      boardData: boardData[0].length !== 0 ? boardData[0] : [],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

module.exports = router;

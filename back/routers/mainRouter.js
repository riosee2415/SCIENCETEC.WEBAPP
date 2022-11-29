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

  try {
    const bannerData = await models.sequelize.query(bannerQuery);
    const businessData = await models.sequelize.query(businessQuery);
    const cityData = await models.sequelize.query(cityQuery);

    return res.status(200).json({
      bannerData: bannerData[0].length !== 0 ? bannerData[0] : [],
      businessData: businessData[0].length !== 0 ? businessData[0] : [],
      cityData: cityData[0].length !== 0 ? cityData[0] : [],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

module.exports = router;

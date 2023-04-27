const express = require("express");
const sendSecretMail = require("../utils/mailSender");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 메일 발송하기
 * PARAMETERS : emails, title, content, file, filename
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/27
 */
router.post("/sendMail", isAdminCheck, async (req, res, next) => {
  const { emails, title, content, file, filename } = req.body;

  if (!Array.isArray(emails)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      emails.map(async (data) => {
        await sendSecretMail(
          `${data}`,
          `${title}`,
          `<div>
              ${content}
          </div>
          `,
          filename && file
            ? [
                {
                  filename: filename,
                  path: file,
                },
              ]
            : null
        );
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("메일을 발송할 수 없습니다.");
  }
});

/**
 * SUBJECT : 문자 발송하기
 * PARAMETERS : mobiles, title, content, file, filename
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT :
 * DEV DATE :
 */

module.exports = router;

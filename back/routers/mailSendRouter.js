const express = require("express");
const sendSecretMail = require("../utils/mailSender");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const popbill = require("popbill");

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
  limits: { fileSize: 40 * 1024 * 1024 }, // 40MB
});

popbill.config({
  LinkID: process.env["POPBILL_LINKID"],

  SecretKey: process.env["POPBILL_SECRETKEY"],

  // 연동환경 설정값, 개발용(true), 상업용(false)
  IsTest: false,

  // 인증토큰 IP제한기능 사용여부, 권장(true)
  IPRestrictOnOff: true,

  // 인증토큰정보 로컬서버 시간 사용여부
  UseLocalTimeYN: true,

  defaultPopbillExceptionorHandler: function (Error) {
    console.log("Error Occur : [" + Error.code + "] " + Error.message);
  },
});

const messageService = popbill.MessageService();

router.post("/file", upload.single("file"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

/**
 * SUBJECT : 메일 발송하기
 * PARAMETERS : emails, title, content, file, filename
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/27
 */
router.post("/send", isAdminCheck, async (req, res, next) => {
  const { emails, mobiles, title, content, file, filename } = req.body;

  if (!Array.isArray(emails)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(mobiles)) {
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
    await Promise.all(
      mobiles.map(async (data) => {
        // 팝빌회원 사업자번호, '-' 제외 10자리
        const CorpNum = process.env["POPBILL_CORPNUM"];

        // 발신번호
        const sendNum = "01089765991";
        const sendName = "";

        // 수신번호
        const receiveNum = "01049233908";

        // 수신자명
        const receiveName = "홍민기";

        // 예약전송일시(yyyyMMddHHmmss), 미기재시 즉시전송
        const reserveDT = null;

        // 광고문자 전송여부
        const adsYN = false;

        // 전송요청번호
        // 파트너가 전송 건에 대해 관리번호를 구성하여 관리하는 경우 사용.
        // 1~36자리로 구성. 영문, 숫자, 하이픈(-), 언더바(_)를 조합하여 팝빌 회원별로 중복되지 않도록 할당.
        const requestNum = "";

        new Promise(async (resolve, reject) => {
          await messageService.sendSMS(
            CorpNum,
            sendNum,
            receiveNum,
            receiveName,
            title,
            content,
            reserveDT,
            adsYN,
            sendName,
            requestNum,
            (receiptNum) => {
              resolve(true);
              console.log("🟩🟩🟩🟩🟩🟩🟩🟩🟩");
              console.log("success", receiptNum);
              console.log("🟩🟩🟩🟩🟩🟩🟩🟩🟩");
              // console.log({ result: receiptNum });
            },
            (Error) => {
              resolve(false);
              console.log("🟥🟥🟥🟥🟥🟥🟥🟥🟥");
              console.log("error", Error);
              console.log("🟥🟥🟥🟥🟥🟥🟥🟥🟥");

              // console.log({
              //   code: Error.code,
              //   message: Error.message,
              // });
            }
          );
        });
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

router.post("/message", async (req, res, next) => {
  try {
    // 팝빌회원 사업자번호, '-' 제외 10자리
    const testCorpNum = process.env["POPBILL_CORPNUM"];

    // 발신번호
    const sendNum = "01089765991";

    // 수신번호
    const receiveNum = "01049233908";

    // 수신자명
    const receiveName = "홍민기";

    // 예약전송일시(yyyyMMddHHmmss), 미기재시 즉시전송
    const reserveDT = "";

    // 광고문자 전송여부
    const adsYN = false;

    const title = "테스트";
    const content = "테스트 입니다!";

    await messageService.sendSMS(
      testCorpNum,
      sendNum,
      receiveNum,
      receiveName,
      title,
      content,
      reserveDT,
      adsYN,
      (receiptNum) => {
        console.log("success");
        // resolve(true);
        // console.log({ result: receiptNum });
      },
      (Error) => {
        console.log("error", Error);
        // resolve(false);
        // console.log({
        //   code: Error.code,
        //   message: Error.message,
        // });
      }
    );
    // .then(console.log);
    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("메세지를 전송할 수 없습니다.");
  }
});

module.exports = router;

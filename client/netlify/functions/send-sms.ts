import { Handler } from "@netlify/functions";
import axios from "axios";
import crypto from "crypto";

const {
  NAVER_CLOUD_ACCESS_KEY,
  NAVER_CLOUD_SECRET_KEY,
  NAVER_CLOUD_SERVICE_ID,
  ADMIN_PHONE_NUMBER
} = process.env;

const handler: Handler = async (event) => {
  // POST 요청만 허용
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  try {
    const { name, phone, email, message } = JSON.parse(event.body || "{}");

    // 필수 환경 변수 확인
    if (
      !NAVER_CLOUD_ACCESS_KEY ||
      !NAVER_CLOUD_SECRET_KEY ||
      !NAVER_CLOUD_SERVICE_ID ||
      !ADMIN_PHONE_NUMBER
    ) {
      throw new Error("Missing required environment variables");
    }

    const timestamp = Date.now().toString();

    // 시그니처 생성
    const signature = crypto
      .createHmac("sha256", NAVER_CLOUD_SECRET_KEY)
      .update(
        `POST /sms/v2/services/${NAVER_CLOUD_SERVICE_ID}/messages\n${timestamp}\n${NAVER_CLOUD_ACCESS_KEY}`
      )
      .digest("base64");

    // SMS 메시지 생성
    const smsMessage = `[영타일러] 새로운 상담 문의\n이름: ${name}\n연락처: ${phone}\n이메일: ${email}\n문의내용: ${message.substring(
      0,
      50
    )}${message.length > 50 ? "..." : ""}`;

    // 네이버 클라우드 SENS API 호출
    const response = await axios({
      method: "POST",
      url: `https://sens.apigw.ntruss.com/sms/v2/services/${NAVER_CLOUD_SERVICE_ID}/messages`,
      headers: {
        "Content-Type": "application/json",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": NAVER_CLOUD_ACCESS_KEY,
        "x-ncp-apigw-signature-v2": signature
      },
      data: {
        type: "SMS",
        contentType: "COMM",
        countryCode: "82",
        from: ADMIN_PHONE_NUMBER.replace(/-/g, ""),
        content: smsMessage,
        messages: [
          {
            to: ADMIN_PHONE_NUMBER.replace(/-/g, "")
          }
        ]
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "SMS sent successfully",
        data: response.data
      })
    };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error sending SMS",
        error: error.message
      })
    };
  }
};

export { handler };

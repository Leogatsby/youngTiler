require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require("@notionhq/client");
const axios = require("axios");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Notion client initialization
const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

// Naver Cloud Platform SMS configuration
const send_message = async (phone, message) => {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", process.env.NAVER_CLOUD_SECRET_KEY)
    .update(
      `POST /sms/v2/services/${process.env.NAVER_CLOUD_SERVICE_ID}/messages\n${timestamp}\n${process.env.NAVER_CLOUD_ACCESS_KEY}`
    )
    .digest("base64");

  try {
    const response = await axios({
      method: "POST",
      url: `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NAVER_CLOUD_SERVICE_ID}/messages`,
      headers: {
        "Content-Type": "application/json",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": process.env.NAVER_CLOUD_ACCESS_KEY,
        "x-ncp-apigw-signature-v2": signature
      },
      data: {
        type: "SMS",
        contentType: "COMM",
        countryCode: "82",
        from: process.env.PHONE_NUMBER.replace(/-/g, ""),
        content: message,
        messages: [{ to: phone.replace(/-/g, "") }]
      }
    });
    return response.data;
  } catch (error) {
    console.error("SMS 전송 에러:", error.response?.data || error.message);
    throw error;
  }
};

// API endpoint for handling consultation requests
app.post("/api/consultation", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Create a new page in Notion database
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        },
        Phone: {
          phone_number: phone
        },
        Email: {
          email: email
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message
              }
            }
          ]
        },
        Status: {
          select: {
            name: "신규"
          }
        },
        Date: {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    });

    // Send SMS notification
    const smsMessage = `[영타일러] 새로운 상담 문의\n이름: ${name}\n연락처: ${phone}\n이메일: ${email}\n문의내용: ${message.substring(
      0,
      50
    )}${message.length > 50 ? "..." : ""}`;
    await send_message(process.env.PHONE_NUMBER, smsMessage);

    res.status(200).json({ message: "상담 문의가 성공적으로 접수되었습니다." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

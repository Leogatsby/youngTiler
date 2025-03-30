import { useState } from "react";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Notion API 호출
      const notionResponse = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          parent: { database_id: process.env.REACT_APP_NOTION_DATABASE_ID },
          properties: {
            Name: {
              title: [
                {
                  text: {
                    content: formData.name
                  }
                }
              ]
            },
            Phone: {
              phone_number: formData.phone
            },
            Email: {
              email: formData.email
            },
            Message: {
              rich_text: [
                {
                  text: {
                    content: formData.message
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
        })
      });

      if (!notionResponse.ok) {
        throw new Error("문의 접수 중 오류가 발생했습니다.");
      }

      // SMS 전송 API 호출
      const smsResponse = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!smsResponse.ok) {
        console.error("SMS 전송 실패:", await smsResponse.text());
      }

      setSubmitStatus({
        type: "success",
        message:
          "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다."
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus({
        type: "error",
        message: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          연락처
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          문의내용
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {submitStatus.type && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "접수 중..." : "문의하기"}
      </button>
    </form>
  );
}

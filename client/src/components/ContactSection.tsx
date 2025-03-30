import { useState } from "react";

interface ContactSectionProps {
  id?: string;
}

interface FormData {
  clientType: "business" | "individual";
  companyName: string;
  name: string;
  phone: string;
  services: string[];
  message: string;
}

export default function ContactSection({ id }: ContactSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    clientType: "individual",
    companyName: "개인의뢰",
    name: "",
    phone: "",
    services: [],
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
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const service = checkbox.value;
      setFormData((prev) => ({
        ...prev,
        services: checkbox.checked
          ? [...prev.services, service]
          : prev.services.filter((s) => s !== service)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleClientTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as "business" | "individual";
    setFormData((prev) => ({
      ...prev,
      clientType: type,
      companyName: type === "individual" ? "개인의뢰" : ""
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
              title: [{ text: { content: formData.name } }]
            },
            Phone: {
              phone_number: formData.phone
            },
            CompanyName: {
              rich_text: [{ text: { content: formData.companyName } }]
            },
            ClientType: {
              select: {
                name: formData.clientType === "business" ? "업체" : "개인"
              }
            },
            Services: {
              multi_select: formData.services.map((service) => ({
                name: service
              }))
            },
            Message: {
              rich_text: [{ text: { content: formData.message } }]
            },
            Status: {
              select: { name: "신규" }
            },
            Date: {
              date: { start: new Date().toISOString() }
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
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          companyName: formData.companyName,
          services: formData.services.join(", "),
          message: formData.message
        })
      });

      if (!smsResponse.ok) {
        console.error("SMS 전송 실패:", await smsResponse.text());
      }

      setSubmitStatus({
        type: "success",
        message:
          "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다."
      });

      // 폼 초기화
      setFormData({
        clientType: "individual",
        companyName: "개인의뢰",
        name: "",
        phone: "",
        services: [],
        message: ""
      });

      // 체크박스 초기화
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = false;
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
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">상담문의</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                업체이신가요? 개인이신가요?
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="clientType"
                    value="business"
                    checked={formData.clientType === "business"}
                    onChange={handleClientTypeChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">업체</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="clientType"
                    value="individual"
                    checked={formData.clientType === "individual"}
                    onChange={handleClientTypeChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">개인</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                업체명을 입력해주세요.
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                disabled={formData.clientType === "individual"}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                성함을 입력해주세요.
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                전화번호를 입력해주세요.
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-0000-0000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                시공분야를 선택하세요.
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mt-2 space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value="타일수리"
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">타일수리</span>
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value="욕실시공"
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">욕실시공</span>
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value="타일시공"
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">타일시공</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                문의사항이 있다면 함께해주세요.
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                placeholder="문의사항을 입력해주세요."
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
              className={`w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-500 text-white font-medium rounded-md shadow-sm transition-colors ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "접수 중..." : "무료상담 신청하기"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

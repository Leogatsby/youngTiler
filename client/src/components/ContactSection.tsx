interface ContactSectionProps {
  id?: string;
}

export default function ContactSection({ id }: ContactSectionProps) {
  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">상담문의</h2>
          <form className="space-y-6">
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
                    className="form-radio text-blue-600"
                    onChange={() => {
                      const companyInput = document.getElementById(
                        "companyName"
                      ) as HTMLInputElement;
                      if (companyInput) {
                        companyInput.value = "";
                        companyInput.disabled = false;
                      }
                    }}
                  />
                  <span className="ml-2">업체</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="clientType"
                    value="individual"
                    className="form-radio text-blue-600"
                    onChange={() => {
                      const companyInput = document.getElementById(
                        "companyName"
                      ) as HTMLInputElement;
                      if (companyInput) {
                        companyInput.value = "개인의뢰";
                        companyInput.disabled = true;
                      }
                    }}
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
                id="companyName"
                type="text"
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
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">타일수리</span>
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">욕실시공</span>
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                placeholder="문의사항을 입력해주세요."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-500 text-white font-medium rounded-md shadow-sm transition-colors"
            >
              무료상담 신청하기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

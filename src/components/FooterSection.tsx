const FOOTER_CONFIG = {
  companyName: "청년타일",
  ceoName: "백광일",
  address: "서울특별시 금천구 시흥대로63길 64 104호 청년타일",
  phoneNumber: "010-3375-3948",
  businessNumber: "539-44-01118",
  year: new Date().getFullYear(),
  businessHours: {
    weekday: "09:00 - 18:00",
    saturday: "09:00 - 15:00",
    holiday: "휴무"
  }
} as const;

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 회사 정보 */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold text-gray-300">상호명:</span>{" "}
              {FOOTER_CONFIG.companyName}
            </p>
            <p>
              <span className="font-semibold text-gray-300">대표자명:</span>{" "}
              {FOOTER_CONFIG.ceoName}
            </p>
            <p>
              <span className="font-semibold text-gray-300">주소:</span>{" "}
              {FOOTER_CONFIG.address}
            </p>
            <p>
              <span className="font-semibold text-gray-300">전화번호:</span>{" "}
              {FOOTER_CONFIG.phoneNumber}
            </p>
            <p>
              <span className="font-semibold text-gray-300">
                사업자등록번호:
              </span>{" "}
              {FOOTER_CONFIG.businessNumber}
            </p>
          </div>

          {/* 영업시간 */}
          <div className="text-sm">
            <p className="font-semibold text-gray-300 mb-2">영업시간</p>
            <div className="space-y-1">
              <p>평일: {FOOTER_CONFIG.businessHours.weekday}</p>
              <p>토요일: {FOOTER_CONFIG.businessHours.saturday}</p>
              <p>일요일/공휴일: {FOOTER_CONFIG.businessHours.holiday}</p>
            </div>
            <p className="mt-4 text-gray-500">
              상담은 전화 또는 카카오톡으로 언제든 문의주시면 빠르게
              답변드리겠습니다.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800 text-sm text-center">
          © {FOOTER_CONFIG.year} {FOOTER_CONFIG.companyName}. All rights
          reserved
        </div>
      </div>
    </footer>
  );
}

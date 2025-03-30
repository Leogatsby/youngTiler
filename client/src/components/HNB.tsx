const HERO_CONFIG = {
  phoneNumber: "010-3375-3948",
  companyName: "청년타일",
  logoPath: "/logo.png",
  kakaoUrl: "https://open.kakao.com/o/siOY3soh",
  navigation: [
    { id: "about", title: "회사소개" },
    { id: "services", title: "서비스" },
    { id: "reviews", title: "고객후기" },
    { id: "contact", title: "상담문의" }
  ]
} as const;

export default function HNB() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md">
      {/* 상단 로고 및 네비게이션 */}
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* 로고 */}
          {/* <div className="flex-shrink-0">
            <img
              src={HERO_CONFIG.logoPath}
              alt={HERO_CONFIG.companyName}
              className="h-8"
            />
          </div> */}

          {/* 전화번호 - 중앙 정렬 */}
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-semibold text-gray-800">
                📞 010-3375-3948
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                타일시공 욕실관련시공 맡겨주세요!
              </div>
            </div>
          </div>

          {/* 빈 공간으로 로고와 대칭 맞추기 */}
          <div className="flex-shrink-0 w-[32px]" />
        </div>
      </div>

      {/* 하단 연락처 정보 */}
      <div className="border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 py-3">
            {/* 전화번호 */}
            <a
              href={`tel:${HERO_CONFIG.phoneNumber}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              {HERO_CONFIG.phoneNumber}
            </a>

            {/* 카카오톡 상담 */}
            <a
              href={HERO_CONFIG.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
            >
              <span className="mr-2">💬</span>
              카카오톡 상담
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

const FLOAT_CONFIG = {
  phoneNumber: "010-3375-3948",
  kakaoUrl: "https://open.kakao.com/o/siOY3soh"
} as const;

export default function FloatSection() {
  return (
    <div className="fixed right-5 bottom-10 z-50 flex flex-col gap-4">
      {/* 카카오톡 버튼 */}
      <a
        href={FLOAT_CONFIG.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#FAE100] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 overflow-hidden"
      >
        <img
          src="/kakao.png"
          alt="카카오톡 상담"
          className="w-12 h-12 object-contain"
        />
      </a>

      {/* 전화 버튼 */}
      <a
        href={`tel:${FLOAT_CONFIG.phoneNumber}`}
        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      </a>
    </div>
  );
}

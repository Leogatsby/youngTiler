import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface Review {
  id: number;
  name: string;
  location: string;
  constructionType: string;
  rating: number;
  content: string;
  date: string;
}

interface ReviewSectionProps {
  id?: string;
}

const REVIEW_CONFIG = {
  reviews: [
    {
      id: 1,
      name: "김**",
      location: "서울시 강남구 역삼동",
      constructionType: "욕실시공",
      rating: 5,
      content: "깔끔하고 전문적인 시공 감사합니다. 욕실이 새집처럼 변했어요!",
      date: "2024.03"
    },
    {
      id: 2,
      name: "이**",
      location: "서울시 송파구 잠실동",
      constructionType: "타일수리",
      rating: 5,
      content: "빠르고 정확한 타일 보수 작업 감사합니다. 가격도 합리적이에요.",
      date: "2024.03"
    },
    {
      id: 3,
      name: "박**",
      location: "서울시 마포구 서교동",
      constructionType: "욕실시공",
      rating: 5,
      content: "전문적인 상담부터 시공까지 모두 만족스러웠습니다.",
      date: "2024.02"
    },
    {
      id: 4,
      name: "최**",
      location: "서울시 영등포구 여의동",
      constructionType: "타일수리",
      rating: 5,
      content: "깨진 타일 교체 작업을 깔끔하게 해주셨어요. 추천합니다!",
      date: "2024.02"
    },
    {
      id: 5,
      name: "정**",
      location: "서울시 서초구 반포동",
      constructionType: "욕실시공",
      rating: 5,
      content: "욕실 전체 리모델링을 맡겼는데 너무 만족스러워요.",
      date: "2024.01"
    }
  ]
} as const;

export default function ReviewSection({ id }: ReviewSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id={id} className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          고객 후기
        </h2>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next"
            }}
            pagination={{
              clickable: true
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            breakpoints={{
              640: {
                slidesPerView: 3
              }
            }}
            className="w-full"
          >
            {REVIEW_CONFIG.reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-full mx-auto max-w-lg">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">
                        {review.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {review.location}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {review.date}
                    </span>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                      {review.constructionType}
                    </span>
                  </div>
                  <div className="flex mb-3 sm:mb-4">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">
                    {review.content}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

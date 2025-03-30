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
    },
    {
      id: 6,
      name: "강**",
      location: "서울시 강동구 천호동",
      constructionType: "현관시공",
      rating: 5,
      content:
        "현관 타일 교체 작업이 너무 깔끔하게 잘 되었습니다. 새집 같아요!",
      date: "2024.01"
    },
    {
      id: 7,
      name: "조**",
      location: "서울시 노원구 상계동",
      constructionType: "베란다시공",
      rating: 5,
      content:
        "베란다 바닥 타일 작업 깔끔하게 해주셔서 감사합니다. 작업 과정도 꼼꼼하게 설명해주셨어요.",
      date: "2024.01"
    },
    {
      id: 8,
      name: "윤**",
      location: "서울시 동작구 사당동",
      constructionType: "주방시공",
      rating: 5,
      content:
        "주방 타일 교체 작업을 맡겼는데, 전문적이고 깔끔한 시공 감사합니다!",
      date: "2023.12"
    },
    {
      id: 9,
      name: "장**",
      location: "서울시 성북구 길음동",
      constructionType: "욕실시공",
      rating: 5,
      content: "오래된 욕실이 새것처럼 변했네요. 꼼꼼한 시공 감사드립니다.",
      date: "2023.12"
    },
    {
      id: 10,
      name: "한**",
      location: "서울시 광진구 자양동",
      constructionType: "현관시공",
      rating: 5,
      content:
        "현관 타일 교체하고 집 분위기가 확 바뀌었어요. 만족스러운 결과물입니다!",
      date: "2023.12"
    },
    {
      id: 11,
      name: "신**",
      location: "서울시 중랑구 면목동",
      constructionType: "베란다시공",
      rating: 5,
      content:
        "베란다 타일 작업 깔끔하게 마무리해주셔서 감사합니다. 작업 기간도 예상보다 빨랐어요.",
      date: "2023.11"
    },
    {
      id: 12,
      name: "임**",
      location: "서울시 강서구 화곡동",
      constructionType: "주방시공",
      rating: 5,
      content:
        "주방 벽면 타일 시공이 정말 마음에 듭니다. 전문가다운 일처리 감사합니다.",
      date: "2023.11"
    },
    {
      id: 13,
      name: "권**",
      location: "서울시 용산구 이태원동",
      constructionType: "욕실시공",
      rating: 5,
      content:
        "욕실 리모델링 결과가 너무 만족스럽습니다. 다음에도 꼭 이용하고 싶어요!",
      date: "2023.11"
    },
    {
      id: 14,
      name: "황**",
      location: "서울시 동대문구 장안동",
      constructionType: "타일수리",
      rating: 5,
      content:
        "화장실 타일 균열 보수 작업을 잘해주셔서 감사합니다. 전문적인 상담도 좋았어요.",
      date: "2023.10"
    },
    {
      id: 15,
      name: "백**",
      location: "서울시 은평구 불광동",
      constructionType: "현관시공",
      rating: 5,
      content: "현관 타일 시공 정말 만족스럽습니다. 깔끔한 마무리 감사드려요!",
      date: "2023.10"
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

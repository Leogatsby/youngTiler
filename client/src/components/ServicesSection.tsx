interface Service {
  readonly title: string;
  readonly description: string;
  readonly imagePath: string; // 권장 이미지 크기: 800x384 픽셀 (가로x세로)
}

interface ServicesSectionProps {
  id?: string;
  services?: readonly Service[];
}

const SERVICES_CONFIG = {
  services: [
    {
      title: "타일 시공",
      description:
        "욕실, 주방, 현관 등 다양한 공간의 타일 시공 서비스를 제공합니다. 전문가의 섬세한 손길로 완벽한 마감을 약속드립니다.",
      imagePath:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop" // 800x384 픽셀로 이미지 준비 필요
    },
    {
      title: "욕실 인테리어",
      description:
        "공간의 특성과 고객님의 취향을 고려한 맞춤형 욕실 인테리어를 제공합니다. 최적의 디자인과 자재를 제안해드립니다.",
      imagePath:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop" // 800x384 픽셀로 이미지 준비 필요
    },
    {
      title: "타일 수리/복원",
      description:
        "깨진 타일 교체, 줄눈 보수 등 타일 복원 서비스를 제공합니다. 부분 보수로 비용은 절감하고 품질은 새것처럼 만들어드립니다.",
      imagePath:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop" // 800x384 픽셀로 이미지 준비 필요
    }
  ] as const
} as const;

export default function ServicesSection({
  id,
  services = SERVICES_CONFIG.services
}: ServicesSectionProps) {
  return (
    <section id={id} className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">서비스 소개</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col h-full"
            >
              {/* 이미지 크기: 800x384 픽셀 (가로x세로) */}
              <div className="relative h-48">
                <img
                  src={service.imagePath}
                  alt={service.title}
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

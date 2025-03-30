const MAIN_VIDEO_CONFIG = {
  video: "/assets/main.mp4",
  fallbackImage: "/background.jpg",
  title: "타일/욕실 시공 전문",
  description: "청년타일에서 높은 시공을 약속드립니다"
} as const;

interface MainVideoSectionProps {
  id?: string;
}

export default function MainVideoSection({ id }: MainVideoSectionProps) {
  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const video = e.currentTarget;
    console.error("Video error:", {
      error: video.error?.message,
      networkState: video.networkState,
      readyState: video.readyState,
      src: video.src
    });
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
  };

  return (
    <section className="relative w-full overflow-hidden sm:h-screen">
      {/* 비디오 배경 */}
      <div className="w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          className="w-full sm:h-screen object-contain sm:object-cover"
        >
          <source src={MAIN_VIDEO_CONFIG.video} type="video/mp4" />
        </video>
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 컨텐츠 */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
        <h2 className="text-xl sm:text-4xl font-bold text-center mb-2 sm:mb-6">
          {MAIN_VIDEO_CONFIG.title}
        </h2>
        <p className="text-sm sm:text-xl text-center max-w-2xl">
          {MAIN_VIDEO_CONFIG.description}
        </p>
      </div>
    </section>
  );
}

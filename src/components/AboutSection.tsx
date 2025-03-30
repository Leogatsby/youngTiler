interface AboutSectionProps {
  id?: string;
}

export default function AboutSection({ id }: AboutSectionProps) {
  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">회사 소개</h2>
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="mb-6">
              청년타일은 20년 이상의 경력을 가진 전문가들이 모여 설립한 타일
              시공 전문 기업입니다.
            </p>
            <p className="mb-6">
              우리는 고객의 공간을 더 아름답고 가치있게 만들기 위해 최선을
              다합니다. 전문성과 경험을 바탕으로 고품질 시공을 약속드립니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">미션</h3>
                <p>
                  고객의 공간에 가치를 더하는 최고의 타일 시공 서비스를
                  제공합니다.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">비전</h3>
                <p>
                  대한민국 최고의 타일 시공 전문가 그룹으로 성장하여 업계의
                  표준을 만들어갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

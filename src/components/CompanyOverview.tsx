import { useTranslation } from '../utils/i18n';

const SECTION_TITLE_BY_LANGUAGE = {
  ko: 'KGT를 선택해야 하는 이유',
  en: 'Why Choose KGT',
  zh: '选择KGT的理由',
  ja: 'KGTが選ばれる理由',
  es: 'Por Qué Elegir KGT',
  fil: 'Bakit KGT',
  vi: 'Vì Sao Chọn KGT',
} as const;

export function CompanyOverview() {
  const { t, currentLanguage } = useTranslation();

  const features = [
    {
      icon: 'science',
      title: String(t('coreValues.creativity.title')),
      description: String(t('coreValues.creativity.description')),
    },
    {
      icon: 'verified',
      title: String(t('coreValues.innovation.title')),
      description: String(t('coreValues.innovation.description')),
    },
    {
      icon: 'public',
      title: String(t('coreValues.challenge.title')),
      description: String(t('coreValues.challenge.description')),
    },
  ];

  return (
    <section id="company" className="py-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-['Oswald'] font-bold mb-4 uppercase tracking-wide text-gray-900 dark:text-white">
            {SECTION_TITLE_BY_LANGUAGE[currentLanguage]}
          </h2>
          <div className="w-16 h-1 bg-[#FFD700] mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-100 dark:border-gray-800 hover:border-[#FFD700] dark:hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg bg-[#f5f5f5] dark:bg-[#1e1e1e] rounded-sm"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded-sm mb-6 group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
                <span className="material-icons-outlined text-3xl">{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 uppercase text-gray-900 dark:text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

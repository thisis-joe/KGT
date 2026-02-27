import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../utils/i18n';

const UI_LABELS = {
  ko: {
    subtitle: '고객 요구에 맞는 점·접착 솔루션을 제공합니다.',
    downloadCatalog: '카탈로그 다운로드',
    explore: '자세히 보기',
  },
  en: {
    subtitle: 'Specialized solutions for every adhesive need.',
    downloadCatalog: 'Download Catalog',
    explore: 'Explore',
  },
  zh: {
    subtitle: '为各类粘接需求提供专业解决方案。',
    downloadCatalog: '下载目录',
    explore: '查看详情',
  },
  ja: {
    subtitle: 'あらゆる粘着ニーズに対応する専門ソリューションを提供します。',
    downloadCatalog: 'カタログダウンロード',
    explore: '詳細を見る',
  },
  es: {
    subtitle: 'Soluciones especializadas para cada necesidad adhesiva.',
    downloadCatalog: 'Descargar Catálogo',
    explore: 'Explorar',
  },
  fil: {
    subtitle: 'Espesyal na solusyon para sa bawat pangangailangan sa adhesive.',
    downloadCatalog: 'I-download ang Catalog',
    explore: 'Tingnan',
  },
  vi: {
    subtitle: 'Giải pháp chuyên biệt cho mọi nhu cầu kết dính.',
    downloadCatalog: 'Tải Catalog',
    explore: 'Xem chi tiết',
  },
} as const;

type PortfolioItem = {
  icon: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
};

export function BusinessPortfolio() {
  const { t, currentLanguage } = useTranslation();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const uiLabels = UI_LABELS[currentLanguage];

  const filmProducts = (t('business.filmTape.products') || []) as Array<{ name: string }>;
  const materialProducts = (t('business.materials.products') || []) as Array<{ name: string }>;
  const serviceItems = (t('business.service.items') || []) as string[];

  const portfolioItems: PortfolioItem[] = [
    {
      icon: 'layers',
      title: String(t('business.filmTape.title')),
      description: [filmProducts[0]?.name, filmProducts[1]?.name, filmProducts[2]?.name].filter(Boolean).join(' / '),
      image: 'https://images.unsplash.com/photo-1721048379815-751e1c6a748a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwdGFwZSUyMHJvbGxzfGVufDF8fHx8MTc3MTU1ODI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      gallery: [
        'https://images.unsplash.com/photo-1721048379815-751e1c6a748a?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1581092588429-2f40f6f9f4fd?auto=format&fit=crop&w=1400&q=80',
      ],
    },
    {
      icon: 'opacity',
      title: String(t('business.materials.title')),
      description: [materialProducts[0]?.name, materialProducts[1]?.name, materialProducts[2]?.name].filter(Boolean).join(' / '),
      image: 'https://images.unsplash.com/photo-1761095596584-34731de3e568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBsYWJvcmF0b3J5JTIwYmVha2Vyc3xlbnwxfHx8fDE3NzE1NTgyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      gallery: [
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80',
      ],
    },
    {
      icon: 'engineering',
      title: String(t('business.service.title')),
      description: serviceItems.join(' / '),
      image: 'https://images.unsplash.com/photo-1621905253185-95614217f357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljYWwlMjBlbmdpbmVlciUyMHNlcnZpY2V8ZW58MXx8fHwxNzcxNTU4Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      gallery: [
        'https://images.unsplash.com/photo-1581090700227-1e8a2f63f9f0?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1581093450021-4a7360e9a7c6?auto=format&fit=crop&w=1400&q=80',
      ],
    },
  ];

  const activeItem = activeItemIndex !== null ? portfolioItems[activeItemIndex] : null;

  const openGallery = (index: number) => {
    setActiveItemIndex(index);
    setActiveImageIndex(0);
  };

  const closeGallery = () => {
    setActiveItemIndex(null);
    setActiveImageIndex(0);
  };

  const moveImage = (direction: 'prev' | 'next') => {
    if (!activeItem) return;

    setActiveImageIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? activeItem.gallery.length - 1 : prev - 1;
      }
      return prev === activeItem.gallery.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
      <section id="products" className="py-20 bg-gray-50 dark:bg-[#141414] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-['Oswald'] font-bold mb-2 uppercase text-gray-900 dark:text-white">
                {String(t('business.title'))}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {uiLabels.subtitle}
              </p>
            </div>
            <a
              href="/catalog/KGT_Catalog_Placeholder.txt"
              download
              className="hidden md:flex items-center text-sm font-bold uppercase tracking-wide border-b-2 border-[#FFD700] pb-1 text-gray-900 dark:text-white hover:text-[#FFD700] transition-colors mt-4 md:mt-0"
            >
              {uiLabels.downloadCatalog}
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="relative group h-96 overflow-hidden border-r border-b lg:border-b-0 last:border-r-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e]"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-20 grayscale group-hover:grayscale-0"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-end z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 mb-4 bg-[#FFD700] rounded-full flex items-center justify-center text-black">
                    <span className="material-icons-outlined">{item.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6 max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {item.description}
                  </p>

                  {/* Link */}
                  <button
                    type="button"
                    onClick={() => openGallery(index)}
                    className="text-[#FFD700] text-sm font-bold uppercase tracking-wider flex items-center"
                  >
                    {uiLabels.explore}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeItem && (
        <div className="fixed inset-0 z-[120] bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-[#0f0f0f] border border-gray-700 rounded-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h3 className="text-white font-bold text-lg">{activeItem.title}</h3>
              <button type="button" onClick={closeGallery} className="text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black">
              <img
                src={activeItem.gallery[activeImageIndex]}
                alt={`${activeItem.title}-${activeImageIndex + 1}`}
                className="w-full h-[65vh] object-cover"
              />
              <button
                type="button"
                onClick={() => moveImage('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-black font-bold px-3 py-2 rounded-sm hover:bg-[#FFD700]"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => moveImage('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-black font-bold px-3 py-2 rounded-sm hover:bg-[#FFD700]"
              >
                ›
              </button>
            </div>

            <div className="px-4 py-3 text-sm text-gray-300 flex items-center justify-between">
              <span>{activeItem.description}</span>
              <span>{activeImageIndex + 1} / {activeItem.gallery.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

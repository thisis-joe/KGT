import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../utils/i18n';

interface Product {
  id: number;
  titleKey: string;
  categoryKey: string;
  imageQuery: string;
}

export function ProductGallery() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', labelKey: 'products.categories.all' },
    { key: 'film', labelKey: 'products.categories.film' },
    { key: 'tape', labelKey: 'products.categories.tape' },
    { key: 'adhesive', labelKey: 'products.categories.adhesive' },
  ];

  const products: Product[] = [
    { id: 1, titleKey: 'products.items.hotmelt.title', categoryKey: 'film', imageQuery: 'industrial film manufacturing' },
    { id: 2, titleKey: 'products.items.protective.title', categoryKey: 'film', imageQuery: 'protective film technology' },
    { id: 3, titleKey: 'products.items.doubleSided.title', categoryKey: 'tape', imageQuery: 'double sided tape industrial' },
    { id: 4, titleKey: 'products.items.emi.title', categoryKey: 'tape', imageQuery: 'electronic components shielding' },
    { id: 5, titleKey: 'products.items.advertising.title', categoryKey: 'adhesive', imageQuery: 'industrial adhesive materials' },
    { id: 6, titleKey: 'products.items.industrial.title', categoryKey: 'adhesive', imageQuery: 'chemical adhesive production' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.categoryKey === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('products.title')}</h2>
          <p className="text-lg text-gray-600 mb-6">{t('products.subtitle')}</p>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 border-2 font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-[#FFC107] border-black text-black'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-[#FFC107]'
              }`}
            >
              {t(category.labelKey)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group border-2 border-gray-200 overflow-hidden hover:border-[#FFC107] transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop`}
                  alt={t(product.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-1 bg-[#FFC107] mr-3"></div>
                  <span className="text-sm text-gray-500 uppercase tracking-wider">
                    {t(`products.categories.${product.categoryKey}`)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t(product.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`${product.titleKey.replace('.title', '.description')}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

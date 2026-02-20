import { ShoppingBag } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

export function StoreSection() {
  const { t } = useTranslation();

  return (
    <section id="store" className="py-16 bg-white dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2DB400] dark:bg-[#1a5c00] rounded-sm overflow-hidden shadow-xl relative">
          {/* Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative z-10">
            {/* Left Content */}
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <span className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-2">
                Consumer Sales
              </span>
              <h2 className="text-3xl md:text-4xl font-['Oswald'] font-bold text-white mb-2">
                {t('store.title')}
              </h2>
              <p className="text-white/90 text-lg">
                {t('store.description')}
              </p>
            </div>

            {/* Right Button */}
            <a
              href="https://smartstore.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-white text-[#2DB400] px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-wide hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 min-w-[200px] group"
            >
              {t('store.button')}
              <ShoppingBag className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

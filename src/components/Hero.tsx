import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1755937303351-57ad0f70f773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYWRoZXNpdmUlMjB0YXBlJTIwbWFudWZhY3R1cmluZyUyMGZhY2lsaXR5fGVufDF8fHx8MTc3MTU1ODI0N3ww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      />
      
      {/* Dark Overlay for Dark Mode */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-block bg-[#FFD700] text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6 rounded-sm">
            Global Adhesion Technology
          </div>

          {/* Main Heading */}
          <h1 className="font-['Oswald'] font-bold text-white mb-6 leading-tight text-5xl md:text-7xl">
            ADVANCED SEALING{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              SOLUTIONS FOR INDUSTRY
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl font-light leading-relaxed">
            KGT delivers high-performance functional tapes and adhesive materials engineered for the automotive, electronics, and construction sectors worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="bg-[#FFD700] text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-[#FFD700] rounded-sm text-center"
            >
              View Products
            </a>
            <a
              href="#company"
              className="bg-transparent border border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm text-center"
            >
              Company Profile
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <ChevronDown className="w-10 h-10 text-white opacity-70" />
      </div>
    </section>
  );
}

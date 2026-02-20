import { useEffect, useState, useRef } from 'react';
import { Award, Users, Package, TrendingUp } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

function StatItem({ icon, value, suffix, label, delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center p-8 bg-white border-2 border-gray-200 hover:border-[#FFC107] transition-all duration-300 hover:shadow-xl group"
    >
      <div className="w-16 h-16 bg-black group-hover:bg-[#FFC107] transition-colors flex items-center justify-center mb-4">
        <div className="text-[#FFC107] group-hover:text-black transition-colors">
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {count.toLocaleString()}
        <span className="text-[#FFC107]">{suffix}</span>
      </div>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Award className="size-8" />,
      value: 2021,
      suffix: '',
      label: t('stats.founded'),
    },
    {
      icon: <Users className="size-8" />,
      value: 50,
      suffix: '+',
      label: t('stats.clients'),
    },
    {
      icon: <Package className="size-8" />,
      value: 100,
      suffix: '+',
      label: t('stats.products'),
    },
    {
      icon: <TrendingUp className="size-8" />,
      value: 99,
      suffix: '%',
      label: t('stats.satisfaction'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#FFC107] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FFC107] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t('stats.title')}</h2>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

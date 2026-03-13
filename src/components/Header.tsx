import { useState, useEffect } from 'react';
import { ChevronDown, Sun, Moon } from 'lucide-react';
import { useTranslation } from '../utils/i18n';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/theme';

export function Header() {
  const { t, currentLanguage, setLanguage, languages } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { key: 'company', label: t('nav.company') },
    { key: 'products', label: t('nav.business') },
    { key: 'store', label: t('nav.store') },
  ];

  const currentLang = languages.find(l => l.code === currentLanguage);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLangDropdownOpen(false);
    };
    if (isLangDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isLangDropdownOpen]);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-black dark:bg-[#FFD700] flex items-center justify-center rounded-sm">
              <span className="font-['Oswald'] font-bold text-xl text-[#FFD700] dark:text-black tracking-tight">
                KGT
              </span>
            </div>
            <span className="font-['Oswald'] font-bold text-2xl tracking-tighter text-black dark:text-white">
              GLOBAL
            </span>
          </button>

          {/* Desktop Navigation — centered via justify-between */}

          {/* 변경 전: <nav className=" lg:flex items-center gap-20">
            * 변경 후: <nav className="flex items-center" style={{ gap: 'clamp(1rem, 4vw, 5rem)'}}>
                                  
                              항상 flex 적용             유동 gap (16px ~ 80px)
            * lg:flex → flex로 바꾼 이유: 모바일에서도 보이기위해 항상 display: flex가 필요
                                        . lg:flex만 있으면 1024px 미만에서 flex가 꺼지고, gap이 무시됨
          
            * clamp(1rem, 4vw, 5rem) 값의 의미:
              - 1rem (16px): 아무리 좁아도 이 이하로는 gap이 줄지 않음
              - 4vw: 화면 너비의 4%를 gap으로 사용 (비례 스케일링)
              - 5rem (80px): 아무리 넓어도 이 이상으로 gap이 커지지 않음 (= gap-20과 동일) */}
          <nav className="flex items-center" style={{ gap: 'clamp(1rem, 4vw, 5rem)'}}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center" style={{ gap: 'clamp(0.3rem, 2vw, 3rem)'}}>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                }}
                className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors"
              >
                <span className="material-icons-outlined text-lg mr-1">language</span>
                {currentLang?.code.toUpperCase()}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        currentLanguage === lang.code ? 'bg-gray-50 dark:bg-gray-900' : ''
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Button */}
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#FFD700] text-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#FFA000] transition-colors rounded-sm"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile: Dark Mode Toggle
          <div className="lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
}

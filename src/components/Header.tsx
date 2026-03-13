import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from '../utils/i18n';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/theme';

export function Header() {
  const { t, currentLanguage, setLanguage, languages } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { key: 'company', label: t('nav.company') },
    { key: 'products', label: t('nav.business') },
    { key: 'store', label: t('nav.store') },
  ];

  const currentLang = languages.find((l) => l.code === currentLanguage);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      setIsLangDropdownOpen(false);
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent, key: string) => {
    if (key === 'store') {
      e.preventDefault();
      alert(String(t('nav.storeNotice')));
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-2">
            {/* Hamburger — mobile only */}
            <button
              ref={hamburgerRef}
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              )}
            </button>

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
          </div>

          {/* Desktop Navigation — hidden on mobile */}
          <nav className="hidden md:flex items-center" style={{ gap: 'clamp(1rem, 4vw, 5rem)' }}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                onClick={(e) => handleNavClick(e, item.key)}
                className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center" style={{ gap: 'clamp(0.3rem, 2vw, 3rem)' }}>
            {/* Dark Mode Toggle — desktop only */}
            <button
              onClick={toggleTheme}
              className="hidden md:inline-flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Language Selector — desktop only */}
            <div className="relative hidden md:block">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                }}
                className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors"
              >
                <Globe className="w-4 h-4 mr-1" />
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

            {/* Contact Button — always visible, fixed size */}
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#FFD700] text-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#FFA000] transition-colors rounded-sm whitespace-nowrap"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 px-4 py-4">
          {/* Nav Items */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                onClick={(e) => {
                  handleNavClick(e, item.key);
                  closeMobileMenu();
                }}
                className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors py-3 px-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-3" />

          {/* Dark Mode + Language */}
          <div className="flex items-center justify-between px-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                }}
                className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Globe className="w-4 h-4 mr-1" />
                {currentLang?.code.toUpperCase()}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-32 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 shadow-lg z-50">
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
          </div>
        </div>
      </div>
      {/* Header-body divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
    </header>
  );
}

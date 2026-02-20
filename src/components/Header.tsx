import { useState, useEffect } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { useTranslation } from '../utils/i18n';
import { useNavigate } from 'react-router';

export function Header() {
  const { t, currentLanguage, setLanguage, languages } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { key: 'company', label: 'Company Profile' },
    { key: 'products', label: 'Products' },
    { key: 'quality', label: 'Quality Control' },
    { key: 'sustainability', label: 'Sustainability' },
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
        <div className="flex justify-between items-center h-20">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
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
                      {lang.name}
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
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 hover:text-[#FFD700] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Language
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 text-sm border rounded-sm transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-[#FFD700] text-black border-[#FFD700] font-medium'
                          : 'border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-[#FFD700]'
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#FFD700] text-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#FFA000] transition-colors rounded-sm"
              >
                Contact Us
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

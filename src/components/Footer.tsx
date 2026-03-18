import { FormEvent, useState } from 'react';
import { Building2, Store, Phone, Printer } from 'lucide-react';
import { useTranslation } from '../utils/i18n';
import { features } from '../config/features';
import { api } from '../services/api';

type PolicyType = 'privacy' | 'terms' | null;
type SuggestionStatus = 'idle' | 'sending' | 'success' | 'error';

const DEFAULT_SENDER_EMAIL = 'client.kgt.web@gmail.com';
const NAVER_STORE_URL = 'https://smartstore.naver.com';

export function Footer() {
  const { t, currentLanguage } = useTranslation();
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [suggestionStatus, setSuggestionStatus] = useState<SuggestionStatus>('idle');
  const [suggestion, setSuggestion] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSuggestionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuggestionStatus('sending');

    try {
      await api.contact.submit({
        name: suggestion.name || 'Anonymous',
        email: suggestion.email || DEFAULT_SENDER_EMAIL,
        senderEmail: DEFAULT_SENDER_EMAIL,
        subject: `[Feature Suggestion] ${suggestion.name || 'Anonymous'}`,
        message: suggestion.message,
      });

      setSuggestionStatus('success');
      setSuggestion({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSuggestionStatus('idle');
        setIsSuggestionOpen(false);
      }, 2000);
    } catch {
      setSuggestionStatus('error');
      setTimeout(() => setSuggestionStatus('idle'), 3000);
    }
  };

  return (
    <>
      <footer className="bg-[#111] text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#FFD700] flex items-center justify-center rounded-sm">
                  <span className="font-['Oswald'] font-bold text-black text-sm">KGT</span>
                </div>
                <span className="font-['Oswald'] font-bold text-xl text-white tracking-tighter">
                  GLOBAL
                </span>
              </div>
              <p className="text-sm leading-relaxed">{String(t('footer.description'))}</p>

              {/* Reserved for future official social channels */}
              {/**
              <div className="flex space-x-4 mt-6">
                <a href="#linkedin" className="text-gray-400 hover:text-[#FFD700] transition-colors">LinkedIn</a>
                <a href="#twitter" className="text-gray-400 hover:text-[#FFD700] transition-colors">Twitter</a>
              </div>
              */}

              {/* Legacy placeholders (kept for future scale-up)
              <div className="flex space-x-4 mt-6">
                <a href="#facebook" className="text-gray-400 hover:text-[#FFD700] transition-colors">Facebook</a>
                <a href="#youtube" className="text-gray-400 hover:text-[#FFD700] transition-colors">YouTube</a>
              </div>
              */}
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
                {String(t('footer.quickAccess'))}
              </h4>
              <div className="space-y-3 text-sm">
                {features.naverStore && (
                  <a
                    href={NAVER_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 border border-[#2DB400] text-[#2DB400] hover:bg-[#2DB400] hover:text-white transition-colors rounded-sm"
                  >
                    {String(t('footer.naverStore'))}
                  </a>
                )}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsSuggestionOpen(true)}
                    className="underline hover:text-white transition-colors"
                  >
                    {String(t('footer.sendSuggestion'))}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
                {String(t('footer.contactTitle'))}
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <Building2 className="w-4 h-4 mr-2 mt-0.5 text-[#FFD700] flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">{String(t('footer.headOffice'))}</span>
                    <p className="mt-1">{String(t('footer.headOfficeAddress'))}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Store className="w-4 h-4 mr-2 mt-0.5 text-[#FFD700] flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">
                      {String(t('footer.branchOffice'))}
                    </span>
                    <p className="mt-1">{String(t('footer.branchOfficeAddress'))}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#FFD700] flex-shrink-0" />
                  <span>051-265-7481</span>
                </li>
                <li className="flex items-center">
                  <Printer className="w-4 h-4 mr-2 text-[#FFD700] flex-shrink-0" />
                  <span>051-266-7481</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>{String(t('footer.copyright'))}</p>
              <p>사업자등록번호 734-81-02075 | 대표자 주창석</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                type="button"
                onClick={() => setActivePolicy('privacy')}
                className="hover:text-white transition-colors"
              >
                {String(t('footer.privacyPolicy'))}
              </button>
              <button
                type="button"
                onClick={() => setActivePolicy('terms')}
                className="hover:text-white transition-colors"
              >
                {String(t('footer.termsOfService'))}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {activePolicy && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white text-gray-900 rounded-sm shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="font-bold text-lg">
                {activePolicy === 'privacy'
                  ? String(t('footer.privacyPolicy'))
                  : String(t('footer.termsOfService'))}
              </h3>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="text-gray-500 hover:text-black"
              >
                {String(t('footer.close'))}
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm leading-relaxed max-h-[65vh] overflow-y-auto">
              {activePolicy === 'privacy' ? (
                <>
                  <p>{String(t('footer.privacyContent1'))}</p>
                  <p>{String(t('footer.privacyContent2'))}</p>
                  <p>{String(t('footer.privacyContent3'))}</p>
                </>
              ) : (
                <>
                  <p>{String(t('footer.termsContent1'))}</p>
                  <p>{String(t('footer.termsContent2'))}</p>
                  <p>{String(t('footer.termsContent3'))}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isSuggestionOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white text-gray-900 rounded-sm shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="font-bold text-lg">{String(t('footer.featureSuggestion'))}</h3>
              <button
                type="button"
                onClick={() => setIsSuggestionOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                {String(t('footer.close'))}
              </button>
            </div>
            <form onSubmit={handleSuggestionSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="suggestion-name">
                  {String(t('footer.suggestionName'))}
                </label>
                <input
                  id="suggestion-name"
                  type="text"
                  value={suggestion.name}
                  onChange={(e) => setSuggestion((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder={String(t('footer.suggestionNamePlaceholder'))}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="suggestion-email">
                  {String(t('footer.suggestionEmail'))}
                </label>
                <input
                  id="suggestion-email"
                  type="email"
                  value={suggestion.email}
                  onChange={(e) => setSuggestion((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder={String(t('footer.suggestionEmailPlaceholder'))}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="suggestion-message">
                  {String(t('footer.suggestionLabel'))}
                </label>
                <textarea
                  id="suggestion-message"
                  rows={5}
                  required
                  value={suggestion.message}
                  onInvalid={(e) =>
                    (e.target as HTMLTextAreaElement).setCustomValidity(
                      currentLanguage === 'ko'
                        ? '이 항목을 입력해주세요.'
                        : 'Please fill out this field.'
                    )
                  }
                  onChange={(e) => {
                    e.target.setCustomValidity('');
                    setSuggestion((prev) => ({ ...prev, message: e.target.value }));
                  }}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <button
                type="submit"
                disabled={suggestionStatus === 'sending'}
                className="bg-black text-white px-4 py-2 rounded-sm hover:bg-[#222] disabled:opacity-50"
              >
                {suggestionStatus === 'sending' ? '...' : String(t('footer.sendToDeveloper'))}
              </button>
              {suggestionStatus === 'success' && (
                <p className="text-green-600 text-sm font-medium">✓ Sent successfully</p>
              )}
              {suggestionStatus === 'error' && (
                <p className="text-red-600 text-sm font-medium">
                  Failed to send. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

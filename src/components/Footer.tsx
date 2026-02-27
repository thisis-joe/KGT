import { FormEvent, useState } from 'react';

type PolicyType = 'privacy' | 'terms' | null;

const DEVELOPER_EMAIL = 'wdg0434@gmail.com';
const NAVER_STORE_URL = 'https://smartstore.naver.com';

export function Footer() {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [suggestion, setSuggestion] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSuggestionSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = `[Feature Suggestion] ${suggestion.name || 'Anonymous'}`;
    const body = [
      `Name: ${suggestion.name || '-'}`,
      `Email: ${suggestion.email || '-'}`,
      '',
      suggestion.message,
    ].join('\n');

    window.location.href = `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSuggestionOpen(false);
    setSuggestion({ name: '', email: '', message: '' });
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
                <span className="font-['Oswald'] font-bold text-xl text-white tracking-tighter">GLOBAL</span>
              </div>
              <p className="text-sm leading-relaxed">
                Trusted provider of advanced adhesive solutions and functional tapes for industrial applications worldwide.
              </p>

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
              <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Quick Access</h4>
              <div className="space-y-3 text-sm">
                <a
                  href={NAVER_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-[#2DB400] text-[#2DB400] hover:bg-[#2DB400] hover:text-white transition-colors rounded-sm"
                >
                  Naver Smart Store
                </a>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsSuggestionOpen(true)}
                    className="underline hover:text-white transition-colors"
                  >
                    Send Feature Suggestion
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="material-icons-outlined text-sm mr-2 mt-1 text-[#FFD700]">location_on</span>
                  <span>2F, 40, Hasinjungang-ro 54beon-gil (Jangnim-dong), Saha-gu, Busan, Republic of Korea</span>
                </li>
                <li className="flex items-center">
                  <span className="material-icons-outlined text-sm mr-2 text-[#FFD700]">business</span>
                  <span>Head Office / R&amp;D Center</span>
                </li>
                <li className="flex items-center">
                  <span className="material-icons-outlined text-sm mr-2 text-[#FFD700]">store</span>
                  <span>Gyeonggi Sales Office</span>
                </li>
                <li className="flex items-center">
                  <span className="material-icons-outlined text-sm mr-2 text-[#FFD700]">phone</span>
                  <span>051-265-7481</span>
                </li>
                <li className="flex items-center">
                  <span className="material-icons-outlined text-sm mr-2 text-[#FFD700]">fax</span>
                  <span>051-266-7481</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>© 2023 KGT Global. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button type="button" onClick={() => setActivePolicy('privacy')} className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button type="button" onClick={() => setActivePolicy('terms')} className="hover:text-white transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {activePolicy && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white text-gray-900 rounded-sm shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="font-bold text-lg">{activePolicy === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h3>
              <button type="button" onClick={() => setActivePolicy(null)} className="text-gray-500 hover:text-black">Close</button>
            </div>
            <div className="p-6 space-y-4 text-sm leading-relaxed max-h-[65vh] overflow-y-auto">
              {activePolicy === 'privacy' ? (
                <>
                  <p>We collect only the minimum information required to respond to inquiries and provide requested services.</p>
                  <p>Collected data is used solely for business communication and is not shared with third parties without legal grounds.</p>
                  <p>For data requests or corrections, contact the company through the official inquiry channels.</p>
                </>
              ) : (
                <>
                  <p>This website content is provided for business information purposes and may be updated without prior notice.</p>
                  <p>Unauthorized copying, redistribution, or commercial use of content is restricted unless prior written consent is obtained.</p>
                  <p>Service availability may change due to maintenance or operational requirements.</p>
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
              <h3 className="font-bold text-lg">Feature Suggestion</h3>
              <button type="button" onClick={() => setIsSuggestionOpen(false)} className="text-gray-500 hover:text-black">Close</button>
            </div>
            <form onSubmit={handleSuggestionSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="suggestion-name">Name</label>
                <input
                  id="suggestion-name"
                  type="text"
                  value={suggestion.name}
                  onChange={(e) => setSuggestion((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="suggestion-email">Email</label>
                <input
                  id="suggestion-email"
                  type="email"
                  value={suggestion.email}
                  onChange={(e) => setSuggestion((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="suggestion-message">Suggestion</label>
                <textarea
                  id="suggestion-message"
                  rows={5}
                  required
                  value={suggestion.message}
                  onChange={(e) => setSuggestion((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-sm hover:bg-[#222]">
                Send to Developer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

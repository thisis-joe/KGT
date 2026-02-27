import { useEffect, useRef, useState, FormEvent } from 'react';
import { Send, Sun, Moon } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/i18n';
import { Footer } from '../components/Footer';

const DEFAULT_SENDER_EMAIL = 'client.kgt.web@gmail.com';
const RECEIVER_EMAIL = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || 'zaxs124124@gmail.com';

const NAVER_MAP_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID || '';
const KAKAO_MAP_APP_KEY = import.meta.env.VITE_KAKAO_MAP_APP_KEY || '';

type MapProvider = 'naver' | 'kakao';
type SubmitStatus = 'idle' | 'success' | 'privacy_error' | 'fallback' | 'mail_config_error';
type MapStatus = 'idle' | 'loading' | 'ready' | 'error';

const HEAD_OFFICE_ADDRESS = '2F, 40, Hasinjungang-ro 54beon-gil (Jangnim-dong), Saha-gu, Busan, Republic of Korea';
const BRANCH_ADDRESS = 'B-3321, Geumgang Penterium IX Tower, 27 Dongtancheomdansaneop 1-ro, Hwaseong-si, Gyeonggi-do, Republic of Korea';
const HEAD_OFFICE_COORDS = { lat: 35.0824, lng: 128.9667 };

function loadScript(id: string, src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      if ((existing as any).dataset.loaded === 'true') {
        resolve();
      } else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${id}`)), { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true';
        resolve();
      },
      { once: true }
    );
    script.addEventListener('error', () => reject(new Error(`Failed to load script: ${id}`)), { once: true });
    document.head.appendChild(script);
  });
}

export function ContactPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [isDark, setIsDark] = useState(false);
  const [mapProvider, setMapProvider] = useState<MapProvider>('naver');
  const [mapStatus, setMapStatus] = useState<MapStatus>('idle');
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    replyEmail: '',
    senderEmail: '',
    subject: '',
    message: '',
    privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [fallbackMailto, setFallbackMailto] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // Keep default office coords.
      },
      { timeout: 7000 }
    );
  }, []);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    const userCoords = currentPosition || HEAD_OFFICE_COORDS;

    const renderNaverMap = async () => {
      if (!NAVER_MAP_CLIENT_ID) {
        setMapStatus('error');
        return;
      }

      setMapStatus('loading');

      try {
        await loadScript(
          'naver-map-sdk',
          `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`
        );

        if (!window.naver?.maps) {
          setMapStatus('error');
          return;
        }

        const map = new window.naver.maps.Map(container, {
          center: new window.naver.maps.LatLng(HEAD_OFFICE_COORDS.lat, HEAD_OFFICE_COORDS.lng),
          zoom: 13,
        });

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(HEAD_OFFICE_COORDS.lat, HEAD_OFFICE_COORDS.lng),
          map,
          title: 'KGT Head Office / R&D Center',
        });

        if (currentPosition) {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(userCoords.lat, userCoords.lng),
            map,
            title: 'Current Location',
            icon: {
              content:
                '<div style="width:12px;height:12px;border-radius:999px;background:#03C75A;border:2px solid white;box-shadow:0 0 0 2px #03C75A66"></div>',
              anchor: new window.naver.maps.Point(6, 6),
            },
          });
        }

        setMapStatus('ready');
      } catch {
        setMapStatus('error');
      }
    };

    const renderKakaoMap = async () => {
      if (!KAKAO_MAP_APP_KEY) {
        setMapStatus('error');
        return;
      }

      setMapStatus('loading');

      try {
        await loadScript(
          'kakao-map-sdk',
          `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`
        );

        if (!window.kakao?.maps) {
          setMapStatus('error');
          return;
        }

        window.kakao.maps.load(() => {
          const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(HEAD_OFFICE_COORDS.lat, HEAD_OFFICE_COORDS.lng),
            level: 4,
          });

          const officeMarker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(HEAD_OFFICE_COORDS.lat, HEAD_OFFICE_COORDS.lng),
          });

          officeMarker.setMap(map);

          if (currentPosition) {
            const userMarker = new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(userCoords.lat, userCoords.lng),
            });
            userMarker.setMap(map);
          }

          setMapStatus('ready');
        });
      } catch {
        setMapStatus('error');
      }
    };

    if (mapProvider === 'naver') {
      renderNaverMap();
    } else {
      renderKakaoMap();
    }
  }, [mapProvider, currentPosition]);

  const currentCoords = currentPosition || HEAD_OFFICE_COORDS;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(HEAD_OFFICE_ADDRESS)}`;
  const kakaoMapUrl = `https://map.kakao.com/link/map/KGT,${currentCoords.lat},${currentCoords.lng}`;
  const selectedMapUrl = mapProvider === 'naver' ? naverMapUrl : kakaoMapUrl;

  const getMailtoUrl = (replyEmail: string, senderEmail: string) => {
    const subject = `[${formData.subject}] ${formData.name}`;
    const lines = [
      `Name: ${formData.name}`,
      `Company: ${formData.company || '-'}`,
      `Reply Email: ${replyEmail}`,
      `Sender Email: ${senderEmail}`,
      '',
      formData.message,
    ];
    return `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.privacy) {
      setSubmitStatus('privacy_error');
      return;
    }

    const replyEmail = formData.replyEmail.trim();
    const senderEmail = formData.senderEmail.trim() || DEFAULT_SENDER_EMAIL;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFallbackMailto('');

    try {
      await api.contact.submit({
        name: formData.name,
        company: formData.company,
        email: replyEmail,
        senderEmail,
        phone: '',
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        replyEmail: '',
        senderEmail: '',
        subject: '',
        message: '',
        privacy: false,
      });

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '';
      const mailtoUrl = getMailtoUrl(replyEmail, senderEmail);
      setFallbackMailto(mailtoUrl);

      if (errorMessage.includes('Mail server is not configured')) {
        setSubmitStatus('mail_config_error');
      } else {
        setSubmitStatus('fallback');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative w-12 h-12 flex items-center justify-center bg-transparent">
                <span className="font-['Oswald'] font-bold text-3xl tracking-tighter text-blue-900 dark:text-white">KGT</span>
                <div className="absolute inset-0 border-2 border-[#FFD700] rounded-full opacity-30 rotate-12"></div>
              </div>
            </button>

            <span className="text-sm font-bold text-[#FFD700] uppercase tracking-wider">{String(t('contactPage.nav.contactUs'))}</span>

            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        <section className="bg-[#1a1a1a] dark:bg-black text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-['Oswald'] font-bold uppercase tracking-wide">{String(t('contactPage.hero.title'))}</h1>
            <p className="mt-4 text-gray-400 max-w-2xl font-light text-lg">{String(t('contactPage.hero.subtitle'))}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="order-1 lg:order-2 bg-white dark:bg-[#1e1e1e] p-8 md:p-10 shadow-xl border-t-4 border-[#FFD700] rounded-sm">
              <h2 className="text-2xl font-['Oswald'] font-bold uppercase mb-2 text-gray-900 dark:text-white">{String(t('contactPage.form.title'))}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{String(t('contactPage.form.description'))}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {String(t('contactPage.form.yourName'))} <span className="text-[#FFD700]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={String(t('contact.form.namePlaceholder'))}
                      className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{String(t('contactPage.form.companyName'))}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={String(t('contact.form.companyPlaceholder'))}
                      className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="replyEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {String(t('contact.form.email'))} <span className="text-[#FFD700]">*</span>
                  </label>
                  <input
                    type="email"
                    id="replyEmail"
                    name="replyEmail"
                    required
                    value={formData.replyEmail}
                    onChange={handleChange}
                    placeholder={String(t('contact.form.emailPlaceholder'))}
                    className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>

                <div>
                  <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {String(t('contactPage.form.emailAddress'))}
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    placeholder={DEFAULT_SENDER_EMAIL}
                    className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{String(t('contactPage.form.emailHint'))} {DEFAULT_SENDER_EMAIL}</p>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {String(t('contactPage.form.subject'))} <span className="text-[#FFD700]">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={String(t('contact.form.subjectPlaceholder'))}
                    className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {String(t('contactPage.form.message'))} <span className="text-[#FFD700]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={String(t('contact.form.messagePlaceholder'))}
                    className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] resize-none"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      required
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="focus:ring-[#FFD700] h-4 w-4 text-[#FFD700] border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="font-medium text-gray-700 dark:text-gray-300">
                      {String(t('contactPage.form.privacyPrefix'))} <span className="text-[#FFD700]">{String(t('contactPage.form.privacyPolicy'))}</span>
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">{String(t('contactPage.form.privacyDescription'))}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-4 px-6 rounded-sm border-b-4 border-[#FFD700] uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? String(t('contactPage.form.sending')) : String(t('contactPage.form.submit'))}</span>
                  <Send className="w-4 h-4 text-[#FFD700]" />
                </button>

                {submitStatus === 'success' && <div className="p-4 bg-green-50 border-2 border-green-500 text-green-800 rounded-sm">{String(t('contactPage.form.success'))}</div>}
                {submitStatus === 'privacy_error' && <div className="p-4 bg-red-50 border-2 border-red-500 text-red-800 rounded-sm">{String(t('contactPage.form.privacyError'))}</div>}
                {(submitStatus === 'fallback' || submitStatus === 'mail_config_error') && (
                  <div className="p-4 bg-yellow-50 border-2 border-yellow-500 text-yellow-900 rounded-sm space-y-2">
                    <p>{submitStatus === 'fallback' ? String(t('contactPage.form.fallback')) : String(t('contactPage.form.mailConfigError'))}</p>
                    <a href={fallbackMailto || `mailto:${RECEIVER_EMAIL}`} className="underline font-semibold break-all">{RECEIVER_EMAIL}</a>
                  </div>
                )}
              </form>
            </div>

            <div className="order-2 lg:order-1 space-y-12">
              <div>
                <h2 className="text-2xl font-['Oswald'] font-bold uppercase mb-8 border-l-4 border-[#FFD700] pl-4 text-gray-900 dark:text-white">{String(t('contactPage.locations.title'))}</h2>

                <div className="mb-10 group">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-[#FFD700] transition-colors dark:text-white">
                    <span className="material-icons-outlined text-[#FFD700]">location_city</span>
                    {String(t('contactPage.locations.headOffice'))}
                  </h3>
                  <address className="not-italic text-gray-600 dark:text-gray-400 pl-8 space-y-2 border-l border-gray-200 dark:border-gray-700 ml-3">
                    <p>{HEAD_OFFICE_ADDRESS}</p>
                    <div className="pt-2 flex items-center gap-4 text-sm font-medium flex-wrap">
                      <span className="flex items-center gap-1"><span className="material-icons-outlined text-sm">phone</span> 051-265-7481</span>
                      <span className="flex items-center gap-1"><span className="material-icons-outlined text-sm">fax</span> 051-266-7481</span>
                    </div>
                  </address>
                </div>

                <div className="group">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-[#FFD700] transition-colors dark:text-white">
                    <span className="material-icons-outlined text-[#FFD700]">store</span>
                    {String(t('contactPage.locations.branchOffice'))}
                  </h3>
                  <address className="not-italic text-gray-600 dark:text-gray-400 pl-8 space-y-2 border-l border-gray-200 dark:border-gray-700 ml-3">
                    <p>{BRANCH_ADDRESS}</p>
                    <div className="pt-2 flex items-center gap-4 text-sm font-medium flex-wrap">
                      <span className="flex items-center gap-1"><span className="material-icons-outlined text-sm">phone</span> 051-265-7481</span>
                      <span className="flex items-center gap-1"><span className="material-icons-outlined text-sm">fax</span> 051-266-7481</span>
                    </div>
                  </address>
                </div>
              </div>

              <div className="relative w-full h-72 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700">
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMapProvider('naver')}
                    className={`px-3 py-1 text-xs font-bold rounded-sm border ${mapProvider === 'naver' ? 'bg-[#03C75A] text-white border-[#03C75A]' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    NAVER
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapProvider('kakao')}
                    className={`px-3 py-1 text-xs font-bold rounded-sm border ${mapProvider === 'kakao' ? 'bg-[#FEE500] text-black border-[#FEE500]' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    KAKAO
                  </button>
                </div>

                <div ref={mapRef} className="w-full h-full" />

                {mapStatus !== 'ready' && (
                  <div className="absolute inset-0 bg-black/40 text-white text-xs flex items-center justify-center text-center p-4">
                    {mapStatus === 'error'
                      ? 'Map SDK is unavailable. Configure API key and use the external map button.'
                      : 'Loading map...'}
                  </div>
                )}

                <a
                  href={selectedMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 text-xs font-bold border border-gray-300 rounded-sm hover:text-[#FFD700]"
                >
                  Open in {mapProvider === 'naver' ? 'Naver' : 'Kakao'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

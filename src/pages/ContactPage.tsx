import { useState, FormEvent } from 'react';
import { Send, Sun, Moon } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router';

const DEFAULT_SENDER_EMAIL = 'client.kgt.web@gmail.com';
const RECEIVER_EMAIL = 'zaxs124124@gmail.com';

export function ContactPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    subject: 'Product Inquiry',
    message: '',
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'privacy_error' | 'fallback'>('idle');
  const [fallbackMailto, setFallbackMailto] = useState('');

  const getMailtoUrl = (senderEmail: string) => {
    const subject = `[${formData.subject}] ${formData.name}`;
    const lines = [
      `Name: ${formData.name}`,
      `Company: ${formData.company || '-'}`,
      `Email: ${senderEmail}`,
      '',
      formData.message,
    ];
    return `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      setSubmitStatus('privacy_error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFallbackMailto('');
    const senderEmail = formData.email.trim() || DEFAULT_SENDER_EMAIL;

    try {
      await api.contact.submit({
        name: formData.name,
        company: formData.company,
        email: senderEmail,
        phone: '',
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFallbackMailto('');
      
      // Reset form after success
      setFormData({
        name: '',
        company: '',
        email: '',
        subject: 'Product Inquiry',
        message: '',
        privacy: false,
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      const mailtoUrl = getMailtoUrl(senderEmail);
      setFallbackMailto(mailtoUrl);
      setSubmitStatus('fallback');

      // Try to open an email client, but still show a visible fallback message if unavailable.
      window.location.href = mailtoUrl;
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
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative w-12 h-12 flex items-center justify-center bg-transparent">
                <span className="font-['Oswald'] font-bold text-3xl tracking-tighter text-blue-900 dark:text-white">
                  KGT
                </span>
                <div className="absolute inset-0 border-2 border-[#FFD700] rounded-full opacity-30 rotate-12"></div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12 items-center">
              <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-[#FFD700] transition-colors dark:text-gray-300 dark:hover:text-[#FFD700]">
                Company Profile
              </button>
              <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-[#FFD700] transition-colors dark:text-gray-300 dark:hover:text-[#FFD700]">
                Product
              </button>
              <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-[#FFD700] transition-colors dark:text-gray-300 dark:hover:text-[#FFD700]">
                Quality Control
              </button>
              <span className="text-sm font-bold text-[#FFD700] border-b-2 border-[#FFD700] pb-1">
                Contact Us
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800">
                <span className="material-icons-outlined text-3xl text-gray-800 dark:text-white">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-20">
        <section className="bg-[#1a1a1a] dark:bg-black text-white py-16 relative overflow-hidden">
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-['Oswald'] font-bold uppercase tracking-wide">
              Contact <span className="text-[#FFD700]">Us</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-2xl font-light text-lg">
              Global specialists in functional tape and adhesive materials. We are ready to answer your inquiries with precision and speed.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Locations */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-['Oswald'] font-bold uppercase mb-8 border-l-4 border-[#FFD700] pl-4 text-gray-900 dark:text-white">
                  Our Locations
                </h2>

                {/* Busan Head Office */}
                <div className="mb-10 group">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-[#FFD700] transition-colors dark:text-white">
                    <span className="material-icons-outlined text-[#FFD700]">location_city</span>
                    Busan Head Office
                  </h3>
                  <address className="not-italic text-gray-600 dark:text-gray-400 pl-8 space-y-2 border-l border-gray-200 dark:border-gray-700 ml-3">
                    <p>123 Industrial Complex-ro, Sasang-gu</p>
                    <p>Busan, South Korea 47000</p>
                    <div className="pt-2 flex items-center gap-4 text-sm font-medium flex-wrap">
                      <span className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">phone</span> +82 51-123-4567
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">fax</span> +82 51-123-4568
                      </span>
                    </div>
                  </address>
                </div>

                {/* Gyeonggi Branch */}
                <div className="group">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-[#FFD700] transition-colors dark:text-white">
                    <span className="material-icons-outlined text-[#FFD700]">store</span>
                    Gyeonggi Branch
                  </h3>
                  <address className="not-italic text-gray-600 dark:text-gray-400 pl-8 space-y-2 border-l border-gray-200 dark:border-gray-700 ml-3">
                    <p>88 Tech Valley-ro, Pangyo-gu</p>
                    <p>Seongnam-si, Gyeonggi-do, South Korea 13000</p>
                    <div className="pt-2 flex items-center gap-4 text-sm font-medium flex-wrap">
                      <span className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">phone</span> +82 31-987-6543
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">email</span> info@kgt-tapes.com
                      </span>
                    </div>
                  </address>
                </div>
              </div>

              {/* Map */}
              <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden shadow-inner">
                <img
                  alt="Map showing office locations"
                  className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://images.unsplash.com/photo-1762440717180-72f2b4f9bd39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGtvcmVhJTIwY2l0eSUyMG1hcHxlbnwxfHx8fDE3NzE1NTgzNDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white dark:bg-[#1e1e1e] px-4 py-2 shadow-lg text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors border border-gray-100 dark:border-gray-700 rounded-sm">
                    View Interactive Map
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 shadow-xl border-t-4 border-[#FFD700] rounded-sm">
              <h2 className="text-2xl font-['Oswald'] font-bold uppercase mb-2 text-gray-900 dark:text-white">
                Send an Inquiry
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Please fill out the form below. Fields marked with <span className="text-[#FFD700]">*</span> are required.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name <span className="text-[#FFD700]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="KGT Global Ltd."
                      className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all dark:text-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={DEFAULT_SENDER_EMAIL}
                    className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Leave blank to send with the default sender: {DEFAULT_SENDER_EMAIL}
                  </p>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all dark:text-white"
                  >
                    <option>Product Inquiry</option>
                    <option>Quotation Request</option>
                    <option>Technical Support</option>
                    <option>Partnership Proposal</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message <span className="text-[#FFD700]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your requirements in detail..."
                    className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all dark:text-white resize-none"
                  />
                </div>

                {/* Privacy */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      required
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="focus:ring-[#FFD700] h-4 w-4 text-[#FFD700] border-gray-300 rounded dark:bg-black dark:border-gray-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="font-medium text-gray-700 dark:text-gray-300">
                      I agree to the <a href="#privacy" className="text-[#FFD700] hover:underline">Privacy Policy</a>
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Your personal data will be used to process your inquiry.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-4 px-6 rounded-sm shadow-lg transform hover:-translate-y-1 transition-all duration-200 border-b-4 border-[#FFD700] dark:bg-white dark:text-black dark:border-[#FFD700] dark:hover:bg-gray-200 uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                  <Send className="w-4 h-4 text-[#FFD700] dark:text-black" />
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 text-green-800 dark:text-green-300 rounded-sm">
                    Your inquiry has been submitted successfully!
                  </div>
                )}
                {submitStatus === 'privacy_error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 text-red-800 dark:text-red-300 rounded-sm">
                    Please agree to the Privacy Policy before submitting.
                  </div>
                )}
                {submitStatus === 'fallback' && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 text-yellow-900 dark:text-yellow-200 rounded-sm space-y-2">
                    <p>Server connection failed. Please send your inquiry by email instead.</p>
                    <a href={fallbackMailto} className="underline font-semibold break-all">
                      {RECEIVER_EMAIL}
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-300 py-12 mt-auto border-t-8 border-[#FFD700] dark:bg-black dark:border-[#FFD700]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <span className="font-['Oswald'] font-bold text-3xl tracking-tighter text-white mb-4 block">
                KGT
              </span>
              <p className="text-sm text-gray-400 max-w-sm">
                Leading provider of advanced adhesive solutions and functional tapes for industrial applications worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold uppercase mb-4 tracking-wider text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-[#FFD700] transition-colors">Company Profile</button></li>
                <li><button onClick={() => navigate('/')} className="hover:text-[#FFD700] transition-colors">Products</button></li>
                <li><button onClick={() => navigate('/')} className="hover:text-[#FFD700] transition-colors">Sustainability</button></li>
                <li><button onClick={() => navigate('/')} className="hover:text-[#FFD700] transition-colors">Contact Us</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold uppercase mb-4 tracking-wider text-sm">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#privacy" className="hover:text-[#FFD700] transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-[#FFD700] transition-colors">Terms of Service</a></li>
                <li><a href="#sitemap" className="hover:text-[#FFD700] transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 KGT Corporation. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>LinkedIn
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

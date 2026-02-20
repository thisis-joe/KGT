export function Footer() {
  const footerLinks = {
    company: [
      { label: 'About KGT', href: '#about' },
      { label: 'CEO Message', href: '#ceo' },
      { label: 'History', href: '#history' },
      { label: 'Certificates', href: '#certificates' },
    ],
    products: [
      { label: 'Industrial Tapes', href: '#tapes' },
      { label: 'Protection Films', href: '#films' },
      { label: 'Foam Tapes', href: '#foam' },
      { label: 'Adhesive Agents', href: '#agents' },
    ],
  };

  return (
    <footer className="bg-[#111] text-gray-400 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#FFD700] flex items-center justify-center rounded-sm">
                <span className="font-['Oswald'] font-bold text-black text-sm">KGT</span>
              </div>
              <span className="font-['Oswald'] font-bold text-xl text-white tracking-tighter">GLOBAL</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Leading manufacturer of industrial tapes and advanced adhesive solutions connecting industries worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#facebook" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                <span className="material-icons-outlined">facebook</span>
              </a>
              <a href="#youtube" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                <span className="material-icons-outlined">smart_display</span>
              </a>
              <a href="#email" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                <span className="material-icons-outlined">alternate_email</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-[#FFD700] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
              Products
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-[#FFD700] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="material-icons-outlined text-sm mr-2 mt-1 text-[#FFD700]">location_on</span>
                <span>123 Industrial Park Rd, Seoul, South Korea</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined text-sm mr-2 text-[#FFD700]">phone</span>
                <span>+82 2-1234-5678</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined text-sm mr-2 text-[#FFD700]">email</span>
                <span>sales@kgt-global.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2023 KGT Global. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

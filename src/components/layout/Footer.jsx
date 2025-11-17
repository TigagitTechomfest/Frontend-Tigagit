import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1A202C] text-gray-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <h3 className="text-white font-bold text-2xl mb-4">
              Health & Digital Nutrition
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Aplikasi untuk membantu Anda melacak asupan nutrisi harian dan mencapai tujuan kesehatan Anda dengan mudah.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#2D3748] rounded-full flex items-center justify-center hover:bg-[#4ECDC4] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <span className="text-lg">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2D3748] rounded-full flex items-center justify-center hover:bg-[#4ECDC4] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <span className="text-lg">🐦</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2D3748] rounded-full flex items-center justify-center hover:bg-[#4ECDC4] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2D3748] rounded-full flex items-center justify-center hover:bg-[#4ECDC4] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-lg">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/food-diary" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  Jurnal Makanan
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  Progres
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  Dokumentasi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                  Panduan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">
                📧 support@healthnutrition.com
              </li>
              <li className="text-gray-400">
                📞 +62 123 456 789
              </li>
              <li className="text-gray-400">
                📍 Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#2D3748] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Health & Digital Nutrition. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

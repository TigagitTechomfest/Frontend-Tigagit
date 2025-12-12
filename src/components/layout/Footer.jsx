import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import LogoWellNezt from '../../assets/images/Logo2.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Jurnal Makanan', path: '/food-diary' },
      { label: 'Progres', path: '/progress' },
      { label: 'Profil', path: '/profile' },
    ],
    company: [
      { label: 'Tentang Kami', path: 'https://smkrus.sch.id/' },
      { label: 'Blog', path: 'https://smkrus.sch.id/' },
      { label: 'Kontak', path: 'https://smkrus.sch.id/kontak/' },
    ],

  };



  return (
    <footer className="bg-white border-t border-gray-200 mt-16 md:mt-20">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Column */}
          <div>
            <div className="mb-6">
              <img src={LogoWellNezt} alt="WellNest Logo" className="w-28 h-auto object-contain" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Platform nutrisi dan kesehatan untuk gaya hidup yang lebih baik.
            </p>

            
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">
              Produk
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">
              School
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         

          {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:support@wellnest.com"
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>wellnezt8@gmail.com</span>
              </a>
      
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Kudus, Jawa Tengah, Indonesia</span>
              </div>
            </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-600 text-center md:text-left">
            © {currentYear} WellNest. Semua hak dilindungi. Dibuat dengan ❤️ untuk kesehatan Anda.
          </p>

      
        </div>
      </div>
    </footer>
  );
};

export default Footer;
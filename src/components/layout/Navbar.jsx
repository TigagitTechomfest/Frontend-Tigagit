import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import LogoNutriGO from '../../assets/images/LogoNutriGO.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="font-bold text-lg text-[#1A202C] hover:text-[#4ECDC4] transition-colors">
              <img src={LogoNutriGO} alt="NutriGo Logo" className="w-30 h-30 object-contain" />
            </Link>
          </div>

          {/* Center Navigation */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-baseline space-x-8">
              <Link
                to="/dashboard"
                className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors text-sm"
              >
                Dashboard
              </Link>
              <Link
                to="/food-diary"
                className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors text-sm"
              >
                Jurnal Makanan
              </Link>
              <Link
                to="/progress"
                className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors text-sm"
              >
                Progres
              </Link>
              <Link
                to="/profile"
                className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors text-sm"
              >
                Profil
              </Link>
            </div>
          )}

          {/* Right Side - Auth */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-[#8E9AAF] hidden sm:block">Halo, {user?.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors text-sm cursor-pointer"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-[#000000] font-medium transition-colors text-sm cursor-pointer">
                    Masuk
                  </button>
                </Link>
                <Link to="/register">
                  <button className="text-[#000000] font-medium transition-colors text-sm cursor-pointer">
                    Daftar
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
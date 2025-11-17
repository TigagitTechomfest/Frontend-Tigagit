import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Button from '../common/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-[#1A202C] hover:text-[#4ECDC4] transition-colors">
              Health & Digital Nutrition
            </Link>
            {isAuthenticated && (
              <div className="ml-10 hidden lg:flex items-baseline space-x-6">
                <Link
                  to="/dashboard"
                  className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/food-diary"
                  className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors"
                >
                  Jurnal Makanan
                </Link>
                <Link
                  to="/progress"
                  className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors"
                >
                  Progres
                </Link>
                <Link
                  to="/profile"
                  className="text-[#8E9AAF] hover:text-[#4ECDC4] font-medium transition-colors"
                >
                  Profil
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-[#8E9AAF] hidden sm:block">Halo, {user?.name || 'User'}</span>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-[#8E9AAF] hover:text-[#4ECDC4]"
                >
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-[#8E9AAF] hover:text-[#4ECDC4]">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="primary" 
                    className="bg-[#4ECDC4] text-white hover:bg-[#5F9EA0]"
                  >
                    Daftar
                  </Button>
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

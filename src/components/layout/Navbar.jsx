import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import LogoWellNezt from '../../assets/images/Logo2.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✨ STATE SIDEBAR

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 md:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo + Hamburger */}
            <div className="flex items-center gap-4">
              {/* ✨ Hamburger Menu - Mobile only */}
              {isAuthenticated && (
                <button
                  onClick={toggleSidebar}
                  className="md:hidden text-gray-700 hover:text-[#4ECDC4] transition-colors p-2"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                  <img src={LogoWellNezt} alt="NutriGo Logo" className="w-30 h- object-contain" />
              
              </Link>
            </div>

            {/* Center Navigation - Desktop only */}
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

            {/* Right: Auth Section */}
            <div className="flex items-center gap-4 md:gap-6">
              {isAuthenticated ? (
                <>
                  {/* User Info - Hidden on small screens */}
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-[#1A202C]">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-[#8E9AAF]">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 
                      hover:bg-red-100 font-medium transition-all duration-200 text-sm"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Keluar</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="text-[#1A202C] font-medium hover:text-[#4ECDC4] 
                      transition-colors text-sm">
                      Masuk
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 bg-[#4ECDC4] text-white font-medium 
                      rounded-lg hover:bg-[#44B0A8] transition-all duration-200 text-sm">
                      Daftar
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ✨ SIDEBAR - MOBILE ONLY */}
      {isAuthenticated && (
        <>
          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 top-20"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`
              fixed md:hidden top-20 left-0 bottom-0 w-64 bg-gradient-to-br from-gray-50 to-gray-100 
              border-r border-gray-200 shadow-lg z-50
              transform transition-transform duration-300
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            {/* Menu Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Menu</h2>
            </div>

            {/* Navigation Menu */}
            <nav className="px-4 py-6 space-y-2">
              <Link
                to="/dashboard"
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-[#4ECDC4] 
                  font-medium transition-all duration-200 text-sm"
              >
                Dashboard
              </Link>
              <Link
                to="/food-diary"
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-[#4ECDC4] 
                  font-medium transition-all duration-200 text-sm"
              >
                Jurnal Makanan
              </Link>
              <Link
                to="/progress"
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-[#4ECDC4] 
                  font-medium transition-all duration-200 text-sm"
              >
                Progres
              </Link>
              <Link
                to="/profile"
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-[#4ECDC4] 
                  font-medium transition-all duration-200 text-sm"
              >
                Profil
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
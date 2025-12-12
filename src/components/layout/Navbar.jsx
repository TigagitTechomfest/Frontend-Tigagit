import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Home, FileText, TrendingUp, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import LogoWellNezt from '../../assets/images/Logo2.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Jurnal Makanan', path: '/food-diary', icon: FileText },
    { label: 'Progres', path: '/progress', icon: TrendingUp },
    { label: 'Profil', path: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 md:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo + Hamburger */}
            <div className="flex items-center gap-4">
              {/* Hamburger Menu - Mobile only */}
              {isAuthenticated && (
                <button
                  onClick={toggleSidebar}
                  className="md:hidden text-gray-700 hover:text-emerald-600 transition-colors p-2 hover:bg-emerald-50 rounded-lg"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img src={LogoWellNezt} alt="WellNest Logo" className="w-32 h-auto object-contain" />
              </Link>
            </div>

            {/* Center Navigation - Desktop only */}
            {isAuthenticated && (
              <div className="hidden lg:flex items-center space-x-1">
                {menuItems.map((item) => (
                  <Link key={item.path} to={item.path}>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                        isActive(item.path)
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </Link>
                ))}
              </div>
            )}

            {/* Right: Auth Section */}
            <div className="flex items-center gap-3 md:gap-6">
              {isAuthenticated ? (
                <>
                  {/* User Info - Hidden on small screens */}
                  <div className="hidden sm:block text-right border-r border-gray-200 pr-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-red-50 text-red-600 
                      hover:bg-red-100 hover:shadow-md font-semibold transition-all duration-200 text-sm"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Keluar</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="text-gray-700 font-semibold hover:text-emerald-600 
                      transition-colors text-sm">
                      Masuk
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold 
                      rounded-lg hover:shadow-lg transition-all duration-200 text-sm">
                      Daftar
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR - MOBILE ONLY */}
      {isAuthenticated && (
        <>
          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 top-20"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`
              fixed md:hidden top-20 left-0 bottom-0 w-64 
              bg-gradient-to-b from-white to-emerald-50 
              border-r border-emerald-200 shadow-xl z-50
              transform transition-transform duration-300 ease-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
  

            {/* Navigation Menu */}
            <nav className="px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                  >
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold 
                        transition-all duration-300 text-sm ${
                          active
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="mx-4 my-4 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>

            {/* Logout Button */}
            <div className="px-4 pb-6">
              <button
                onClick={() => {
                  closeSidebar();
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold 
                  text-red-600 hover:bg-red-50 transition-all duration-300 text-sm"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
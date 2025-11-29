import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const token = localStorage.getItem('token');

  console.log('🛡️ ProtectedRoute - Checking access:', { 
    isAuthenticated, 
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 20)}...` : 'null'
  });

  // Jika tidak ada token DAN tidak authenticated, redirect ke login
  if (!isAuthenticated && !token) {
    console.log('❌ Access DENIED - Redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // Jika ada token tapi isAuthenticated false, set isAuthenticated
  if (token && !isAuthenticated) {
    console.log('⚠️ Token exists but not authenticated - allowing access');
    // Token ada, tapi mungkin checkAuth belum dipanggil
    // Tetap izinkan akses, nanti akan di-verify di ProfilePage
  }

  console.log('✅ Access GRANTED');
  return children;
};

export default ProtectedRoute;
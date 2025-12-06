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

  if (!isAuthenticated && !token) {
    console.log('❌ Access DENIED - Redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (token && !isAuthenticated) {
    console.log('⚠️ Token exists but not authenticated - allowing access');
  }

  console.log('✅ Access GRANTED');
  return children;
};

export default ProtectedRoute;
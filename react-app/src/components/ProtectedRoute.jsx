import { Navigate } from 'react-router-dom';
import { auth } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = auth.login(formData.email, formData.password);
    
    if (result.success) {
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setToast({ message: result.error, type: 'error' });
    }
  };

  return (
    <div className="auth-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to your TicketFlow account</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          
          <p className="auth-footer">
            Don't have an account? <Link to="/auth/signup">Sign up</Link>
          </p>
          
          <p className="auth-demo">
            <strong>Demo credentials:</strong><br />
            Email: demo@ticketflow.com<br />
            Password: demo123
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;


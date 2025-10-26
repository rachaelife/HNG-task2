import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        
        <div className="container hero-content">
          <h1 className="hero-title">TicketFlow</h1>
          <p className="hero-subtitle">
            Streamline your support workflow with our powerful ticket management system
          </p>
          <div className="hero-buttons">
            <Link to="/auth/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/auth/signup" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
        
        <svg className="hero-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TicketFlow?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Easy Ticket Management</h3>
              <p>Create, update, and track tickets with an intuitive interface</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Dashboard</h3>
              <p>Monitor ticket statistics and status at a glance</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>Your data is protected with industry-standard security</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Built with modern technologies for optimal performance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to get started?</h2>
            <p>Join thousands of teams managing their tickets efficiently</p>
            <Link to="/auth/signup" className="btn btn-primary">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;


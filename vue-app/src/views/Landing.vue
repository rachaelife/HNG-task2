<template>
  <div class="landing-page">
    <section class="hero">
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      
      <div class="container hero-content">
        <h1 class="hero-title">TicketFlow</h1>
        <p class="hero-subtitle">
          Streamline your support workflow with our powerful ticket management system
        </p>
        <div class="hero-buttons">
          <router-link to="/auth/login" class="btn btn-primary">
            Login
          </router-link>
          <router-link to="/auth/signup" class="btn btn-secondary">
            Get Started
          </router-link>
        </div>
      </div>
      
      <svg class="hero-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#ffffff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose TicketFlow?</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3>Easy Ticket Management</h3>
            <p>Create, update, and track tickets with an intuitive interface</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Real-time Dashboard</h3>
            <p>Monitor ticket statistics and status at a glance</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Your data is protected with industry-standard security</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built with modern technologies for optimal performance</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>Ready to get started?</h2>
          <p>Join thousands of teams managing their tickets efficiently</p>
          <router-link to="/auth/signup" class="btn btn-primary">
            Create Free Account
          </router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'Landing',
  components: {
    Footer
  }
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}

.hero {
  position: relative;
  background: linear-gradient(325deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  padding: 4rem 0 0 0;
  overflow: hidden;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background-color: var(--white);
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background-color: var(--white);
  bottom: 50px;
  left: -50px;
}

.hero-content {
  text-align: center;
  padding: 4rem 0;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
}

.features {
  padding: 4rem 0;
  background-color: var(--gray-light);
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: var(--gray-dark);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  color: var(--gray-dark);
}

.feature-card p {
  color: var(--gray);
  font-size: 0.95rem;
}

.cta-section {
  padding: 4rem 0;
  background-color: var(--white);
}

.cta-box {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  padding: 3rem;
  border-radius: var(--border-radius-lg);
  text-align: center;
}

.cta-box h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.cta-box p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>


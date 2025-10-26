<template>
  <div class="dashboard-page">
    <nav class="navbar">
      <div class="container navbar-content">
        <h1 class="navbar-brand">TicketFlow</h1>
        <div class="navbar-menu">
          <router-link to="/dashboard" class="nav-link active">Dashboard</router-link>
          <router-link to="/tickets" class="nav-link">Tickets</router-link>
          <button @click="handleLogout" class="btn btn-secondary btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="container main-content">
      <div class="dashboard-header">
        <h2>Welcome, {{ user?.name }}!</h2>
        <p>Here's an overview of your ticket system</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3>Total Tickets</h3>
            <p class="stat-number">{{ stats.total }}</p>
          </div>
        </div>

        <div class="stat-card stat-open">
          <div class="stat-icon">🟢</div>
          <div class="stat-content">
            <h3>Open</h3>
            <p class="stat-number">{{ stats.open }}</p>
          </div>
        </div>

        <div class="stat-card stat-progress">
          <div class="stat-icon">🟡</div>
          <div class="stat-content">
            <h3>In Progress</h3>
            <p class="stat-number">{{ stats.in_progress }}</p>
          </div>
        </div>

        <div class="stat-card stat-closed">
          <div class="stat-icon">⚫</div>
          <div class="stat-content">
            <h3>Closed</h3>
            <p class="stat-number">{{ stats.closed }}</p>
          </div>
        </div>
      </div>

      <div class="dashboard-section">
        <h3>Quick Actions</h3>
        <div class="action-buttons">
          <router-link to="/tickets" class="btn btn-primary">
            View All Tickets
          </router-link>
          <router-link to="/tickets" class="btn btn-secondary">
            Create New Ticket
          </router-link>
        </div>
      </div>

      <div class="dashboard-section">
        <h3>Getting Started</h3>
        <div class="getting-started">
          <div class="step">
            <div class="step-number">1</div>
            <h4>Create Tickets</h4>
            <p>Start by creating tickets for your support requests</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h4>Manage Status</h4>
            <p>Update ticket status as you work through them</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h4>Track Progress</h4>
            <p>Monitor your team's progress on the dashboard</p>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../utils/auth'
import { ticketService } from '../utils/tickets'
import Footer from '../components/Footer.vue'

export default {
  name: 'Dashboard',
  components: {
    Footer
  },
  setup() {
    const router = useRouter()
    const user = ref(null)
    const stats = ref({
      total: 0,
      open: 0,
      in_progress: 0,
      closed: 0
    })

    onMounted(() => {
      user.value = auth.getUser()
      stats.value = ticketService.getStats()
    })

    const handleLogout = () => {
      auth.logout()
      router.push('/')
    }

    return {
      user,
      stats,
      handleLogout
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: var(--gray-light);
}

.navbar {
  background-color: var(--white);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.navbar-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--gray);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary);
}

.main-content {
  padding: 2rem 0;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h2 {
  font-size: 2rem;
  color: var(--gray-dark);
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: var(--gray);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
}

.stat-content h3 {
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-dark);
}

.stat-open .stat-number {
  color: var(--status-open);
}

.stat-progress .stat-number {
  color: var(--status-in-progress);
}

.stat-closed .stat-number {
  color: var(--status-closed);
}

.dashboard-section {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
}

.dashboard-section h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-dark);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.getting-started {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.step {
  text-align: center;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--primary);
  color: var(--white);
  border-radius: 50%;
  font-weight: 700;
  margin-bottom: 1rem;
}

.step h4 {
  color: var(--gray-dark);
  margin-bottom: 0.5rem;
}

.step p {
  color: var(--gray);
  font-size: 0.9rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .navbar-menu {
    gap: 1rem;
  }

  .dashboard-header h2 {
    font-size: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>


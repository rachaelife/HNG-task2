<template>
  <div class="tickets-page">
    <nav class="navbar">
      <div class="container navbar-content">
        <h1 class="navbar-brand">TicketFlow</h1>
        <div class="navbar-menu">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          <router-link to="/tickets" class="nav-link active">Tickets</router-link>
          <button @click="handleLogout" class="btn btn-secondary btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="container main-content">
      <div class="tickets-header">
        <h2>Ticket Management</h2>
        <button @click="toggleForm" class="btn btn-primary">
          {{ showForm ? 'Cancel' : 'Create New Ticket' }}
        </button>
      </div>

      <div v-if="toast" class="toast-container">
        <Toast :message="toast.message" :type="toast.type" @close="toast = null" />
      </div>

      <div v-if="showForm" class="ticket-form-section">
        <h3>{{ editingId ? 'Edit Ticket' : 'Create New Ticket' }}</h3>
        <form @submit.prevent="handleSubmit" class="ticket-form">
          <div class="form-group">
            <label for="title">Title *</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              class="form-input"
              placeholder="Ticket title"
              required
            />
            <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-input"
              placeholder="Ticket description (max 500 characters)"
              rows="4"
            ></textarea>
            <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="status">Status *</label>
              <select v-model="formData.status" id="status" class="form-input" required>
                <option value="">Select status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <span v-if="errors.status" class="error-message">{{ errors.status }}</span>
            </div>

            <div class="form-group">
              <label for="priority">Priority</label>
              <select v-model="formData.priority" id="priority" class="form-input">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              {{ editingId ? 'Update Ticket' : 'Create Ticket' }}
            </button>
            <button type="button" @click="toggleForm" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div class="tickets-grid">
        <div v-if="tickets.length === 0" class="no-tickets">
          <p>No tickets yet. Create one to get started!</p>
        </div>

        <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
          <div class="ticket-header">
            <h3>{{ ticket.title }}</h3>
            <span :class="['status-badge', `status-${ticket.status}`]">
              {{ ticket.status.replace('_', ' ') }}
            </span>
          </div>

          <p v-if="ticket.description" class="ticket-description">
            {{ ticket.description }}
          </p>

          <div class="ticket-meta">
            <span class="priority" :class="`priority-${ticket.priority}`">
              {{ ticket.priority }}
            </span>
            <span class="date">
              {{ new Date(ticket.createdAt).toLocaleDateString() }}
            </span>
          </div>

          <div class="ticket-actions">
            <button @click="editTicket(ticket)" class="btn btn-sm btn-secondary">
              Edit
            </button>
            <button @click="deleteTicket(ticket.id)" class="btn btn-sm btn-danger">
              Delete
            </button>
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
import { ticketService, validateTicket } from '../utils/tickets'
import Toast from '../components/Toast.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'TicketManagement',
  components: {
    Toast,
    Footer
  },
  setup() {
    const router = useRouter()
    const tickets = ref([])
    const showForm = ref(false)
    const editingId = ref(null)
    const toast = ref(null)
    const formData = ref({
      title: '',
      description: '',
      status: '',
      priority: 'medium'
    })
    const errors = ref({})

    onMounted(() => {
      loadTickets()
    })

    const loadTickets = () => {
      tickets.value = ticketService.getAll()
    }

    const toggleForm = () => {
      showForm.value = !showForm.value
      if (!showForm.value) {
        resetForm()
      }
    }

    const resetForm = () => {
      formData.value = {
        title: '',
        description: '',
        status: '',
        priority: 'medium'
      }
      errors.value = {}
      editingId.value = null
    }

    const handleSubmit = () => {
      const validation = validateTicket(formData.value)
      if (!validation.isValid) {
        errors.value = validation.errors
        return
      }

      if (editingId.value) {
        const result = ticketService.update(editingId.value, formData.value)
        if (result.success) {
          toast.value = { message: 'Ticket updated successfully!', type: 'success' }
        } else {
          toast.value = { message: result.error, type: 'error' }
        }
      } else {
        const result = ticketService.create(formData.value)
        if (result.success) {
          toast.value = { message: 'Ticket created successfully!', type: 'success' }
        } else {
          toast.value = { message: result.error, type: 'error' }
        }
      }

      loadTickets()
      resetForm()
      showForm.value = false
    }

    const editTicket = (ticket) => {
      editingId.value = ticket.id
      formData.value = {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority
      }
      showForm.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const deleteTicket = (id) => {
      if (confirm('Are you sure you want to delete this ticket?')) {
        const result = ticketService.delete(id)
        if (result.success) {
          toast.value = { message: 'Ticket deleted successfully!', type: 'success' }
          loadTickets()
        } else {
          toast.value = { message: result.error, type: 'error' }
        }
      }
    }

    const handleLogout = () => {
      auth.logout()
      router.push('/')
    }

    return {
      tickets,
      showForm,
      editingId,
      toast,
      formData,
      errors,
      toggleForm,
      handleSubmit,
      editTicket,
      deleteTicket,
      handleLogout
    }
  }
}
</script>

<style scoped>
.tickets-page {
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

.tickets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.tickets-header h2 {
  font-size: 2rem;
  color: var(--gray-dark);
}

.ticket-form-section {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
}

.ticket-form-section h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-dark);
}

.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--gray-dark);
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.error-message {
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.no-tickets {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background: var(--white);
  border-radius: var(--border-radius-lg);
  color: var(--gray);
}

.ticket-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s, box-shadow 0.3s;
}

.ticket-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.ticket-header h3 {
  margin: 0;
  color: var(--gray-dark);
  flex: 1;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-open {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--status-open);
}

.status-in_progress {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--status-in-progress);
}

.status-closed {
  background-color: rgba(107, 114, 128, 0.1);
  color: var(--status-closed);
}

.ticket-description {
  color: var(--gray);
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.ticket-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.priority {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.priority-low {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.priority-medium {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.priority-high {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.date {
  color: var(--gray);
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-danger {
  background-color: var(--error);
  color: var(--white);
}

.btn-danger:hover {
  opacity: 0.9;
}

.toast-container {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .tickets-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .tickets-grid {
    grid-template-columns: 1fr;
  }
}
</style>


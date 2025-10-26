<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-box">
        <h1>Create Account</h1>
        
        <div v-if="toast" class="toast-container">
          <Toast :message="toast.message" :type="toast.type" @close="toast = null" />
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="Enter your full name"
              required
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-input"
              placeholder="Enter your email"
              required
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              class="form-input"
              placeholder="Enter your password"
              required
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              class="form-input"
              placeholder="Confirm your password"
              required
            />
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            Create Account
          </button>
        </form>

        <p class="auth-link">
          Already have an account? <router-link to="/auth/login">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../utils/auth'
import Toast from '../components/Toast.vue'

export default {
  name: 'Signup',
  components: {
    Toast
  },
  setup() {
    const router = useRouter()
    const formData = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    const errors = ref({})
    const toast = ref(null)

    const handleSubmit = () => {
      errors.value = {}
      
      if (!formData.value.name) {
        errors.value.name = 'Name is required'
      }
      if (!formData.value.email) {
        errors.value.email = 'Email is required'
      }
      if (!formData.value.password) {
        errors.value.password = 'Password is required'
      } else if (formData.value.password.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
      }
      if (formData.value.password !== formData.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match'
      }

      if (Object.keys(errors.value).length > 0) {
        return
      }

      const result = auth.signup(formData.value.name, formData.value.email, formData.value.password)
      
      if (result.success) {
        toast.value = { message: 'Account created successfully!', type: 'success' }
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        toast.value = { message: result.error, type: 'error' }
      }
    }

    return {
      formData,
      errors,
      toast,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  padding: 1rem;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-box {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

.auth-box h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--gray-dark);
  font-size: 1.5rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--gray-dark);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.error-message {
  display: block;
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn-block {
  width: 100%;
}

.auth-link {
  text-align: center;
  color: var(--gray);
}

.auth-link a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.auth-link a:hover {
  text-decoration: underline;
}

.toast-container {
  margin-bottom: 1rem;
}
</style>


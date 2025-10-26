<template>
  <div :class="['toast', `toast-${type}`]" role="alert">
    <span>{{ message }}</span>
    <button @click="$emit('close')" class="toast-close" aria-label="Close notification">
      ×
    </button>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success'
    }
  },
  emits: ['close'],
  mounted() {
    setTimeout(() => {
      this.$emit('close')
    }, 3000)
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  animation: slideIn 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 300px;
}

.toast-success {
  background-color: var(--success);
  color: var(--white);
}

.toast-error {
  background-color: var(--error);
  color: var(--white);
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>


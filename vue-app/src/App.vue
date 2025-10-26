<script>
import { onMounted } from 'vue'
import { initDemoData } from './utils/initDemoData'

export default {
  setup() {
    onMounted(() => {
      initDemoData()
    })
  }
}
</script>

<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

:root {
  --primary: #4F46E5;
  --secondary: #06B6D4;
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --gray: #6B7280;
  --gray-light: #F3F4F6;
  --gray-dark: #1F2937;
  --white: #FFFFFF;
  --status-open: #10B981;
  --status-in-progress: #F59E0B;
  --status-closed: #6B7280;
  --max-width: 1440px;
  --border-radius: 8px;
  --border-radius-lg: 12px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
  color: var(--gray-dark);
  background-color: var(--white);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background-color: var(--primary);
  color: var(--white);
}

.btn-primary:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background-color: var(--gray-light);
  color: var(--gray-dark);
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

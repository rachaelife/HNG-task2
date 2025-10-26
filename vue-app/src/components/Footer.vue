<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} TicketFlow. All rights reserved.</p>
      <p>Built with Vue.js for HNG Stage 2</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--gray-dark);
  color: var(--white);
  padding: var(--spacing-lg) 0;
  text-align: center;
  margin-top: var(--spacing-xl);
}

.footer p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}
</style>


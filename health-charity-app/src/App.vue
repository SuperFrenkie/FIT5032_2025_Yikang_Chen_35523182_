<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from './stores/user'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await signOut(auth)
    // Logout and redirect to the home page
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div id="app-container">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header role="banner">
      <div class="wrapper">
        <nav role="navigation" aria-label="Main navigation">
          <RouterLink to="/" aria-label="Go to home page">Home</RouterLink>
          <RouterLink to="/services" aria-label="View our services">Services</RouterLink>
          <RouterLink to="/locations" aria-label="Find our locations">Locations</RouterLink>
          <RouterLink to="/contact" aria-label="Contact us">Contact</RouterLink>
          <RouterLink to="/about" aria-label="Learn about us">About Us</RouterLink>

          <!-- Only show to admins -->
          <RouterLink v-if="userStore.isAdmin" to="/admin" aria-label="Admin dashboard">Admin Dashboard</RouterLink>
          <RouterLink v-if="userStore.isAdmin" to="/features" aria-label="View implemented features">Features</RouterLink>

          <!-- Show different content based on login status -->
          <template v-if="!userStore.isLoggedIn">
            <RouterLink to="/login" aria-label="Login to your account">Login</RouterLink>
          </template>
          <template v-else>
            <span class="user-email" :aria-label="`Logged in as ${userStore.user.email}`">{{ userStore.user.email }}</span>
            <button @click="handleLogout" class="logout-link" aria-label="Logout from your account">Logout</button>
          </template>
        </nav>
      </div>
    </header>

    <main id="main-content" role="main" tabindex="-1">
      <RouterView />
    </main>

    <footer role="contentinfo" class="site-footer">
      <div class="footer-content">
        <p>&copy; 2024 Health & Happiness Home. All rights reserved.</p>
        <p>Committed to providing accessible services for all community members.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

header {
  line-height: 1.5;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

main {
  width: 100%;
  max-width: 1280px; /* Adjust max-width as needed */
  padding: 0 2rem;
}

.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.user-email {
  padding: 0 1rem;
  color: var(--color-text);
  border-left: 1px solid var(--color-border);
}

.logout-link {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  cursor: pointer;
  background: none;
  border-top: none;
  border-right: none;
  border-bottom: none;
  color: inherit;
  font-size: inherit;
  text-decoration: none;
}

.logout-link:hover,
.logout-link:focus {
  text-decoration: underline;
}

.site-footer {
  background-color: #2c3e50;
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
  text-align: center;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content p {
  margin-bottom: 0.5rem;
}
</style>

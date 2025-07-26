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
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/services">Services</RouterLink>
          <RouterLink to="/about">About Us</RouterLink>

          <!-- Only show to admins -->
          <RouterLink v-if="userStore.isAdmin" to="/admin">Admin Dashboard</RouterLink>

          <!-- Show different content based on login status -->
          <template v-if="!userStore.isLoggedIn">
            <RouterLink to="/login">Login</RouterLink>
          </template>
          <template v-else>
            <span class="user-email">{{ userStore.user.email }}</span>
            <a @click="handleLogout" href="#" class="logout-link">Logout</a>
          </template>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
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
}
</style>

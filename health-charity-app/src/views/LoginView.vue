<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isRegistering = ref(false)
const errorMessage = ref('')
const router = useRouter()
const auth = getAuth()

const handleAuthAction = async () => {
  errorMessage.value = ''
  try {
    if (isRegistering.value) {
      // Register user
      await createUserWithEmailAndPassword(auth, email.value, password.value)
    } else {
      // Sign in user
      await signInWithEmailAndPassword(auth, email.value, password.value)
    }
    // Redirect to home on successful login/registration
    router.push('/')
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage.value = 'Invalid email address.'
        break
      case 'auth/user-not-found':
        errorMessage.value = 'No account found with that email.'
        break
      case 'auth/wrong-password':
        errorMessage.value = 'Incorrect password.'
        break
      case 'auth/email-already-in-use':
        errorMessage.value = 'An account already exists with that email address.'
        break
      default:
        errorMessage.value = 'An unexpected error occurred. Please try again.'
        break
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>{{ isRegistering ? 'Register' : 'User Login' }}</h1>
      <form @submit.prevent="handleAuthAction">
        <div class="input-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required>
        </div>
        <button type="submit">{{ isRegistering ? 'Register' : 'Login' }}</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <p class="toggle-form">
        {{ isRegistering ? 'Already have an account?' : "Don't have an account?" }}
        <a href="#" @click.prevent="isRegistering = !isRegistering">
          {{ isRegistering ? 'Login here' : 'Register now' }}
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.toggle-form {
  text-align: center;
  margin-top: 1rem;
}
</style>

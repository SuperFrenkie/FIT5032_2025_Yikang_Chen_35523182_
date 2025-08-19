<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { sendWelcomeEmail } from '@/services/emailService'

const email = ref('')
const password = ref('')
const isRegistering = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const router = useRouter()
const auth = getAuth()

const handleAuthAction = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    if (isRegistering.value) {
      // Register user
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user',
        createdAt: new Date(),
        displayName: user.email.split('@')[0] // Use email prefix as display name
      })

      // Send welcome email using EmailJS
      try {
        await sendWelcomeEmail(user.email, user.email.split('@')[0])
        successMessage.value = 'Registration successful! Welcome email sent.'
      } catch (emailError) {
        console.warn('Failed to send welcome email:', emailError)
        successMessage.value = 'Registration successful! (Welcome email could not be sent)'
      }

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/')
      }, 2000)

    } else {
      // Sign in user
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/')
    }
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
      case 'auth/weak-password':
        errorMessage.value = 'Password should be at least 6 characters.'
        break
      default:
        errorMessage.value = 'An unexpected error occurred. Please try again.'
        break
    }
  } finally {
    isLoading.value = false
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
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login') }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.success-message {
  color: #27ae60;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  opacity: 0.7;
}

.toggle-form {
  text-align: center;
  margin-top: 1rem;
}
</style>

<template>
  <div class="contact-form">
    <h2>Contact Us</h2>
    <p>Send us a message and we'll get back to you as soon as possible.</p>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name">Name *</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          :disabled="isLoading"
          placeholder="Your full name"
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email *</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          :disabled="isLoading"
          placeholder="your.email@example.com"
        />
      </div>
      
      <div class="form-group">
        <label for="subject">Subject *</label>
        <input
          type="text"
          id="subject"
          v-model="formData.subject"
          required
          :disabled="isLoading"
          placeholder="What is this about?"
        />
      </div>
      
      <div class="form-group">
        <label for="message">Message *</label>
        <textarea
          id="message"
          v-model="formData.message"
          required
          :disabled="isLoading"
          rows="6"
          placeholder="Tell us more about your inquiry..."
        ></textarea>
      </div>
      
      <button type="submit" :disabled="isLoading" class="submit-btn">
        {{ isLoading ? 'Sending...' : 'Send Message' }}
      </button>
      
      <div v-if="statusMessage" :class="['status-message', statusType]">
        {{ statusMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { sendContactEmail } from '@/services/emailService'

const isLoading = ref(false)
const statusMessage = ref('')
const statusType = ref('') // 'success' or 'error'

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.subject = ''
  formData.message = ''
}

const handleSubmit = async () => {
  isLoading.value = true
  statusMessage.value = ''
  statusType.value = ''
  
  try {
    await sendContactEmail(formData)
    
    statusMessage.value = 'Thank you for your message! We\'ll get back to you soon.'
    statusType.value = 'success'
    resetForm()
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      statusMessage.value = ''
    }, 5000)
    
  } catch (error) {
    console.error('Error sending contact email:', error)
    statusMessage.value = 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    statusType.value = 'error'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
}

.contact-form p {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-group input:disabled,
.form-group textarea:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.7;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  opacity: 0.7;
}

.status-message {
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .contact-form {
    padding: 1rem;
    margin: 1rem;
  }
}
</style>

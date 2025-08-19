<template>
  <div class="contact-view">
    <h1>Contact Us</h1>
    <p>Get in touch with us for any questions or support</p>
    
    <div class="contact-container">
      <!-- Contact Form -->
      <div class="contact-form-section">
        <h2>Send us a Message</h2>
        <form @submit.prevent="sendEmail" class="contact-form">
          <div class="form-group">
            <label for="name">Your Name *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="email">Your Email *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="subject">Subject *</label>
            <select 
              id="subject" 
              v-model="form.subject" 
              required 
              class="form-input"
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Service Information">Service Information</option>
              <option value="Appointment Request">Appointment Request</option>
              <option value="Feedback">Feedback</option>
              <option value="Support">Support</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required 
              rows="5" 
              class="form-input"
              placeholder="Please describe your inquiry..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="attachment">Attachment (optional)</label>
            <input 
              type="file" 
              id="attachment" 
              @change="handleFileUpload" 
              class="form-input file-input"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <small class="file-info">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
            </small>
          </div>
          
          <button 
            type="submit" 
            :disabled="isSubmitting" 
            class="submit-btn"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
      
      <!-- Contact Information -->
      <div class="contact-info-section">
        <h2>Contact Information</h2>
        <div class="contact-details">
          <div class="contact-item">
            <h3>📍 Address</h3>
            <p>123 Wellness Street<br>Melbourne VIC 3000<br>Australia</p>
          </div>
          
          <div class="contact-item">
            <h3>📞 Phone</h3>
            <p>(03) 9123 4567</p>
          </div>
          
          <div class="contact-item">
            <h3>✉️ Email</h3>
            <p>info@healthhappiness.com.au</p>
          </div>
          
          <div class="contact-item">
            <h3>🕒 Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM<br>
               Saturday: 9:00 AM - 2:00 PM<br>
               Sunday: Closed</p>
          </div>
        </div>
        
        <div class="emergency-info">
          <h3>🚨 Emergency Contact</h3>
          <p>For urgent matters outside business hours:</p>
          <p><strong>Emergency Line: (03) 9999 0000</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sendContactEmail } from '@/services/emailService'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const attachmentFile = ref(null)

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      event.target.value = ''
      return
    }
    attachmentFile.value = file
  }
}

// Convert file to base64 for email attachment
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = error => reject(error)
  })
}

// Send email
const sendEmail = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true

  try {
    // Prepare email data for EmailJS
    const emailData = {
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: `
        Contact Form Submission:

        Name: ${form.value.name}
        Email: ${form.value.email}
        Subject: ${form.value.subject}

        Message:
        ${form.value.message}

        ${attachmentFile.value ? `Attachment: ${attachmentFile.value.name} (Note: File attachments are not supported with EmailJS. Please contact us directly for file uploads.)` : ''}
      `
    }

    // Send email via EmailJS
    await sendContactEmail(emailData)

    // Success feedback
    alert('Thank you! Your message has been sent successfully. We will get back to you soon.')

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    attachmentFile.value = null
    const fileInput = document.getElementById('attachment')
    if (fileInput) fileInput.value = ''

  } catch (error) {
    console.error('Error sending email:', error)
    alert('Sorry, there was an error sending your message. Please try again or contact us directly.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-view h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.contact-view > p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.contact-form-section h2,
.contact-info-section h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.file-input {
  padding: 0.5rem;
}

.file-info {
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.8rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.contact-info-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
}

.contact-details {
  margin-bottom: 2rem;
}

.contact-item {
  margin-bottom: 1.5rem;
}

.contact-item h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1rem;
}

.contact-item p {
  color: #666;
  line-height: 1.5;
}

.emergency-info {
  background-color: #fff3cd;
  padding: 1rem;
  border-radius: 4px;
  border-left: 4px solid #ffc107;
}

.emergency-info h3 {
  margin-bottom: 0.5rem;
  color: #856404;
}

.emergency-info p {
  color: #856404;
  margin-bottom: 0.3rem;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-form,
  .contact-info-section {
    padding: 1.5rem;
  }
}
</style>

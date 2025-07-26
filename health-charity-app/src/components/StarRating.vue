<template>
  <div class="star-rating-container">
    <div class="stars">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ filled: star <= (hoverRating || rating) }"
        @mouseover="hoverRating = star"
        @mouseleave="hoverRating = 0"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>
    <button @click="submitRating" class="submit-btn">Submit Rating</button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  serviceId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['rating-submitted'])

const rating = ref(0)
const hoverRating = ref(0)

const setRating = (value) => {
  rating.value = value
}

const submitRating = () => {
  if (rating.value === 0) {
    alert('Please select a rating first!')
    return
  }
  emit('rating-submitted', props.serviceId, rating.value)
  alert('Thank you for your feedback!')
}
</script>

<style scoped>
.star-rating-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.star {
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
}

.star.filled {
  color: #ffc107;
}

.submit-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

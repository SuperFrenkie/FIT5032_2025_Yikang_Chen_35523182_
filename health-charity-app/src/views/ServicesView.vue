<script setup>
import { ref } from 'vue'
import StarRating from '@/components/StarRating.vue'

// Mock data, in a real application, this would come from a backend
const services = ref([
  {
    id: 1,
    title: 'Health Knowledge Lecture',
    description: 'Regularly invite professional doctors to explain the prevention and health care knowledge of common diseases among the elderly.',
    avgRating: 0.0,
    totalReviews: 0
  },
  {
    id: 2,
    title: 'Interest groups and activities',
    description: 'Organize various interest groups such as calligraphy, gardening, and chess and card games to enrich the spiritual and cultural life of the elderly.',
    avgRating: 0.0,
    totalReviews: 0
  },
  {
    id: 3,
    title: 'Home visit for care',
    description: 'Our volunteers will make regular home visits to provide emotional support and daily assistance to elderly people with mobility issues.',
    avgRating: 0.0,
    totalReviews: 0
  },
  {
    id: 4,
    title: 'Community day care',
    description: 'Provide a safe and comfortable environment to ensure that the elderly receive professional care and companionship during the day.',
    avgRating: 0.0,
    totalReviews: 0
  }
])

const handleRatingSubmitted = (serviceId, rating) => {
  // Here you would typically send the rating to a backend
  // For now, we'll just log it
  console.log(`Service ${serviceId} rated with ${rating} stars.`);
  // You might want to update the UI to reflect that the user has rated
}
</script>

<template>
  <div class="services-view">
    <h1>Our Services</h1>
    <div class="service-list">
      <div v-for="service in services" :key="service.id" class="service-card">
        <h2>{{ service.title }}</h2>
        <p>{{ service.description }}</p>
        <div class="rating-info">
          Average Rating: {{ service.avgRating.toFixed(1) }} (from {{ service.totalReviews }} reviews)
        </div>
        <StarRating :service-id="service.id" @rating-submitted="handleRatingSubmitted" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.services-view {
  text-align: center;
  padding: 2rem;
}

.services-view h1 {
  margin-bottom: 2rem;
}

.service-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  text-align: left;
}

.service-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
}

.service-card h2 {
  margin-bottom: 1rem;
}

.service-card p {
  flex-grow: 1;
  margin-bottom: 1rem;
}

.rating-info {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}
</style>

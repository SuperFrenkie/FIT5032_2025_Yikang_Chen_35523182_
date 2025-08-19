<script setup>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUserStore } from '@/stores/user'
import StarRating from '@/components/StarRating.vue'

const userStore = useUserStore()

// Services data with dynamic ratings
// Note: Using Firebase document IDs that match your database
const services = ref([
  {
    id: '57WCcSzSW3zK74brOlHF', // This should match your Firebase serviceId
    title: 'Health Knowledge Lecture',
    description: 'Regularly invite professional doctors to explain the prevention and health care knowledge of common diseases among the elderly.',
    avgRating: 0.0,
    totalReviews: 0
  },
  {
    id: '2',
    title: 'Interest groups and activities',
    description: 'Organize various interest groups such as calligraphy, gardening, and chess and card games to enrich the spiritual and cultural life of the elderly.',
    avgRating: 0.0,
    totalReviews: 0
  },
  {
    id: '3',
    title: 'Home visit for care',
    description: 'Our volunteers will make regular home visits to provide emotional support and daily assistance to elderly people with mobility issues.',
    avgRating: 0.0,
    totalReviews: 0
  },
  {
    id: '4',
    title: 'Community day care',
    description: 'Provide a safe and comfortable environment to ensure that the elderly receive professional care and companionship during the day.',
    avgRating: 0.0,
    totalReviews: 0
  }
])

// Load ratings from Firebase
const loadRatings = async () => {
  try {
    console.log('Loading ratings for services...')
    for (const service of services.value) {
      console.log(`Checking ratings for service: ${service.id} (${service.title})`)
      const ratingsQuery = query(
        collection(db, 'ratings'),
        where('serviceId', '==', service.id)
      )
      const querySnapshot = await getDocs(ratingsQuery)

      console.log(`Found ${querySnapshot.size} ratings for service ${service.id}`)

      if (!querySnapshot.empty) {
        let totalRating = 0
        let count = 0

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          console.log(`Rating data:`, data)
          totalRating += data.rating
          count++
        })

        service.avgRating = totalRating / count
        service.totalReviews = count
        console.log(`Service ${service.id} - Average: ${service.avgRating}, Total: ${service.totalReviews}`)
      } else {
        console.log(`No ratings found for service ${service.id}`)
      }
    }
  } catch (error) {
    console.error('Error loading ratings:', error)
    if (error.code === 'permission-denied') {
      console.error('Firebase permission denied. Please check Firestore security rules.')
      alert('Unable to load ratings due to permission settings. Please check Firebase configuration.')
    }
  }
}

const handleRatingSubmitted = async (serviceId, rating) => {
  if (!userStore.isLoggedIn) {
    alert('Please login to submit a rating!')
    return
  }

  try {
    // Save rating to Firebase
    await addDoc(collection(db, 'ratings'), {
      serviceId: serviceId,
      userId: userStore.user.uid,
      rating: rating,
      createdAt: new Date()
    })

    // Reload ratings to update the display
    await loadRatings()

    console.log(`Service ${serviceId} rated with ${rating} stars.`)
  } catch (error) {
    console.error('Error submitting rating:', error)
    if (error.code === 'permission-denied') {
      alert('Permission denied. Please check if you are logged in and Firebase rules are configured correctly.')
    } else {
      alert('Failed to submit rating. Please try again.')
    }
  }
}

// Load ratings when component mounts
onMounted(() => {
  loadRatings()
})
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

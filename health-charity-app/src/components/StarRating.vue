<template>
  <div class="star-rating-container">
    <div class="stars">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{
          filled: hasRated ? star <= userPreviousRating : star <= (hoverRating || rating),
          disabled: hasRated
        }"
        @mouseover="!hasRated && (hoverRating = star)"
        @mouseleave="!hasRated && (hoverRating = 0)"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>
    <div v-if="hasRated" class="user-rating-info">
      You rated this service: {{ userPreviousRating }} star{{ userPreviousRating !== 1 ? 's' : '' }}
    </div>
    <button v-else @click="submitRating" class="submit-btn" :disabled="!userStore.isLoggedIn">
      {{ userStore.isLoggedIn ? 'Submit Rating' : 'Login to Rate' }}
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  serviceId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['rating-submitted'])
const userStore = useUserStore()

const rating = ref(0)
const hoverRating = ref(0)
const hasRated = ref(false)
const userPreviousRating = ref(0)

const setRating = (value) => {
  if (hasRated.value) {
    alert('You have already rated this service!')
    return
  }
  rating.value = value
}

const submitRating = () => {
  if (hasRated.value) {
    alert('You have already rated this service!')
    return
  }

  if (rating.value === 0) {
    alert('Please select a rating first!')
    return
  }

  emit('rating-submitted', props.serviceId, rating.value)
  hasRated.value = true
  userPreviousRating.value = rating.value
  alert('Thank you for your feedback!')
}

// Check if user has already rated this service
const checkUserRating = async () => {
  if (!userStore.isLoggedIn) return

  try {
    const ratingsQuery = query(
      collection(db, 'ratings'),
      where('serviceId', '==', props.serviceId.toString()),
      where('userId', '==', userStore.user.uid)
    )
    const querySnapshot = await getDocs(ratingsQuery)

    if (!querySnapshot.empty) {
      hasRated.value = true
      const userRatingDoc = querySnapshot.docs[0]
      userPreviousRating.value = userRatingDoc.data().rating
    }
  } catch (error) {
    console.error('Error checking user rating:', error)
  }
}

onMounted(() => {
  checkUserRating()
})
</script>

<style scoped>
.star-rating-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}

.star.filled {
  color: #ffc107;
}

.star.disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

.user-rating-info {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.submit-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #34495e;
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>

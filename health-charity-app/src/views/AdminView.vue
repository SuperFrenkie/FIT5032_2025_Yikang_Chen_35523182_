<template>
  <div class="admin-view">
    <h1>Admin Dashboard</h1>
    <p>Welcome, Administrator! This page is only visible to administrators.</p>

    <!-- Interactive Data Table Section -->
    <div class="data-table-section">
      <h2>Ratings Management</h2>
      <div class="table-controls">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search ratings..."
            class="search-input"
          />
        </div>
        <div class="export-buttons">
          <button @click="exportToCSV" class="export-btn csv-btn">Export CSV</button>
          <button @click="exportToPDF" class="export-btn pdf-btn">Export PDF</button>
        </div>
      </div>

      <!-- Interactive Table -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th @click="sortBy('serviceId')" class="sortable">
                Service ID
                <span class="sort-indicator" :class="getSortClass('serviceId')">↕</span>
              </th>
              <th @click="sortBy('userId')" class="sortable">
                User ID
                <span class="sort-indicator" :class="getSortClass('userId')">↕</span>
              </th>
              <th @click="sortBy('rating')" class="sortable">
                Rating
                <span class="sort-indicator" :class="getSortClass('rating')">↕</span>
              </th>
              <th @click="sortBy('createdAt')" class="sortable">
                Date
                <span class="sort-indicator" :class="getSortClass('createdAt')">↕</span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rating in paginatedRatings" :key="rating.id" class="table-row">
              <td>{{ getServiceName(rating.serviceId) }}</td>
              <td>{{ rating.userId.substring(0, 8) }}...</td>
              <td>
                <div class="rating-stars">
                  <span v-for="star in 5" :key="star"
                        :class="{ 'star-filled': star <= rating.rating }"
                        class="star">★</span>
                  <span class="rating-number">({{ rating.rating }})</span>
                </div>
              </td>
              <td>{{ formatDate(rating.createdAt) }}</td>
              <td>
                <button @click="deleteRating(rating.id)" class="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="page-btn"
        >Previous</button>

        <span class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
          ({{ filteredRatings.length }} total records)
        </span>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="page-btn"
        >Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

// Data
const ratings = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const sortField = ref('createdAt')
const sortDirection = ref('desc')

// Service names mapping
const serviceNames = {
  '57WCcSzSW3zK74brOlHF': 'Health Knowledge Lecture',
  '2': 'Interest groups and activities',
  '3': 'Home visit for care',
  '4': 'Community day care'
}

// Computed properties
const filteredRatings = computed(() => {
  if (!searchQuery.value) return ratings.value

  const query = searchQuery.value.toLowerCase()
  return ratings.value.filter(rating =>
    getServiceName(rating.serviceId).toLowerCase().includes(query) ||
    rating.userId.toLowerCase().includes(query) ||
    rating.rating.toString().includes(query)
  )
})

const sortedRatings = computed(() => {
  const sorted = [...filteredRatings.value]

  sorted.sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]

    // Handle date sorting
    if (sortField.value === 'createdAt') {
      aVal = new Date(aVal.seconds * 1000)
      bVal = new Date(bVal.seconds * 1000)
    }

    // Handle service name sorting
    if (sortField.value === 'serviceId') {
      aVal = getServiceName(aVal)
      bVal = getServiceName(bVal)
    }

    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return sorted
})

const paginatedRatings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedRatings.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRatings.value.length / itemsPerPage.value)
})

// Methods
const loadRatings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'ratings'))
    ratings.value = []

    querySnapshot.forEach((doc) => {
      ratings.value.push({
        id: doc.id,
        ...doc.data()
      })
    })

    console.log(`Loaded ${ratings.value.length} ratings`)
  } catch (error) {
    console.error('Error loading ratings:', error)
    alert('Failed to load ratings data')
  }
}

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  currentPage.value = 1 // Reset to first page when sorting
}

const getSortClass = (field) => {
  if (sortField.value !== field) return ''
  return sortDirection.value === 'asc' ? 'sort-asc' : 'sort-desc'
}

const getServiceName = (serviceId) => {
  return serviceNames[serviceId] || `Service ${serviceId}`
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'

  // Handle Firestore timestamp
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

const deleteRating = async (ratingId) => {
  if (!confirm('Are you sure you want to delete this rating?')) return

  try {
    await deleteDoc(doc(db, 'ratings', ratingId))
    await loadRatings() // Reload data
    alert('Rating deleted successfully')
  } catch (error) {
    console.error('Error deleting rating:', error)
    alert('Failed to delete rating')
  }
}
// Export functions
const exportToCSV = () => {
  const headers = ['Service Name', 'User ID', 'Rating', 'Date']
  const csvContent = [
    headers.join(','),
    ...filteredRatings.value.map(rating => [
      `"${getServiceName(rating.serviceId)}"`,
      `"${rating.userId}"`,
      rating.rating,
      `"${formatDate(rating.createdAt)}"`
    ].join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `ratings_export_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportToPDF = () => {
  // Simple PDF export using browser print functionality
  const printWindow = window.open('', '_blank')
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ratings Export</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .header { text-align: center; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Health & Happiness Home - Ratings Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>User ID</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${filteredRatings.value.map(rating => `
            <tr>
              <td>${getServiceName(rating.serviceId)}</td>
              <td>${rating.userId}</td>
              <td>${rating.rating} stars</td>
              <td>${formatDate(rating.createdAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 250)
}

// Lifecycle
onMounted(() => {
  loadRatings()
})
</script>
<style scoped>
.admin-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-view h1 {
  margin-bottom: 1rem;
  text-align: center;
}

.data-table-section {
  margin-top: 2rem;
}

.data-table-section h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  font-size: 1rem;
}

.export-buttons {
  display: flex;
  gap: 0.5rem;
}

.export-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.csv-btn {
  background-color: #27ae60;
  color: white;
}

.csv-btn:hover {
  background-color: #219a52;
}

.pdf-btn {
  background-color: #e74c3c;
  color: white;
}

.pdf-btn:hover {
  background-color: #c0392b;
}

.table-container {
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.data-table th {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.sortable:hover {
  background-color: #e9ecef;
}

.sort-indicator {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.5;
}

.sort-asc .sort-indicator {
  opacity: 1;
  color: #007bff;
}

.sort-desc .sort-indicator {
  opacity: 1;
  color: #007bff;
  transform: rotate(180deg);
  display: inline-block;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.rating-stars {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
}

.star-filled {
  color: #ffc107;
}

.rating-number {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.delete-btn:hover {
  background-color: #c82333;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.page-btn:hover:not(:disabled) {
  background-color: #f8f9fa;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .table-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

  .export-buttons {
    justify-content: center;
  }
}
</style>

<template>
  <div class="locations-view">
    <h1>Service Locations</h1>
    <p>Find our services and facilities near you</p>
    
    <!-- Map Container -->
    <div class="map-section">
      <div id="map" class="map-container"></div>
    </div>
    
    <!-- Location List -->
    <div class="locations-list">
      <h2>Our Locations</h2>
      <div class="location-cards">
        <div 
          v-for="location in locations" 
          :key="location.id" 
          class="location-card"
          @click="focusOnLocation(location)"
        >
          <h3>{{ location.name }}</h3>
          <p class="address">{{ location.address }}</p>
          <p class="services">Services: {{ location.services.join(', ') }}</p>
          <div class="contact-info">
            <p><strong>Phone:</strong> {{ location.phone }}</p>
            <p><strong>Hours:</strong> {{ location.hours }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Location data
const locations = ref([
  {
    id: 1,
    name: 'Health & Happiness Main Center',
    address: '123 Wellness Street, Melbourne VIC 3000',
    lat: -37.8136,
    lng: 144.9631,
    services: ['Health Knowledge Lecture', 'Community day care'],
    phone: '(03) 9123 4567',
    hours: 'Mon-Fri 9:00 AM - 5:00 PM'
  },
  {
    id: 2,
    name: 'Community Activities Hub',
    address: '456 Community Road, Melbourne VIC 3001',
    lat: -37.8200,
    lng: 144.9700,
    services: ['Interest groups and activities', 'Home visit for care'],
    phone: '(03) 9234 5678',
    hours: 'Mon-Sat 8:00 AM - 6:00 PM'
  },
  {
    id: 3,
    name: 'Care Support Center',
    address: '789 Care Avenue, Melbourne VIC 3002',
    lat: -37.8100,
    lng: 144.9500,
    services: ['Home visit for care', 'Community day care'],
    phone: '(03) 9345 6789',
    hours: 'Daily 7:00 AM - 7:00 PM'
  }
])

let map = null
let markers = []

// Initialize map
const initMap = () => {
  // Create map centered on Melbourne
  map = L.map('map').setView([-37.8136, 144.9631], 13)
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
  
  // Add markers for each location
  locations.value.forEach(location => {
    const marker = L.marker([location.lat, location.lng])
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <h3>${location.name}</h3>
          <p><strong>Address:</strong> ${location.address}</p>
          <p><strong>Services:</strong> ${location.services.join(', ')}</p>
          <p><strong>Phone:</strong> ${location.phone}</p>
          <p><strong>Hours:</strong> ${location.hours}</p>
        </div>
      `)
    
    markers.push(marker)
  })
}

// Focus on specific location
const focusOnLocation = (location) => {
  if (map) {
    map.setView([location.lat, location.lng], 15)
    // Find and open the corresponding marker popup
    const marker = markers.find(m => 
      m.getLatLng().lat === location.lat && m.getLatLng().lng === location.lng
    )
    if (marker) {
      marker.openPopup()
    }
  }
}

// Load Leaflet CSS and JS
const loadLeaflet = () => {
  return new Promise((resolve, reject) => {
    // Load CSS
    const cssLink = document.createElement('link')
    cssLink.rel = 'stylesheet'
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    cssLink.crossOrigin = ''
    document.head.appendChild(cssLink)
    
    // Load JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await loadLeaflet()
    // Wait a bit for the DOM to be ready
    setTimeout(initMap, 100)
  } catch (error) {
    console.error('Failed to load Leaflet:', error)
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.locations-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.locations-view h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.locations-view > p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.map-section {
  margin-bottom: 3rem;
}

.map-container {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.locations-list h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.location-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.location-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.location-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  border-color: #007bff;
}

.location-card h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.address {
  color: #666;
  margin-bottom: 0.5rem;
  font-style: italic;
}

.services {
  color: #007bff;
  margin-bottom: 1rem;
  font-weight: 500;
}

.contact-info p {
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

/* Global styles for Leaflet popups */
:global(.popup-content) {
  font-family: inherit;
}

:global(.popup-content h3) {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

:global(.popup-content p) {
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .locations-view {
    padding: 1rem;
  }
  
  .map-container {
    height: 300px;
  }
  
  .location-cards {
    grid-template-columns: 1fr;
  }
}
</style>

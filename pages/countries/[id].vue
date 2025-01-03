<template>
    <div v-if="!loading">
      <!-- Full-Width Card Container -->
      <div class="w-full bg-white rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row gap-6 items-start p-6">
          <!-- Left Section -->
          <div class="flex justify-center items-center w-full md:w-1/2">
            <img
              :src="country?.flags?.svg"
              alt="Country Flag"
              class="rounded-lg shadow-md object-cover w-full max-w-sm transition-transform duration-300 hover:scale-105"
            />
          </div>
  
          <!-- Right Section -->
          <div class="p-6 bg-gray-100 w-full md:w-1/2 rounded-lg">
            <ul class="space-y-6 text-gray-700">
              <!-- Country Name and Region -->
              <li>
                <h1 class="text-4xl font-bold text-gray-800">
                  {{ country?.name?.common }}
                </h1>
                <p class="text-gray-500 text-lg mt-1 font-medium">
                  {{ country?.region }}
                </p>
                <p class="text-gray-400 text-md">{{ country?.subregion || 'N/A' }}</p>
              </li>
  
              <!-- Capital -->
              <li>
                <strong class="block text-gray-800 font-semibold">Capital:</strong>
                <span class="text-gray-600">{{ country?.capital?.[0] || 'N/A' }}</span>
              </li>
  
              <!-- Population -->
              <li>
                <strong class="block text-gray-800 font-semibold">Population:</strong>
                <span class="text-gray-600">{{ country?.population?.toLocaleString() || 'N/A' }}</span>
              </li>
  
              <!-- Native Name -->
              <li>
                <strong class="block text-gray-800 font-semibold">Native Name:</strong>
                <span class="text-gray-600">{{ country?.translations?.eng?.common || 'N/A' }}</span>
              </li>
  
              <!-- Languages -->
              <li>
                <strong class="block text-gray-800 font-semibold">Languages:</strong>
                <span class="text-gray-600">
                  {{ Object.values(country?.languages || {}).join(', ') || 'N/A' }}
                </span>
              </li>
  
              <!-- Currencies -->
              <li>
                <strong class="block text-gray-800 font-semibold">Currencies:</strong>
                <span class="text-gray-600">
                  {{ Object.values(country?.currencies || {}).map((c) => c.name).join(', ') || 'N/A' }}
                </span>
              </li>
  
              <!-- Timezones -->
              <li>
                <strong class="block text-gray-800 font-semibold">Timezones:</strong>
                <span class="text-gray-600">{{ country?.timezones?.join(', ') || 'N/A' }}</span>
              </li>
  
              <!-- Continents -->
              <li>
                <strong class="block text-gray-800 font-semibold">Continents:</strong>
                <span class="text-gray-600">{{ country?.continents?.join(', ') || 'N/A' }}</span>
              </li>
  
              <!-- External Links -->
              <li>
                <strong class="block text-gray-800 font-semibold">Maps:</strong>
                <a
                  :href="country?.maps?.googleMaps"
                  target="_blank"
                  class="text-blue-500 hover:underline"
                  >Google Maps</a
                >
                |
                <a
                  :href="country?.maps?.openStreetMaps"
                  target="_blank"
                  class="text-blue-500 hover:underline"
                  >OpenStreetMap</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Loading State -->
    <div v-else class="flex items-center justify-center min-h-screen bg-gray-50">
      <p class="text-gray-500 text-lg animate-pulse">Loading...</p>
    </div>
  </template>
  
  <style scoped>
  body {
    font-family: "Inter", sans-serif;
  }
  
  h1,
  h2,
  strong {
    letter-spacing: 0.5px;
  }
  
  ul li {
    line-height: 1.5;
  }
  
  .w-full {
    max-width: 100%;
  }
  
  .shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .shadow-lg {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
  
  .animate-pulse {
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  </style>
  

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCountryStore } from '~/stores/useCountryStore';

const route = useRoute();
const countryStore = useCountryStore();
const { countriesData, loading } = storeToRefs(countryStore);

const country = ref(null);

// Fetch the country details using the route parameter
onMounted(async () => {
    if (!countriesData.value.length) {
        await countryStore.fetchCountries();
    }
    const countryCode = route.params.id;
    country.value = countriesData.value.find((c) => c.cca3 === countryCode);
});
</script>
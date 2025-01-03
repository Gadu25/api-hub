<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCountryStore } from '~/stores/useCountryStore';
import { useRouter } from 'vue-router';

const countryStore = useCountryStore();
const { countriesData, loading, error } = storeToRefs(countryStore);

const query = ref('');
const isSearch = ref(false);

// No need to create the router manually, use the default Nuxt router
const router = useRouter();

const searchCountries = async () => {
  if (query.value.trim()) {
    await countryStore.fetchCountries();
    isSearch.value = true;
  } else {
    alert('Please enter a query before fetching picture.');
  }
};

const filteredCountries = computed(() => {
  if (!query.value.trim()) {
    return countriesData.value;
  }
  return countriesData.value.filter((country: { name: { common: string; }; }) =>
    country.name.common.toLowerCase().includes(query.value.toLowerCase())
  );
});

// Navigate to country detail page when a country is clicked
const navigateToCountry = (country: { cca3: string; }) => {
  router.push(`/countries/${country.cca3}`);

};

onMounted(async () => {
  await countryStore.fetchCountries();
  // Initially, navigate to the first country after fetching countries
});
</script>

<template>
  <!-- Search Bar -->
  <div class="flex justify-center w-full">
    <div class="w-full mb-10">
      <div class="relative flex items-center justify-center">
        <input
          type="text"
          id="simple-search"
          class="bg-white border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 shadow-md"
          placeholder="Look for something..."
          v-model="query"
          required
          @keypress.enter="searchCountries()"
        />
        <!-- Search Icon -->
        <div class="absolute top-1/2 left-3 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Flag Cards Grid -->
  <div
    v-if="!loading"
    class="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-4"
  >
    <!-- Dynamically Render Filtered Cards -->
    <template
      v-if="filteredCountries"
      v-for="countries in filteredCountries"
    >
      <div
        class="card relative overflow-hidden shadow-lg cursor-pointer bg-white rounded-xl transition-all duration-300 hover:scale-105 border"
        @click="navigateToCountry(countries)"
      >
        <!-- Image at the top -->
        <div class="image-container">
          <img
            :src="countries.flags.svg"
            :alt="countries.name.common"
            class="w-full h-full object-contain rounded-lg"
          />
        </div>

        <!-- Overlay with text -->
        <div
          class="card-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
        >
          <div class="text-center text-white">
            <h2 class="text-xl font-bold">{{ countries.name.common }}</h2>
            <p class="text-sm mt-2">{{ countries.region }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.card:hover .card-overlay {
  opacity: 1; /* Show overlay on hover */
}

.image-container {
  width: 100%;
  height: 0;
  padding-top: 56.25%; /* Aspect ratio of 16:9 */
  position: relative;
  overflow: hidden;
  background-color: #F3F4F6;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Use contain for irregular shapes */
}

.card-overlay {
  transition: opacity 0.3s ease;
}

/* Responsive design adjustments */
@media (max-width: 768px) {
  .card {
    margin-bottom: 12px;
  }

  .image-container {
    padding-top: 66.66%; /* Adjust for different aspect ratio on smaller screens */
  }
}
</style>


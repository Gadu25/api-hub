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
    console.log("country", countriesData.value);
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

  console.log("Countries loaded on mount:", countriesData.value);
});
</script>

<template>
  <!-- Search Bar -->
  <div class="flex justify-center w-full">
    <div class="w-full mb-10">
      <div class="relative flex items-center justify-center">
        <input type="text" id="simple-search"
          class="bg-gray-50 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Look for something..." v-model="query" required @keypress.enter="searchCountries()" />
        <!-- Search Icon -->
        <div class="absolute top-1/2 left-3 transform -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  </div>


  <!-- Flag Cards Grid -->
  <div v-if="!loading" class="grid md:grid-cols-4 sm:grid-cols-2 gap-2">
    <!-- Dynamically Render Filtered Cards -->
    <template v-if="filteredCountries" v-for="countries in filteredCountries">
      <div class="card rounded-lg overflow-hidden shadow-md cursor-pointer bg-gray-100"
        @click="navigateToCountry(countries)">
        <!-- Image at the top -->
         <div class="rounded overflow-hidden">
           <img :src="countries.flags.svg" :alt="countries.name.common"
            class="w-full h-32 object-contain rounded " />
         </div>
       
        <!-- Card content -->
        <div class="p-4">
          <h2 class="text-lg font-semibold">{{ countries.name.common }}</h2>
          <p class="text-sm text-gray-500">{{ countries.region }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.card {
  img {
    scale: 1.2;
    transition: all 0.3s;
  }

  &:hover {
    animation: upDown .2s;

    img {
      scale: 1;
    }
  }
}

@keyframes upDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-2px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>

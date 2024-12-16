<script setup lang="ts">
// Array of card data
const cards = [
  {
    id: 1,
    name: "United Kingdom",
    region: "Europe",
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a9/Flag_of_the_United_Kingdom.svg",
  },
  {
    id: 2,
    name: "Philippines",
    region: "Asia",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg",
  },
  {
    id: 3,
    name: "Japan",
    region: "Asia",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
  },
  {
    id: 4,
    name: "Canada",
    region: "North America",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg",
  },
  {
    id: 5,
    name: "Brazil",
    region: "South America",
    image: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
  },
  {
    id: 6,
    name: "Australia",
    region: "Oceania",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg",
  },
  {
    id: 7,
    name: "South Africa",
    region: "Africa",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
  },
  {
    id: 8,
    name: "India",
    region: "Asia",
    image: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
  },
];

// Reactive state for search query and filtered cards
import { ref, computed } from "vue";

const searchQuery = ref(""); // For storing the user input


// Filtered cards based on the search query
const filteredCards = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return cards.filter(
    (card) =>
      card.name.toLowerCase().includes(query) ||
      card.region.toLowerCase().includes(query)
  );
});

</script>

<template>
  <!-- Search Bar -->
  <div class="w-full mb-8">
    <div class="relative">
      <input v-model="searchQuery" type="text" placeholder="Look for a country or region"
        class="w-full border rounded-full p-3 pl-10 shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none" />
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

  <!-- Flag Cards Grid -->
  <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
    <!-- Dynamically Render Filtered Cards -->
    <nuxt-link v-for="(card, index) in filteredCards" :key="index" :to="`/countries/${card.id}`"
      class="bg-gray-100 rounded-lg shadow-md overflow-hidden p-4">
      <img :src="card.image" :alt="card.name" class="w-full h-32 rounded-lg object-contain" />
      <div class="p-4">
        <h2 class="text-lg font-semibold">{{ card.name }}</h2>
        <p class="text-sm text-gray-500">{{ card.region }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<style scoped></style>

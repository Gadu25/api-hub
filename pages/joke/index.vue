<template>
  <div class="flex flex-col lg:flex-row xl:flex-row gap-6">
    <!-- Left Column -->
    <div class="bg-gray-50 rounded-lg shadow-md w-full lg:w-96 p-4">
      
      <!-- Categories Section -->
      <div class="mb-4">
        <label for="categories" class="block text-sm font-semibold text-gray-800 mb-2">Categories</label>
        <div class="space-y-2">
          <div v-for="(checked, category) in formData.categories" :key="category" class="flex items-center">
            <input type="checkbox" :id="category" v-model="formData.categories[category]" class="text-indigo-600 focus:ring-2 focus:ring-indigo-400 rounded-md">
            <label :for="category" class="text-gray-700 ml-2 text-sm">{{ category }}</label>
          </div>
        </div>
      </div>

      <!-- Flags Section -->
      <div class="mb-4">
        <label for="flags" class="block text-sm font-semibold text-gray-800 mb-2">Flags</label>
        <div class="space-y-2">
          <div v-for="(checked, flag) in formData.flags" :key="flag" class="flex items-center">
            <input type="checkbox" :id="flag" v-model="formData.flags[flag]" class="text-indigo-600 focus:ring-2 focus:ring-indigo-400 rounded-md">
            <label :for="flag" class="text-gray-700 ml-2 text-sm">{{ flag }}</label>
          </div>
        </div>
      </div>

      <!-- Terms Section -->
      <div class="mb-4">
        <label for="terms" class="block text-sm font-semibold text-gray-800 mb-2">Terms</label>
        <div class="space-y-2">
          <div v-for="(checked, term) in formData.type" :key="term" class="flex items-center">
            <input type="checkbox" :id="term" v-model="formData.type[term]" class="text-indigo-600 focus:ring-2 focus:ring-indigo-400 rounded-md">
            <label :for="term" class="text-gray-700 ml-2 text-sm">{{ term }}</label>
          </div>
        </div>
      </div>

      <!-- Amount Input -->
      <div class="mb-4">
        <label for="amount" class="block text-sm font-semibold text-gray-800 mb-2">Amount</label>
        <input type="number" max="10" id="amount" v-model="formData.amount" class="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400">
      </div>

      <!-- Generate Joke Button -->
      <button class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" @click="fetchJokes()">
        Generate Joke
      </button>
    </div>

    <!-- Right Column -->
    <div class="w-full overflow-auto">
      <div v-if="loading" class="text-center text-gray-600">Loading...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <ul v-else>
        <!-- Jokes Container with responsive grid layout -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div v-for="(joke, index) in jokes" :key="index" class="p-4 rounded-lg shadow-md bg-gray-50">
            <template v-if="joke.type === 'twopart'">
              <p class="text-gray-700 text-md italic mb-2">{{ joke.setup }}</p>
              <p class="font-semibold text-lg text-indigo-600">{{ joke.delivery }}</p>
            </template>
            <p v-if="joke.type === 'single'" class="text-gray-700 text-md">{{ joke.joke }}</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useJokeStore } from '@/stores/useJokeStore'; // Adjust the path as needed
import { ref, computed } from 'vue';

const jokeStore = useJokeStore();

const fetchJokes = async () => {
  await jokeStore.fetchJokes(formData.value);
};

const formData = ref({
  categories: {
    Programming: false,
    Miscellaneous: false,
    Dark: false,
    Pun: false,
    Spooky: false,
    Christmas: false,
  },
  flags: {
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  },
  type: {
    single: false,
    twopart: false,
  },
  amount: 1,
});

const jokes = computed(() => jokeStore.getJokesData());
</script>

<style scoped>
/* You can add custom styling for specific screen sizes here if needed */
</style>

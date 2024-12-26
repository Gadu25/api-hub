<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-6">
    <!-- Left Column -->
    <div class="left-column">
      <div class="mb-4">
        <label for="categories" class="block text-sm font-medium text-gray-700">Categories</label>
        <div class="mt-1">
          <input type="checkbox" id="programming" v-model="formData.categories.Programming"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="programming"
            class="inline-flex items-center text-sm font-medium text-gray-700">Programming</label>
          <br>
          <input type="checkbox" id="misc" v-model="formData.categories.Misc"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="misc" class="inline-flex items-center text-sm font-medium text-gray-700">Miscellaneous</label>
          <br>
          <input type="checkbox" id="dark" v-model="formData.categories.Dark"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="dark" class="inline-flex items-center text-sm font-medium text-gray-700">Dark</label>
          <br>
          <input type="checkbox" id="pun" v-model="formData.categories.Pun"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="pun" class="inline-flex items-center text-sm font-medium text-gray-700">Pun</label>
          <br>
          <input type="checkbox" id="spooky" v-model="formData.categories.Spooky"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="spooky" class="inline-flex items-center text-sm font-medium text-gray-700">Spooky</label>
          <br>
          <input type="checkbox" id="christmas" v-model="formData.categories.Christmas"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="christmas" class="inline-flex items-center text-sm font-medium text-gray-700">Christmas</label>
        </div>
      </div>
      <div class="mb-4">
        <label for="flags" class="block text-sm font-medium text-gray-700">Flags</label>
        <div class="mt-1">
          <input type="checkbox" id="nsfw" v-model="formData.flags.nsfw"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="nsfw" class="inline-flex items-center text-sm font-medium text-gray-700">NSFW</label>
          <br>
          <input type="checkbox" id="religious" v-model="formData.flags.religious"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="religious" class="inline-flex items-center text-sm font-medium text-gray-700">Religious</label>
          <br>
          <input type="checkbox" id="political" v-model="formData.flags.political"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="political" class="inline-flex items-center text-sm font-medium text-gray-700">Political</label>
          <br>
          <input type="checkbox" id="racist" v-model="formData.flags.racist"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="racist" class="inline-flex items-center text-sm font-medium text-gray-700">Racist</label>
          <br>
          <input type="checkbox" id="sexist" v-model="formData.flags.sexist"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="sexist" class="inline-flex items-center text-sm font-medium text-gray-700">Sexist</label>
          <br>
          <input type="checkbox" id="explicit" v-model="formData.flags.explicit"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="explicit" class="inline-flex items-center text-sm font-medium text-gray-700">Explicit</label>
        </div>
      </div>
      <div class="mb-4">
        <label for="flags" class="block text-sm font-medium text-gray-700">Terms</label>
        <div class="mt-1">
          <input type="checkbox" id="single" v-model="formData.type.single"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="nsfw" class="inline-flex items-center text-sm font-medium text-gray-700">Single</label>
          <br>
          <input type="checkbox" id="twopart" v-model="formData.type.twopart"
            class="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="religious" class="inline-flex items-center text-sm font-medium text-gray-700">Two-part</label>
          <br>
        </div>
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <input type="number" id="amount" v-model="formData.amount"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <button class="bg-blue-400 p-2 rounded text-white" @click="fetchJokes()">
        Generate Joke
      </button>
    </div>

    <!-- Right Column -->
    <div class="right-column overflow-y-scroll h-[80%]">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <ul v-else>
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <h1 class="text-2xl font-bold mb-4">Here's a Joke:</h1>
          <div v-for="joke in jokes" class="mb-4 block text-star ">
            <template v-if="joke.type === 'twopart'">
              <p class="text-gray-700 text-lg italic">
                {{ joke.setup }}
              </p>
              <span class="font-semibold mt-6">- {{ joke.delivery }}</span>
            </template>

          </div>

          <div v-if="jokes">
            <p v-for="(joke, index) in jokes" :key="index"
              :class="index % 2 === 0 ? 'text-gray-700 text-lg my-10 font-semibold' : 'text-gray-700 text-lg my-10'">
              {{ joke.joke }}
            </p>
          </div>

        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useJokeStore } from '@/stores/useJokeStore'; // Adjust the path as needed
const jokeStore = useJokeStore();
const fetchJokes = async () => {
  console.log(formData.value);
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
.grid {
  display: grid;
  gap: 1rem;
}

.left-column {
  padding: 1rem;
}

.right-column {
  padding: 1rem;
  border-left: 1px solid #ddd;
}
</style>

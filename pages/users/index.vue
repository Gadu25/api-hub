<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/useUserStore';

const countries = [
  { code: "au", name: "Australia" },
  { code: "br", name: "Brazil" },
  { code: "ca", name: "Canada" },
  { code: "ch", name: "Switzerland" },
  { code: "de", name: "Germany" },
  { code: "dk", name: "Denmark" },
  { code: "es", name: "Spain" },
  { code: "fi", name: "Finland" },
  { code: "fr", name: "France" },
  { code: "gb", name: "United Kingdom" },
  { code: "ie", name: "Ireland" },
  { code: "in", name: "India" },
  { code: "ir", name: "Iran" },
  { code: "mx", name: "Mexico" },
  { code: "nl", name: "Netherlands" },
  { code: "no", name: "Norway" },
  { code: "nz", name: "New Zealand" },
  { code: "rs", name: "Serbia" },
  { code: "tr", name: "Turkey" },
  { code: "ua", name: "Ukraine" },
  { code: "us", name: "United States" }
];

const userStore = useUserStore();
const selectedGender = ref(userStore.selectedGender || 'ALL');
const selectedNationality = ref(userStore.selectedNationality || 'ALL');
const results = ref(userStore.results || 10);
const showResults = ref(false);

const generateUsers = async () => {
  const filter = {
    results: results.value,
    gender: selectedGender.value === 'ALL' ? '' : selectedGender.value.toLowerCase(),
    nat: selectedNationality.value === 'ALL' ? '' : selectedNationality.value.toLowerCase(),
  };
  await userStore.fetchUser(filter);
  showResults.value = true;
};

const filteredUsers = computed(() => {
  return (
    userStore.userData.results?.filter(user => {
      const genderMatch =
        selectedGender.value === 'ALL' || user.gender === selectedGender.value.toLowerCase();
      const nationalityMatch =
        selectedNationality.value === 'ALL' || user.nat.toLowerCase() === selectedNationality.value.toLowerCase();
      return genderMatch && nationalityMatch;
    }) || []
  );
});

const isGenerateButtonEnabled = computed(() => {
  return selectedGender.value !== '' && selectedNationality.value !== '';
});
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-6 p-6 rounded-md transition-all lg:grid-cols-2">
      <!-- Left Panel -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Generate Users</h2>
        <div class="space-y-4">
          <!-- Gender Dropdown -->
          <select v-model="selectedGender" class="block w-full p-2.5 border rounded-md text-gray-700">
            <option value="ALL">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <!-- Nationality Dropdown -->
          <select v-model="selectedNationality" class="block w-full p-2.5 border rounded-md text-gray-700">
            <option value="ALL">All Nationalities</option>
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>

          <!-- Results Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Results</label>
            <input
              type="number"
              v-model.number="results"
              min="1"
              class="block w-full p-2.5 border rounded-md"
            />
          </div>

          <!-- Generate Button -->
          <button
            :disabled="!isGenerateButtonEnabled"
            @click="generateUsers"
            class="w-full py-2.5 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all"
          >
            Generate
          </button>
        </div>
      </div>

      <!-- Right Panel -->
      <div v-if="results > 0" class="transition-all flex flex-wrap gap-4 max-h-[80vh] overflow-auto rounded-2xl">
        <nuxt-link :to="`users/${index}`" v-for="(user, index) in filteredUsers" :key="index" class="flex items-center p-4 border rounded-md shadow-md hover:shadow-lg bg-white w-full sm:w-[calc(50%-8px)]">
          <img
            :src="user.picture.thumbnail"
            alt="User thumbnail"
            class="w-16 h-16 rounded-full"
          />
          <div class="ml-4 flex-1 overflow-hidden">
            <h2 class="text-lg font-medium text-gray-800 truncate">
              {{ user.name.first }} {{ user.name.last }}
            </h2>
            <p class="text-sm text-gray-500 break-words">
              {{ user.email }}
            </p>
          </div>
        </nuxt-link>
      </div>
      <div v-if="userStore.loading" class="text-center text-blue-600">Loading...</div>
    </div>
  </div>
</template>

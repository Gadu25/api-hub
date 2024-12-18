<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'; // Import the store

// Get the Pinia store instance
const userStore = useUserStore();

// Call the loadFromLocalStorage action when the component mounts
onMounted(() => {
  userStore.loadFromLocalStorage();
});

// Nationality list
const nationality = [
  { name: 'Australia', code: 'au', gender: 'Male' },
  { name: 'Brazil', code: 'br', gender: 'Female' },
  { name: 'Canada', code: 'ca', gender: 'Male' },
  { name: 'Switzerland', code: 'ch', gender: 'Female' },
  { name: 'Germany', code: 'de', gender: 'Male' },
  { name: 'Denmark', code: 'dk', gender: 'Female' },
  { name: 'Spain', code: 'es', gender: 'Male' },
  { name: 'Finland', code: 'fi', gender: 'Female' },
  { name: 'France', code: 'fr', gender: 'Male' },
  { name: 'United Kingdom', code: 'gb', gender: 'Female' },
  { name: 'Ireland', code: 'ie', gender: 'Male' },
  { name: 'India', code: 'in', gender: 'Female' },
  { name: 'Iran', code: 'ir', gender: 'Male' },
  { name: 'Mexico', code: 'mx', gender: 'Female' },
  { name: 'Netherlands', code: 'nl', gender: 'Male' },
  { name: 'Norway', code: 'no', gender: 'Female' },
  { name: 'New Zealand', code: 'nz', gender: 'Male' },
  { name: 'Serbia', code: 'rs', gender: 'Female' },
  { name: 'Turkey', code: 'tr', gender: 'Male' },
  { name: 'Ukraine', code: 'ua', gender: 'Female' },
  { name: 'United States', code: 'us', gender: 'Male' }
];

// Use the selectedGender and selectedNationality from the store
const selectedGender = ref(userStore.selectedGender || 'ALL');
const selectedNationality = ref(userStore.selectedNationality || 'ALL');

// Filter nationality data based on selected gender and nationality
const filteredNationalities = computed(() => {
  return nationality.filter(country => {
    const genderMatch = selectedGender.value === 'ALL' || country.gender === selectedGender.value;
    const nationalityMatch = selectedNationality.value === 'ALL' || country.code === selectedNationality.value;
    return genderMatch && nationalityMatch;
  });
});

// Function to check if Generate button should be enabled
const isGenerateButtonEnabled = computed(() => {
  return selectedGender.value !== '' && selectedNationality.value !== '';
});

// Save the selected data to the store and localStorage
const saveSelections = () => {
  if (selectedGender.value && selectedNationality.value) {
    userStore.saveSelections(selectedGender.value, selectedNationality.value);
  }
};
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-md">
      <!-- Left Grid -->
      <div class="p-6">
        <div class="w-[30%] mb-10">
          <h2 class="font-semibold text-2xl">Let's generate users, please fill the fields</h2>
        </div>

        <!-- Gender Dropdown -->
        <div class="w-[30%]">
          <select v-model="selectedGender"
            @change="saveSelections"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="ALL">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <!-- Nationality Dropdown -->
        <div class="w-[30%] mt-10">
          <select v-model="selectedNationality"
            @change="saveSelections"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="ALL">All</option>
            <option v-for="(country, index) in nationality" :key="index" :value="country.code">
              {{ country.name }}
            </option>
          </select>
        </div>

        <!-- Count Placeholder -->
        <div class="w-[30%] mt-10">
          <input type="text" disabled placeholder="Count of results" class="p-3 rounded-full">
        </div>

        <!-- Generate Button (Disabled if not selected) -->
        <div class="w-[30%] mt-10">
          <nuxt-link :to="isGenerateButtonEnabled ? '/users/usersTable' : '#'">
            <button :disabled="!isGenerateButtonEnabled" @click="saveSelections"
              class="w-full p-3 rounded-full bg-green-500 text-white hover:cursor-pointer hover:bg-green-400 transition-transform">
              Generate
            </button>
          </nuxt-link>
        </div>
      </div>

      <!-- Right Grid with Image -->
      <div class="p-6 flex justify-center items-center">
        <div class="bg-gray-200 h-[80%] w-[60%] text-center">
          IMAGE
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

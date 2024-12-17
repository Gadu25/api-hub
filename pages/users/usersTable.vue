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

// To display the selected filters in the table
const selectedFilters = computed(() => {
  return {
    gender: selectedGender.value === 'ALL' ? 'Any gender' : selectedGender.value,
    nationality: selectedNationality.value === 'ALL' ? 'Any nationality' : nationality.find(country => country.code === selectedNationality.value)?.name || 'Any nationality'
  };
});
</script>

<template>
  <div class="p-6">
    <div class="grid grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-md">
      <!-- Display Filters -->
      <div class="p-6 flex items-center">
        <label class="text-2xl">User Lists</label>
      
      </div>

      <!-- Table -->
      <div class="col-span-2">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th class="px-6 py-3">Nationality</th>
                <th class="px-6 py-3">Gender</th>
                <th class="px-6 py-3">Code</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(country, index) in filteredNationalities" :key="index">
                <td class="px-6 py-3">{{ country.name }}</td>
                <td class="px-6 py-3">{{ country.gender }}</td>
                <td class="px-6 py-3">{{ country.code }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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

// Store initialization
const userStore = useUserStore();


// Reactive references
const selectedGender = ref(userStore.selectedGender || 'ALL');
const selectedNationality = ref(userStore.selectedNationality || 'ALL');
const results = ref(userStore.results || 10); // Default to 10 results
const showResults = ref(false); // Controls whether to display the results



const generateUsers = async () => {
  const filter = {
    results: results.value,
    gender: selectedGender.value === 'ALL' ? '' : selectedGender.value.toLowerCase(),
    nat: selectedNationality.value === 'ALL' ? '' : selectedNationality.value.toLowerCase(),
  };
  await userStore.fetchUser(filter); // Fetch users from the API
  showResults.value = true; // Show results after data is fetched
};

// Filtered users based on selections
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

// Generate button enabled state
const isGenerateButtonEnabled = computed(() => {
  return selectedGender.value !== '' && selectedNationality.value !== '';
});
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-md">
      <!-- Left Panel -->
      <div class="p-6">
        <h2 class="font-semibold text-2xl mb-6">Generate Users</h2>

        <!-- Gender Dropdown -->
        <select v-model="selectedGender" @change="userStore.saveSelections(selectedGender, selectedNationality)" class="form-select">
          <option value="ALL">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <!-- Nationality Dropdown -->
        <select v-model="selectedNationality" @change="userStore.saveSelections(selectedGender, selectedNationality)" class="form-select mt-4">
          <option value="ALL">All Nationalities</option>
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>

        <!-- Results Input -->
        <div class="flex-1 mt-4">
          <label class="block text-sm font-medium text-gray-700">Results</label>
          <input
            type="number"
            v-model.number="results"
            min="1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Generate Button -->
        <button
          :disabled="!isGenerateButtonEnabled"
          @click="generateUsers"
          class="btn mt-6"
        >
          Generate
        </button>
      </div>

      <!-- Right Panel -->
      <div>
        <div v-if="userStore.loading">Loading...</div>
        <div v-else-if="userStore.error" class="text-red-500">{{ userStore.error }}</div>
        <div v-else-if="showResults">
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li
              v-for="(user, index) in filteredUsers"
              :key="index"
              class="p-4 border border-gray-200 rounded-md"
            >
              <div class="flex items-center space-x-4">
                <img
                  :src="user.picture.thumbnail"
                  alt="User thumbnail"
                  class="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 class="text-lg font-medium text-gray-800">
                    {{ user.name.first }} {{ user.name.last }}
                  </h2>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-select {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

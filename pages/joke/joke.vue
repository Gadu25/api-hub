<script setup lang="ts">
// Importing Vue's ref for reactivity
import { ref } from 'vue';

// Array to store chips
const chips = ref([
  { id: 1, name: 'Single' },
  { id: 2, name: 'Two-Part' },
  { id: 3, name: 'Programming' }
]);

// Dropdown categories
const categories = ref(['Programming', 'Miscellaneous', 'Pun', 'Spooky', 'Christmas', 'Any']);

// Track selected categories (as an array)
const selectedCategories = ref<string[]>([]);

// Function to add a category
const addCategory = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  if (selectedValue && !selectedCategories.value.includes(selectedValue)) {
    selectedCategories.value.push(selectedValue); // Add if not already in the list
  }
  (event.target as HTMLSelectElement).value = ''; // Reset dropdown
};

// Function to remove a category (chip)
const removeCategory = (category: string) => {
  selectedCategories.value = selectedCategories.value.filter((item) => item !== category);
};

// Dropdown flags
const flags = ref(['NSFW', 'Religious', 'Political', 'Racist', 'Sexist', 'Explicit']);

// Track selected flags as an array
const selectedFlags = ref<string[]>([]);

// Function to add a flag
const addFlag = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  if (selectedValue && !selectedFlags.value.includes(selectedValue)) {
    selectedFlags.value.push(selectedValue); // Add the selected flag
  }
  (event.target as HTMLSelectElement).value = ''; // Reset dropdown to default
};

// Function to remove a flag chip
const removeFlag = (flag: string) => {
  selectedFlags.value = selectedFlags.value.filter((item) => item !== flag);
};
const amount = ref(1); // Default joke amount

// Reactively track the selected checkbox
const selectedCheckbox = ref('');

const handleCheckboxChange = (value: string) => {
  selectedCheckbox.value = value;
};

</script>

<template>
  <div class="p-6">
    <div class="w-[30%] mb-10">
      <h2 class="font-semibold text-2xl">Jokes Generator</h2>
    </div>

    <!-- Category Dropdown -->
    <div class="w-[100%] mt-16">
      <label class="block mb-2 text-gray-700 font-medium">Categories</label>

      <!-- Input Field with Chips -->
      <div class="bg-gray-50 border border-gray-300 rounded-full px-3 py-2 flex flex-wrap items-center gap-2">
        <!-- Display Chips -->
        <span v-for="category in selectedCategories" :key="category"
          class="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full">
          {{ category }}
          <button @click="removeCategory(category)" class="ml-2 text-white hover:text-gray-200 focus:outline-none">
            &#x2715;
          </button>
        </span>

        <!-- Dropdown -->
        <select @change="addCategory"
          class="bg-transparent border-none focus:outline-none focus:ring-0 text-gray-500 text-sm cursor-pointer">
          <option value="" disabled selected>+ Add Category</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>
    <!-- Flags Dropdown -->
    <div class="mt-16">
      <label class="block mb-2 text-gray-700 font-medium">Flags (jokes you don't want to see)</label>

      <!-- Input Field with Chips -->
      <div class="bg-gray-50 border border-gray-300 rounded-full px-3 py-2 flex flex-wrap items-center gap-2">
        <!-- Display Chips -->
        <span v-for="flag in selectedFlags" :key="flag"
          class="flex items-center bg-red-500 text-white px-3 py-1 rounded-full">
          {{ flag }}
          <button @click="removeFlag(flag)" class="ml-2 text-white hover:text-gray-200 focus:outline-none">
            &#x2715;
          </button>
        </span>

        <!-- Dropdown Selector -->
        <select @change="addFlag"
          class="bg-transparent border-none focus:outline-none focus:ring-0 text-gray-500 text-sm cursor-pointer">
          <option value="" disabled selected>+ Add Flag</option>
          <option v-for="flag in flags" :key="flag" :value="flag">
            {{ flag }}
          </option>
        </select>
      </div>
    </div>

    <!-- Checkbox Section (Type of Jokes) -->
    <div class="mt-16">
      <label>Type of Jokes</label>
      <div class="mt-2 flex gap-4 flex-wrap">
        <!-- Single Joke -->
        <div class="flex items-center gap-2">
          <input type="checkbox" id="single" name="type" value="Single" :checked="selectedCheckbox === 'Single'"
            @change="handleCheckboxChange('Single')" class="w-5 h-5 rounded-full border-gray-300 focus:ring-0" />
          <label for="single">Single</label>
        </div>

        <!-- Two-Part Joke -->
        <div class="flex items-center gap-2">
          <input type="checkbox" id="two-part" name="type" value="Two-Part" :checked="selectedCheckbox === 'Two-Part'"
            @change="handleCheckboxChange('Two-Part')" class="w-5 h-5 rounded-full border-gray-300 focus:ring-0" />
          <label for="two-part">Two Part</label>
        </div>
      </div>
    </div>
    <!-- Amount Input -->
    <div class="mt-16">
      <label>Amount</label>
      <input v-model.number="amount" type="number" min="1" max="10"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-3" />
    </div>

    <!-- Generate Button -->
    <div class="w-[10%] mt-10">
      <button
        class="w-full p-3 rounded-full bg-green-500 text-white hover:cursor-pointer hover:bg-green-400 transition-transform">
        Generate
      </button>
    </div>
    
  </div>

</template>

<style scoped>
/* Hide the default checkbox */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  /* For Safari */
  -moz-appearance: none;
  /* For Firefox */
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  /* Makes it a circle */
  outline: none;
  cursor: pointer;
  display: inline-block;
  position: relative;
}

/* Checked state styling */
input[type="checkbox"]:checked {
  background-color: #4caf50;
  /* Green when checked */
  border: 2px solid #4caf50;
}

/* Inner circle (checked mark) */
input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
}

</style>
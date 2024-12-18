<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';

// Reactive state for inputs and results
const amount = ref<number | null>(null);
const fromCurrency = ref('PHP');
const toCurrency = ref('USD');
const exchangeRate = ref(0);
const result = computed(() => (amount.value ? (amount.value * exchangeRate.value).toFixed(2) : '0.00'));

// API endpoint and key
const API_KEY = 'e582d1ed4594afc301bfddc1'; // Replace this with your actual API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

// Fetch exchange rate from the API
const fetchExchangeRate = async () => {
  if (fromCurrency.value && toCurrency.value) {
    try {
      const response = await axios.get(`${API_URL}${fromCurrency.value}`);
      exchangeRate.value = response.data.conversion_rates[toCurrency.value];
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  }
};

// Fetch rate when currency is changed
fetchExchangeRate();
</script>

<template>
  <div class="p-6">
    <div class="w-[30%] mb-10">
      <h2 class="font-semibold text-2xl">Currency Calculator</h2>
    </div>

    <div class="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
      <!-- Amount Input -->
      <div class="mb-6">
        <label class="block text-gray-600 mb-2" for="amount">Amount</label>
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          placeholder="100"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <!-- From and To Dropdown -->
      <div class="flex items-center justify-between mb-6">
        <!-- From Dropdown -->
        <div>
          <label class="block text-gray-600 mb-2">From</label>
          <select
            v-model="fromCurrency"
            @change="fetchExchangeRate"
            class="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="PHP">Philippine Peso</option>
            <option value="USD">United States Dollar</option>
            <option value="EUR">Euro</option>
            <!-- Add more currencies as needed -->
          </select>
        </div>

        <!-- Swap Arrows -->
        <div class="text-gray-400 flex items-center">
          <span class="px-2 text-lg">&#8646;</span>
        </div>

        <!-- To Dropdown -->
        <div>
          <label class="block text-gray-600 mb-2">To</label>
          <select
            v-model="toCurrency"
            @change="fetchExchangeRate"
            class="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="PHP">Philippine Peso</option>
            <option value="USD">United States Dollar</option>
            <option value="EUR">Euro</option>
            <!-- Add more currencies as needed -->
          </select>
        </div>
      </div>

      <!-- Result -->
      <div class="text-gray-800">
        <p class="text-sm text-gray-600 mb-1">Result</p>
        <p class="text-4xl font-bold">{{ result }} {{ toCurrency }}</p>
        <p class="text-sm text-gray-500 mt-1">
          1 {{ fromCurrency }} = {{ exchangeRate.toFixed(5) }} {{ toCurrency }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

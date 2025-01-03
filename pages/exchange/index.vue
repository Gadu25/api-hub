<script>
import { useExchangeRateStore } from "@/stores/useExchangeRateStore";
import { onMounted, ref, watch } from "vue";

const exchangeRateStore = useExchangeRateStore()

export default {
  setup() {
    const exchangeRateStore = useExchangeRateStore();

    const amount = ref(1);
    const fromCurrency = ref("USD");
    const toCurrency = ref("EUR");
    const result = ref(null);

    const convert = () => {
      if (exchangeRateStore.currencyData.conversion_rates) {
        result.value = exchangeRateStore.convertTo(amount.value, toCurrency.value);
      }
    };

    const fetchAndConvert = async () => {
      try {
        await exchangeRateStore.fetchCurrency(fromCurrency.value);
        convert();
      } catch (error) {
        console.error("Error fetching exchange rates", error);
      }
    };

    watch(fromCurrency, fetchAndConvert);

    watch([amount, toCurrency], convert);

    onMounted(async() => {
     await exchangeRateStore.fetchSupportedCodes();
      fetchAndConvert();
    });

    return {
      exchangeRateStore,
      amount,
      fromCurrency,
      toCurrency,
      result,
      convert,
    };
  },
};
</script>

<template>
  <div>
    <div class="mb-10">
      <h2 class="font-semibold text-2xl lg:text-4xl">Currency Calculator</h2>
    </div>

    <!-- Loading Indicator -->
    <div v-if="exchangeRateStore.loading" class="text-blue-500 mb-4">Loading...</div>

    <!-- Error Message -->
    <div v-if="exchangeRateStore.error" class="text-red-500 mb-4">{{ exchangeRateStore.error }}</div>

    <!-- Amount Input -->
    <div class="mb-10">
      <label class="block text-gray-600 mb-2" for="amount">Amount</label>
      <input id="amount" type="number" v-model="amount" @input="convert"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" />
    </div>

    <!-- From and To Dropdown -->
    <div class="flex items-center justify-between mb-10">
      <!-- From Dropdown -->
      <div class="w-full">
        <label class="block text-gray-600 mb-2">From</label>
        <select id="fromCurrency" v-model="fromCurrency" @change="convert"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 w-full">
          <option v-for="code in exchangeRateStore.supportedCodes" :key="code" :value="code[0]">
            {{ code[1] }}
          </option>
        </select>
      </div>

      <!-- Swap Arrows -->
      <div class="text-gray-400 mt-10">
        <span class="px-4 text-lg">&#8646;</span>
      </div>

      <!-- To Dropdown -->
      <div class="w-full">
        <label class="block text-gray-600 mb-2">To</label>
        <select id="toCurrency" v-model="toCurrency" @change="convert"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 w-full">
          <option v-for="code in exchangeRateStore.supportedCodes" :key="code" :value="code[0]">
            {{ code[1] }}
          </option>
        </select>
      </div>
    </div>

    <!-- Result -->
    <div class="text-gray-800 mt-2">
      <p class="text-gray-600 mb-2">Result</p>
      <p class="text-3xl lg:text-6xl font-bold mb-4">{{ result }} {{ toCurrency }}</p>
      <p class="text-sm text-gray-500 mt-1">
        1 {{ fromCurrency }} = {{ result / amount }} {{ toCurrency }} 
      </p>
      <p class="text-sm text-gray-500 mt-1">
        1 {{ toCurrency }} = {{ amount / result }} {{ fromCurrency }} 
      </p>
    </div>
  </div>
</template>

<style scoped></style>

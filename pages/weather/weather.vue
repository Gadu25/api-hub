<template>
  <div class="min-h-screen flex flex-col items-center text-white p-6">
    <!-- Main Content -->
    <main class="flex-grow w-full">
      
      <!-- Add Location Form -->
      <div class="flex justify-between items-center bg-white text-gray-700 p-4 rounded-lg shadow-lg mb-8">
        <input
          v-model="newCity"
          type="text"
          placeholder="Enter city name"
          class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          @click="addCity"
          class="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="weatherStore.error" class="mt-6 text-red-400 text-center">
        {{ weatherStore.error }}
      </div>

      <!-- Weather Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="city in weatherStore.savedLocations"
          :key="city"
          class="bg-white text-gray-800 rounded-lg shadow-md p-6 relative flex flex-col items-center text-center"
        >
          <!-- Remove Button -->
          <button
            @click="removeCity(city)"
            class="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
          >
            ✕
          </button>
          <!-- City Name -->
          <h2 class="text-xl font-bold text-blue-600">{{ city }}</h2>

          <!-- Weather Data -->
          <div v-if="weatherStore.weatherData[city]" class="mt-4">
            <img
              :src="`http://openweathermap.org/img/wn/${weatherStore.weatherData[city].weather[0].icon}@2x.png`"
              :alt="weatherStore.weatherData[city].weather[0].description"
              class="w-16 h-16 mx-auto"
            />
            <p class="text-lg font-semibold">{{ (weatherStore.weatherData[city].main.temp - 273.15).toFixed(2) }}°C</p>
            <p class="text-gray-600 capitalize">{{ weatherStore.weatherData[city].weather[0].description }}</p>
            <div class="mt-2 text-sm text-gray-500">
              <p>Min: {{ (weatherStore.weatherData[city].main.temp_min - 273.15).toFixed(2) }}°C | Max: {{ (weatherStore.weatherData[city].main.temp_max - 273.15).toFixed(2) }}°C</p>
              <p>Humidity: {{ weatherStore.weatherData[city].main.humidity }}%</p>
              <p>Wind: {{ weatherStore.weatherData[city].wind.speed }} m/s</p>
            </div>
          </div>

          <!-- Loading and Error States -->
          <div v-else-if="weatherStore.loading" class="text-gray-500 mt-4">
            Loading...
          </div>
          <div v-else class="text-red-500 mt-4">
            Failed to load data
          </div>
        </div>
      </div>
    </main>

   
  </div>
</template>

<script>
import { ref } from 'vue';
import { useWeatherStore } from '~/stores/useWeatherStore';
export default {
  setup() {
    const weatherStore = useWeatherStore();
    const newCity = ref('');
    const addCity = () => {
      if (newCity.value.trim()) {
        weatherStore.addLocation(newCity.value.trim());
        newCity.value = '';
      }
    };
    const removeCity = (city) => {
      weatherStore.removeLocation(city);
    };
    return {
      weatherStore,
      newCity,
      addCity,
      removeCity,
    };
  },
};
</script>
<style>
/* Add any additional custom styles if needed */
</style>
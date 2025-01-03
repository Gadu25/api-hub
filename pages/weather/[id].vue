<template>
  <div class="flex flex-col md:flex-row justify-between p-6 bg-gray-50 min-h-screen">
    <!-- Main Weather Section -->
    <div class="flex-1 bg-white shadow-lg rounded-lg p-6">
      <div v-if="currentLocation" class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">{{ currentLocation.location }}</h1>
          <p class="text-gray-500">{{ currentLocation.condition }}</p>
        </div>
        <div class="text-5xl font-bold">{{ currentLocation.temperature }}°C</div>
      </div>
      <div v-else>
        <p class="text-gray-500">Loading location data...</p>
      </div>
      <h1 class="text-xl font-extrabold">{{weatherStore.weatherData[id]?.name}}</h1>
      <div class="mt-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg overflow-x-auto">
        <div class="flex flex-col items-center">
          <span>Now</span>
          <span>🌩️</span>
          <span>32°C</span>
        </div>
        <div class="flex flex-col items-center">
          <span>12pm</span>
          <span>🌩️</span>
          <span>34°C</span>
        </div>
        <div class="flex flex-col items-center">
          <span>3pm</span>
          <span>🌞</span>
          <span>40°C</span>
        </div>
        <div class="flex flex-col items-center">
          <span>6pm</span>
          <span>⛅</span>
          <span>42°C</span>
        </div>
        <div class="flex flex-col items-center">
          <span>9pm</span>
          <span>🌑</span>
          <span>40°C</span>
        </div>
        <div class="flex flex-col items-center">
          <span>12am</span>
          <span>🌑</span>
          <span>38°C</span>
        </div>
        <div class="flex flex-col items-center">
          <span>6am</span>
          <span>🌅</span>
          <span>37°C</span>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-lg">Winds</p>
        <p>1.54 m/s</p>
        <p>130 deg</p>
      </div>
    </div>

    <!-- Sidebar for Other Locations -->
    <div class="mt-6 md:mt-0 md:ml-6 w-full md:w-1/4 bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-lg font-bold mb-4">Other Locations</h2>
      <ul>
        <li
          v-for="(location, index) in otherLocations"
          :key="index"
          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2"
        >
          <span>{{ location.location }}</span>
          <span>{{ location.condition === "Sunny" ? "☀️" : location.condition === "Cloudy" ? "⛅" : "🌧️" }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWeatherStore } from '~/stores/useWeatherStore';

const weatherStore = useWeatherStore();

const route = useRoute();
const id = ref(route.params.id)
const currentLocation = ref<{ id: string; location: string; temperature: number; condition: string } | null>(null);
const otherLocations = ref<{ id: string; location: string; temperature: number; condition: string }[]>([]);

onMounted(() => {
  // Get the ID from the route
  const locationId = route.params.id;

  // Fetch stored data from localStorage
  const storedData = JSON.parse(localStorage.getItem("locations") || "[]");

  // Find the location matching the ID
  currentLocation.value = storedData.find((item: { id: string }) => item.id === locationId) || null;

  // Filter other locations
  otherLocations.value = storedData.filter((item: { id: string }) => item.id !== locationId);
});
</script>

<style scoped>
/* Additional styles if necessary */
</style>

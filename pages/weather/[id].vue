<template>

  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Header -->


    <!-- Main Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left Panel -->
      <div class="md:col-span-2 space-y-6">
        <!-- Weather Summary -->
        <div class="bg-gray-800 p-6 rounded-xl shadow-md">
          <div class="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4 md:space-y-0 space-y-4 md:flex-nowrap flex-wrap">
            <div class="p-4 rounded-md text-start md:w-1/2">
              <h2 class="text-2xl font-bold">{{ city.city.name }}</h2>
              <p class="text-lg">{{ city.city.country }}</p>
            </div>
            <div class="p-4 rounded-md text-center md:w-1/3">
              <p class="text-4xl font-bold">{{ (weather.main.temp - 273.15).toFixed(2) }}&deg;C </p>Temperature
            </div>
            <div class="p-4 rounded-md text-center md:w-1/3">
              <p><span class="text-4xl font-bold">{{ weather.main.humidity }}%</span> </p>Humidity
            </div>
            <div class="p-4 rounded-md text-center md:w-1/3">
              <p><span class="text-4xl font-bold">{{ weather.wind.speed }} </span> </p>km/h Wind speed
            </div>
          </div>
          <!-- Forecast Row -->
          <div class="weekly-forecast">
            <div v-for="forecast in city.list" :key="forecast.dt" class="day">
              <span class="time">
                {{ new Date(forecast.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}
              </span>
              <span class="temp">{{ (forecast.main.temp - 273.15).toFixed(0) }}°</span><br>
              <span>{{ forecast.weather[0].description.charAt(0).toUpperCase() +
                forecast.weather[0].description.slice(1) }}</span>
            </div>
          </div>

        </div>

        <!-- Overview Section -->
        <div class="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 class="text-xl font-bold mb-4">Overview Today</h2>
          <!-- Chart Placeholder -->
          <div class="flex flex-col items-center justify-center">
            <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
              class="w-32 h-32 mx-auto" />
            <h1 class="text-white font-bold text-3xl">{{ weather.weather[0].description.toUpperCase() }}</h1>
          </div>
          <div class="flex mt-4 justify-between">
            <div class="bg-gray-700 px-4 py-2 rounded-md">Sunrise <br>

              {{ new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit'
              }) }}
            </div>
            <div class="bg-gray-700 px-4 py-2 rounded-md">Sunset
              <br>
              {{ new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
              }}
            </div>
            <div class="bg-gray-700 px-4 py-2 rounded-md">Timezone <br>
              <span>{{ new Date().getTimezoneOffset() * 60 }}</span>
            </div>
          
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="space-y-6">
        <!-- Forecast Section -->
        <div class="bg-gray-800 p-6 rounded-xl shadow-md">
          <h1 class="text-2xl font-bold text-white mb-4 text-center">Weather Information</h1>
          <div class="grid grid-cols-2 gap-4">


            <div class="text-gray-600">Feels Like:</div>
            <div class="font-medium text-white">{{ weather.main.feels_like }} K</div>

            <div class="text-gray-600">Min Temp:</div>
            <div class="font-medium text-white">{{ weather.main.temp_min }} K</div>

            <div class="text-gray-600">Max Temp:</div>
            <div class="font-medium text-white">{{ weather.main.temp_max }} K</div>

            <div class="text-gray-600">Pressure:</div>
            <div class="font-medium text-white">{{ weather.main.pressure }} hPa</div>

            <div class="text-gray-600">Sea Level:</div>
            <div class="font-medium text-white">{{ weather.main.sea_level }} hPa</div>

            <div class="text-gray-600">Ground Level:</div>
            <div class="font-medium text-white">{{ weather.main.grnd_level }} hPa</div>

            <div class="text-gray-600">Humidity:</div>
            <div class="font-medium text-white">{{ weather.main.humidity }}%</div>

          
          </div>
        </div>

      
      </div>
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
const city = weatherStore.forecastData[id.value]
const weather = weatherStore.weatherData[id.value]
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
.weather-info h1 {
  font-size: 80px;
  margin-bottom: 10px;
}

.weekly-forecast {
  display: flex;
  gap: 20px;
  /* Reduced gap for better spacing */
  padding: 10px;
  overflow-x: auto;
  /* Enables horizontal scrolling on small screens */
  width: 100%;
  /* Full width on all screens */
}

.day {
  flex: 0 0 auto;
  /* Prevent shrinking and maintain size */
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
  min-width: 80px;
  /* Ensures a consistent size for each day */
}

.time {
  display: block;
  font-size: 14px;
  font-weight: bold;
}




/* Responsive Styles */
@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .sidebar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
  }

  .main-content {
    padding: 15px;
  }

  .weekly-forecast {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }

  .recently-searched {
    margin-top: 10px;
  }

  .cards {
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .card {
    flex: 1 0 45%;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 480px) {
  .header p {
    font-size: 1.5rem;
  }

  .weather-info h1 {
    font-size: 2rem;
  }

  .weekly-forecast {
    gap: 30px;
    /* Increase spacing for larger screens */
  }

  .day {
    min-width: 100px;
    /* Larger cards for wider screens */
    padding: 15px;
  }

  .time {
    font-size: 16px;
  }

  .temp {
    font-size: 20px;
  }

  .sidebar {
    flex-direction: column;
    align-items: start;
    padding: 10px;
  }

  .recently-searched h2 {
    font-size: 1.2rem;
  }
}

/* Thinner scrollbar and adjusted opacity */
::-webkit-scrollbar {
  width: 2px;
  /* Thinner scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  /* Semi-transparent thumb */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
  /* Darker thumb on hover */
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
  /* Light background for track */
}

/* Optional: Control scrollbar opacity */
::-webkit-scrollbar {
  opacity: 0.8;
  /* Set opacity to a desired level */
}

::-webkit-scrollbar:hover {
  opacity: 1;
  /* Fully visible scrollbar on hover */
}
</style>

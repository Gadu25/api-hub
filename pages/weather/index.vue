<template>
  <div class="min-h-screen flex flex-col items-center text-white p-6">
    <!-- Main Content -->
    <main class="flex-grow w-full just">

      <!-- Add Location Form -->
      <div
        class="flex justify-center items-center bg-white text-gray-700 p-4 rounded-lg shadow-lg mb-8 max-w-2xl w-full">
        <input v-model="newCity" type="text" placeholder="Enter city name"
          class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button @click="addCity"
          class="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Add
        </button>
      </div>

      <!-- Card Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="city in weatherStore.savedLocations" :key="city"
          class="bg-gradient-to-b from-blue-500 to-blue-400 w-full rounded-xl shadow-xl p-6 relative">
          <button @click="removeCity(city)"
            class="absolute top-2 right-2 bg-slate-100 text-red-300 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700">
            ✕
          </button>
          <!-- Location and Date -->
          <div class="text-white mt-5">
            <div class="text-sm bg-white/20 px-2 py-1 rounded-lg">
              <!-- Date -->
              <p>{{ formatDate(weatherStore.forecastData[city].list[0].dt_txt) }}</p>
            </div>
            <div class="flex items-center space-x-2 justify-center">
              <p class="font-medium">{{ city }}</p>
            </div>
          </div>
          <!-- Weather Icon and Temperature -->
          <div class="text-center mt-4">
            <div class="w-15 h-15 mx-auto mb-2">
              <!-- Replace with an actual icon -->
              <img :src="`http://openweathermap.org/img/wn/${weatherStore.weatherData[city].weather[0].icon}@2x.png`"
                :alt="weatherStore.weatherData[city].weather[0].description" class="w-16 h-16 mx-auto"
                :class="getWeatherAnimation(weatherStore.weatherData[city].weather[0].description)" />

            </div>
            <p class="text-4xl font-semibold">{{ (weatherStore.weatherData[city].main.temp - 273.15).toFixed(2) }}°C</p>
            <h1 class="text-white capitalize">{{ weatherStore.weatherData[city].weather[0].description }}</h1>
          </div>
          <!-- Additional Weather Info -->
          <div class="flex justify-between text-white text-sm mt-4">
            <div class="flex items-center space-x-1">
              <span>💨</span>
              <p>Wind: {{ weatherStore.weatherData[city].wind.speed }} m/s</p>
            </div>
            <div class="flex items-center space-x-1">
              <p>Min: {{ (weatherStore.weatherData[city].main.temp_min - 273.15).toFixed(2) }}°C | Max: {{
                (weatherStore.weatherData[city].main.temp_max - 273.15).toFixed(2) }}°C</p>
            </div>
            <div class="flex items-center space-x-1">
              <span>💧</span>
              <p>Hum: {{ weatherStore.weatherData[city].main.humidity }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="weatherStore.error" class="mt-6 text-red-400 text-center">
        {{ weatherStore.error }}
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
    const getWeatherAnimation = (description) => {
      switch (description.toLowerCase()) {
        case 'clear sky':
          return 'sunny-animation';
        case 'overcast clouds':
        case 'broken clouds':
          return 'cloudy-animation';
        case 'rain':
        case 'moderate rain':
        case 'light rain':
          return 'rainy-animation';
        case 'Rain':
          return 'stormy-animation';
        case 'light snow':
          return 'light-snow-animation';
        case 'snow':
          return 'snowy-animation';
        default:
          return '';
      }
    };

    const formatDate = (dateString) => {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      return new Date(dateString).toLocaleString('en-US', options);
    };
    return {
      getWeatherAnimation,
      formatDate,
      weatherStore,
      newCity,
      addCity,
      removeCity,
    };
  },
};
</script>
<style>
/* Sunny Animation */
@keyframes sunny {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

.sunny-animation {
  animation: sunny 2s infinite;
}

/* Cloudy Animation */
@keyframes cloudy {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.cloudy-animation {
  animation: cloudy 3s infinite ease-in-out;
}

/* Rainy Animation */
@keyframes rainy {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(10px);
  }
}

.rainy-animation {
  animation: rainy 0.5s infinite alternate;
}

/* Stormy Animation */
@keyframes stormy {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}

.stormy-animation {
  animation: stormy 1s infinite;
}

/* Snowy Animation */
@keyframes snowy {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
}

.snowy-animation {
  animation: snowy 1s infinite alternate;
}


/* Light Snow Animation */
@keyframes light-snow {
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }

  50% {
    transform: translateY(10px);
    opacity: 0.5;
  }

  100% {
    transform: translateY(20px);
    opacity: 0.8;
  }
}

.light-snow-animation {
  animation: light-snow 2s infinite ease-in-out;
}
</style>
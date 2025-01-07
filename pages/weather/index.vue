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

      <!-- Modal (Error Popup) -->
      <transition name="modal-fade">
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-yellow-600 text-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </transition>

      <!-- Card Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="city in weatherStore.savedLocations" :key="city"
          class="bg-gradient-to-b from-blue-500 to-blue-400 w-full rounded-xl shadow-xl p-6 relative" :style="{
            backgroundImage: `url(${getWeatherBackground(weatherStore.weatherData[city].weather[0].description)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }">
          <button @click="removeCity(city)"
            class="absolute top-2 right-2  text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700">
            ✕
          </button>
          <!-- Location and Date -->
          <nuxt-link :to="`weather/${city}`">
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
              <p class="text-4xl font-semibold">{{ (weatherStore.weatherData[city].main.temp - 273.15).toFixed(2) }}°C
              </p>
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
          </nuxt-link>
        </div>
      </div>

      <!-- Error Message (for display) -->
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
    const errorMessage = ref('');
    const showModal = ref(false); // Control the visibility of the modal
    const addCity = () => {
      const cityName = newCity.value.trim().toLowerCase();
      if (cityName && !weatherStore.savedLocations.some(city => city.toLowerCase() === cityName)) {
        weatherStore.addLocation(newCity.value.trim());
        newCity.value = '';
        errorMessage.value = ''; // Clear any previous error messages
      } else if (cityName) {
        errorMessage.value = `The city "${newCity.value.trim()}" already exists.`; // Set error message
        showModal.value = true; // Show the modal
        setTimeout(() => {
          showModal.value = false; // Hide the modal after 5 seconds
        }, 2000);
      }
    };

    const removeCity = (city) => {
      weatherStore.removeLocation(city);
    };
    const getWeatherBackground = (description) => {
      const weatherImages = {
        'clear sky': '/clear.gif',
        'overcast clouds': 'https://images.unsplash.com/photo-1442213391790-7656f6e368b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODUxNzB8MHwxfHNlYXJjaHw3fHxvdmVyY2FzdCUyMGNsb3Vkc3xlbnwwfHx8fDE3MzU4ODY1Nzl8MA&ixlib=rb-4.0.3&q=85',
        'scattered clouds': '/scatter.gif',
        'broken clouds': '/broken.gif',
        'light rain': '/rain.gif',
        'moderate rain': 'https://source.unsplash.com/1600x900/?rainy',
        'thunderstorm': '/thunderstorm.gif',
        'snow': 'https://source.unsplash.com/1600x900/?snow',
        'mist': 'https://source.unsplash.com/1600x900/?mist',
        // Add more mappings as needed
      };

      return weatherImages[description.toLowerCase()] || 'https://source.unsplash.com/1600x900/?weather';
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
      getWeatherBackground,
      getWeatherAnimation,
      formatDate,
      weatherStore,
      newCity,
      addCity,
      removeCity,
      showModal, // Expose the modal visibility state
      errorMessage, // Expose the error message
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

/* Modal Fade-in and Fade-out Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.modal-fade-enter,
.modal-fade-leave-to

/* .modal-fade-leave-active in <2.1.8 */
  {
  opacity: 0;
  transform: translateY(50px);
  /* Slide from below */
}
</style>
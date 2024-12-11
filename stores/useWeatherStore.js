import { defineStore } from 'pinia';
import { getWeatherData, getForecastData } from '~/api/weather';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: {},
    forecastData: {},
    savedLocations: [],
    loading: false,
    error: null,
  }),
  actions: {
    // Fetch weather and forecast data for a single city
    async fetchWeatherAndForecast(city) {
      this.loading = true;
      try {
        const weather = await getWeatherData(city);
        const forecast = await getForecastData(city);

        if(weather.cod != 200 || forecast.cod != 200){
            this.removeLocation(city)
        }else {
            this.weatherData[city] = weather;
            this.forecastData[city] = forecast;
        }

      } catch (error) {
        this.error = `Failed to fetch data for ${city}`;
        this.removeLocation(city)
      } finally {
        this.loading = false;
      }
    },

    // Fetch weather and forecast data for all saved locations
    async fetchAllLocationsData() {
      this.loading = true;
      try {
        await Promise.all(
          this.savedLocations.map(async (city) => {
            const weather = await getWeatherData(city);
            const forecast = await getForecastData(city);

            // Store the fetched data
            this.weatherData[city] = weather;
            this.forecastData[city] = forecast;
          })
        );
      } catch (error) {
        this.error = 'Failed to fetch data for some locations';
      } finally {
        this.loading = false;
      }
    },

    // Add a new location to savedLocations
    addLocation(city) {
      if (!this.savedLocations.includes(city)) {
        this.savedLocations.push(city);
        this.fetchWeatherAndForecast(city); // Fetch data for the new location
      }
    },

    // Remove a location from savedLocations
    removeLocation(city) {
      this.savedLocations = this.savedLocations.filter((location) => location !== city);
      delete this.weatherData[city];
      delete this.forecastData[city];
    },
  },
  persist: {
    key: 'saved-locations',
    paths: ['savedLocations']
  }
});

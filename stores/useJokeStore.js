import { defineStore } from 'pinia';
import { getJokes } from '~/api/joke'; // Assuming you have a jokes.js file for API calls

export const useJokeStore = defineStore('joke', {
  state: () => ({
    jokeData: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchJokes(filters) {
      this.loading = true;

      try {
        const jokes = await getJokes(filters);
        this.jokeData = jokes;
      } catch (error) {
        this.error = 'Failed to fetch jokes';
      } finally {
        this.loading = false;
      }
    },
    getJokesData() {
      return this.jokeData;
    },
  },
});
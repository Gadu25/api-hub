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
        if(jokes.amount){
          this.jokeData = jokes.jokes
        }else{
          this.jokeData = [{
            'category': jokes.category,
            'delivery': jokes.delivery,
            'flags': jokes.flags,
            'id': jokes.id,
            'lang': jokes.lang,
            'safe': jokes.safe,
            'setup': jokes.setup,
            'type': jokes.type
          }]
        }
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
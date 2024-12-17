import { defineStore } from 'pinia';
import { getPictureOfTheDay } from '~/api/nasa';

export const useNasaStore = defineStore('exchangeRate', {
    state: () => ({
        pictureOfTheDay: {},
        loading: false,
        error: null
    }),
    actions: {
        async fetchPictureOfTheDay() {
            this.loading = true;
            try {
                const picture = await getPictureOfTheDay();
                this.pictureOfTheDay = picture;
            } catch(error){
                this.error = `Failed to fetch data`;
            } finally {
                this.loading = false
            }
        },
        getPictureOfTheDay(){
            return this.pictureOfTheDay;
        }
    }
})
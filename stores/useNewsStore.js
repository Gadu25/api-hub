import { defineStore } from 'pinia';
import { getHeadLineData, getNewsByQuery } from '~/api/news';

export const useNewsStore = defineStore('news', {
    state: () => ({
        headlineData: {},
        searched: {},
        loading: false,
        error: null
    }),
    actions: {
        async fetchHeadLines(country){
            this.loading = true;
            try {
                const headline = await getHeadLineData(country);
                this.headlineData = headline;
            } catch(error){
                this.error = `Failed to fetch headline data for ${country}`;
            } finally {
                this.loading = false;
            }
        },
        async fetchEverything(query){
            this.loading = true;
            try {
                const everything = await getNewsByQuery(query);
                this.searched = everything;
            } catch(error){
                this.error = `Failed to fetch headline data for ${query}`;
            } finally {
                this.loading = false;
            }
        },
        getHeadlineData() {
            return this.headlineData;
        },
        getSearched() {
            return this.searched;
        }
    }
})
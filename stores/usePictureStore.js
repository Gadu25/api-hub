import { defineStore } from 'pinia';
import { getPictureData } from '~/api/pictures';

export const usePictureStore = defineStore('picture', {
    state: () => ({
        pictureData: {},
        loading: false,
        error: null
    }),
    actions: {
        async fetchPicture(query) {
            this.loading = true;
            try {
                const picture = await getPictureData(query);
                this.pictureData = picture
            } catch (error) {
                this.error = `Failed to fetch data for ${query}`;
            } finally {
                this.loading = false;
            }
        },
        getPictures(){
            return this.pictureData
        }
    }
})
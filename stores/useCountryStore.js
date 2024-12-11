import { defineStore } from 'pinia';
import { getAllCountriesData, getCountryData } from '~/api/countries';

export const useCountryStore = defineStore('country', {
    state: () => ({
        countriesData: {},
        countryData: {},
        loading: false,
        error: null
    }),
    actions: {
        async fetchCountries(){
            this.loading = true;
            try {
                const countries = await getAllCountriesData();
                this.countriesData = countries;
            } catch(error) {
                this.error = `Failed to fetch data`;
            } finally {
                this.loading = false
            }
        },
        async fetchCountry(name){
            this.loading = true;
            try {
                const country = await getCountryData(name);
                this.countryData = country;
            } catch(error) {
                this.error = `Failed to fetch data`;
            } finally {
                this.loading = false
            }
        },
        getCountries() {
            return this.countriesData
        },
        getCountry(){
            return this.countryData
        }
    }
})
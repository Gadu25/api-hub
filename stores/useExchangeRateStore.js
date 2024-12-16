import { defineStore } from 'pinia';
import { getLatestCurrency, getLatestCodes } from '~/api/exchangeRate';

export const useExchangeRateStore = defineStore('exchangeRate', {
    state: () => ({
        currencyData: {},
        supportedCodes: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchCurrency(code) {
            this.loading = true;
            try {
                const currency = await getLatestCurrency(code);
                this.currencyData = currency;
            } catch(error){
                this.error = `Failed to fetch data`;
            } finally {
                this.loading = false
            }
        },
        async fetchSupportedCodes() {
            this.loading = true;
            try {
                const codes = await getLatestCodes();
                this.supportedCodes = codes.supported_codes;
            } catch(error) {
                this.error = `Failed to fetch codes`;
            } finally {
                this.loading = false
            }
        },
        convertTo(amount = 1, code){
            this.loading = true;
            try {
                const result = this.currencyData.conversion_rates[code] * amount
                return result;
            } catch(error) {
                this.error = `Failed to convert`
            } finally {
                this.loading = false
            }
        }
    }
})
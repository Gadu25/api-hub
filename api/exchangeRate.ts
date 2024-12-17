import { API_CONFIG } from "~/utils/apiConfig";

export interface CurrencyData {
    [key: string]: any;
}

const apikey = '1a0edfbc508abcc3f89a8352'

export const getLatestCurrency = async (currency: String): Promise<CurrencyData> => {
    const response = await fetch(`${API_CONFIG.exchangeRate}${apikey}/latest/${currency}`);
    const data: CurrencyData = await response.json();
    return data;
}

export const getLatestCodes = async (): Promise<CurrencyData> => {
    const response = await fetch(`${API_CONFIG.exchangeRate}${apikey}/codes`);
    const data: CurrencyData = await response.json();
    return data;
}
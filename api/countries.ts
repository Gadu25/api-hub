import { API_CONFIG } from "~/utils/apiConfig";

export interface CountryData {
    [key: string]: any;
}

export const getAllCountriesData = async (): Promise<CountryData> => {
    const response = await fetch(`${API_CONFIG.countries}all`);
    if (!response.ok) {
        throw new Error(`Failed to fetch countries data`);
    }
    const data: CountryData = await response.json();
    return data;
}

export const getCountryData = async (name: string): Promise<CountryData> => {
    const response = await fetch(`${API_CONFIG.countries}name/${name}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data for ${name}`);
    }
    const data: CountryData = await response.json();
    return data;
}
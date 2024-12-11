import { API_CONFIG } from "~/utils/apiConfig";

const apikey = 'cfd392f9576232fa2e8ade9d42b91081';

export interface WeatherData {
    [key: string]: any;
}

export interface ForecastData {
    [key: string]: any;
}

export const getWeatherData = async (city: string = 'manila'): Promise<WeatherData> => {
    const response = await fetch(`${API_CONFIG.weather}weather?q=${city}&appid=${apikey}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data for ${city}`);
    }
    const data: WeatherData = await response.json();
    return data;
};

export const getForecastData = async (city: string = 'manila'): Promise<ForecastData> => {
    const response = await fetch(`${API_CONFIG.weather}forecast?q=${city}&appid=${apikey}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch forecast data for ${city}`);
    }
    const data: ForecastData = await response.json();
    return data;
};
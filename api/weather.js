import { API_CONFIG } from "~/utils/apiConfig";
const apikey = 'cfd392f9576232fa2e8ade9d42b91081'

export const getWeatherData = async (city = 'manila') => {
    const response = await fetch(`${API_CONFIG.weather}weather?q=${city}&appid=${apikey}`);
    const data = await response.json();
    return data;
 };

 export const getForecastData = async (city = 'manila') => {
    const response = await fetch(`${API_CONFIG.weather}forecast?q=${city}&appid=${apikey}`);
    const data = await response.json();
    return data;
};
import { API_CONFIG } from "~/utils/apiConfig";

export interface NasaData {
    [key: string]: any;
}

const apikey = 'bvrD6YAliQsZuDv7co7l1Dzy0S6IjsmhkpdtIWxa'

export const getPictureOfTheDay = async (): Promise<NasaData> => {
    const response = await fetch(`${API_CONFIG.nasa}planetary/apod?api_key=${apikey}`)
    const data: NasaData = await response.json();
    return data;
}
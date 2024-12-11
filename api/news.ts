import { API_CONFIG } from "~/utils/apiConfig";

const apikey = 'aee38fdb4d584ae49993164e6cfb1a95';

const headers = {
    method: 'GET',
    headers: {
        'User-Agent': 'api-hub',
      },
}

export interface NewsData {
    [key: string]: any;
}



export const getHeadLineData = async (country: string = 'ph'): Promise<NewsData> => {
    const response = await fetch(
        `${API_CONFIG.news}top-headlines?country=${country}&apiKey=${apikey}`,
        headers
    )

    if(!response.ok){
        throw new Error(`Failed to fetch Headlines data for ${country}`);
    }
    const data: NewsData = await response.json();
    return data;
}

export const getNewsByQuery = async (query: string): Promise<NewsData> => {
    const response = await fetch(
        `${API_CONFIG.news}everything?q=${query}&apiKey=${apikey}`,
        headers
    )

    if(!response.ok){
        throw new Error(`Failed to fetch Headlines data for ${query}`);
    }
    const data: NewsData = await response.json();
    return data;
}
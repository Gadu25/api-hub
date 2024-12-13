import { API_CONFIG } from "~/utils/apiConfig";

const apikey = 'wBCBrCoV5OALoooDRMKVrBqtuxpMs4zfY-D-f-ok_Wo';

export interface PictureData {
    [key: string]: any;
}

export const getPictureData = async (query: string): Promise<PictureData> => {
    const response = await fetch(`${API_CONFIG.picture}search/photos?query=${query}&client_id=${apikey}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch pictures data for ${query}`);
    }
    const data: PictureData = await response.json();
    return data;
}
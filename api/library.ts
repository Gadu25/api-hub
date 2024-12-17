import { API_CONFIG } from "~/utils/apiConfig";

export interface BookData {
    [key: string]: any;
}

export const getBooks = async (name: string): Promise<BookData> => {
    const response = await fetch(`${API_CONFIG.library}search.json?q=${name}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch books`);
    }
    const data: BookData = await response.json();
    return data;
}
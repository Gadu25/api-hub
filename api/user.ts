import { API_CONFIG } from "~/utils/apiConfig";

export interface UserData {
    [key: string]: any;
}

export interface filterData {
    'gender': '',
    'results': 0,
    'nat': 'us'
}

export const getUsersData = async (filters: filterData): Promise<UserData> => {
    const response = await fetch(`
        ${API_CONFIG.users}?gender=${filters.gender}&results=${filters.results}&nat=${filters.nat}
        `);
    const data: UserData = await response.json();
    return data;
}
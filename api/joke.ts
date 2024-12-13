import { API_CONFIG } from "~/utils/apiConfig";

export interface JokeData {
  [key: string]: any;
}


export const getJokes = async (
  filters: { 
    categories: {[key: string]: boolean}; 
    type: {[key: string]: boolean}; 
    amount: number; 
    flags: {[key: string]: boolean}; 
  }): Promise<JokeData[]> => {
    const url = new URL(`${API_CONFIG.joke}`);

    let filterContent = ''

    let categoryList = ''
    let hasCategory = false
    const categories = filters.categories
    for(const cat in categories){
      if(categories[cat]){
        hasCategory = true
        categoryList += `${cat},`
      }
    }
    filterContent += hasCategory ? categoryList.substring(0, categoryList.length - 1) : 'Any'

    let blackList = '?blacklistFlags='
    let hasFlags = false
    const flags = filters.flags

    for (const flag in flags){
      if(filters.flags[flag]){
        hasFlags = true;
        blackList += `${flag},`;
      }
    }
    if(hasFlags){
      filterContent += blackList.substring(0, blackList.length - 1)
    }

    let typeValue = ''
    for (const item in filters.type){
      if(filters.type[item]){
        typeValue = item;
      }
    }
    let extension = hasFlags ? '&' : '?'

    filterContent += filters.type.single && filters.type.twopart || !filters.type.single && !filters.type.twopart
    ? '' : `${extension}type=${typeValue}`

    filterContent += filters.amount > 1 ? `${extension}amount=${filters.amount}`:''

    const response = await fetch(url+filterContent)

    return response.json();
  };
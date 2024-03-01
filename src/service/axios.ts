import axios from "axios";

const BASE_URL ='https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchLocations = async ()=>{
  try {
    const response = await api.get('/location');
    return response.data.results;
  }catch (error) {
    console.error("Error fetching locations", error);
    throw error;
  }
}



export const fetchCharacters = async (ids: string) => {
  try {
    const response = await api.get(`/character/${ids}`);
    return response.data;
  }catch(error){
    console.error(`Error fetching characters by ids ${ids}`, error);
    throw error;
  }
}

export const fetchCharactersByLocation = async (locationId: number) => {
  try {
    const locationResponse = await api.get(`/location/${locationId}`);
    const characterUrls = locationResponse.data.residents; // Karakterlerin URL'leri
    const characterIds = characterUrls.map((url: string) => url.split('/').pop()); // URL'den ID'yi çıkartır
    const charactersResponse = await api.get(`/character/${characterIds.join(',')}`);
    return charactersResponse.data; // Birden fazla karakter için API, bir dizi döndürür
  } catch (error) {
    console.error(`Error fetching characters for location ${locationId}:`, error);
    throw error;
  }
};


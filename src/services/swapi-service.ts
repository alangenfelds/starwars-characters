import axios from "axios";
import { Character } from "../types";

const BASE_URL = "https://swapi.dev/api/people/";

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export const getCharacters = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch characters");
  }
};

import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";

interface PokemonDetails {
  id: number;
  name: string;
  sprites: { front_default: string };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  moves: { move: { name: string } }[];
}

export const getPokemonList = async (url = `${API_URL}/pokemon?limit=10`) => {
  const response = await axios.get(url);
  return {
    results: response.data.results,
    next: response.data.next,
    previous: response.data.previous,
  };
};

export const getPokemonDetails = async (
  id: string | number
): Promise<PokemonDetails | null> => {
  try {
    const response = await axios.get<PokemonDetails>(
      `${API_URL}/pokemon/${id}`,
      {
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Pokemon #${id}:`, error);
    return null;
  }
};

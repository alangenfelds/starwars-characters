import { useState, useEffect } from "react";
import { getCharacters } from "../services/swapi-service";
import { CharacterWithImage } from "../types";

const useFetchCharacters = (page: number) => {
  const [characters, setCharacters] = useState<CharacterWithImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getCharacters(page);
        const charactersWithImages = data.results.map((character) => ({
          ...character,
          imageUrl: `https://picsum.photos/seed/${character.name}/200`,
        }));
        setCharacters(charactersWithImages);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  return { characters, loading, error, totalPages };
};

export default useFetchCharacters;

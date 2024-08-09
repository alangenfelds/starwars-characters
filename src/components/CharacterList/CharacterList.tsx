import React, { useState } from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterModal from "../CharacterModal/CharacterModal";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import useFetchCharacters from "../../hooks/useFetchCharacters";
import { CharacterWithImage } from "../../types";

import "./CharacterList.scss";

const CharacterList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { characters, loading, error, totalPages } = useFetchCharacters(page);
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterWithImage | null>(null);

  return (
    <div className="character-list">
      {loading && <Loader />}
      {error && (
        <div className="error">
          <div>Failed to fetch characters.</div>
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="cards-container">
            {characters.map((character) => (
              <CharacterCard
                key={character.name}
                character={character}
                onClick={setSelectedCharacter}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
};

export default CharacterList;

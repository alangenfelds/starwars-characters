import React from "react";
import "./CharacterModal.scss";
import { Character } from "../../types";

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  if (!character) return null;

  const { name, height, mass, created, films, birth_year } = character;
  // const dateAdded = new Date(created).toLocaleDateString("en-GB");

  const dateAdded = new Date(created)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{name}</h2>
        <p>Height: {(parseInt(height) / 100).toFixed(2)} m</p>
        <p>Mass: {mass} kg</p>
        <p>Date Added: {dateAdded}</p>
        <p>Number of Films: {films.length}</p>
        <p>Birth Year: {birth_year}</p>
      </div>
    </div>
  );
};

export default CharacterModal;

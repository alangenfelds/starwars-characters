import React from "react";
import "./CharacterModal.scss";
import { Character } from "../../types";

export interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  if (!character) return null;

  const { name, height, mass, created, films, birth_year } = character;

  const dateAdded = new Date(created)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div
        className="modal-content"
        data-testid="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{name}</h2>
        <div className="character-info">
          <div>Height:</div>
          <div>{(parseInt(height) / 100).toFixed(2)} m</div>
        </div>
        <div className="character-info">
          <div>Mass:</div>
          <div>{mass} kg</div>
        </div>
        <div className="character-info">
          <div>Date Added:</div>
          <div> {dateAdded}</div>
        </div>
        <div className="character-info">
          <div>Number of Films:</div>
          <div> {films.length}</div>
        </div>
        <div className="character-info">
          <div>Birth Year:</div>
          <div> {birth_year}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;

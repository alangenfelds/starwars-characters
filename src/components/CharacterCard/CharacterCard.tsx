import React from "react";
import "./CharacterCard.scss";
import { CharacterWithImage } from "../../types";

export interface CharacterCardProps {
  character: CharacterWithImage;
  onClick: (character: CharacterWithImage) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
}) => (
  <div className="character-card" onClick={() => onClick(character)}>
    <img src={character.imageUrl} alt={character.name} />
    <h2>{character.name}</h2>
  </div>
);

export default CharacterCard;

export interface Character {
  name: string;
  height: string;
  mass: string;
  created: string;
  films: string[];
  birth_year: string;
}

export interface CharacterWithImage extends Character {
  imageUrl: string;
}

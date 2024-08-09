import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterList from "./CharacterList";
import useFetchCharacters from "../../hooks/useFetchCharacters";
import { CharacterCardProps } from "../CharacterCard/CharacterCard";
import { CharacterModalProps } from "../CharacterModal/CharacterModal";
import { PaginationProps } from "../Pagination/Pagination";

jest.mock("../../hooks/useFetchCharacters");

jest.mock(
  "../CharacterCard/CharacterCard",
  () =>
    ({ character, onClick }: CharacterCardProps) =>
      (
        <div data-testid="character-card" onClick={() => onClick(character)}>
          {character.name}
        </div>
      )
);
jest.mock(
  "../CharacterModal/CharacterModal",
  () =>
    ({ character, onClose }: CharacterModalProps) =>
      character ? (
        <div data-testid="character-modal" onClick={onClose}>
          {character.name}
        </div>
      ) : null
);
jest.mock(
  "../Pagination/Pagination",
  () =>
    ({ currentPage, totalPages, onPageChange }: PaginationProps) =>
      (
        <div data-testid="pagination">
          <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </div>
      )
);
jest.mock("../Loader/Loader", () => () => (
  <div data-testid="loader">Loading...</div>
));

describe("CharacterList", () => {
  const mockCharacters = [
    { name: "Luke Skywalker", birth_year: "19BBY", imageUrl: "luke.jpg" },
    { name: "Darth Vader", birth_year: "41.9BBY", imageUrl: "vader.jpg" },
  ];

  beforeEach(() => {
    (useFetchCharacters as jest.Mock).mockReset();
  });

  it("renders loader when loading", () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      characters: [],
      loading: true,
      error: false,
      totalPages: 1,
    });

    render(<CharacterList />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      characters: [],
      loading: false,
      error: true,
      totalPages: 1,
    });

    render(<CharacterList />);
    expect(screen.getByText("Failed to fetch characters.")).toBeInTheDocument();
  });

  it("renders character cards when data is loaded", () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: false,
      totalPages: 1,
    });

    render(<CharacterList />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });

  it("opens modal when a character card is clicked", async () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: false,
      totalPages: 1,
    });

    render(<CharacterList />);
    fireEvent.click(screen.getByText("Luke Skywalker"));

    await waitFor(() => {
      expect(screen.getByTestId("character-modal")).toBeInTheDocument();
    });
  });

  it("closes modal when onClose is called", async () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: false,
      totalPages: 1,
    });

    render(<CharacterList />);
    fireEvent.click(screen.getByText("Luke Skywalker"));

    await waitFor(() => {
      expect(screen.getByTestId("character-modal")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("character-modal"));

    await waitFor(() => {
      expect(screen.queryByTestId("character-modal")).not.toBeInTheDocument();
    });
  });

  it("changes page when pagination is used", async () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: false,
      totalPages: 2,
    });

    render(<CharacterList />);
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(useFetchCharacters).toHaveBeenCalledWith(2);
    });
  });
});

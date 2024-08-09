import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterModal from "./CharacterModal";
import { Character } from "../../types";

describe("CharacterModal", () => {
  const mockCharacter: Character = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    created: "2014-12-09T13:50:51.644000Z",
    films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
    birth_year: "19BBY",
  };

  const mockOnClose = jest.fn();

  it("renders nothing when character is null", () => {
    const { container } = render(
      <CharacterModal character={null} onClose={mockOnClose} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders character details when character is provided", () => {
    render(<CharacterModal character={mockCharacter} onClose={mockOnClose} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("1.72 m")).toBeInTheDocument();
    expect(screen.getByText("77 kg")).toBeInTheDocument();
    expect(screen.getByText("09-12-2014")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", () => {
    render(<CharacterModal character={mockCharacter} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("×"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the overlay", () => {
    render(<CharacterModal character={mockCharacter} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the modal content", () => {
    render(<CharacterModal character={mockCharacter} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId("modal-content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("formats height correctly", () => {
    const tallCharacter = { ...mockCharacter, height: "200" };
    render(<CharacterModal character={tallCharacter} onClose={mockOnClose} />);

    expect(screen.getByText("2.00 m")).toBeInTheDocument();
  });
});

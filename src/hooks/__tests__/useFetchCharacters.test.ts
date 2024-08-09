import { renderHook, waitFor } from "@testing-library/react";
import useFetchCharacters from "../useFetchCharacters";
import { getCharacters } from "../../services/swapi-service";

jest.mock("../../services/swapi-service");

describe("useFetchCharacters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch characters and update state correctly", async () => {
    const mockCharacters = [
      { name: "Luke Skywalker", birth_year: "19BBY" },
      { name: "Darth Vader", birth_year: "41.9BBY" },
    ];

    (getCharacters as jest.Mock).mockResolvedValue({
      results: mockCharacters,
      count: 82,
    });

    const { result } = renderHook(() => useFetchCharacters(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(1);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.characters).toEqual([
      {
        ...mockCharacters[0],
        imageUrl: `https://picsum.photos/seed/${mockCharacters[0].name}/200`,
      },
      {
        ...mockCharacters[1],
        imageUrl: `https://picsum.photos/seed/${mockCharacters[1].name}/200`,
      },
    ]);
    expect(result.current.totalPages).toBe(9);
    expect(getCharacters).toHaveBeenCalledWith(1);
  });

  it("should handle errors", async () => {
    (getCharacters as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useFetchCharacters(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(1);
  });

  it("should refetch when page changes", async () => {
    const mockCharacters = [{ name: "Luke Skywalker", birth_year: "19BBY" }];
    (getCharacters as jest.Mock).mockResolvedValue({
      results: mockCharacters,
      count: 82,
    });

    const { result, rerender } = renderHook(
      ({ page }) => useFetchCharacters(page),
      { initialProps: { page: 1 } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getCharacters).toHaveBeenCalledWith(1);

    rerender({ page: 2 });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getCharacters).toHaveBeenCalledWith(2);
  });
});

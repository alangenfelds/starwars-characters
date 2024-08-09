import { renderHook, act } from "@testing-library/react";
import useTheme from "../useTheme";

describe("useTheme", () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  const documentElementMock = {
    setAttribute: jest.fn(),
  };

  Object.defineProperty(document, "documentElement", {
    value: documentElementMock,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with light theme if localStorage is empty", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("light");
    expect(localStorageMock.getItem).toHaveBeenCalledWith("theme");
  });

  it("should initialize with theme from localStorage if available", () => {
    localStorageMock.getItem.mockReturnValue("dark");

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
    expect(localStorageMock.getItem).toHaveBeenCalledWith("theme");
  });

  it("should toggle theme from light to dark", () => {
    localStorageMock.getItem.mockReturnValue("light");

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
  });

  it("should toggle theme from dark to light", () => {
    localStorageMock.getItem.mockReturnValue("dark");

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
  });

  it("should update document attribute and localStorage when theme changes", () => {
    localStorageMock.getItem.mockReturnValue("light");

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(documentElementMock.setAttribute).toHaveBeenCalledWith(
      "data-theme",
      "dark"
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
  });
});

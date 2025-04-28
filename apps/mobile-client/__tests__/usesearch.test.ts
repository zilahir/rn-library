import { renderHook, waitFor } from "@testing-library/react";
import useSearch from "@app/hooks/useSearch";
import { withQueryProvider } from "./utils/wrapper";
import { useQuery } from "@tanstack/react-query";

const mockedBooks = [
  { _id: "1", title: "Book 1", author: "Author 1" },
  { _id: "2", title: "Book 2", author: "Author 2" },
];

jest.mock("axios", () => {
  const original = jest.requireActual("axios");

  return {
    ...original,
    create: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      data: [
        { _id: "1", title: "Book 1", author: "Author 1" },
        { _id: "2", title: "Book 2", author: "Author 2" },
      ],
    }),
    post: jest.fn(),
    delete: jest.fn(),
  };
});

describe("useSearch", () => {
  beforeEach(() => {});
  beforeAll(() => {
    jest.mock("@app/queries/book", () => ({
      useBooks: jest.fn(() => {
        return {
          data: [...mockedBooks],
          isLoading: false,
        };
      }),
    }));
  });
  it("should be truthy", async () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: withQueryProvider,
    });

    await waitFor(() => expect(result.current).toHaveProperty("handleSorting"));
  });

  it("returns an empty array when searchTerm is empty", async () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: withQueryProvider,
    });

    const searchTerm = "";
    const promise = result.current.handleSorting(searchTerm);

    expect(await promise).toEqual([]);
  });

  it("returns filtered books by title when searchTerm is valid", async () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: withQueryProvider,
    });

    const searchTerm = "Book 1";
    const promise = await result.current.handleSorting(searchTerm);

    expect(promise).toEqual([
      { _id: "1", title: "Book 1", author: "Author 1" },
    ]);
  });
});

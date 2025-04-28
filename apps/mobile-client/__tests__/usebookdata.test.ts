import axios from "axios";
import { renderHook, waitFor } from "@testing-library/react";
import useBookData from "@app/hooks/useBookData";

jest.mock("axios", () => {
  const original = jest.requireActual("axios");

  return {
    ...original,
    create: jest.fn().mockReturnThis(),
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  };
});

describe("useBookData", () => {
  beforeEach(() => {
    (axios.create as jest.Mock).mockReset();
  });
  it("should be truthy", async () => {
    const mockedAxios = axios;
    const mockedData = {
      isbn: "978-1-56619-909-4",
      title: "The Art of Readable Code",
    };

    (mockedAxios.get as jest.Mock).mockResolvedValue({
      data: {
        ...mockedData,
      },
    });
    const isbn = "978-1-56619-909-4";
    const { result } = renderHook(() => useBookData());

    await waitFor(() => expect(result.current).toBeTruthy());
  });
});

import axios from "axios";
import useBook from "@app/hooks/useBook";
import { renderHook, waitFor } from "@testing-library/react";

import { withQueryProvider } from "./utils/wrapper";

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

describe("useBook", () => {
  beforeEach(() => {
    (axios.create as jest.Mock).mockReset();
  });
  it("should be success", async () => {
    const mockedAxios = axios;
    (mockedAxios.get as jest.Mock).mockResolvedValue({ data: true });
    const isbn = "978-1-56619-909-4";
    const { result } = renderHook(() => useBook({ isbn }), {
      wrapper: withQueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

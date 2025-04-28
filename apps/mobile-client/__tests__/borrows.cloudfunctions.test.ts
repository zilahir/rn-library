import { Api } from "@app/api";
import fetchUserBorrows from "@app/queries/borrows/cloudFunctions/fetchUserBorrows";
import axios from "axios";

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

describe("fetchUserBorrow", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockReset();
  });
  it("should return a response", async () => {
    const responseData = { id: 1, name: "John" };
    const mockedAxios = axios;

    (mockedAxios.create as jest.Mock).mockReturnValue(mockedAxios);
    (mockedAxios.get as jest.Mock).mockResolvedValue({ data: responseData });

    const response = await fetchUserBorrows("1");

    expect(response).toBe(responseData);
  });
});

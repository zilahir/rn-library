import { Api } from "@app/api";
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

describe("Api function", () => {
  beforeAll(() => {});
  beforeEach(() => {
    (axios.create as jest.Mock).mockReset();
    // (axios.get as jest.Mock).mockReset();
    // (axios.post as jest.Mock).mockReset();
  });

  it("should make a GET request and return data", async () => {
    (axios.get as jest.Mock).mockReset();
    const responseData = { id: 1, name: "John" };
    const mockedAxios = axios;

    (mockedAxios.create as jest.Mock).mockReturnValue(mockedAxios);
    (mockedAxios.get as jest.Mock).mockResolvedValue({ data: responseData });
    const result = await Api({
      method: "GET",
      path: "/users",
    });

    expect(result).toBe(responseData);
  });

  it("should make a POST request and return data", async () => {
    (axios.get as jest.Mock).mockReset();
    const responseData = { id: 1, name: "John" };
    const mockedAxios = axios;

    (mockedAxios.create as jest.Mock).mockReturnValue(mockedAxios);
    (mockedAxios.post as jest.Mock).mockResolvedValue({ data: responseData });
    const result = await Api({
      method: "POST",
      path: "/users",
    });

    expect(result).toBe(responseData);
  });

  it("should return true when method is not correct", async () => {
    (axios.get as jest.Mock).mockReset();
    const mockedAxios = axios;

    (mockedAxios.create as jest.Mock).mockReturnValue(mockedAxios);
    (mockedAxios.delete as jest.Mock).mockResolvedValue({});
    const result = await Api({
      method: "DELETE",
      path: "/users",
    });

    expect(result).toBe(true);
  });
});

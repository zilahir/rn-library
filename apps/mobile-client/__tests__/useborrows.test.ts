// @ts-expect-error this is a mock
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";

import axios from "axios";
import useBook from "@app/hooks/useBook";
import { renderHook, waitFor } from "@testing-library/react";

import { withQueryProvider } from "./utils/wrapper";
import useBorrows from "@app/queries/borrows";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("react-native-device-info", () => mockRNDeviceInfo);

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

describe("useBorrows", () => {
  beforeEach(() => {
    (axios.create as jest.Mock).mockReset();
  });
  it("should be success", async () => {
    const mockedAxios = axios;
    (mockedAxios.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useBorrows(), {
      wrapper: withQueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

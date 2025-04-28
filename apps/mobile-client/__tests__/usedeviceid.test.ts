import { renderHook, waitFor } from "@testing-library/react";
// @ts-expect-error this is a mock
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import useDeviceId from "@app/hooks/useDeviceId";

import { withQueryProvider } from "./utils/wrapper";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("react-native-device-info", () => mockRNDeviceInfo);

describe("useBookData", () => {
  it("should be truthy", async () => {
    const { result } = renderHook(() => useDeviceId(), {
      wrapper: withQueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

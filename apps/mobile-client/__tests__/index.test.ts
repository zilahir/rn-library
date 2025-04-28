// @ts-expect-error this is a mock
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import { registerRootComponent } from "expo";
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("react-native-device-info", () => mockRNDeviceInfo);

import App from "../App";
import "../index";

jest.mock("expo", () => ({
  registerRootComponent: jest.fn(),
}));

describe("App Registration", () => {
  it("registers the App component as the root component", () => {
    expect(registerRootComponent).toHaveBeenCalledWith(App);
  });
});

import TrendingScreen from "@app/screens/TrendingScreen";

import { render } from "./utils/wrapper";

describe("TrendingScreen", () => {
  it("render correctly", () => {
    const { toJSON } = render(<TrendingScreen />);

    expect(toJSON()).toMatchSnapshot();
  });
});

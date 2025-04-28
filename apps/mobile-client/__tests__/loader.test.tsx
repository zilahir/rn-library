import Loader from "@app/components/common/Loader";

import { render } from "./utils/wrapper";

describe("<Loader>", () => {
  it("renders without an error", () => {
    const { getByTestId } = render(<Loader />);

    const activityIndicator = getByTestId("loader");
    expect(activityIndicator).toBeDefined();
  });
});

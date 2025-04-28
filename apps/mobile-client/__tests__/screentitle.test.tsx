import { ReactTestRendererJSON } from "react-test-renderer";
import ScreenTitle from "@app/components/common/ScreenTitle";

import wrapper from "./utils/wrapper";

describe("<ScreenTitle />", () => {
  it("renders without an error", () => {
    const tree = wrapper(
      <ScreenTitle title="hello" />
    ).toJSON() as ReactTestRendererJSON;
    expect(tree.children?.length).toBe(1);
  });
});

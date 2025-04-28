import { ReactTestRendererJSON } from "react-test-renderer";
import Featured from "@app/components/Featured";

import wrapper from "./utils/wrapper";

const mockNavigation = {
  navigate: jest.fn(),
};

describe("<Featured />", () => {
  it("renders without an error", () => {
    const tree = wrapper(
      <Featured books={[]} navigation={mockNavigation as any} />
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });
});

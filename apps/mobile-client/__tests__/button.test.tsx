import { ReactTestRendererJSON } from "react-test-renderer";
import Button from "@app/components/common/Button";

import wrapper from "./utils/wrapper";

const onClick = jest.fn();

describe("<Button />", () => {
  it("renders without an error", () => {
    const tree = wrapper(
      <Button
        buttonType="primary"
        label="Hello World"
        onPress={(): void => onClick()}
      />
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });
});

import { ReactTestRendererJSON } from "react-test-renderer";
import { Text, View } from "react-native";
import SectionTitle from "@app/components/common/SectionTitle";

import wrapper from "./utils/wrapper";

describe("<SectionTitle />", () => {
  it("renders without an error", () => {
    const tree = wrapper(
      <SectionTitle title="hello" />
    ).toJSON() as ReactTestRendererJSON;
    expect(tree.children?.length).toBe(1);
  });

  it("renders with action without an error", () => {
    const tree = wrapper(
      <SectionTitle
        action={
          <View>
            <Text>hello world</Text>
          </View>
        }
        title="hello"
      />
    ).toJSON() as ReactTestRendererJSON;
    expect(tree.children?.length).toBe(2);
  });
});

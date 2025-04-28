import { ReactTestRendererJSON } from "react-test-renderer";
import { Text, View } from "react-native";
import ApiClientProvider from "@app/components/ApiClientProvider";

import wrapper from "./utils/wrapper";

describe("<ApiClientProvider />", () => {
  it("renders without an error", () => {
    const tree = wrapper(
      <ApiClientProvider>
        <View>
          <Text>hell world</Text>
        </View>
      </ApiClientProvider>
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });
});
